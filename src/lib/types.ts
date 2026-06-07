/**
 * Shared types and pure helpers used by both server and client code.
 * This file must NEVER import from db.ts or Prisma.
 */

export interface ReviewScores {
  /** Demand-side revenue versus pure token emission */
  realRevenue: number;
  /** Emission schedule, burn, and payout sustainability */
  tokenEconomics: number;
  /** Geographic and operator distribution */
  decentralization: number;
  /** Payback, cost-to-yield, resale, and capital efficiency */
  hardwareEconomics: number;
  /** Install and maintenance ease (higher means easier to run) */
  operatorFriction: number;
  /** Public stats, verifiable data, and disclosure quality */
  transparency: number;
}

export interface ProjectReview {
  /** "draft" hides this behind a draft label; "published" is a final verdict */
  status: "draft" | "published";
  verdict: string;
  strengths: string[];
  risks: string[];
  scores: ReviewScores;
}

export interface Project {
  slug: string;
  name: string;
  token: string | null;
  category: string;
  tier: string;
  chain: string;
  hardwareCostUsd: number;
  yieldLowUsd: number;
  yieldHighUsd: number;
  breakEvenMonths: number | null;
  frictionLevel: number;
  verified: boolean;
  builderScore: number;
  change30d: number;
  powerWatts: number;
  affiliateCode: string | null;
  affiliateDiscount: string | null;
  affiliateUrl?: string | null;
  conflictDisclosure: string | null;
  blurb: string;
  regionDensity: {
    NA: number;
    SA: number;
    EU: number;
    AF: number;
    APAC: number;
  };
  /** Editorial review, null until one is authored for this project */
  review: ProjectReview | null;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  count: number;
}

export interface ChainInfo {
  slug: string;
  name: string;
  count: number;
}

export interface PostSummary {
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  projectSlug: string | null;
  publishedAt: Date;
}

const TIER_DISPLAY: Record<string, string> = {
  SET_AND_FORGET: "Set & Forget",
  INFRASTRUCTURE: "Infrastructure",
  FRICTIONLESS: "Frictionless",
  ENTERPRISE: "Enterprise",
};

export function tierDisplay(tier: string): string {
  return TIER_DISPLAY[tier] ?? tier;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
