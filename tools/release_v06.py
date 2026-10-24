"""Package, stage and activate v0.6 on the existing server, preserving immutable releases.

Run package, upload, browser-test preview, then activate. SSH uses existing keys.
"""
from pathlib import Path
import argparse
import datetime
import hashlib
import json
import re
import subprocess
import sys
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.local/deploy'
HOST = 'root@106.12.167.253'
SSH = ['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', HOST]
HTML = '/root/my-project/Group-Buy-16009-sheng/docs/dev-ops/ui/html'
CONF = '/root/my-project/Group-Buy-16009-sheng/docs/dev-ops/nginx/config/default.conf'


def remote(script):
    r = subprocess.run(SSH + ['bash -se'], input=script.encode('utf-8'), capture_output=True)
    if r.returncode:
        sys.stdout.buffer.write(r.stdout)
        sys.stderr.buffer.write(r.stderr)
        r.check_returncode()
    return r.stdout.decode('utf-8')


def upload(files, destination):
    subprocess.run(['scp', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', *map(str, files), HOST + ':' + destination + '/'], check=True)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def package():
    subprocess.run(['git', 'diff', '--exit-code', 'HEAD', '--', 'web/slide-v06', 'web/slide-v06.html', 'web/assets/slide-v06', 'config/slide-v06.json'], cwd=ROOT, check=True)
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    assert re.fullmatch(r'[0-9a-f]{40}', commit)
    subprocess.run([sys.executable, 'tools/export_v06.py'], cwd=ROOT, check=True)
    build = '20261023-v06-blocks-' + commit[:8]
    output = WORK / build
    output.mkdir(parents=True, exist_ok=False)
    source = ROOT / '.local/h5-v06'
    files = sorted(p for p in source.rglob('*') if p.is_file())
    assert len(files) == 22 and all(not p.is_symlink() for p in files)
    archive = output / 'tile-explorer.tar.gz'
    with tarfile.open(archive, 'w:gz') as tar:
        for file in files:
            tar.add(file, arcname='html/' + file.relative_to(source).as_posix())
    entries = [{'path': f.relative_to(source).as_posix(), 'bytes': f.stat().st_size, 'sha256': digest(f.read_bytes())} for f in files]
    manifest = {'buildId': build, 'sourceCommit': commit, 'version': '0.6.2', 'ruleset': 'slide-v06-3', 'createdAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'files': entries}
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    sums = [digest(archive.read_bytes()) + '  tile-explorer.tar.gz'] + [e['sha256'] + '  html/' + e['path'] for e in entries]
    (output / 'SHA256SUMS').write_bytes(('\n'.join(sums) + '\n').encode())
    (WORK / 'v06-current.json').write_text(json.dumps({'buildId': build, 'out': str(output), 'sourceCommit': commit}), encoding='utf-8')
    print(json.dumps({'buildId': build, 'files': len(files), 'archiveBytes': archive.stat().st_size}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode', choices=['package', 'upload', 'activate', 'verify'])
    mode = parser.parse_args().mode
    if mode == 'package':
        package()
        return
    current = json.loads((WORK / 'v06-current.json').read_text())
    build = current['buildId']
    assert re.fullmatch(r'20261023-v06-blocks-[0-9a-f]{8}', build)
    output = Path(current['out'])
    release = '/root/apps/tile-explorer/releases/' + build
    preview = HTML + '/tile-explorer-v06-preview/' + build
    immutable = HTML + '/tile-explorer/releases/' + build
    target = '/tile-explorer/releases/' + build + '/'
    if mode == 'upload':
        remote(f'test ! -e "{release}"\nmkdir -p "{release}"\n')
        upload([output / 'tile-explorer.tar.gz', output / 'manifest.json', output / 'SHA256SUMS'], release)
        print(remote(f'''cd "{release}"
tar -xzf tile-explorer.tar.gz
sha256sum -c SHA256SUMS
test ! -e "{preview}"
mkdir -p "{preview}"
cp -a html/. "{preview}/"
diff -qr html "{preview}"
curl --fail --silent --output /dev/null http://127.0.0.1/tile-explorer-v06-preview/{build}/
'''))
        print('PREVIEW http://106.12.167.253/tile-explorer-v06-preview/' + build + '/')
    elif mode == 'activate':
        original = subprocess.check_output(SSH + ['cat', CONF])
        pattern = rb'(location = /tile-explorer/ \{\s*add_header Cache-Control "no-store" always;\s*return 302 )(/tile-explorer/releases/[a-zA-Z0-9._-]+/)(;\s*\})'
        matches = list(re.finditer(pattern, original))
        assert len(matches) == 1, 'Expected one stable game route'
        match = matches[0]
        previous = match.group(2).decode()
        assert previous == '/tile-explorer/releases/20261023-v06-steps-d0718426/', 'Production changed; inspect before replacing route'
        candidate = original[:match.start(2)] + target.encode() + original[match.end(2):]
        (output / 'default.conf.before').write_bytes(original)
        (output / 'default.conf.candidate').write_bytes(candidate)
        upload([output / 'default.conf.candidate'], release)
        print(remote(f'''test "$(sha256sum "{CONF}" | cut -d ' ' -f 1)" = "{digest(original)}"
cd "{release}"
sha256sum -c SHA256SUMS
test ! -e "{immutable}"
mkdir -p "{immutable}"
cp -a html/. "{immutable}/"
diff -qr html "{immutable}"
curl --fail --silent --output main-site.before.html http://127.0.0.1/
cp -p "{CONF}" default.conf.before
rollback() {{
  cp default.conf.before "{CONF}"
  docker exec group-buy-market-ui nginx -t
  docker exec group-buy-market-ui nginx -s reload
}}
trap rollback ERR
cp default.conf.candidate "{CONF}"
docker exec group-buy-market-ui nginx -t
docker exec group-buy-market-ui nginx -s reload
switched=0
for attempt in $(seq 1 15); do
  if curl --fail --silent --head http://127.0.0.1/tile-explorer/ | tr -d '\\r' | grep -F 'Location:' | grep -Fq '{target}'; then switched=1; break; fi
  sleep 0.2
done
test "$switched" = 1
curl --fail --silent "http://127.0.0.1{target}" | grep -Fq 'v0.6'
curl --fail --silent --output main-site.after.html http://127.0.0.1/
cmp main-site.before.html main-site.after.html
trap - ERR
curl --fail --silent --head http://127.0.0.1/tile-explorer/
'''))
        routing = {'buildId': build, 'previousTarget': previous, 'target': target, 'sourceCommit': current['sourceCommit']}
        (output / 'routing.json').write_text(json.dumps(routing, indent=2) + '\n', encoding='utf-8')
        print(json.dumps(routing))
    elif mode == 'verify':
        base = 'http://106.12.167.253'
        manifest = json.loads((output / 'manifest.json').read_text())
        for entry in manifest['files']:
            with urllib.request.urlopen(base + target + entry['path'], timeout=20) as response:
                assert digest(response.read()) == entry['sha256'], entry['path']
        with urllib.request.urlopen(base + '/tile-explorer/', timeout=20) as response:
            assert response.url == base + target
        with urllib.request.urlopen(base + '/tile-explorer/releases/20261023-v05-win-9c1b3a91/', timeout=20) as response:
            assert response.status == 200
        print('Verified all 22 public file digests, stable redirect and preserved v0.5 release')


if __name__ == '__main__':
    main()
