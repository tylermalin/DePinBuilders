import { describe, it, expect } from "vitest";
import {
  reviews,
  getReview,
  SCORE_DIMENSIONS,
} from "@/data/reviews.seed";
import { projects as seed } from "@/data/projects.seed";

// Banned words from CLAUDE.md / BRAND.md. No user-facing string may contain
// these, and editorial reviews are user-facing.
const BANNED = [
  "unleash",
  "synergy",
  "robust",
  "revolutionary",
  "game-changing",
  "cutting-edge",
  "world-class",
  "best-in-class",
  "seamless",
  "disruptive",
  "paradigm shift",
  "ai-powered",
];

function allStrings(slug: string): string[] {
  const r = reviews[slug];
  return [r.verdict, ...r.strengths, ...r.risks];
}

describe("reviews seed", () => {
  it("has a review for every project slug", () => {
    for (const p of seed) {
      expect(getReview(p.slug), `missing review for ${p.slug}`).not.toBeNull();
    }
  });

  it("has no orphan reviews without a matching project", () => {
    const slugs = new Set(seed.map((p) => p.slug));
    for (const slug of Object.keys(reviews)) {
      expect(slugs.has(slug), `orphan review ${slug}`).toBe(true);
    }
  });

  it("ships every review as an unpublished draft for now", () => {
    for (const slug of Object.keys(reviews)) {
      expect(reviews[slug].status).toBe("draft");
    }
  });

  it("has a verdict and at least one strength and risk each", () => {
    for (const slug of Object.keys(reviews)) {
      const r = reviews[slug];
      expect(r.verdict.length).toBeGreaterThan(0);
      expect(r.strengths.length).toBeGreaterThanOrEqual(1);
      expect(r.risks.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("scores every methodology dimension as an integer in 0..100", () => {
    for (const slug of Object.keys(reviews)) {
      const scores = reviews[slug].scores;
      for (const d of SCORE_DIMENSIONS) {
        const v = scores[d.key];
        expect(Number.isInteger(v), `${slug}.${d.key} not integer`).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    }
  });

  it("uses no em dashes in any user-facing review string", () => {
    for (const slug of Object.keys(reviews)) {
      for (const s of allStrings(slug)) {
        expect(s.includes("—"), `em dash in ${slug}`).toBe(false);
      }
    }
  });

  it("uses no banned words in any user-facing review string", () => {
    for (const slug of Object.keys(reviews)) {
      for (const s of allStrings(slug)) {
        const lower = s.toLowerCase();
        for (const word of BANNED) {
          expect(lower.includes(word), `"${word}" in ${slug}`).toBe(false);
        }
      }
    }
  });

  it("keeps the founder-affiliated project off the top rank", () => {
    // Conflict guardrail: malama-labs must never be the highest builder score.
    const max = Math.max(...seed.map((p) => p.builderScore));
    const malama = seed.find((p) => p.slug === "malama-labs");
    expect(malama).toBeDefined();
    expect(malama!.builderScore).toBeLessThan(max);
  });
});
