import { prisma } from "./db";
import {
  projects as seedProjects,
  type ProjectSeed,
} from "@/data/projects.seed";

// Re-export types and pure helpers from the Prisma-free module
// so server components can import everything from "@/lib/data"
export type { Project, CategoryInfo, ChainInfo, PostSummary } from "./types";
export { tierDisplay, slugify } from "./types";
import type { Project, CategoryInfo, ChainInfo, PostSummary } from "./types";
import { slugify } from "./types";

function seedToProject(p: ProjectSeed): Project {
  return {
    slug: p.slug,
    name: p.name,
    token: p.token,
    category: p.category,
    tier: p.tier,
    chain: p.chain,
    hardwareCostUsd: p.hardwareCostUsd,
    yieldLowUsd: p.yieldLowUsd,
    yieldHighUsd: p.yieldHighUsd,
    breakEvenMonths: p.breakEvenMonths,
    frictionLevel: p.frictionLevel,
    verified: p.verified,
    builderScore: p.builderScore,
    change30d: p.change30d,
    powerWatts: p.powerWatts,
    affiliateCode: p.affiliateCode,
    affiliateDiscount: p.affiliateDiscount,
    affiliateUrl: null,
    conflictDisclosure: p.conflictDisclosure,
    blurb: p.blurb,
    regionDensity: p.regionDensity,
  };
}

// ── Database check ──

async function canQueryDb(): Promise<boolean> {
  if (!prisma) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

// ── Accessors ──

export async function getAllProjects(): Promise<Project[]> {
  if (await canQueryDb()) {
    const rows = await prisma!.project.findMany({
      orderBy: { builderScore: "desc" },
    });
    return rows.map((r) => ({
      ...r,
      regionDensity: r.regionDensity as Project["regionDensity"],
    }));
  }
  return seedProjects
    .map(seedToProject)
    .sort((a, b) => b.builderScore - a.builderScore);
}

export async function getProject(
  slug: string,
): Promise<Project | null> {
  if (await canQueryDb()) {
    const row = await prisma!.project.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      ...row,
      regionDensity: row.regionDensity as Project["regionDensity"],
    };
  }
  const seed = seedProjects.find((p) => p.slug === slug);
  return seed ? seedToProject(seed) : null;
}

export async function getCategories(): Promise<CategoryInfo[]> {
  const projects = await getAllProjects();
  const map = new Map<string, number>();
  for (const p of projects) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ slug: slugify(name), name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getChains(): Promise<ChainInfo[]> {
  const projects = await getAllProjects();
  const map = new Map<string, number>();
  for (const p of projects) {
    map.set(p.chain, (map.get(p.chain) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ slug: slugify(name), name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getComparisonPairs(): Promise<string[]> {
  const projects = await getAllProjects();
  const verified = projects.filter((p) => p.verified);
  const pairs: string[] = [];

  for (let i = 0; i < verified.length; i++) {
    for (let j = i + 1; j < verified.length; j++) {
      const a = verified[i];
      const b = verified[j];
      if (a.category === b.category) {
        const sorted = [a.slug, b.slug].sort();
        pairs.push(`${sorted[0]}-vs-${sorted[1]}`);
      }
    }
  }
  return pairs;
}

export async function getComparisonPairsForProject(
  slug: string,
): Promise<{ pair: string; otherSlug: string; otherName: string }[]> {
  const projects = await getAllProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.verified) return [];

  const results: { pair: string; otherSlug: string; otherName: string }[] = [];
  const verified = projects.filter((p) => p.verified && p.slug !== slug);

  for (const other of verified) {
    if (other.category === project.category) {
      const sorted = [slug, other.slug].sort();
      results.push({
        pair: `${sorted[0]}-vs-${sorted[1]}`,
        otherSlug: other.slug,
        otherName: other.name,
      });
    }
  }
  return results;
}

export async function getProjectsByCategory(
  category: string,
): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter(
    (p) => slugify(p.category) === category || p.category === category,
  );
}

export async function getProjectsByChain(
  chain: string,
): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter(
    (p) => slugify(p.chain) === chain || p.chain === chain,
  );
}

export async function getProjectsByTier(
  tier: string,
): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.tier === tier);
}

export async function getRelatedProjects(
  slug: string,
  limit = 3,
): Promise<Project[]> {
  const project = await getProject(slug);
  if (!project) return [];
  const all = await getAllProjects();
  return all
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === project.category || p.tier === project.tier),
    )
    .slice(0, limit);
}

// ── Posts (seed fallback with stub data) ──

const stubPosts: PostSummary[] = [
  {
    slug: "hivemapper-bee-review",
    type: "REVIEW",
    title: "Hivemapper Bee review: when proof-of-coverage finally feels boring",
    excerpt:
      "We drove 600 miles with the Bee. The hardware clears the bar. Earnings depend entirely on how saturated your region already is.",
    projectSlug: null,
    publishedAt: new Date("2026-05-20"),
  },
  {
    slug: "gpu-depin-squeeze",
    type: "RESEARCH",
    title:
      "The GPU DePIN squeeze: io.net, Aethir and Render now chase the same demand",
    excerpt:
      "Supply was the easy part. Three networks are competing for a demand pool smaller than the token charts implied.",
    projectSlug: null,
    publishedAt: new Date("2026-05-14"),
  },
  {
    slug: "best-depin-no-hardware-2026",
    type: "GUIDE",
    title: "Best DePIN projects with no hardware to start in 2026",
    excerpt:
      "A practical ranking of zero-cost networks you can run today on a phone or browser, with realistic expectations.",
    projectSlug: null,
    publishedAt: new Date("2026-05-08"),
  },
  {
    slug: "weatherxm-hardware-signed-climate-data",
    type: "RESEARCH",
    title: "WeatherXM and the case for hardware-signed climate data",
    excerpt:
      "Most climate data is estimated. A network of signed stations is a different asset, and insurers are noticing.",
    projectSlug: "weatherxm",
    publishedAt: new Date("2026-04-30"),
  },
  {
    slug: "geodnet-miner-review-roi",
    type: "REVIEW",
    title: "GEODNET miner review and ROI: is centimeter GPS worth $695?",
    excerpt:
      "The numbers, the friction, and who should actually buy one. Spoiler: location and line-of-sight decide everything.",
    projectSlug: "geodnet",
    publishedAt: new Date("2026-04-22"),
  },
  {
    slug: "helium-solana-one-year",
    type: "PROJECT_UPDATE",
    title: "Helium on Solana, one year on: what changed for operators",
    excerpt:
      "Migration was the headline. What it did to rewards and low-density coverage is the real story.",
    projectSlug: "helium",
    publishedAt: new Date("2026-04-15"),
  },
];

export async function getPosts(): Promise<PostSummary[]> {
  if (await canQueryDb()) {
    const rows = await prisma!.post.findMany({
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        type: true,
        title: true,
        excerpt: true,
        projectSlug: true,
        publishedAt: true,
      },
    });
    return rows;
  }
  return stubPosts;
}

export async function getPost(
  slug: string,
): Promise<PostSummary | null> {
  if (await canQueryDb()) {
    return prisma!.post.findUnique({
      where: { slug },
      select: {
        slug: true,
        type: true,
        title: true,
        excerpt: true,
        projectSlug: true,
        publishedAt: true,
      },
    });
  }
  return stubPosts.find((p) => p.slug === slug) ?? null;
}

// ── Episodes ──

import {
  episodes as seedEpisodes,
  events as seedEvents,
  courses as seedCourses,
  type EpisodeSeed,
  type EventSeed,
  type CourseSeed,
} from "@/data/content.seed";

export type { EpisodeSeed, EventSeed, CourseSeed };

export async function getEpisodes(): Promise<EpisodeSeed[]> {
  return seedEpisodes;
}

export async function getEpisode(slug: string): Promise<EpisodeSeed | null> {
  return seedEpisodes.find((e) => e.slug === slug) ?? null;
}

// ── Events ──

export async function getEvents(): Promise<EventSeed[]> {
  return seedEvents;
}

// ── Courses ──

export async function getCourses(): Promise<CourseSeed[]> {
  return seedCourses;
}

export async function getCourse(slug: string): Promise<CourseSeed | null> {
  return seedCourses.find((c) => c.slug === slug) ?? null;
}
