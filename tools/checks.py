"""Run the same dependency-free project checks locally and in CI."""

from __future__ import annotations

import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def run(label: str, command: list[str]) -> None:
    print(f"\n{label}", flush=True)
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> int:
    node = shutil.which(os.environ.get("NODE_BINARY", "node"))
    if not node:
        print("Node.js 24 is required for development checks.", file=sys.stderr)
        return 1
    try:
        run("Python rules, HTTP and export tests",
            [sys.executable, "-m", "unittest", "discover", "-s", "tests", "-v"])
        print("\nBrowser JavaScript syntax", flush=True)
        for script in sorted((ROOT / "web").rglob("*.js")):
            subprocess.run([node, "--check", str(script)], cwd=ROOT, check=True)
        test_files = [str(file.relative_to(ROOT)) for file in sorted((ROOT / "tests").glob("*.test.cjs"))]
        if not test_files:
            raise RuntimeError("No JavaScript test files found")
        run("All JavaScript tests",
            [node, "--test", "--test-isolation=none", *test_files])
        run("Exhaustive merge level validation", [node, "tools/validate_v03_levels.cjs"])
        run("Exhaustive slide level validation", [node, "tools/validate_v05_levels.cjs"])
        run("Standalone H5 export",
            [sys.executable, "tools/export_v03.py", "--output", ".local/h5-v04"])
        run("Standalone v0.5 H5 export",
            [sys.executable, "tools/export_v05.py", "--output", ".local/h5-v05"])
        run("Whitespace check", ["git", "diff", "--check"])
    except (OSError, subprocess.CalledProcessError, RuntimeError) as error:
        print(f"\nChecks failed: {error}", file=sys.stderr)
        return 1
    print("\nAll checks passed.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
