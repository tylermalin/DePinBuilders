# Brand and Design System

The prototype (`/reference/prototype.html`) is the visual source of truth. This document extracts the tokens so they can be ported into Tailwind and shadcn/ui. The brand is deliberately distinct from Mālama Labs. Do not reuse Mālama's palette or type. The intended feel is a hi-vis builder spec sheet: warm paper, safety orange, ink, technical but warm.

## Fonts

Load with `next/font/google`. Self-hosted, no layout shift.

- **Display:** Bricolage Grotesque. Headings, hero, project names, section titles.
- **Body and UI:** Hanken Grotesk. Paragraphs, controls, navigation.
- **Mono:** JetBrains Mono. Data, labels, kickers, codes, metrics.

```ts
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
export const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
export const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
```

## Color tokens

Ship light and dark. Map these to CSS variables and reference them from Tailwind via `theme.extend.colors` using `rgb(var(--x) / <alpha-value>)` or direct hex tokens.

### Light (default)

```
--paper:      #F4F1EA   /* page background, warm off-white */
--surface:    #FFFFFF   /* cards */
--surface-2:  #EFEBE2   /* insets, secondary fills */
--ink:        #16171B   /* primary text, borders, the workhorse */
--ink-soft:   #3A3D44
--muted:      #65686F
--line:       rgba(22,23,27,0.13)
--orange:     #FF4D17   /* primary accent, the brand color */
--orange-ink: #C5380E   /* orange text on light backgrounds, accessible */
--orange-soft:#FFE7DE
--yellow:     #E6FF3A   /* hi-vis highlight, use sparingly as a marker only */
--blue:       #1B3FE0   /* optional data/link accent */
--good:       #0E8A4A
--bad:        #D23A2E
```

### Dark

```
--paper:      #0E0F12
--surface:    #16181D
--surface-2:  #1C1F26
--ink:        #F2F0EA
--ink-soft:   #CDD0D6
--muted:      #9A9EA8
--line:       rgba(242,240,234,0.12)
--orange:     #FF5E2E
--orange-ink: #FF7A4F
--orange-soft:#2A1810
--yellow:     #D8F000
--good:       #34D39A
--bad:        #FF6B5E
```

### Color usage rules

- Orange is the dominant accent. Use it for primary actions, active states, key metrics, and verified emphasis. Do not flood the page with it.
- Ink is the structural workhorse: text, borders, the hard 2px frames on hero spec cards and CTA bands.
- Hi-vis yellow is a highlight marker only. Use it behind ink text (the `.hl` highlighter style) and for live or new markers. Never as a large fill and never as text color on light backgrounds.
- Maintain WCAG AA contrast. Use `--orange-ink` for orange text on light surfaces, not `--orange`.

## Signature components (port from prototype)

- **Spec card:** 2px ink border, 6px offset hard shadow, dark header bar with mono label, dashed dividers between rows. Used for hero pick and project drawer.
- **CTA band:** 2px ink border, orange fill, 8px offset ink shadow, display heading.
- **Buttons:** mono uppercase labels, 3px radius, 1.5px borders. Filled (orange), outline (ink), ghost (muted).
- **Tags:** mono uppercase, small. Tier tags use orange-soft. Category tags use surface-2.
- **Friction bars:** five vertical bars, filled in orange to indicate install difficulty.
- **Rankings table:** sticky dark header, dashed row separators, monospace data cells, verified check glyph.
- **Affiliate code chip:** dashed orange border, copy on tap, with a disclosure label nearby.

Rebuild these as composable React components on top of shadcn primitives. Keep the prototype's spacing, radii, and border weights.

## Motion

Framer Motion, used intentionally. Scroll reveal on section entry, count-up on stats, subtle hover lift on cards, drawer slide-in. Nothing bouncy or decorative. Respect `prefers-reduced-motion`.

## Voice and copy rules (apply to every user-facing string)

This is the same standard in `CLAUDE.md`, repeated here for anyone writing copy or labels.

- **No em dashes. Ever.** Periods, commas, parentheses, or colons.
- Founder-operator tone. Direct, credible, systems-minded. Mix sentence lengths: a short claim, then a line that earns it.
- Lead with the point. No hype, no motivational filler, no fake excitement.
- Recurring lines: "Measured, not estimated." "Verified, not vibes." Hero triad: "Find the opportunity. Price the risk. Deploy with proof."
- Phrases that fit: "The real issue is...", "At scale...", "What matters is...", "The incentives currently reward...".
- **Banned words:** unleash, synergy, robust, revolutionary, game-changing, cutting-edge, world-class, best-in-class, seamless, disruptive, paradigm shift, leveraging (as filler), "AI-powered" as empty marketing. Plus generic VC buzzwords and exaggerated certainty.
- Numbers are always framed as reported or indicative, never guaranteed.

## Accessibility

- One h1 per page. Logical heading order.
- All interactive elements keyboard reachable, visible focus states.
- Color is never the only signal (verified uses a glyph plus color, friction uses bars plus a label).
- Alt text on every logo and image.
- Target Lighthouse accessibility at or above 95.
