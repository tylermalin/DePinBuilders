# CLAUDE.md

Operating manual for building **DePin.Builders**. Read this file completely before writing any code. Then read `/docs` in this order: `PRD.md`, `SEO.md`, `DATA-MODEL.md`, `BRAND.md`, `BUILD-PLAN.md`. The visual and interaction spec is `/reference/prototype.html`, a working single-file mockup. Treat it as the source of truth for layout, components, copy, and behavior. Your job is to turn it into a real, server-rendered, indexable Next.js application.

## What this is

DePin.Builders is an independent research hub for Decentralized Physical Infrastructure Networks (DePIN). It lists and verifies projects, reviews hardware, ranks networks, maps deployments, and gives operators tools to model returns before they buy. It earns through clearly disclosed affiliate links, paid placement, verification services, and an academy.

## The prime directive

**SEO is the product, not a feature.** The single biggest reason this project exists as a real build instead of the mockup is that a one-page client-side app cannot rank. Every decision serves organic discovery.

That means:

- Every meaningful entity gets its own server-rendered, indexable URL. One route per project, per category, per chain, per comparison, per calculator, per article.
- Default to Server Components and static generation. Use ISR (revalidate) for data that changes. Reach for client components only for genuine interactivity (calculator, filters, map, drawers).
- Crawlers must receive real HTML, not an empty shell hydrated later.
- `generateMetadata`, JSON-LD, a generated sitemap, and clean internal linking are not optional polish. They are acceptance criteria on every page.

If a choice trades a small amount of developer convenience for better indexability, take the indexable option. Read `SEO.md` before building any route.

## Stack (do not substitute)

- **Framework:** Next.js, App Router. React Server Components by default. Server Actions where useful.
- **Language:** TypeScript, strict mode on.
- **Styling:** Tailwind CSS. **Components:** shadcn/ui. **Icons:** lucide-react. **Animation:** Framer Motion, used sparingly.
- **Package manager:** pnpm. Never npm or yarn.
- **Database:** PostgreSQL. **ORM:** Prisma.
- **Auth:** Clerk or Auth.js. Support wallet sign-in (SIWE for EVM, Cardano wallet) as a secondary path. Never hand-roll auth. Never store credentials in the repo.
- **Hosting:** Vercel. **Analytics:** Vercel Analytics plus a privacy-respecting product analytics tool.
- **Testing:** Playwright for critical paths, Vitest for units. Do not over-test the MVP. Cover auth, payments, and the calculator math.
- **Lint/format:** ESLint plus Prettier.

If you believe a stack choice is wrong for a specific task, flag the concern and the tradeoff in one or two sentences, then proceed with this stack unless told otherwise. Do not silently swap it.

## Commands

```bash
pnpm install
pnpm dev            # local dev
pnpm build          # production build, must pass before any PR
pnpm lint           # must pass clean
pnpm typecheck      # tsc --noEmit, must pass clean
pnpm db:migrate     # prisma migrate dev
pnpm db:seed        # load /data/projects.seed.ts and related seeds
pnpm test           # vitest
pnpm test:e2e       # playwright
```

Before you consider any task done: `pnpm typecheck && pnpm lint && pnpm build` all pass.

## Repository shape (target)

```
app/
  (marketing)/                 # home, about
  projects/
    page.tsx                   # directory + rankings (server-rendered list, client filter island)
    [slug]/page.tsx            # one indexable page per project
  categories/[slug]/page.tsx   # one page per category (programmatic SEO)
  chains/[slug]/page.tsx       # one page per chain (programmatic SEO)
  compare/[pair]/page.tsx      # "x-vs-y" comparison pages (programmatic SEO)
  tools/
    roi-calculator/page.tsx
    compare/page.tsx
  map/page.tsx
  academy/[...]/page.tsx
  blog/[slug]/page.tsx
  podcasts/[slug]/page.tsx
  events/page.tsx
  sitemap.ts
  robots.ts
components/                    # shadcn-based, plus app components
lib/                           # data access, seo helpers, schema builders, pricing
prisma/schema.prisma
data/projects.seed.ts          # source of truth, copied from this handoff
```

## Copy and voice rules (enforced everywhere users read text)

This brand has a specific voice. Generated copy, microcopy, button labels, and meta descriptions all follow it.

- **No em dashes. Ever.** Use periods, commas, parentheses, or colons. This applies to code comments that ship, UI copy, and docs.
- Founder-operator tone. Direct, systems-oriented, credible. Mix sentence lengths. Short claim, then a longer line that earns it.
- Lead with the point. No motivational filler, no hype, no fake excitement.
- Recurring brand lines: "Measured, not estimated." and "Verified, not vibes." and the hero triad "Find the opportunity. Price the risk. Deploy with proof."
- **Banned words:** unleash, synergy, robust, revolutionary, game-changing, cutting-edge, world-class, best-in-class, seamless, disruptive, paradigm shift, leveraging (as filler), "AI-powered" as empty marketing. Do not use these in any user-facing string.

Full detail in `BRAND.md`.

## Hard guardrails (legal and trust)

These protect the brand and are not negotiable. They come from the founder's regulatory background and the conflict structure of an affiliate-funded research hub.

1. **Disclosure by default.** Affiliate links, paid placement, and sponsorships are visibly labeled on the page where they appear. Verification status is editorial and must render as separate from any commercial relationship.
2. **Not financial advice.** Every yield number, ROI figure, and token data point is presented as indicative or reported, never guaranteed. A persistent "not financial, investment, legal, or tax advice" line stays in the footer and near the calculator. Do not write copy that promises returns.
3. **Founder conflict disclosure.** One listed project (Mālama Labs) is operated by the founder. It carries an on-page disclosure and is scored on the same public methodology. Never let it default to rank one. The `conflictDisclosure` field in the data must always render when present.
4. **No real credential handling in prototype-derived code.** The mockup's sign-in and forms are demos. Replace them with Clerk or Auth.js. Never log, store, or commit secrets or user passwords.
5. **Yield and price data must cite a source and a timestamp** once live data is wired. Static seed values are labeled as indicative until then.

## How to work

- Read the docs and the prototype before coding. The prototype already answers most layout and behavior questions.
- Work in the phases defined in `BUILD-PLAN.md`. Finish and verify a phase before starting the next. Time and context-switching are the binding constraints here, so keep changes scoped and shippable.
- Keep the data in `/data/projects.seed.ts` as the source of truth. Do not re-key project data by hand.
- Prefer server rendering. Isolate interactivity into small client islands.
- Mobile responsive from the first commit. The prototype is already responsive; match its breakpoints.
- When you finish a route, self-check it against the Definition of Done below.

## Definition of done (per page)

- Renders on the server with real content in the initial HTML.
- Has a unique, keyword-targeted `<title>` and meta description via `generateMetadata`.
- Emits the correct JSON-LD for its type (see `SEO.md`).
- Correct heading hierarchy, one h1, semantic landmarks.
- Internal links to related entities (related projects, parent category, comparisons).
- Responsive and keyboard accessible. Lighthouse SEO and accessibility at or above 95.
- `pnpm typecheck && pnpm lint && pnpm build` pass.

## What not to do

- Do not build the whole app as a client-side SPA. That defeats the purpose.
- Do not introduce Material UI, Bootstrap, or generic SaaS styling.
- Do not use em dashes or any banned word in shipped text.
- Do not ship yield or earnings claims as guarantees.
- Do not remove or weaken disclosures to make a page cleaner.
- Do not store secrets in the repo or commit a populated `.env`.
