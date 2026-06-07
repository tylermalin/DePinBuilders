import type { MetadataRoute } from "next";
import {
  getAllProjects,
  getCategories,
  getChains,
  getComparisonPairs,
  getPosts,
  getEpisodes,
  getCourses,
} from "@/lib/data";
import { getReportSlugs } from "@/data/reports.seed";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://depin.builders";

  const [projects, cats, chains, compares, posts, episodes, courses] =
    await Promise.all([
      getAllProjects(),
      getCategories(),
      getChains(),
      getComparisonPairs(),
      getPosts(),
      getEpisodes(),
      getCourses(),
    ]);

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = cats.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    priority: 0.6,
  }));

  const bestOfRoutes = cats.map((c) => ({
    url: `${base}/best/${c.slug}`,
    priority: 0.6,
  }));

  const chainRoutes = chains.map((c) => ({
    url: `${base}/chains/${c.slug}`,
    priority: 0.5,
  }));

  const compareRoutes = compares.map((s) => ({
    url: `${base}/compare/${s}`,
    priority: 0.5,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const episodeRoutes = episodes.map((e) => ({
    url: `${base}/podcasts/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const courseRoutes = courses.map((c) => ({
    url: `${base}/academy/${c.slug}`,
    priority: 0.5,
  }));

  const reportRoutes = getReportSlugs().map((slug) => ({
    url: `${base}/reports/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    "",
    "/projects",
    "/tools/roi-calculator",
    "/tools/compare",
    "/map",
    "/academy",
    "/blog",
    "/reports",
    "/podcasts",
    "/events",
    "/about",
  ].map((p) => ({
    url: `${base}${p}`,
    priority: p === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...categoryRoutes,
    ...bestOfRoutes,
    ...chainRoutes,
    ...compareRoutes,
    ...postRoutes,
    ...episodeRoutes,
    ...courseRoutes,
    ...reportRoutes,
  ];
}
