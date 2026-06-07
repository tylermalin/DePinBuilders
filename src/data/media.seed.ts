// src/data/media.seed.ts
// Project imagery, keyed by slug. Two kinds:
//   - screenshot: a screenshot of the project's official website, captured for
//     editorial/reference use and labelled as such.
//   - products: official product/sensor/hardware images PROVIDED by the project
//     or its press kit. Always set `credit` for these so attribution renders.
//
// Adding images:
//   1. Drop files in  public/images/projects/<slug>/  (e.g. site.png, miner.jpg)
//   2. Add an entry below with a descriptive `alt` (required) and, for product
//      images, a `credit`. Captions are optional.
// Anything without an entry simply renders nothing. No placeholders ship.

export interface ProjectImage {
  /** Path under /public, e.g. "/images/projects/geodnet/site.png" */
  src: string;
  /** Required, descriptive alt text for accessibility and SEO. */
  alt: string;
  /** Optional short caption shown under the image. */
  caption?: string;
  /** Attribution for product images, e.g. "GEODNET". Renders as "Image: ...". */
  credit?: string;
}

export interface ProjectMedia {
  /** Screenshot of the official website. */
  screenshot?: ProjectImage;
  /** Official product / sensor / hardware images. */
  products?: ProjectImage[];
}

export const media: Record<string, ProjectMedia> = {
  // Populated as official assets are added. Example shape:
  // geodnet: {
  //   screenshot: {
  //     src: "/images/projects/geodnet/site.png",
  //     alt: "Screenshot of the GEODNET website homepage",
  //   },
  //   products: [
  //     {
  //       src: "/images/projects/geodnet/triple-band.jpg",
  //       alt: "GEODNET triple-band GNSS base station",
  //       caption: "Triple-band base station",
  //       credit: "GEODNET",
  //     },
  //   ],
  // },
};

export function getMedia(slug: string): ProjectMedia | null {
  return media[slug] ?? null;
}
