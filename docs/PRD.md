# PRD: DePin.Builders

## 1. Goal

Build the independent, search-dominant research hub for DePIN. The site helps three audiences decide where to deploy capital and hardware, and earns through disclosed affiliate links, paid placement, verification, and education. Success is measured first in organic traffic and qualified affiliate conversions, not in vanity engagement.

## 2. Audiences

- **Operators and builders.** Want to know what to deploy, what it costs, what it earns, and how hard the install is. Primary commercial audience for affiliate links and hardware reviews.
- **Investors and analysts.** Want market structure, defensibility, and the difference between real demand and emission-funded supply.
- **Project teams.** Want verification, a credible listing, and paid placement. Primary B2B revenue.

Calibrate copy depth by surface. Project pages and tools serve operators. Research articles serve analysts. The Get Verified and Advertise flows serve project teams.

## 3. Information architecture

```
/                       Home
/projects               Directory + rankings (combined)
/projects/[slug]        Project detail (programmatic, one per project)
/categories/[slug]      Category hub (programmatic: Compute, Wireless, Sensors, Mapping, Storage, Bandwidth, Positioning, Climate)
/chains/[slug]          Chain hub (programmatic: Solana, Arbitrum, Ethereum, Cardano, Polygon, BNB, Filecoin, Hedera)
/compare/[pair]         Comparison (programmatic: geodnet-vs-onocoy, etc.)
/tools/roi-calculator   Earnings and ROI calculator
/tools/compare          Multi-project compare
/map                    Global coverage and node density
/academy                Course catalog
/academy/[course]       Course detail
/blog                   Articles index (filter by type)
/blog/[slug]            Article
/podcasts               Episode index
/podcasts/[slug]        Episode
/events                 Event calendar
/about                  About, methodology, disclosures
/get-verified           Verification intake
/advertise              Media kit and placement intake
/profile                Account dashboard (auth)
/docs                   Methodology and contributor docs (can be Mintlify subdomain later)
```

The combined Projects and Rankings surface mirrors the prototype: a server-rendered list with a client filter and sort island. Rankings sub-views (by chain, by category, by community favorites, by token movement) are reachable from there and from the programmatic hub pages.

## 4. Pages in detail

### Home
Hero with rotating category word and the triad. Tier explorer (Set & Forget, Infrastructure, Frictionless) that links into filtered directory views. Latest verified projects grid. A clearly labeled sponsored placement slot. Trending movers with gainers, losers, newly verified tabs. Latest publications. Newsletter band. FAQ block with FAQ schema. Every section links deeper. The home page is a hub that distributes link equity, not a destination.

### Projects directory and rankings
Server-rendered table of all projects. Client island handles search, tier and category and chain filters, verified-only toggle, and column sorting (score, hardware cost, yield, ROI, name). Each row links to the project page. Friction shown as a five-step bar. Verified badge. Persistent indicative-data and affiliate disclosure below the table.

### Project detail (the SEO workhorse)
One page per project. Spec sheet (cost, reported yield range, break-even, friction, power, chain, score, 30-day change). Editorial blurb. Affiliate code with copy action and disclosure. Conflict disclosure when present. Related projects (same category and same tier). Links to the relevant comparison pages and category hub. This page type is where most long-tail traffic lands, so its metadata and schema must be exact.

### Category and chain hubs
Programmatic pages that aggregate projects by category or chain, with an intro paragraph targeting the head term ("best compute DePIN projects", "Solana DePIN projects"), the filtered list, and internal links. These exist to own category-level search.

### Comparison pages
Programmatic "x vs y" pages generated from meaningful pairs (same category, both verified). Side-by-side spec table, a short verdict, and links back to both project pages. High-intent, low-competition long-tail. Generate the pair list in `lib`, do not hand-author each one.

### Tools
ROI and earnings calculator: pick a device, adjust reported daily earnings, electricity rate, token-price assumption, and hardware cost. Output net daily, monthly, yearly, break-even, and year-1 ROI. Math lives in a tested pure function in `lib`. Compare tool: select up to four projects for a side-by-side. Both tools get their own indexable landing copy targeting "DePIN ROI calculator" and similar.

### Map
Interactive coverage and node-density view with per-network filtering and tooltips. The prototype uses a stylized SVG. In production, keep the stylized density view for the marketing surface and consider a real tile map (MapLibre) only if accurate geodata exists. Do not block launch on a real map.

### Academy
Course catalog with free and paid tracks. Free tracks are top-of-funnel and should be fully indexable. Paid tracks gate content behind auth and payment. Course pages target learning-intent keywords.

### Blog, Podcasts, Events
The content engine. Articles are typed (Review, Research, Guide, Project update) and each gets Article schema. Podcast episodes get PodcastEpisode schema and embed players. Events get Event schema and an add-to-calendar action. These feed freshness and internal links to project pages.

### About and methodology
States the editorial standard, the scoring methodology, and the full disclosure block. The methodology page is itself an SEO asset ("how to evaluate a DePIN project") and a trust signal.

## 5. Business model (build the surfaces, label everything)

- **Affiliate.** Hardware purchase links carry discount codes (per project in the seed data). Every affiliate link is labeled and uses `rel="sponsored"`. Track clicks server-side.
- **Verification.** `Get Verified` intake. Verification is editorial and scored on a public methodology. The fee buys review and listing, never a score. Render this separation explicitly.
- **Paid placement and advertising.** Labeled sponsored slots in the directory, home, and newsletter. Never styled to look like editorial.
- **Academy.** Free tracks for acquisition, paid tracks for revenue.
- **Newsletter.** Email capture, weekly brief. The list is the durable distribution asset.

## 6. Accounts

Auth via Clerk or Auth.js with optional wallet sign-in. Logged-in users can favorite projects, track courses, and (for project teams) manage a listing. The prototype's auth is a demo and must be replaced, never extended.

## 7. Non-goals for v1

- Real-time on-chain indexing. Use periodic price and node snapshots first.
- A fully accurate geographic map. Stylized density is enough to launch.
- User-generated reviews. Editorial only at launch to protect the verification brand.

## 8. Success metrics

- Indexed pages and organic impressions (Search Console), tracked from week one.
- Rankings for the target keyword set in `SEO.md`.
- Affiliate click-through and conversion by project.
- Newsletter signups.
- Verification and advertising inquiries.
