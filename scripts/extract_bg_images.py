"""Extract CSS background images (--sf-img-N) from saved HTML."""
import re, base64, json
from pathlib import Path

HTML = Path(r"c:\Users\Martin\Downloads\AI Fuňe (7_9_2026 9：19：17 AM).html")
OUT = Path(r"c:\Users\Martin\Desktop\aifune\public\images")
OUT.mkdir(parents=True, exist_ok=True)
text = HTML.read_text(encoding="utf-8", errors="ignore")

# CSS variables may use escaped quotes
patterns = [
    r"--sf-img-(\d+):url\(([^)]+)\)",
    r"--sf-img-(\d+):url\(&quot;(data:image[^&]+)&quot;\)",
]

saved = {}
for pat in patterns:
    for m in re.finditer(pat, text):
        idx, url = m.group(1), m.group(2)
        url = url.replace("&quot;", "").strip('"\'')
        if "base64," not in url:
            continue
        b64 = url.split("base64,", 1)[1]
        fmt_m = re.search(r"data:image/(\w+)", url)
        ext = fmt_m.group(1) if fmt_m else "png"
        if ext == "jpeg":
            ext = "jpg"
        try:
            pad = "=" * ((4 - len(b64) % 4) % 4)
            data = base64.b64decode(b64 + pad)
            fname = f"sf-img-{idx}.{ext}"
            (OUT / fname).write_bytes(data)
            saved[idx] = f"/images/{fname}"
        except Exception:
            pass

# Also search for background-image:var(--sf-img-N) and map usage
root_m = re.search(r'<div id=root>(.*?)</div>\s*<div style=all:initial', text, re.DOTALL)
root = root_m.group(1) if root_m else ""

# Find all img tags with style background-image var
bg_imgs = []
for m in re.finditer(
    r'<img[^>]*alt="([^"]*)"[^>]*style="[^"]*--sf-img-(\d+)[^"]*"[^>]*>',
    root,
):
    bg_imgs.append({"alt": m.group(1), "var": m.group(2), "path": saved.get(m.group(2))})

# Broader search for sf-img in style attrs
for m in re.finditer(r'alt="([^"]*)"[^>]*background-image:var\(--sf-img-(\d+)\)', root):
    alt, var = m.group(1), m.group(2)
    if not any(x["alt"] == alt for x in bg_imgs):
        bg_imgs.append({"alt": alt, "var": var, "path": saved.get(var)})

# Raw search for --sf-img in entire html outside url()
all_vars = sorted(set(re.findall(r"--sf-img-(\d+)", text)))
print("all vars referenced:", all_vars)
print("saved:", saved)
print("bg_imgs:", len(bg_imgs))
for b in bg_imgs:
    print(b)

# Try extracting from style block differently - split by --sf-img
style_m = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
if style_m:
    style = style_m.group(1)
    chunks = re.split(r"(--sf-img-\d+:)", style)
    print("style chunks with sf-img:", len([c for c in chunks if c.startswith("--sf-img")]))
    # find base64 in style
    b64_chunks = re.findall(r"data:image/[^;]+;base64,[A-Za-z0-9+/=]{100,}", style)
    print("base64 chunks in style:", len(b64_chunks))
    for i, chunk in enumerate(b64_chunks[:10]):
        fmt_m = re.search(r"data:image/(\w+)", chunk)
        ext = fmt_m.group(1) if fmt_m else "png"
        b64 = chunk.split("base64,", 1)[1]
        try:
            pad = "=" * ((4 - len(b64) % 4) % 4)
            data = base64.b64decode(b64 + pad)
            fname = f"style-b64-{i}.{ext}"
            (OUT / fname).write_bytes(data)
            print(f"saved style {fname} {len(data)}")
        except Exception as e:
            print(f"fail {i}: {e}")

Path(r"c:\Users\Martin\Desktop\aifune\bg-images.json").write_text(
    json.dumps({"saved": saved, "bg_imgs": bg_imgs}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
