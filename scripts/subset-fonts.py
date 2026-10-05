"""Trim the site's variable fonts so less has to download before the first screen renders.

Bricolage Grotesque (display): keeps the variable optical-size axis, so headlines render exactly as
before, but pins the weight at 800, the weight every display style uses.
Instrument Sans (body): one variable file for weights 400 to 700, replacing four static files.
Instrument Serif Italic (accent): static, only trimmed to the characters the site uses.

Each font is cut to the characters the site uses, plus a tiny separate file for the rupee sign
(it lives in the latin-ext range, which would otherwise pull in a whole extra file).

Sources: node_modules/@fontsource-variable/{bricolage-grotesque,instrument-sans} and
node_modules/@fontsource/instrument-serif (dev dependencies).
Needs fonttools and brotli:  python3 -m venv .venv && .venv/bin/pip install fonttools brotli
Run:                         .venv/bin/python scripts/subset-fonts.py
"""

from __future__ import annotations

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
NODE = ROOT / 'node_modules'
OUT_DIR = ROOT / 'public/fonts'

UNICODES = (
    list(range(0x20, 0x7F))  # Basic Latin
    + list(range(0xA0, 0x100))  # Latin-1 (©, ×, accented letters)
    + [0x2013, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022, 0x2026, 0x2032, 0x2033]
    + [0x20AC, 0x2122, 0x2190, 0x2191, 0x2192, 0x2193, 0x2212]  # euro, trademark, arrows
)
RUPEE = [0x20B9]

# (source file, axis limits, characters, output name)
JOBS = [
    ('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2', {'wght': 800}, UNICODES, 'bricolage-grotesque-subset.woff2'),
    ('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-ext-opsz-normal.woff2', {'wght': 800}, RUPEE, 'bricolage-grotesque-rupee.woff2'),
    ('@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2', {'wght': (400, 700)}, UNICODES, 'instrument-sans-subset.woff2'),
    ('@fontsource-variable/instrument-sans/files/instrument-sans-latin-ext-wght-normal.woff2', {'wght': (400, 700)}, RUPEE, 'instrument-sans-rupee.woff2'),
    ('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', None, UNICODES, 'instrument-serif-italic-subset.woff2'),
]


def trimmed(path: Path, limits: dict | None, unicodes: list[int]) -> TTFont:
    font = TTFont(path)
    if limits:  # variable fonts only
        font = instancer.instantiateVariableFont(font, limits)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']  # keep kerning, ligatures and alternates
    options.name_IDs = ['*']
    options.notdef_outline = True
    sub = subset.Subsetter(options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    return font


def main() -> None:
    for src, limits, unicodes, name in JOBS:
        path = NODE / src
        out = OUT_DIR / name
        font = trimmed(path, limits, unicodes)
        font.flavor = 'woff2'
        font.save(out)
        print(f'{out.relative_to(ROOT)}: {out.stat().st_size / 1024:.1f} KB (from {path.stat().st_size / 1024:.1f} KB)')


if __name__ == '__main__':
    main()
