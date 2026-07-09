import re, base64, json
from pathlib import Path

HTML = Path(r"c:\Users\Martin\Downloads\AI Fuňe (7_9_2026 9：19：17 AM).html")
OUT = Path(r"c:\Users\Martin\Desktop\aifune\public\images")
OUT.mkdir(parents=True, exist_ok=True)
text = HTML.read_text(encoding="utf-8", errors="ignore")

# Find all --sf-img definitions
defs = list(re.finditer(r"--sf-img-(\d+):url\(([^)]+)\)", text))
print("defs found", len(defs))

saved = {}
for m in defs:
    idx = m.group(1)
    raw_url = m.group(2).replace("&quot;", '"').strip('"')
    if "base64," not in raw_url:
        print(f"skip {idx}: not base64")
        continue
    b64 = raw_url.split("base64,", 1)[1].strip('"\'')
    fmt_m = re.search(r"data:image/(\w+)", raw_url)
    ext = fmt_m.group(1) if fmt_m else "png"
    if ext == "jpeg":
        ext = "jpg"
    try:
        pad = "=" * ((4 - len(b64) % 4) % 4)
        data = base64.b64decode(b64 + pad)
        fname = f"sf-img-{idx}.{ext}"
        (OUT / fname).write_bytes(data)
        saved[idx] = f"/images/{fname}"
        print(f"ok {fname} {len(data)}")
    except Exception as e:
        print(f"err {idx}: {e}")

# Extract inline img base64 from root
root_m = re.search(r'<div id=root>(.*?)</div>\s*<div style=all:initial', text, re.DOTALL)
root = root_m.group(1) if root_m else ""
inline_imgs = []
for i, m in enumerate(re.finditer(r'<img[^>]*alt="([^"]*)"[^>]*>', root)):
    tag = m.group(0)
    alt = m.group(1)
    # get sf-img var or src
    var_m = re.search(r"--sf-img-(\d+)", tag)
    src_m = re.search(r'src="(data:image[^"]+)"', tag)
    entry = {"index": i, "alt": alt}
    if var_m:
        entry["var"] = var_m.group(1)
        entry["path"] = saved.get(var_m.group(1))
    elif src_m:
        src = src_m.group(1)
        if "base64," in src:
            b64 = src.split("base64,", 1)[1]
            fmt_m = re.search(r"data:image/(\w+)", src)
            ext = fmt_m.group(1) if fmt_m else "png"
            if ext == "jpeg":
                ext = "jpg"
            try:
                pad = "=" * ((4 - len(b64) % 4) % 4)
                data = base64.b64decode(b64 + pad)
                fname = f"inline-{i}-{alt.replace(' ', '-')[:20]}.{ext}"
                fname = re.sub(r'[^\w\-.]', '', fname)
                (OUT / fname).write_bytes(data)
                entry["path"] = f"/images/{fname}"
                print(f"inline {fname} {len(data)}")
            except Exception as e:
                entry["error"] = str(e)
    inline_imgs.append(entry)

# Search earnings-like strings near Výsledok
for pat in [r"Výsledok \d+", r"Earnings", r"\$[\d,]+", r"[\d.,]+\s*€", r"Fanvue", r"Discord", r"Total", r"Revenue"]:
    ms = re.findall(pat, root, re.I)
    if ms:
        print(pat, len(ms), ms[:5])

Path(r"c:\Users\Martin\Desktop\aifune\images-manifest.json").write_text(
    json.dumps({"saved": saved, "inline_imgs": inline_imgs}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print("total imgs", len(inline_imgs))
