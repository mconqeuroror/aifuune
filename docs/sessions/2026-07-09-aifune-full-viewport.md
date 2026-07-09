# Session: 2026-07-09 — aifune (full viewport layout)

## User request

Make the site use the full viewport width and height. Stage first, then push.

## What changed

- **`src/index.css`** — `min-height: 100dvh` on `html`, `body`, `#root` (was `100vh` on body/root)
- **`src/pages/LanderPage.tsx`** — page shell `min-h-dvh w-full`; `main` `w-full`
- **`src/pages/LegalPage.tsx`**, **`src/pages/OlympicsPage.tsx`** — same full-viewport shells; main content `w-full` with padding
- **`src/components/Header.tsx`** — remove `max-w-6xl`; header bar spans full width with `px-4 lg:px-8`
- **`src/components/Footer.tsx`** — remove `max-w-5xl` grid cap; full-width footer grid
- **`src/components/sections/HeroAndProof.tsx`** — hero `100dvh` minus header; drop `max-w-3xl` wrapper; sections/proof collage `w-full`
- **`src/components/sections/BenefitsAndCapture.tsx`**, **`FounderStory.tsx`**, **`SocialProofWall.tsx`**, **`FAQSection.tsx`** — `w-full` section shells with responsive horizontal padding
- **`src/components/StickyCtaBar.tsx`** — sticky bar inner `w-full max-w-3xl`

## Why

Landing page felt boxed on wide screens; hero and page shells should fill the device viewport (dynamic viewport height on mobile, full width with edge padding only).

## Gotchas

- FAQ/email forms keep inner `max-w-*` for readable line length — only page shells and content sections went full width
- Legal prose still wrapped in `max-w-3xl` inner container for readability
