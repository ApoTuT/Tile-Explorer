"""Export the current merge game as local, backend-free static H5 files."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tile_explorer.assets import load_merge_manifest
from tile_explorer.export import export_bundle

FILES = load_merge_manifest().files


def export(output: Path) -> list[Path]:
    bundle = load_merge_manifest(require_files=True)
    return export_bundle(bundle, output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / ".local" / "h5-v04")
    args = parser.parse_args()
    files = export(args.output)
    print(f"Exported {len(files)} files to {args.output.resolve()}")
