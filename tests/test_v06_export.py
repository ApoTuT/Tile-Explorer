from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from tools.export_v06 import export
from tile_explorer.assets import ROOT, load_web_manifest, validate_entry_html


class V06ExportTests(unittest.TestCase):
    def test_portable_bundle(self):
        bundle = load_web_manifest(ROOT / 'config/slide-v06.json', require_files=True)
        validate_entry_html(bundle, (ROOT / 'web/slide-v06.html').read_text(encoding='utf-8'))
        with TemporaryDirectory() as tmp:
            files = export(Path(tmp))
            self.assertEqual(len(files), 22)
            self.assertTrue((Path(tmp) / 'index.html').is_file())
            for name in bundle.assets:
                self.assertEqual((Path(tmp) / name).read_bytes(), (ROOT / 'web' / name).read_bytes())
