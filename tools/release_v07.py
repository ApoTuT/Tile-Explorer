"""Package a clean v0.7 runtime. New server deployment uses install_v07_preview.sh."""
from pathlib import Path
import argparse
import datetime
import hashlib
import json
import re
import subprocess
import sys
import tarfile

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.local/deploy'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def package():
    subprocess.run(['git', 'diff', '--exit-code', 'HEAD', '--', 'web/slide-v07', 'web/slide-v07.html', 'web/assets/slide-v06', 'config/slide-v07.json'], cwd=ROOT, check=True)
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    assert re.fullmatch(r'[0-9a-f]{40}', commit)
    subprocess.run([sys.executable, 'tools/export_v07.py'], cwd=ROOT, check=True)
    build = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y%m%d') + '-v07r3-' + commit[:8]
    output = WORK / build
    output.mkdir(parents=True, exist_ok=False)
    source = ROOT / '.local/h5-v07'
    files = sorted(p for p in source.rglob('*') if p.is_file())
    assert len(files) == 23 and all(not p.is_symlink() for p in files)
    archive = output / 'tile-explorer.tar.gz'
    with tarfile.open(archive, 'w:gz') as tar:
        for file in files:
            tar.add(file, arcname='html/' + file.relative_to(source).as_posix())
    entries = [{'path': f.relative_to(source).as_posix(), 'bytes': f.stat().st_size, 'sha256': digest(f.read_bytes())} for f in files]
    manifest = {'buildId': build, 'sourceCommit': commit, 'version': '0.7.2', 'ruleset': 'slide-v07-2', 'createdAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'files': entries}
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    sums = [digest(archive.read_bytes()) + '  tile-explorer.tar.gz'] + [e['sha256'] + '  html/' + e['path'] for e in entries]
    (output / 'SHA256SUMS').write_bytes(('\n'.join(sums) + '\n').encode())
    (WORK / 'v07-current.json').write_text(json.dumps({'buildId': build, 'out': str(output), 'sourceCommit': commit}), encoding='utf-8')
    print(json.dumps({'buildId': build, 'files': len(files), 'archiveBytes': archive.stat().st_size}))



def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode', choices=['package'])
    parser.parse_args()
    package()


if __name__ == '__main__':
    main()
