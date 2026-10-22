"""Export the current merge game as local, backend-free static H5 files."""
from __future__ import annotations

import argparse
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tile_explorer.assets import load_merge_manifest, local_web_path, validate_entry_html

FILES = load_merge_manifest().files


def export(output: Path) -> list[Path]:
    output = output.resolve()
    bundle = load_merge_manifest(require_files=True)
    validate_entry_html(bundle, local_web_path(bundle.entry).read_text(encoding="utf-8"))
    # Copy an explicit manifest only; never recursively clear an existing directory.
    if output == ROOT or output.is_relative_to(ROOT / "web"):
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


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / ".local" / "h5-v04")
    args = parser.parse_args()
    files = export(args.output)
    print(f"Exported {len(files)} files to {args.output.resolve()}")
