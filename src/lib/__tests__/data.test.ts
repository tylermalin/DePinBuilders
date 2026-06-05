import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getProject,
  getCategories,
  getChains,
  getComparisonPairs,
  getProjectsByCategory,
  getProjectsByChain,
  getRelatedProjects,
  getPosts,
  tierDisplay,
} from "../data";
import { projects as seed } from "@/data/projects.seed";

// These tests exercise the seed-fallback path (no DATABASE_URL).

describe("getAllProjects", () => {
  it("returns all seed projects sorted by builderScore desc", async () => {
    const result = await getAllProjects();
    expect(result).toHaveLength(seed.length);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].builderScore).toBeGreaterThanOrEqual(
        result[i].builderScore,
      );
    }
  });

  it("includes required fields on every project", async () => {
    const result = await getAllProjects();
    for (const p of result) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.tier).toBeTruthy();
      expect(p.chain).toBeTruthy();
      expect(typeof p.builderScore).toBe("number");
      expect(typeof p.verified).toBe("boolean");
      expect(p.regionDensity).toBeDefined();
    }
  });
});

describe("getProject", () => {
  it("returns a project by slug", async () => {
    const p = await getProject("geodnet");
    expect(p).not.toBeNull();
    expect(p!.name).toBe("GEODNET");
    expect(p!.builderScore).toBe(91);
  });

  it("returns null for unknown slug", async () => {
    const p = await getProject("does-not-exist");
    expect(p).toBeNull();
  });
});

describe("getCategories", () => {
  it("returns unique categories with counts", async () => {
    const cats = await getCategories();
    expect(cats.length).toBeGreaterThan(0);
    for (const c of cats) {
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.count).toBeGreaterThan(0);
    }
    // Verify no duplicates
    const slugs = cats.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("categories are sorted alphabetically", async () => {
    const cats = await getCategories();
    for (let i = 1; i < cats.length; i++) {
      expect(cats[i - 1].name.localeCompare(cats[i].name)).toBeLessThanOrEqual(
        0,
      );
    }
  });
});

describe("getChains", () => {
  it("returns unique chains with counts", async () => {
    const chains = await getChains();
    expect(chains.length).toBeGreaterThan(0);
    const slugs = chains.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes Solana (the most common chain in seed)", async () => {
    const chains = await getChains();
    const solana = chains.find((c) => c.name === "Solana");
    expect(solana).toBeDefined();
    expect(solana!.count).toBeGreaterThanOrEqual(5);
  });
});

describe("getComparisonPairs", () => {
  it("returns pairs in alphabetical slug order", async () => {
    const pairs = await getComparisonPairs();
    expect(pairs.length).toBeGreaterThan(0);
    for (const pair of pairs) {
      expect(pair).toMatch(/^[a-z0-9-]+-vs-[a-z0-9-]+$/);
      const [a, b] = pair.split("-vs-");
      expect(a.localeCompare(b)).toBeLessThan(0);
    }
  });

  it("only pairs verified projects in the same category", async () => {
    const allProjects = await getAllProjects();
    const pairs = await getComparisonPairs();
    for (const pair of pairs) {
      const [aSlug, bSlug] = pair.split("-vs-");
      const a = allProjects.find((p) => p.slug === aSlug);
      const b = allProjects.find((p) => p.slug === bSlug);
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect(a!.verified).toBe(true);
      expect(b!.verified).toBe(true);
      expect(a!.category).toBe(b!.category);
    }
  });

  it("includes geodnet-vs-onocoy (both verified Positioning)", async () => {
    const pairs = await getComparisonPairs();
    expect(pairs).toContain("geodnet-vs-onocoy");
  });
});

describe("getProjectsByCategory", () => {
  it("returns projects matching the category slug", async () => {
    const result = await getProjectsByCategory("positioning");
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.category.toLowerCase()).toContain("positioning");
    }
  });
});

describe("getProjectsByChain", () => {
  it("returns projects on a given chain", async () => {
    const result = await getProjectsByChain("solana");
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.chain.toLowerCase()).toBe("solana");
    }
  });
});

describe("getRelatedProjects", () => {
  it("returns related projects excluding self", async () => {
    const related = await getRelatedProjects("geodnet", 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((p) => p.slug !== "geodnet")).toBe(true);
  });

  it("returns empty array for unknown slug", async () => {
    const related = await getRelatedProjects("nope");
    expect(related).toEqual([]);
  });
});

describe("getPosts", () => {
  it("returns stub posts in seed fallback", async () => {
    const posts = await getPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.type).toBeTruthy();
    }
  });
});

describe("tierDisplay", () => {
  it("maps enum values to display names", () => {
    expect(tierDisplay("SET_AND_FORGET")).toBe("Set & Forget");
    expect(tierDisplay("INFRASTRUCTURE")).toBe("Infrastructure");
    expect(tierDisplay("FRICTIONLESS")).toBe("Frictionless");
    expect(tierDisplay("ENTERPRISE")).toBe("Enterprise");
  });

  it("returns raw value for unknown tiers", () => {
    expect(tierDisplay("UNKNOWN")).toBe("UNKNOWN");
  });
});

describe("conflict disclosure", () => {
  it("malama-labs has a non-null conflictDisclosure", async () => {
    const p = await getProject("malama-labs");
    expect(p).not.toBeNull();
    expect(p!.conflictDisclosure).toBeTruthy();
    expect(p!.conflictDisclosure).toContain("founder");
  });

  it("founder-conflict project does not rank first by score", async () => {
    const all = await getAllProjects();
    const first = all[0];
    expect(first.slug).not.toBe("malama-labs");
  });
});
