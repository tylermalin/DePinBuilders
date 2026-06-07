/**
 * Typed JSON-LD builders per SEO.md.
 * Inject with <script type="application/ld+json"> in server components.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://depin.builders";
const BRAND = "DePin.Builders";

// ── Helpers ──

export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify({ "@context": "https://schema.org", ...data });
}

// ── Organization ──

export function organizationSchema() {
  return jsonLdScript({
    "@type": "Organization",
    name: BRAND,
    url: `${SITE}/`,
    logo: `${SITE}/logo.png`,
    description:
      "Independent research hub for Decentralized Physical Infrastructure Networks (DePIN): verified projects, hardware reviews, rankings, and earnings tools.",
    sameAs: [
      "https://twitter.com/depinbuilders",
      "https://youtube.com/@depinbuilders",
      "https://discord.gg/depinbuilders",
    ],
  });
}

// ── WebSite with SearchAction ──

export function webSiteSchema() {
  return jsonLdScript({
    "@type": "WebSite",
    name: BRAND,
    url: `${SITE}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

// ── FAQPage ──

export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return jsonLdScript({
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

// ── BreadcrumbList ──

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
) {
  return jsonLdScript({
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  });
}

// ── Product (hardware) + Review (builder score) ──

export function productSchema(opts: {
  name: string;
  description: string;
  slug: string;
  hardwareCostUsd: number;
  builderScore: number;
  category: string;
}) {
  return jsonLdScript({
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: `${SITE}/projects/${opts.slug}`,
    category: opts.category,
    ...(opts.hardwareCostUsd > 0 && {
      offers: {
        "@type": "Offer",
        price: opts.hardwareCostUsd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts.builderScore,
      bestRating: 100,
      worstRating: 0,
      ratingCount: 1,
    },
  });
}

// ── Review (editorial verdict + score) ──

export function reviewSchema(opts: {
  name: string;
  slug: string;
  verdict: string;
  builderScore: number;
  category: string;
}) {
  return jsonLdScript({
    "@type": "Review",
    name: `${opts.name} review`,
    url: `${SITE}/projects/${opts.slug}`,
    itemReviewed: {
      "@type": "Product",
      name: opts.name,
      category: opts.category,
    },
    reviewBody: opts.verdict,
    reviewRating: {
      "@type": "Rating",
      ratingValue: opts.builderScore,
      bestRating: 100,
      worstRating: 0,
    },
    author: { "@type": "Organization", name: BRAND },
    publisher: { "@type": "Organization", name: BRAND },
  });
}

// ── ItemList ──

export function itemListSchema(
  name: string,
  items: { name: string; slug: string; prefix?: string }[],
) {
  return jsonLdScript({
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE}/${item.prefix ?? "projects"}/${item.slug}`,
    })),
  });
}

// ── Article ──

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author?: string;
}) {
  return jsonLdScript({
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${SITE}/blog/${opts.slug}`,
    datePublished: opts.publishedAt,
    author: {
      "@type": "Organization",
      name: opts.author ?? BRAND,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  });
}

// ── PodcastEpisode ──

export function podcastEpisodeSchema(opts: {
  title: string;
  description: string;
  slug: string;
  episodeNumber: number;
  publishedAt: string;
  audioUrl?: string;
}) {
  return jsonLdScript({
    "@type": "PodcastEpisode",
    name: opts.title,
    description: opts.description,
    url: `${SITE}/podcasts/${opts.slug}`,
    episodeNumber: opts.episodeNumber,
    datePublished: opts.publishedAt,
    ...(opts.audioUrl && {
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: opts.audioUrl,
      },
    }),
  });
}

// ── Event ──

export function eventSchema(opts: {
  title: string;
  description: string;
  slug: string;
  location: string;
  startsAt: string;
  online?: boolean;
}) {
  return jsonLdScript({
    "@type": "Event",
    name: opts.title,
    description: opts.description,
    url: `${SITE}/events`,
    startDate: opts.startsAt,
    location: opts.online
      ? { "@type": "VirtualLocation", url: `${SITE}/events` }
      : { "@type": "Place", name: opts.location },
    eventAttendanceMode: opts.online
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
  });
}

// ── Course ──

export function courseSchema(opts: {
  title: string;
  description: string;
  slug: string;
  priceUsd: number;
}) {
  return jsonLdScript({
    "@type": "Course",
    name: opts.title,
    description: opts.description,
    url: `${SITE}/academy/${opts.slug}`,
    provider: { "@type": "Organization", name: BRAND },
    ...(opts.priceUsd > 0 && {
      offers: {
        "@type": "Offer",
        price: opts.priceUsd,
        priceCurrency: "USD",
      },
    }),
    isAccessibleForFree: opts.priceUsd === 0,
  });
}

// ── SoftwareApplication (calculator) ──

export function softwareAppSchema() {
  return jsonLdScript({
    "@type": "SoftwareApplication",
    name: "DePIN ROI Calculator",
    url: `${SITE}/tools/roi-calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  });
}
