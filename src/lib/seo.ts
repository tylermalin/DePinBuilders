import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://depin.builders";
const BRAND = "DePin.Builders";

/**
 * Centralized metadata builder. Every page calls this via generateMetadata.
 * Title leads with the keyword, not the brand (per SEO.md).
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE}${opts.path}`;
  return {
    title: `${opts.title} | ${BRAND}`,
    description: opts.description,
    alternates: { canonical: url },
    ...(opts.noIndex && { robots: { index: false, follow: false } }),
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
