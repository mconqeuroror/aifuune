# Session: 2026-07-21 — aifune (hierarchy, hover gradients, copy polish)

## User request

Push pending UI polish: header rounding/translucency, Slovak Olympics “last updated”, remove purple FAQ/quote text, improve visual distinction of important parts, hover gradient fade-in on CTAs and Olympics badge.

## What changed

- **`src/index.css`** — header glass more translucent (`0.5` opacity, stronger blur); `.section-title` + violet tick; `.glass-cta` for conversion forms; `.btn-gradient` / `.badge-gradient-hover` fade-in overlay on hover; card-lift utilities retained
- **`src/components/Header.tsx`** — `rounded-b-[1.75rem]` scrolled glass; Olympics badge uses `badge-gradient-hover`, no outline
- **`src/components/ui/button.tsx`** — hover relies on gradient fade-in instead of brightness bump
- **`src/components/EmailCaptureForm.tsx`** — `glass-cta` on form shells
- **`src/components/sections/HeroAndProof.tsx`** — display h1; section title class; amber bonus callout
- **`src/components/sections/{BenefitsAndCapture,FAQSection,SocialProofWall}.tsx`** — section titles; social proof band darker with hairline borders
- **`src/components/ui/accordion.tsx`**, **`FounderStory.tsx`** — FAQ triggers + quote `text-foreground` (no purple body text)
- **`src/pages/OlympicsPage.tsx`**, **`src/lib/olympics-content.ts`** — “Posledná aktualizácia: pred 34 minútami”

## Why

Dark theme hierarchy was flat — CTAs, headings, and body text competed equally. Accent purple on FAQ questions/quotes looked wrong. Hover needed a clearer reactive cue. Olympics footer string needed Slovak.

## Gotchas

- `src/lib/olympics-content.json` scraper artifact — not committed
- Re-running `parse_olympics.py` may overwrite Slovak `OLYMPICS_LAST_UPDATED` back to English
