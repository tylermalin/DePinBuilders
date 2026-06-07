import { prisma } from "./db";
import {
  projects as seedProjects,
  type ProjectSeed,
} from "@/data/projects.seed";
import { getReview } from "@/data/reviews.seed";
import {
  getBlogPosts,
  getBlogPost,
  type BlogPostSeed,
} from "@/data/posts.seed";
export type { BlogPostSeed };

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
    review: getReview(p.slug),
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
      // Editorial review content is seed-sourced for now; the DB ProjectReview
      // table is wired alongside live data later (see DATA-MODEL.md).
      review: getReview(r.slug),
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
      review: getReview(row.slug),
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

export async function getPosts(): Promise<PostSummary[]> {
  return getBlogPosts().map((p) => ({
    slug: p.slug,
    type: p.type,
    title: p.title,
    excerpt: p.excerpt,
    projectSlug: p.projectSlug,
    publishedAt: new Date(p.publishedAt),
  }));
}

export async function getPost(slug: string): Promise<BlogPostSeed | null> {
  return getBlogPost(slug);
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
