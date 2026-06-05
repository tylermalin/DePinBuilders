# Claude Code Prompts

Paste these into Claude Code in order. Each phase assumes the previous one is merged and green. Run the session-start prompt once at the beginning of every working session so the agent reloads context.

The agent should already pick up `CLAUDE.md` automatically. These prompts point it at the right docs and define the unit of work.

---

## Session start (run at the top of every session)

```
Read CLAUDE.md in full, then read docs/PRD.md, docs/SEO.md, docs/DATA-MODEL.md, docs/BRAND.md, and docs/BUILD-PLAN.md. Open reference/prototype.html and treat it as the visual and interaction source of truth.

Hard rules for this whole project: SEO is the product, so server-render every indexable page and keep client code to small interactive islands. No em dashes anywhere in shipped text. No banned words (see CLAUDE.md). Every yield or ROI number is framed as indicative, never guaranteed. Disclosures always render and the founder-conflict project never defaults to rank one. Use the exact stack in CLAUDE.md, pnpm only.

Confirm you have read these and give me a one-paragraph summary of the prime directive and the current phase before writing code.
```

---

## Phase 0: Scaffold

```
Execute Phase 0 from docs/BUILD-PLAN.md.

Scaffold a Next.js App Router app with TypeScript strict, Tailwind, shadcn/ui, lucide-react, Framer Motion, and pnpm. Add ESLint and Prettier and scripts for dev, build, lint, typecheck, test, db:migrate, db:seed.

Set up Prisma with Postgres using the schema in docs/DATA-MODEL.md. Wire next/font for Bricolage Grotesque, Hanken Grotesk, and JetBrains Mono. Implement the light and dark color tokens from docs/BRAND.md as CSS variables and expose them through Tailwind. Add a working theme toggle.

Copy data/projects.seed.ts into the app and write prisma/seed.ts so db:seed loads it.

Add .env.example with the variables from README. Do not commit a real .env.

Stop when the app boots, the theme toggles, db:seed loads projects, and pnpm typecheck && pnpm lint && pnpm build all pass. Report what you built and any deviations.
```

---

## Phase 1: Design system and data layer

```
Execute Phase 1 from docs/BUILD-PLAN.md.

Port the signature components in docs/BRAND.md to React on top of shadcn primitives: button variants, tags, spec card, CTA band, friction bars, affiliate code chip, ticker. Match the prototype's borders, radii, shadows, and spacing exactly.

Build lib/data.ts with typed accessors (getAllProjects, getProject, getCategories, getChains, getComparisonPairs, getPosts and the rest), backed by Prisma with a seed fallback. Build lib/seo.ts with the pageMeta helper and lib/schema.ts with typed JSON-LD builders, both per docs/SEO.md.

Add a /styleguide route that renders every component so I can review them. Add unit tests for the data accessors.

Stop when the styleguide renders, accessors are typed and tested, and the build is green.
```

---

## Phase 2: Directory and rankings

```
Execute Phase 2 from docs/BUILD-PLAN.md.

Build /projects. Server-render the full project list. Add a client island for search, tier, category, chain, and verified filters plus column sorting (score, hardware cost, yield, ROI, name). The full list must render server-side and be present with JavaScript disabled, then the client controls enhance it.

Each row links to /projects/[slug]. Show friction bars, the verified badge, and the indicative-data and affiliate disclosure below the table. Match the prototype's rankings table styling.

Add generateMetadata and the appropriate JSON-LD. Verify the server list renders with JS disabled and Lighthouse SEO is at or above 95. Stop and report.
```

---

## Phase 3: Project pages

```
Execute Phase 3 from docs/BUILD-PLAN.md. This is the highest SEO value, do it carefully.

Build /projects/[slug] with generateStaticParams for every project in the data. Include the spec sheet, blurb, affiliate code with disclosure, the conflict disclosure when present, related projects (same category and tier), and internal links to the category hub, chain hub, and any comparison pages the project appears in.

Add generateMetadata with a keyword-led title and a written description (no template duplication, no em dashes, no banned words). Emit Product plus Review plus BreadcrumbList JSON-LD per docs/SEO.md, using the builder score honestly.

Verify every project resolves to an indexable page with unique metadata, valid structured data, and no orphan. Report the route count and a sample rendered page.
```

---

## Phase 4: Programmatic hubs and comparisons

```
Execute Phase 4 from docs/BUILD-PLAN.md.

Build /categories/[slug] and /chains/[slug] with a unique intro paragraph, the filtered project list, sibling links, and ItemList schema. Build /compare/[pair] from getComparisonPairs(), where pairs share a category and are both verified, with one canonical slug ordering per pair (slugs sorted alphabetically). Each comparison has a side-by-side table, a one-line verdict drawn from the data, and links back to both project pages. Generate "best [category] DePIN projects 2026" list pages.

Every generated page must have genuinely unique framing, not thin duplicate content. Add all routes to sitemap.ts and ensure each has at least one inbound internal link. Report total generated route count.
```

---

## Phase 5: Tools

```
Execute Phase 5 from docs/BUILD-PLAN.md.

Build /tools/roi-calculator matching the prototype. Put the math in a pure function in lib/calc.ts with unit tests covering net daily, monthly, yearly, break-even, and year-1 ROI. Inputs: device select, reported daily earnings, electricity rate, token-price assumption, hardware cost. Keep the persistent not-financial-advice line.

Build /tools/compare for up to four projects side by side. Give both tools indexable landing copy and metadata and SoftwareApplication plus FAQPage schema.

Verify the calculator outputs match the prototype for GEODNET, WeatherXM, and Aethir at default inputs. Report.
```

---

## Phase 6: Content engine

```
Execute Phase 6 from docs/BUILD-PLAN.md.

Build /blog and /blog/[slug] (MDX), typed posts with Article schema and links to related project pages. Build /podcasts and episode pages with PodcastEpisode schema. Build /events with Event schema and add-to-calendar. Build /academy and course pages, with free tracks fully indexable and paid tracks gated behind auth and payment (stub payment for now).

Seed the content types from the prototype. Verify server rendering and schema validity. Report.
```

---

## Phase 7: Accounts and monetization

```
Execute Phase 7 from docs/BUILD-PLAN.md.

Replace the prototype demo auth entirely with Clerk or Auth.js, plus optional wallet sign-in (SIWE and Cardano). Add favorites, course progress, and a profile page. Build /get-verified and /advertise intake forms as Server Actions with validation, writing to VerificationRequest and AdInquiry. Add newsletter capture to Subscriber and Resend. Add affiliate click tracking, rel="sponsored" on outbound affiliate links, and labeled sponsored placements.

Never log, store, or commit credentials or secrets. Verify auth end to end and that intake and newsletter persist. Report.
```

---

## Phase 8: Live data and launch

```
Execute Phase 8 from docs/BUILD-PLAN.md.

Add a Vercel Cron job that writes PriceSnapshot rows from CoinGecko and network stats. Make project pages read the latest snapshot via ISR, with a source and timestamp label on every live number and a fallback to the last snapshot or seed value on failure.

Run the full technical SEO checklist in docs/SEO.md. Generate and validate sitemap.xml and robots.txt. Wire Vercel Analytics and product analytics. Run Lighthouse on the home page, a project page, and a category page and report scores against the Core Web Vitals targets.

Give me a launch readiness report: indexable route count, schema validation results, Lighthouse scores, and any remaining risks.
```

---

## Useful one-off prompts

```
Audit every user-facing string in the app for em dashes and the banned word list in CLAUDE.md. Report each violation with file and line, then fix them.
```

```
List every route the app generates and confirm each has: a unique title and description, valid JSON-LD, a canonical URL, and at least one inbound internal link. Flag any orphan or duplicate.
```

```
Render the app with JavaScript disabled and tell me which pages are missing their main content in the initial HTML. Fix any that fail.
```
