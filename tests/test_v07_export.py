from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from tools.export_v07 import export
from tile_explorer.assets import ROOT, load_web_manifest, validate_entry_html
from tile_explorer.server import STATIC_FILES


class V07ExportTests(unittest.TestCase):
    def test_portable_bundle_includes_worker_and_shared_local_art(self):
        bundle = load_web_manifest(ROOT / 'config/slide-v07.json', require_files=True)
        validate_entry_html(bundle, (ROOT / 'web/slide-v07.html').read_text(encoding='utf-8'))
        with TemporaryDirectory() as tmp:
            files = export(Path(tmp))
            self.assertEqual(len(files), len(bundle.files))
            self.assertTrue((Path(tmp) / 'index.html').is_file())
            self.assertTrue((Path(tmp) / 'slide-v07/solver-worker.js').is_file())
            for name in bundle.files:
                self.assertEqual(STATIC_FILES['/' + name], name)
                target = 'index.html' if name == bundle.entry else name
                self.assertEqual((Path(tmp) / target).read_bytes(), (ROOT / 'web' / name).read_bytes())
