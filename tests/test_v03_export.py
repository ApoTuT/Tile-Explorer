"""Verify portable H5 resources, without a game rules server or npm dependencies."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from html.parser import HTMLParser
from tile_explorer.assets import load_merge_manifest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("export_v03", ROOT / "tools/export_v03.py")
exporter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exporter)


class ResourceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.resources = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script":
            self.resources.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.resources.append(attrs["href"])


class ExportTests(unittest.TestCase):
    def test_standalone_manifest_and_relative_resources(self):
        with tempfile.TemporaryDirectory() as directory:
            output = (Path(directory) / "h5").resolve()
            files = exporter.export(output)
            bundle = load_merge_manifest(require_files=True)
            self.assertEqual(len(files), len(bundle.files))
            self.assertEqual(
                {file.relative_to(output).as_posix() for file in files},
                {"index.html" if name == bundle.entry else name for name in bundle.files},
            )
            parser = ResourceParser()
            parser.feed((output / "index.html").read_text(encoding="utf-8"))
            for url in parser.resources:
                self.assertTrue(url.startswith("./"), url)
                self.assertTrue((output / url).is_file(), url)
            self.assertEqual(
                (output / "index.html").read_bytes(),
                (ROOT / "web" / bundle.entry).read_bytes(),
            )
            for name in exporter.FILES:
                if name.endswith(".js") and name.startswith("merge-v03/"):
                    text = (output / name).read_text(encoding="utf-8")
                    self.assertNotIn("/api/", text)
            self.assertTrue((output / "assets/audio/v02/strawberry.wav").is_file())
            self.assertTrue((output / "assets/merge-v04/sports-car.svg").is_file())
            (output / "keep.txt").write_text("unrelated", encoding="utf-8")
            exporter.export(output)
            self.assertEqual((output / "keep.txt").read_text(), "unrelated")

    def test_export_rejects_source_tree(self):
        with self.assertRaises(ValueError):
            exporter.export(ROOT / "web" / "bad")
        with self.assertRaises(ValueError):
            exporter.export(ROOT)
