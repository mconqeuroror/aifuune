import re, base64
from pathlib import Path

HTML = Path(r"c:\Users\Martin\Downloads\AI Fuňe (7_9_2026 9：19：17 AM).html")
OUT = Path(r"c:\Users\Martin\Desktop\aifune\public\images")
OUT.mkdir(parents=True, exist_ok=True)
text = HTML.read_text(encoding="utf-8", errors="ignore")

# Find ALL base64 image data in file
all_b64 = list(re.finditer(r"data:image/(\w+);base64,([A-Za-z0-9+/=]{200,})", text))
print("total base64 images:", len(all_b64))

seen_hashes = set()
for i, m in enumerate(all_b64):
    ext, b64 = m.group(1), m.group(2)
    if ext == "jpeg":
        ext = "jpg"
    h = hash(b64[:100])
    if h in seen_hashes:
        continue
    seen_hashes.add(h)
    try:
        pad = "=" * ((4 - len(b64) % 4) % 4)
        data = base64.b64decode(b64 + pad)
        fname = f"all-b64-{i}.{ext}"
        (OUT / fname).write_bytes(data)
        print(f"{fname}: {len(data)} bytes")
    except Exception as e:
        print(f"fail {i}: {e}")

print("unique:", len(seen_hashes))
