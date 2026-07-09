import re
import json
import base64
from pathlib import Path

downloads = Path(r"c:\Users\Martin\Downloads")
html_path = list(downloads.glob("*Olympics*.html"))[0]
text = html_path.read_text(encoding="utf-8", errors="ignore")
root_m = re.search(r"<div id=app[^>]*>(.*?)</div>\s*<div style=all:initial", text, re.DOTALL)
if not root_m:
    root_m = re.search(r"<div id=root>(.*?)</div>\s*<div style=all:initial", text, re.DOTALL)
root = root_m.group(1) if root_m else text

# Extract lb-row blocks
rows = re.findall(
    r'<div class="lb-row ([^"]*)">(.*?)</div>\s*<div class="lb-row|</div>\s*</div>\s*<aside|</div>\s*</div>\s*<div class="june',
    root,
    re.DOTALL,
)
if not rows:
    rows = re.findall(r'<div class="lb-row ([^"]*)">(.*?)</div>', root, re.DOTALL)

parsed_rows = []
for medal_class, block in rows:
    name_m = re.search(r'class=name-text>([^<]+)<', block)
    perf_m = re.search(r'class=performance>([^<]+)<', block)
    place_m = re.search(r'class=place-badge[^>]*>([^<]+)<', block)
    rank_m = re.search(r'class="rank-number[^"]*">(\d+)<', block)
    # avatar from inline base64 or background
    avatar_b64 = re.search(r"url\(data:image/[^;]+;base64,([^)]+)\)", block)
    parsed_rows.append({
        "medal": medal_class.strip(),
        "rank": int(rank_m.group(1)) if rank_m else None,
        "name": name_m.group(1).strip() if name_m else "",
        "performance": perf_m.group(1).strip() if perf_m else "",
        "place": place_m.group(1).strip() if place_m else "",
        "has_avatar": bool(avatar_b64),
    })

# June top 3
june_block = re.search(r'class=june-top3[^>]*>(.*?)</aside>|class="june-top3[^>]*>(.*?)</div>\s*</div>\s*<aside', root, re.DOTALL)
june = []
if june_block:
    jb = june_block.group(1) or june_block.group(2) or ""
    for m in re.finditer(r'class=june-name>([^<]+)</span>.*?class=june-amount>([^<]+)<', jb, re.DOTALL):
        june.append({"name": m.group(1).strip(), "amount": m.group(2).strip()})

# Hall of fame
hof = []
hof_block = re.search(r'class=hall-of-fame[^>]*>(.*?)</aside>', root, re.DOTALL)
if hof_block:
    for m in re.finditer(r'class=hof-name>([^<]+)</span>.*?class=hof-wins>([^<]+)<', hof_block.group(1), re.DOTALL):
        hof.append({"name": m.group(1).strip(), "wins": m.group(2).strip()})

last_updated = re.search(r'Last updated:\s*([^<]+)', root)
subtitle = re.search(r'class=subtitle[^>]*>([^<]+)<', root)

# Save all inline avatars in order
out_dir = Path(r"c:\Users\Martin\Desktop\aifune\public\images\olympics\avatars")
out_dir.mkdir(parents=True, exist_ok=True)
avatars = []
for i, m in enumerate(re.finditer(r"url\(data:image/(\w+);base64,([^)]+)\)", root)):
    ext, b64 = m.group(1), m.group(2)
    if ext == "jpeg":
        ext = "jpg"
    try:
        pad = "=" * ((4 - len(b64) % 4) % 4)
        data = base64.b64decode(b64 + pad)
        fname = f"avatar-{i}.{ext if ext != 'webp' else 'webp'}"
        (out_dir / fname).write_bytes(data)
        avatars.append(f"/images/olympics/avatars/{fname}")
    except Exception:
        pass

# assign avatars to rows in order (first N for leaderboard)
for i, row in enumerate(parsed_rows):
    if i < len(avatars):
        row["avatar"] = avatars[i]

data = {
    "title": "AI Fuňe Olympics",
    "month": subtitle.group(1).strip() if subtitle else "July 2026 Leaderboard",
    "lastUpdated": last_updated.group(1).strip() if last_updated else "34 minutes ago",
    "leaderboard": parsed_rows,
    "juneTop3": june,
    "hallOfFame": hof,
    "avatars": avatars,
}

Path(r"c:\Users\Martin\Desktop\aifune\src\lib\olympics-content.json").write_text(
    json.dumps(data, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

# also write ts content file
ts_lines = [
    'export type LeaderboardEntry = {',
    '  rank: number;',
    '  name: string;',
    '  performance: string;',
    '  place: string;',
    '  medal: "gold" | "silver" | "bronze" | "";',
    '  avatar?: string;',
    '};',
    '',
    f'export const OLYMPICS_MONTH = "{data["month"]}";',
    f'export const OLYMPICS_LAST_UPDATED = "{data["lastUpdated"]}";',
    '',
    'export const JULY_LEADERBOARD: LeaderboardEntry[] = ' + json.dumps(
        [
            {
                "rank": r.get("rank") or i + 1,
                "name": r["name"],
                "performance": r["performance"],
                "place": r["place"],
                "medal": (
                    "gold" if "gold" in r["medal"]
                    else "silver" if "silver" in r["medal"]
                    else "bronze" if "bronze" in r["medal"]
                    else ""
                ),
                "avatar": r.get("avatar"),
            }
            for i, r in enumerate(parsed_rows)
        ],
        ensure_ascii=False,
        indent=2,
    ) + ";",
    '',
    'export const JUNE_TOP_3 = ' + json.dumps(june, ensure_ascii=False, indent=2) + ";",
    '',
    'export const HALL_OF_FAME = ' + json.dumps(
        [{"name": h["name"], "wins": h["wins"]} for h in hof],
        ensure_ascii=False,
        indent=2,
    ) + ";",
]

Path(r"c:\Users\Martin\Desktop\aifune\src\lib\olympics-content.ts").write_text(
    "\n".join(ts_lines),
    encoding="utf-8",
)

Path(r"c:\Users\Martin\Desktop\aifune\olympics-parsed-log.txt").write_text(
    json.dumps(data, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
