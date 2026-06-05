# SEO Architecture

SEO is the product. This document is the priority read before building any route. The mockup is a single client-rendered page, which cannot rank. The whole point of this build is to turn it into many server-rendered, indexable URLs with correct metadata, structured data, and internal links.

## 1. Rendering strategy

- **Default to static generation.** Project, category, chain, comparison, blog, podcast, and academy pages are generated at build time with `generateStaticParams`.
- **Use ISR** (`export const revalidate = 3600` or similar) for pages whose data changes, such as project pages once live prices are wired.
- **Server Components by default.** The initial HTML must contain the real content. Crawlers should never get an empty shell.
- **Client islands only for interactivity:** directory filter and sort, calculator, compare picker, map, drawers, theme toggle. Keep them small and below the server-rendered content.
- Never gate indexable content behind a click or a client fetch. The filtered directory must render a full server list first, then enhance.

## 2. Route to intent map

Every route targets a search intent. Build them in this priority order.

| Route | Primary intent | Example head term |
|---|---|---|
| `/projects/[slug]` | A specific project | "geodnet miner", "weatherxm review" |
| `/categories/[slug]` | Category shortlist | "best compute DePIN", "DePIN weather projects" |
| `/compare/[pair]` | Decision between two | "geodnet vs onocoy", "io.net vs aethir" |
| `/tools/roi-calculator` | Earnings modeling | "DePIN ROI calculator", "geodnet earnings calculator" |
| `/chains/[slug]` | Ecosystem browsing | "solana DePIN projects", "cardano DePIN" |
| `/blog/[slug]` | Research and how-to | "is helium worth it", "DePIN with no hardware" |
| `/projects` | The directory itself | "DePIN projects list", "DePIN rankings" |

## 3. Programmatic pages (the long-tail engine)

This is where the traffic lives. Generate these from data, do not hand-author.

- **Project pages:** one per row in `projects.seed.ts`.
- **Category hubs:** one per distinct category.
- **Chain hubs:** one per distinct chain.
- **Comparison pages:** generate pairs where both projects are verified and share a category. Slug format `a-vs-b` with the two slugs sorted alphabetically so each pair has one canonical URL. Build a single template and a `getComparisonPairs()` helper in `lib`.
- **"Best of" lists:** generate "best [category] DePIN projects 2026" pages from the category data, each a ranked, linked shortlist.

Keep each programmatic page genuinely useful. Thin, near-duplicate pages get filtered by search engines. Every comparison and category page needs at least one paragraph of unique, real editorial framing plus the data table. Pull the framing from the project blurbs and scores, and add a one-line verdict.

## 4. Metadata

Centralize in `lib/seo.ts`. Every page exports `generateMetadata`.

```ts
// lib/seo.ts
import type { Metadata } from "next";

const SITE = "https://depin.builders";
const BRAND = "DePin.Builders";

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE}${opts.path}`;
  return {
    title: `${opts.title} | ${BRAND}`,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BRAND,
      type: "website",
      images: [opts.image ?? `${SITE}/og-default.png`],
    },
    twitter: {
      card: "summary_large_image",
      site: "@depinbuilders",
      title: opts.title,
      description: opts.description,
    },
  };
}
```

Title and description rules:

- Titles lead with the keyword, not the brand. "GEODNET Miner Review and ROI (2026)" then "| DePin.Builders".
- Descriptions are written, not templated to the point of duplication. Include the project name, the key number (cost or yield), and a reason to click. Under 160 characters.
- No em dashes, no banned words, in any title or description. Use a colon or pipe as a separator.

## 5. Structured data (JSON-LD)

Build typed helpers in `lib/schema.ts`. Inject with a `<script type="application/ld+json">` in the server component. One block per applicable type.

| Page | Schema types |
|---|---|
| Home | Organization, WebSite with SearchAction, FAQPage |
| Project detail | Product (the hardware) plus Review or AggregateRating using the builder score, BreadcrumbList |
| Category and chain hubs | ItemList, BreadcrumbList |
| Comparison | ItemList, BreadcrumbList |
| Blog article | Article with author, datePublished, BreadcrumbList |
| Podcast episode | PodcastEpisode |
| Event | Event |
| Academy course | Course |
| Calculator | SoftwareApplication or WebApplication, FAQPage |

Use the builder score as `AggregateRating` only with an honest `bestRating` of 100 and a clear methodology link, since the score is editorial. Do not fabricate review counts.

## 6. Sitemap and robots

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllProjects, getCategories, getChains, getComparisonPairs, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://depin.builders";
  const projects = (await getAllProjects()).map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }));
  const cats = (await getCategories()).map((c) => ({ url: `${base}/categories/${c.slug}`, priority: 0.6 }));
  const chains = (await getChains()).map((c) => ({ url: `${base}/chains/${c.slug}`, priority: 0.5 }));
  const compares = (await getComparisonPairs()).map((s) => ({ url: `${base}/compare/${s}`, priority: 0.5 }));
  const posts = (await getPosts()).map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }));
  const stat = ["", "/projects", "/tools/roi-calculator", "/tools/compare", "/map", "/academy", "/blog", "/podcasts", "/events", "/about"].map((p) => ({ url: `${base}${p}`, priority: p === "" ? 1 : 0.7 }));
  return [...stat, ...projects, ...cats, ...chains, ...compares, ...posts];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/profile", "/api"] },
    sitemap: "https://depin.builders/sitemap.xml",
  };
}
```

## 7. Internal linking

Internal links distribute ranking signal and are the cheapest SEO lever you have.

- Every project page links to its category hub, its chain hub, two or three related projects, and any comparison pages it appears in.
- Category hubs link to every project in the category and to sibling categories.
- The footer carries a "popular searches" cluster of long-tail anchor links (already in the prototype). Point each at a real route.
- Blog articles link to the project pages they discuss.
- Avoid orphan pages. If a generated page has no inbound internal link, add one.

## 8. Target keyword set (seed, expand in Search Console)

Head terms: "DePIN projects", "best DePIN 2026", "DePIN rankings", "DePIN map", "what is DePIN".

Long-tail, by route type:

- Project: "geodnet miner roi", "weatherxm review", "aethir edge daily earnings", "anyone router review", "is helium hotspot worth it", "hivemapper bee earnings".
- Category: "best compute depin projects", "depin weather stations compared", "depin storage networks", "best wireless depin".
- No-hardware intent: "depin with no hardware", "free depin to mine", "depin on your phone", "grass airdrop guide".
- Comparison: "geodnet vs onocoy", "io.net vs aethir", "weatherxm vs skyx vs nubila".
- Tool intent: "depin roi calculator", "depin earnings calculator", "depin break even".
- Chain: "solana depin projects", "cardano depin", "arbitrum depin".

Map each cluster to a route. When Search Console shows impressions for a query with no matching page, create the page.

## 9. Performance and Core Web Vitals

Rankings depend on speed. Targets: LCP under 2.5s, CLS under 0.1, INP under 200ms.

- Use `next/font` for the three fonts. Self-host, no layout shift.
- Use `next/image` with explicit dimensions for every logo and cover.
- Keep client JavaScript small. The directory list is server-rendered; only the filter controls are client.
- No blocking third-party scripts. Defer analytics.

## 10. Technical SEO checklist (run before launch)

- [ ] Every route returns 200 with full HTML on first load (test with JavaScript disabled).
- [ ] Unique title and description per page, no duplicates, no em dashes, no banned words.
- [ ] Canonical on every page. Comparison pairs canonicalize to one ordering.
- [ ] JSON-LD validates in the Rich Results test.
- [ ] `sitemap.xml` and `robots.txt` resolve and include all indexable routes.
- [ ] No orphan pages. Internal links present on every template.
- [ ] Search Console and Bing Webmaster verified, sitemap submitted.
- [ ] Lighthouse SEO at or above 95 on home, a project page, and a category page.
- [ ] OG images render for project, category, and article types.
