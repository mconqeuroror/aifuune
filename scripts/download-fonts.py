"""Download DM Sans + Space Grotesk woff2 files for self-hosting."""
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS_DIR = ROOT / "public" / "fonts"
CSS_OUT = ROOT / "src" / "fonts.css"

CSS_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;"
    "0,9..40,700;0,9..40,800;1,9..40,400&"
    "family=Space+Grotesk:wght@500;600;700&display=swap"
)


def slug_unicode_range(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def main() -> None:
    FONTS_DIR.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        CSS_URL,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            )
        },
    )
    css = urllib.request.urlopen(req).read().decode("utf-8")

    blocks = re.split(r"@font-face\s*\{", css)[1:]
    font_css: list[tuple[str, str, str, str, str | None]] = []
    seen: set[str] = set()

    for block in blocks:
        family = re.search(r"font-family:\s*'([^']+)'", block)
        style = re.search(r"font-style:\s*(\w+)", block)
        weight = re.search(r"font-weight:\s*(\d+)", block)
        url = re.search(r"url\((https://[^)]+)\)", block)
        unicode_range = re.search(r"unicode-range:\s*([^;]+);", block)
        if not (family and url):
            continue

        fam_slug = family.group(1).lower().replace(" ", "-")
        sty = style.group(1) if style else "normal"
        wgt = weight.group(1) if weight else "400"
        range_slug = (
            slug_unicode_range(unicode_range.group(1))
            if unicode_range
            else "all"
        )
        fname = f"{fam_slug}-{wgt}-{sty}-{range_slug}.woff2"
        if fname in seen:
            continue
        seen.add(fname)

        data = urllib.request.urlopen(url.group(1)).read()
        (FONTS_DIR / fname).write_bytes(data)
        font_css.append(
            (
                family.group(1),
                sty,
                wgt,
                f"/fonts/{fname}",
                unicode_range.group(1).strip() if unicode_range else None,
            )
        )
        print(f"saved {fname} ({len(data)} bytes)")

    lines = []
    for family, sty, wgt, path, unicode_range in font_css:
        range_line = (
            f" unicode-range: {unicode_range};" if unicode_range else ""
        )
        lines.append(
            f"@font-face {{ font-family: '{family}'; font-style: {sty}; "
            f"font-weight: {wgt}; font-display: swap;{range_line} "
            f"src: url('{path}') format('woff2'); }}"
        )

    CSS_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {CSS_OUT}")


if __name__ == "__main__":
    main()
