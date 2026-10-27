from functools import partial
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import build_opener, HTTPRedirectHandler

from tools.preview_v07_server import PreviewHandler


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class PreviewTests(unittest.TestCase):
    def test_redirect_query_static_files_and_private_paths(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            build = '20261027-v07r3-1234abcd'
            folder = root / 'public/tile-explorer/releases' / build
            folder.mkdir(parents=True)
            (folder / 'index.html').write_text('game')
            selection = root / 'current.json'
            selection.write_text(json.dumps({'buildId': build}))
            handler = partial(PreviewHandler, directory=str(root / 'public'), selection=str(selection))
            server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
            worker = threading.Thread(target=server.serve_forever, daemon=True)
            worker.start()
            base = 'http://127.0.0.1:' + str(server.server_port)
            opener = build_opener(NoRedirect)
            try:
                with self.assertRaises(HTTPError) as redirect:
                    opener.open(base + '/tile-explorer/?demo=25')
                self.assertEqual(redirect.exception.code, 302)
                self.assertEqual(redirect.exception.headers['Location'], '/tile-explorer/releases/' + build + '/?demo=25')
                self.assertEqual(redirect.exception.headers['Cache-Control'], 'no-store')
                with opener.open(base + '/tile-explorer/releases/' + build + '/') as response:
                    self.assertEqual(response.read(), b'game')
                for path in ['/current.json', '/tile-explorer/releases/', '/tile-explorer/releases/' + build + '/%2e%2e/current.json']:
                    with self.assertRaises(HTTPError) as blocked:
                        opener.open(base + path)
                    self.assertEqual(blocked.exception.code, 404)
            finally:
                server.shutdown()
                server.server_close()
                worker.join()
