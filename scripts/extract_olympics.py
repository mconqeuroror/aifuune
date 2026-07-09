import re
import html as htmlmod
from pathlib import Path

downloads = Path(r"c:\Users\Martin\Downloads")
files = list(downloads.glob("*Olympics*.html"))
if not files:
    raise SystemExit("No Olympics HTML found")
html_path = files[0]
text = html_path.read_text(encoding="utf-8", errors="ignore")
log = [f"Using: {html_path.name}"]

root_m = re.search(r"<div id=root>(.*?)</div>\s*<div style=all:initial", text, re.DOTALL)
root = root_m.group(1) if root_m else text

content = re.sub(r"<style[^>]*>.*?</style>", "", root, flags=re.DOTALL)
content = re.sub(r"<script[^>]*>.*?</script>", "", content, flags=re.DOTALL)
content = re.sub(r"<br\s*/?>", "\n", content)
content = re.sub(r"</(h[1-6]|p|div|li|section|tr|td|th|span)>", "\n", content)
content = re.sub(r"<[^>]+>", " ", content)
content = htmlmod.unescape(content)
lines = [
    ln.strip()
    for ln in content.split("\n")
    if ln.strip()
    and len(ln.strip()) > 2
    and "background-" not in ln
    and not ln.startswith("style=")
]

out = Path(r"c:\Users\Martin\Desktop\aifune\olympics-copy.txt")
out.write_text("\n".join(lines), encoding="utf-8")
log.append(f"lines: {len(lines)}")

# headings
for pat, name in [(r"<h1[^>]*>(.*?)</h1>", "h1"), (r"<h2[^>]*>(.*?)</h2>", "h2"), (r"<h3[^>]*>(.*?)</h3>", "h3")]:
    ms = re.findall(pat, root, re.I | re.DOTALL)
    if ms:
        log.append(f"\n=== {name} ===")
        for m in ms[:10]:
            log.append(re.sub(r"<[^>]+>", "", htmlmod.unescape(m)).strip()[:200])

# table-like / leaderboard data
for term in ["leaderboard", "rank", "olympic", "medail", "bod", "€", "$", "top", "1.", "2.", "3."]:
    matches = [ln for ln in lines if term.lower() in ln.lower()]
    if matches:
        log.append(f"\n--- {term} ({len(matches)}) ---")
        for m in matches[:5]:
            log.append(m[:200])

# images
imgs = re.findall(r'alt="([^"]*)"', root)
log.append(f"\nimg alts: {len(imgs)}")
for a in imgs[:30]:
    log.append(f"  {a}")

# extract base64 images
all_b64 = list(re.finditer(r"data:image/(\w+);base64,([A-Za-z0-9+/=]{200,})", text))
log.append(f"b64 images: {len(all_b64)}")
out_dir = Path(r"c:\Users\Martin\Desktop\aifune\public\images\olympics")
out_dir.mkdir(parents=True, exist_ok=True)
import base64

seen = set()
for i, m in enumerate(all_b64):
    ext, b64 = m.group(1), m.group(2)
    h = hash(b64[:100])
    if h in seen:
        continue
    seen.add(h)
    if ext == "jpeg":
        ext = "jpg"
    try:
        pad = "=" * ((4 - len(b64) % 4) % 4)
        data = base64.b64decode(b64 + pad)
        fname = f"olympics-{i}.{ext}"
        (out_dir / fname).write_bytes(data)
        log.append(f"saved {fname} {len(data)}")
    except Exception as e:
        log.append(f"fail {i}: {e}")

Path(r"c:\Users\Martin\Desktop\aifune\olympics-extract-log.txt").write_text("\n".join(log), encoding="utf-8")
