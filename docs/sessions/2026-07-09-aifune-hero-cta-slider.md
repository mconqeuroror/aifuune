# Session: 2026-07-09 — aifune (hero CTA stack + proof slider)

## User request

Hero h1 full width; email form and bonus text constrained max-width with bonus 15% narrower than form for stacked layout. Member results grid too stretched on large viewports — add more cards and make a draggable slider. Push.

## What changed

- **`src/components/sections/HeroAndProof.tsx`** — h1/subheading `w-full`; form+bonus in `max-w-xl` stack; bonus `w-[85%]`; replace `MemberResultsGrid` with `MemberResultsSlider` (pointer-drag, fixed card widths, snap scroll)
- **`src/lib/content.ts`** — expand `HERO_PROOF_CARDS` from 3 to 8 proof screenshots

## Why

Full-viewport hero headline with readable constrained CTA column; proof cards should not stretch on wide screens — horizontal slider shows more results without blowing up card aspect ratio.

## Gotchas

- Slider uses pointer capture for drag; `draggable={false}` on imgs prevents native image drag fighting scroll
- Member results section shares `max-w-xl` with hero form for vertical alignment
