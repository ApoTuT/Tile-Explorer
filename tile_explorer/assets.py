"""Validate the explicit web bundle shared by local serving and H5 export."""

from __future__ import annotations

from dataclasses import dataclass
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
WEB_ROOT = ROOT / "web"
MERGE_MANIFEST = ROOT / "config" / "merge-v03.json"
SLIDE_MANIFEST = ROOT / "config" / "slide-v05.json"


def local_web_path(name: str, web_root: Path = WEB_ROOT) -> Path:
    """Accept one canonical local path, never a URL, parent traversal or alias."""
    if (not isinstance(name, str) or not name or
            any(char in name for char in "\\:%?#") or
            any(ord(char) < 32 for char in name)):
        raise ValueError(f"Invalid web asset path: {name!r}")
    parts = name.split("/")
    if any(part in ("", ".", "..") for part in parts):
        raise ValueError(f"Non-canonical web asset path: {name!r}")
    if PurePosixPath(name).as_posix() != name:
        raise ValueError(f"Non-canonical web asset path: {name!r}")
    web_root = Path(web_root).resolve()
    resolved = (web_root / name).resolve()
    if not resolved.is_relative_to(web_root):
        raise ValueError(f"Web asset escapes web/: {name!r}")
    return resolved


@dataclass(frozen=True)
class WebBundle:
    entry: str
    scripts: tuple[str, ...]
    styles: tuple[str, ...]
    assets: tuple[str, ...]

    @property
    def files(self) -> tuple[str, ...]:
        return (self.entry, *self.scripts, *self.styles, *self.assets)


def validate_manifest(data: dict, *, web_root: Path = WEB_ROOT,
                      require_files: bool = False) -> WebBundle:
    if (not isinstance(data, dict) or data.get("version") != 1 or
            set(data) != {"version", "entry", "scripts", "styles", "assets"}):
        raise ValueError("Invalid web bundle manifest")
    for group in ("scripts", "styles", "assets"):
        if not isinstance(data[group], list) or not data[group]:
            raise ValueError(f"Bundle {group} must be a non-empty list")
    bundle = WebBundle(data["entry"], tuple(data["scripts"]),
                       tuple(data["styles"]), tuple(data["assets"]))
    seen = set()
    for name in bundle.files:
        path = local_web_path(name, web_root)
        if name.casefold() in seen:
            raise ValueError(f"Duplicate web asset: {name}")
        seen.add(name.casefold())
        if require_files and not path.is_file():
            raise FileNotFoundError(path)
    if not bundle.entry.endswith(".html"):
        raise ValueError("Bundle entry must be an HTML file")
    if any(not name.endswith(".js") for name in bundle.scripts):
        raise ValueError("Bundle scripts must be JavaScript files")
    if any(not name.endswith(".css") for name in bundle.styles):
        raise ValueError("Bundle styles must be CSS files")
    if any(Path(name).suffix not in {".svg", ".png", ".json", ".wav", ".js"} for name in bundle.assets):
        raise ValueError("Unsupported bundle asset type")
    return bundle


def load_web_manifest(path: Path, *, web_root: Path = WEB_ROOT,
                      require_files: bool = False) -> WebBundle:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return validate_manifest(data, web_root=web_root, require_files=require_files)


def load_merge_manifest(path: Path = MERGE_MANIFEST, *, web_root: Path = WEB_ROOT,
                        require_files: bool = False) -> WebBundle:
    return load_web_manifest(path, web_root=web_root, require_files=require_files)


def load_slide_manifest(*, web_root: Path = WEB_ROOT,
                        require_files: bool = False) -> WebBundle:
    return load_web_manifest(SLIDE_MANIFEST, web_root=web_root, require_files=require_files)


class _EntryResources(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts: list[str] = []
        self.styles: list[str] = []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == "script":
            self.scripts.append(self._reference(attributes.get("src")))
        if tag == "link" and attributes.get("rel") == "stylesheet":
            self.styles.append(self._reference(attributes.get("href")))

    @staticmethod
    def _reference(value):
        if not isinstance(value, str) or not value.startswith("./"):
            raise ValueError("Bundle HTML must use local relative resources")
        return value[2:]


def validate_entry_html(bundle: WebBundle, source: str) -> None:
    """Keep static HTML loading order and portable resource references in sync."""
    resources = _EntryResources()
    resources.feed(source)
    if tuple(resources.scripts) != bundle.scripts or tuple(resources.styles) != bundle.styles:
        raise ValueError("Bundle HTML resources do not match the manifest")
