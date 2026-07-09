"""Extract structured content and images from saved HTML."""
import re
import json
import base64
from pathlib import Path

HTML_PATH = Path(r"c:\Users\Martin\Downloads\AI Fuňe (7_9_2026 9：19：17 AM).html")
OUT_DIR = Path(r"c:\Users\Martin\Desktop\aifune")
IMG_DIR = OUT_DIR / "public" / "images"
IMG_DIR.mkdir(parents=True, exist_ok=True)

text = HTML_PATH.read_text(encoding="utf-8", errors="ignore")

# Extract CSS --sf-img-N variables (base64 images)
css_match = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
css = css_match.group(1) if css_match else ""
img_vars = {}
for m in re.finditer(
    r"--sf-img-(\d+):url\((?:&quot;|\"|')?(data:image/([^;]+);base64,([^\"')&]+))",
    css,
):
    idx, data_url, fmt, b64 = m.group(1), m.group(2), m.group(3), m.group(4)
    b64 = b64.replace("&quot;", "").replace("\\", "")
    ext = "png" if "png" in fmt else "jpg" if "jpeg" in fmt or "jpg" in fmt else "webp" if "webp" in fmt else "png"
    fname = f"sf-img-{idx}.{ext}"
    try:
        raw = base64.b64decode(b64 + "==="[: (4 - len(b64) % 4) % 4])
        (IMG_DIR / fname).write_bytes(raw)
        img_vars[idx] = f"/images/{fname}"
        print(f"saved {fname} ({len(raw)} bytes)")
    except Exception as e:
        print(f"fail {idx}: {e}")

# Extract root HTML
root_m = re.search(r'<div id=root>(.*?)</div>\s*<div style=all:initial', text, re.DOTALL)
if not root_m:
    root_m = re.search(r"<div id=root>(.*)", text, re.DOTALL)
root = root_m.group(1) if root_m else ""

# Strip tags helper
def strip_tags(s):
    s = re.sub(r"<br\s*/?>", "\n", s)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", s).strip()

# Benefit items - look for grid card patterns
benefit_titles = [
    "Prečo sú AI Fuňe TOP biznis roku 2026",
    "Ako som sa k tomu dostal",
    "Základy toho ako vytvoriť vlastnú Fuňu a ako s ňou začať zarábať peniaze",
    "Programy ktoré potrebuješ na tvorbu modelky",
    "Ako robiť marketing",
    "Kde a ako vlastne zarobíš pomocou Fuňí peniaze",
    "Ako ti dokážem pomôcť ja a moja komunita",
]

# FAQ pairs from known copy
faq = [
    ("Je to legálne?", "Áno. Žiadne shady veci, ľudia vedia presne začo si platia a sú ochotní su zato platiť (hej, ani ja tomu nechapem ale je to tak)"),
    ("Nie je už neskoro?", "Práve naopak, nikdy nebol vhodnejší čas ako práve teraz, vysvetlím: AI Modelky ešte len teraz začínajú byť na takej úrovni že už je nemožné ich rozoznať od reality a tým pádom je tu stále viac než dostatok miesta pre poriadný zárobok. Trh je akurát tak presaturovaný nekvalitnými sračkami...Dobrých modeliek je málo, ja ti ukážem ako práve takú spraviť a preto to treba využiť."),
    ("Čo všetko sa naučíš?", "V skratke: úplne všetko čo potrebuješ nato aby si sa dostal na čísla ako ja. Vo videu to máš ale vysvetlené podrobne a do detailov."),
    ("Zarobím na 100%?", "Nie som veštec. Ak nemakáš, nezarobíš, tak ako pri všetkom toto nie je nejaká magická forma zárobku ale je to určite jedna z NAJĽAHŠÍCH príležitostí zatiaľ. Ak makáš a si konzistentný, šanca je veľmi slušná."),
    ("Ako dlho kým zarobím svoje prvé €?", "Mne to trvalo presne týždeň a zarobil som celých 35€, to som ale nevedel kde začať a ani ako správne založiť modelke Instagram. Teraz, podľa môjho overeného postupu máme ľudí ktorí za prvé 2 týždne zarobili 1600€ takže je to individuálne a záleží to len na tom ako silno budeš makať."),
    ("Dá sa to robiť aj popri škole alebo práci?", "Áno. Máme kopec ľudí ktorí majú rodiny, deti, sú študenti alebo pracujú a práve preto je tento model zaujímavý, lebo ho vieš ho rozbiehať aj popri bežnom živote bez toho, aby si na to potreboval celý deň. 2 poriadne hodiny denne ti úplne stačia."),
]

# Find social proof section - extract img references with sf-img vars used
proof_imgs = []
for m in re.finditer(
    r'<img[^>]*alt="([^"]*)"[^>]*background-image:var\(--sf-img-(\d+)\)',
    root,
):
    proof_imgs.append({"alt": m.group(1), "var": m.group(2), "path": img_vars.get(m.group(2))})

# Also find inline img src data urls in proof section
for m in re.finditer(r'<img[^>]*alt="([^"]*)"[^>]*src="(data:image[^"]+)"', root):
    alt, src = m.group(1), m.group(2)
    if len(proof_imgs) < 30:
        proof_imgs.append({"alt": alt, "inline": True})

# Extract earnings dashboard text from proof collage
earnings_card = {}
if "Earnings" in root or "earnings" in root.lower():
    earnings_card["found"] = True

# Count sf-img usage in root
var_usage = {}
for m in re.finditer(r"--sf-img-(\d+)", root):
    v = m.group(1)
    var_usage[v] = var_usage.get(v, 0) + 1

data = {
    "img_vars": img_vars,
    "var_usage": var_usage,
    "benefit_titles": benefit_titles,
    "faq": faq,
    "proof_imgs": proof_imgs[:25],
    "img_count": len(re.findall(r"<img ", root)),
}

(OUT_DIR / "content.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({k: v for k, v in data.items() if k != "proof_imgs"}, ensure_ascii=False, indent=2))
print("proof_imgs", len(proof_imgs))
