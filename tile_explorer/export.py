"""Export an explicit browser bundle without removing existing output files."""
from __future__ import annotations

from pathlib import Path
import shutil

from .assets import ROOT, WEB_ROOT, WebBundle, local_web_path, validate_entry_html


def export_bundle(bundle: WebBundle, output: Path) -> list[Path]:
    output = Path(output).resolve()
    validate_entry_html(bundle, local_web_path(bundle.entry).read_text(encoding="utf-8"))
    if output == ROOT or output.is_relative_to(WEB_ROOT):
        raise ValueError("Choose a dedicated export directory outside web/")
    sources = [(local_web_path(name), output / ("index.html" if name == bundle.entry else name))
               for name in bundle.files]
    for source, target in sources:
        if not source.is_file():
            raise FileNotFoundError(source)
        if target.is_symlink() or not target.resolve().is_relative_to(output):
            raise ValueError("Export target escapes output directory")
    for source, target in sources:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    return [target for _, target in sources]
