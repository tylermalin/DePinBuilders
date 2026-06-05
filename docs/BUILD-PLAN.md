# Build Plan

Build in phases. Finish and verify a phase before starting the next. Each phase ends green: `pnpm typecheck && pnpm lint && pnpm build` pass, and the acceptance criteria are met. Keep changes scoped so each phase is shippable.

The matching copy-paste prompts for each phase are in `/prompts/claude-code-prompts.md`.

## Phase 0: Scaffold

Set up the project on the required stack.

- Next.js App Router, TypeScript strict, Tailwind, shadcn/ui, lucide-react, Framer Motion, pnpm.
- ESLint, Prettier, `typecheck`, `build`, `lint`, `test` scripts.
- Prisma with Postgres, schema from `DATA-MODEL.md`, `db:migrate` and `db:seed`.
- `next/font` for the three fonts, CSS variables for the color tokens, light and dark theme.
- `.env.example`, never a committed `.env`.

**Done when:** app boots, theme toggles, seed runs and loads projects, build is green.

## Phase 1: Design system and data layer

- Port the signature components from `BRAND.md` as React components on shadcn primitives: button variants, tags, spec card, CTA band, friction bars, code chip, ticker.
- Build `lib/data.ts` with typed accessors: `getAllProjects`, `getProject(slug)`, `getCategories`, `getChains`, `getComparisonPairs`, `getPosts`, and so on. Back them with Prisma, falling back to the seed for content not yet in the DB.
- Build `lib/seo.ts` (`pageMeta`) and `lib/schema.ts` (JSON-LD builders) per `SEO.md`.

**Done when:** components render in a Storybook page or a `/styleguide` route, data accessors are typed and tested, SEO helpers exist.

## Phase 2: Directory and rankings

- `/projects` server-renders the full list. Client island adds search, tier, category, chain, verified filters and column sorting. Server list must be present with JavaScript disabled.
- Row links to project pages. Friction bars, verified badge, indicative-data and affiliate disclosure below the table.

**Done when:** directory renders server-side, filters and sort work as a client enhancement, disclosure present, Lighthouse SEO at or above 95.

## Phase 3: Project pages (highest SEO value)

- `/projects/[slug]` with `generateStaticParams` for every project.
- Spec sheet, blurb, affiliate code with disclosure, conflict disclosure when present, related projects, links to category, chain, and comparison pages.
- `generateMetadata` and Product plus Review plus Breadcrumb JSON-LD.

**Done when:** every project has an indexable page with unique metadata and valid structured data, internal links present, no orphan.

## Phase 4: Programmatic hubs and comparisons

- `/categories/[slug]` and `/chains/[slug]` with intro framing, the filtered list, internal links, ItemList schema.
- `/compare/[pair]` generated from `getComparisonPairs()`, canonical single ordering per pair, side-by-side table, a one-line verdict, links back to both projects.
- "Best of" category lists.

**Done when:** all programmatic routes generate, each has unique framing (not thin duplicate), all appear in the sitemap, all are internally linked.

## Phase 5: Tools

- `/tools/roi-calculator` with the calculator. Math in a pure, tested function in `lib/calc.ts`. Device select, daily earnings, electricity rate, token-price assumption, hardware cost. Outputs net daily, monthly, yearly, break-even, year-1 ROI. Persistent not-financial-advice line.
- `/tools/compare` multi-project compare, up to four.
- Indexable landing copy for both.

**Done when:** calculator matches the prototype outputs, math has unit tests, both tools are indexable with metadata and schema.

## Phase 6: Content engine

- `/blog` and `/blog/[slug]` (MDX or CMS), typed posts, Article schema, links to related project pages.
- `/podcasts` and episode pages with PodcastEpisode schema.
- `/events` with Event schema and add-to-calendar.
- `/academy` catalog and course pages, free tracks fully indexable, paid tracks gated.

**Done when:** content types render server-side with correct schema and internal links, free academy content is indexable.

## Phase 7: Accounts and monetization surfaces

- Auth via Clerk or Auth.js, optional wallet sign-in. Replace the prototype demo auth entirely.
- Favorites, course progress, profile.
- `/get-verified` and `/advertise` intake forms writing to `VerificationRequest` and `AdInquiry`. Server Actions with validation.
- Newsletter capture to `Subscriber` plus the email provider (Resend).
- Affiliate click tracking, `rel="sponsored"` on outbound links, labeled sponsored placements.

**Done when:** auth works end to end, no credential is ever logged or committed, intake and newsletter persist, all monetization surfaces are labeled.

## Phase 8: Live data, SEO hardening, launch

- Vercel Cron writes `PriceSnapshot` rows from CoinGecko and network stats. Project pages read latest snapshot via ISR. Source and timestamp labels on live numbers.
- Map: keep stylized density for marketing, evaluate a real MapLibre layer only if geodata exists. Do not block launch.
- Run the full technical SEO checklist in `SEO.md`. Submit sitemap to Search Console and Bing. Wire analytics.
- Final Lighthouse and Core Web Vitals pass.

**Done when:** live numbers are sourced and cached, the SEO checklist is fully checked, analytics and Search Console are live, Core Web Vitals targets met.

## Guardrails that apply in every phase

- No em dashes, no banned words, in any shipped text.
- Every yield or ROI number framed as indicative, never guaranteed.
- Disclosures always render. The founder-conflict project never defaults to rank one.
- Server-render indexable content. Client islands stay small.
- Never store secrets in the repo.
