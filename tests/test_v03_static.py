"""Check that the local server explicitly serves the new portable game assets."""
from pathlib import Path
import copy
import json
import tempfile
import unittest
from tile_explorer.assets import (
    MERGE_MANIFEST, load_merge_manifest, local_web_path, validate_entry_html,
    validate_manifest,
)
from tile_explorer.server import ROOT, STATIC_FILES, STATIC_MIME
from tools.export_v03 import FILES


class StaticV03Tests(unittest.TestCase):
    def test_export_manifest_matches_server_whitelist_and_mime(self):
        for name in FILES:
            self.assertEqual(STATIC_FILES["/" + name], name)
            self.assertTrue((ROOT / "web" / name).is_file())
            self.assertIn(Path(name).suffix, STATIC_MIME)

    def test_unrelated_project_files_are_not_exposed(self):
        for name in ["/docs/technical/v0.3.md", "/.git/config", "/merge-v03/../../main.py"]:
            self.assertNotIn(name, STATIC_FILES)

    def test_manifest_has_canonical_unique_web_paths(self):
        data = json.loads(MERGE_MANIFEST.read_text(encoding="utf-8"))
        bundle = load_merge_manifest()
        self.assertEqual(bundle.files, tuple(FILES))
        bad_paths = [
            "../main.py", "/app.js", "C:/app.js", "merge-v03\\app.js",
            "merge-v03/../app.js", "merge-v03//app.js", "./app.js",
            "https://example.com/app.js", "app.js?copy=1", "app%2ejs",
        ]
        for name in bad_paths:
            with self.subTest(path=name), self.assertRaises(ValueError):
                local_web_path(name)
        duplicate = copy.deepcopy(data)
        duplicate["scripts"].append(duplicate["scripts"][0].upper())
        with self.assertRaises(ValueError):
            validate_manifest(duplicate)

    def test_html_loading_order_matches_manifest_and_rejects_missing_resources(self):
        bundle = load_merge_manifest()
        html = local_web_path(bundle.entry).read_text(encoding="utf-8")
        validate_entry_html(bundle, html)
        for source in (
            html.replace(f'./{bundle.scripts[0]}', "./missing.js", 1),
            html.replace(f'./{bundle.scripts[0]}', "/wrong-root.js", 1),
            html.replace(f'./{bundle.styles[0]}', "https://example.com/style.css", 1),
        ):
            with self.assertRaises(ValueError):
                validate_entry_html(bundle, source)
        missing_tag = f'<script src="./{bundle.scripts[0]}" defer></script>'
        self.assertIn(missing_tag, html)
        with self.assertRaises(ValueError):
            validate_entry_html(bundle, html.replace(missing_tag, "", 1))

    def test_manifest_rejects_missing_files_and_invalid_schema(self):
        data = json.loads(MERGE_MANIFEST.read_text(encoding="utf-8"))
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(FileNotFoundError):
                validate_manifest(data, web_root=Path(directory), require_files=True)
        for change in ({"version": 2}, {"scripts": "app.js"}, {"styles": []},
                       {"assets": ["other.html"]}, {"entry": "app.js"}):
            with self.subTest(change=change), self.assertRaises(ValueError):
                validate_manifest({**data, **change})
