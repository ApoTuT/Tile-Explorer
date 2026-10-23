"""Export the manifest-validated v0.6 static bundle."""
import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from tile_explorer.assets import load_web_manifest
from tile_explorer.export import export_bundle


def export(output):
    return export_bundle(load_web_manifest(ROOT / 'config/slide-v06.json', require_files=True), output)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / '.local/h5-v06')
    args = parser.parse_args()
    print(f'Exported {len(export(args.output))} v0.6 files to {args.output}')
