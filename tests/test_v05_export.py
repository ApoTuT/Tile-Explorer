"""v0.5 bundle must work from a subdirectory without a rules server."""
from pathlib import Path
import tempfile
import unittest

from tile_explorer.assets import load_slide_manifest, validate_entry_html
from tile_explorer.server import STATIC_FILES, STATIC_MIME
from tools.export_v05 import export


class SlideExportTests(unittest.TestCase):
    def test_manifest_resources_are_registered_and_export_portably(self):
        bundle = load_slide_manifest(require_files=True)
        for name in bundle.files:
            self.assertEqual(STATIC_FILES['/' + name], name)
            self.assertIn(Path(name).suffix, STATIC_MIME)
        with tempfile.TemporaryDirectory() as directory:
            output = (Path(directory) / 'release' / 'game').resolve()
            files = export(output)
            self.assertEqual(len(files), len(bundle.files))
            self.assertEqual({file.relative_to(output).as_posix() for file in files},
                             {'index.html' if name == bundle.entry else name for name in bundle.files})
            html = (output / 'index.html').read_text(encoding='utf-8')
            validate_entry_html(bundle, html)
            self.assertTrue((output / 'shared/merge-content.js').is_file())
            for name in bundle.scripts:
                text = (output / name).read_text(encoding='utf-8')
                self.assertNotIn('/api/', text)
            (output / 'keep.txt').write_text('keep', encoding='utf-8')
            export(output)
            self.assertEqual((output / 'keep.txt').read_text(), 'keep')

    def test_old_mode_resources_remain_separate(self):
        self.assertEqual(STATIC_FILES['/merge-v03.html'], 'merge-v03.html')
        self.assertNotIn('/docs/technical/v0.5.md', STATIC_FILES)
        self.assertNotIn('/slide-v05/../../main.py', STATIC_FILES)

    def test_export_rejects_source_output(self):
        root = Path(__file__).resolve().parents[1]
        for output in (root, root / 'web' / 'output'):
            with self.subTest(output=output), self.assertRaises(ValueError):
                export(output)
