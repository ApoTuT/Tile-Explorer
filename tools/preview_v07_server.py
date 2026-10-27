"""Small standalone static preview host; all game rules stay in the browser."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

BUILD = re.compile(r'[0-9]{8}-v07r3-[0-9a-f]{8}')


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory, selection, **kwargs):
        self.selection = Path(selection)
        super().__init__(*args, directory=directory, **kwargs)

    def route(self):
        parsed = urlsplit(self.path)
        path = unquote(parsed.path)
        if path in ('/', '/tile-explorer', '/tile-explorer/'):
            try:
                build = json.loads(self.selection.read_text())['buildId']
                if not BUILD.fullmatch(build):
                    raise ValueError('build')
            except (OSError, ValueError, KeyError):
                self.send_error(503, 'Preview is being prepared')
                return False
            target = '/tile-explorer/releases/' + build + '/'
            if parsed.query:
                target += '?' + parsed.query
            self.send_response(302)
            self.send_header('Location', target)
            self.send_header('Content-Length', '0')
            self.end_headers()
            return False
        parts = path.split('/')
        if len(parts) < 5 or parts[1:3] != ['tile-explorer', 'releases'] or not BUILD.fullmatch(parts[3]) or '..' in parts or '\\' in path:
            self.send_error(404)
            return False
        return True

    def do_GET(self):
        if self.route():
            super().do_GET()

    def do_HEAD(self):
        if self.route():
            super().do_HEAD()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store' if urlsplit(self.path).path in ('/', '/tile-explorer', '/tile-explorer/') else 'public, max-age=31536000, immutable')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def list_directory(self, path):
        self.send_error(404)
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--directory', required=True)
    parser.add_argument('--selection', required=True)
    parser.add_argument('--port', type=int, default=80)
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=args.directory, selection=args.selection)
    ThreadingHTTPServer(('0.0.0.0', args.port), handler).serve_forever()


if __name__ == '__main__':
    main()
