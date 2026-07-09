import re
import json
from pathlib import Path

downloads = Path(r"c:\Users\Martin\Downloads")
html_path = list(downloads.glob("*Olympics*.html"))[0]
text = html_path.read_text(encoding="utf-8", errors="ignore")
root_m = re.search(r"<div id=root>(.*?)</div>\s*<div style=all:initial", text, re.DOTALL)
root = root_m.group(1)

# extract img tags with alt and nearby context
imgs = []
for m in re.finditer(r"<img[^>]*>", root):
    tag = m.group(0)
    alt_m = re.search(r'alt="([^"]*)"', tag)
    var_m = re.search(r"--sf-img-(\d+)", tag)
    src_m = re.search(r'src="([^"]+)"', tag)
    imgs.append({
        "alt": alt_m.group(1) if alt_m else "",
        "var": var_m.group(1) if var_m else None,
        "has_inline": bool(src_m and "base64" in (src_m.group(1) if src_m else "")),
        "tag_start": m.start(),
    })

# extract table rows - look for patterns around names
for name in ["Lily", "Sandra", "Lara", "Cassie", "lilly", "Ella", "Nika", "sohee", "Riki", "Lena", "Aria", "Rebecca"]:
    idx = root.find(name)
    if idx >= 0:
        snippet = root[max(0, idx-200):idx+300]
        snippet_clean = re.sub(r"<[^>]+>", "|", snippet)
        print(name, ":", snippet_clean[:250])

print("\nimgs", json.dumps(imgs, ensure_ascii=False, indent=2))
