import re
import json
import base64
from pathlib import Path

text = list(Path(r"c:\Users\Martin\Downloads").glob("*Olympics*.html"))[0].read_text(
    encoding="utf-8", errors="ignore"
)

# Split lb-row blocks
blocks = re.split(r'<div class="lb-row ([^"]*)">', text)
rows = []
for i in range(1, len(blocks), 2):
    medal = blocks[i]
    body = blocks[i + 1][:3000]
    texts = [
        t.strip()
        for t in re.findall(r">([^<]{1,40})<", body)
        if t.strip() and not t.strip().startswith("http") and "emoji" not in t
    ]
    # filter noise
    clean = []
    for t in texts:
        if t in {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10"}:
            continue
        if len(t) <= 30:
            clean.append(t)
    rank_m = re.search(r'class="rank-number[^"]*">(\d+)<', body)
    rows.append({"medal": medal, "rank": rank_m.group(1) if rank_m else None, "texts": clean[:8]})

# June top 3 - look for June Top 3 section
june_idx = text.find("June Top 3")
june_texts = []
if june_idx >= 0:
    chunk = text[june_idx : june_idx + 2000]
    june_texts = [
        t.strip()
        for t in re.findall(r">([^<$]{2,20})<", chunk)
        if t.strip() and t not in {"June Top 3", "🏆 Hall of Fame"}
    ]

# Hall of fame
hof = []
for m in re.finditer(r'class=hof-name>([^<]+)</span>.*?class=hof-wins>([^<]+)<', text, re.DOTALL):
    hof.append({"name": m.group(1).strip(), "wins": m.group(2).strip()})

# Extract webp avatars in document order from lb-row sections only
lb_section = text.split("leaderboard-wrapper")[1].split("june-top3")[0] if "june-top3" in text else text
avatars = []
out_dir = Path(r"c:\Users\Martin\Desktop\aifune\public\images\olympics\avatars")
out_dir.mkdir(parents=True, exist_ok=True)
for i, m in enumerate(re.finditer(r"data:image/webp;base64,([A-Za-z0-9+/=]+)", lb_section)):
    b64 = m.group(1)
    try:
        pad = "=" * ((4 - len(b64) % 4) % 4)
        data = base64.b64decode(b64 + pad)
        fname = f"lb-{i}.webp"
        (out_dir / fname).write_bytes(data)
        avatars.append(f"/images/olympics/avatars/{fname}")
    except Exception:
        pass

data = {"rows": rows[:12], "june_texts": june_texts[:10], "hof": hof, "avatars": avatars}
Path(r"c:\Users\Martin\Desktop\aifune\olympics-parsed2.txt").write_text(
    json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
)
