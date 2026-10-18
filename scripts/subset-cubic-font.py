"""Subset the Cubic 11 pixel font to the characters the site actually uses.

Usage (needs `pip install fonttools brotli`):
    python3 scripts/subset-cubic-font.py path/to/Cubic_11.woff2

Source font: https://github.com/ACh-K/Cubic-11 (v1.500, fonts/web/Cubic_11.woff2), SIL OFL 1.1.
Re-run after adding text in a new script or many new CJK characters; missing glyphs fall back to the body font.
"""
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts" / "cubic-11-subset.woff2"


def strings(node):
    if isinstance(node, dict):
        for v in node.values():
            yield from strings(v)
    elif isinstance(node, list):
        for v in node:
            yield from strings(v)
    elif isinstance(node, str):
        yield node


def main(src: str) -> None:
    chars = set(chr(c) for c in range(0x20, 0x7F))
    chars |= set("·→←✕☼☾›＋…，。、：；！？「」（）『』—–’“”")
    for loc in (ROOT / "i18n" / "locales").glob("*.json"):
        for s in strings(json.loads(loc.read_text(encoding="utf-8"))):
            chars |= set(s)
    text = "".join(sorted(chars))
    subprocess.run(
        [sys.executable, "-m", "fontTools.subset", src, f"--text={text}", "--flavor=woff2", f"--output-file={OUT}", "--layout-features=*"],
        check=True,
    )
    print(f"{OUT.relative_to(ROOT)}: {OUT.stat().st_size // 1024} KB, {len(chars)} characters")


if __name__ == "__main__":
    main(sys.argv[1])
