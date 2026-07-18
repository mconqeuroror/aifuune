# Session: 2026-07-18 — aifune (site-wide dark theme + polish + perf)

## User request

Black + dark purple restyle of Olympics, then whole site dark mode. Refine away "AI slop" look. Rounded header/footer, gradient footer + buttons, hover micro-interactions. Then fix audit items (theme-color, dark legal pages, canvas perf, reduced motion, contrast, badge outline) — email form wiring and Discord metric deferred.

## What changed

### Theme
- **`src/index.css`** — `.lander-theme`: near-black neutral base (`#08060d`) with single purple radial light source; film-grain overlay (SVG turbulence, 5%) on both dark themes; neutral white-alpha glass; violet only as accent. `.olympics-theme` same discipline. `.btn-gradient` utility (color-mix vertical gradient off `--color-accent`); `.card-lift` hover helper; violet `::selection`
- **`src/pages/LanderPage.tsx`**, **`src/pages/LegalPage.tsx`** — `lander-theme` wrapper, `darkHeader`; `AmbientBlobs` removed (component deleted)
- **`src/pages/OlympicsPage.tsx`** — EvilEye dimmed (`#6d28d9`, intensity 0.85) + vignette/scrim overlays; neutral rows; medal colors kept
- **`src/components/LegalDocumentContent.tsx`** — hardcoded black borders → `border-border` vars

### Chrome & interactions
- **`src/components/ui/button.tsx`** — default variant: gradient bg, inset top light, hover lift + glow, active press; ghost hover theme-aware (`bg-foreground/8`)
- **`src/components/Header.tsx`** — `darkHeader` prop (`olympicsDark` kept as deprecated alias); `rounded-b-3xl` scrolled glass; logo `invert` on dark; Olympics badge border removed (`border-transparent`)
- **`src/components/Footer.tsx`** — rounded top corners, purple radial glow, hairline violet seam, dark always (own light text)
- **`src/components/StickyCtaBar.tsx`** — `rounded-t-3xl`
- **`src/components/CookieConsent.tsx`** — single dark style (site fully dark), violet accent via local `--color-accent` override
- Cards (benefits, proof slider, social wall, Olympics rows) — hover lift transitions

### Perf & a11y
- **`src/components/ShapeGrid.tsx`**, **`src/components/EvilEye.tsx`** — rAF loops pause via IntersectionObserver + `visibilitychange`; `prefers-reduced-motion` renders one static frame, no loop
- **`src/App.tsx`** — `MotionConfig reducedMotion="user"` wraps routes
- **`index.html`**, **`src/lib/seo-config.ts`** — `theme-color` `#0ea5b5` → `#08060d`
- Contrast bumps: footer copyright + Olympics "last updated" zinc-500 → zinc-400; consent fine print `text-muted/70` → `text-muted`
- **`src/components/ScrollCaptureModal.tsx`** — close button hover visible on dark

## Why

Client wanted black/purple brand direction; initial pass looked generically AI-generated (purple wash on everything). Reworked to neutral base + intentional accents + grain. Perf: two always-on canvases wasted CPU/GPU on phones. Deferred: real ESP integration for the email form, Discord member metric.

## Gotchas

- `FAQPage` JSON-LD already existed in `seo-config.ts` — no work needed
- WebP conversion skipped deliberately: images flow through blob-upload + manifest scripts; converting formats touches that pipeline
- Logo asset is light-theme; CSS `invert` used on dark surfaces rather than a new asset
- `src/lib/olympics-content.json` remains untracked scraper output
