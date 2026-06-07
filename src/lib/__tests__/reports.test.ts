import { describe, it, expect } from "vitest";
import { reports, getReport, getReportSlugs } from "@/data/reports.seed";
import { METHODOLOGY, METHODOLOGY_TOTAL_WEIGHT } from "../methodology";
import { reviews } from "@/data/reviews.seed";
import { projects as seed } from "@/data/projects.seed";

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

/** Every user-facing string in a report. */
function reportStrings(slug: string): string[] {
  const r = reports[slug];
  const out: string[] = [r.title, r.dek, ...r.executiveSummary];
  for (const m of r.profile) out.push(m.label, m.value);
  for (const note of Object.values(r.dimensionNotes)) out.push(note);
  for (const b of r.body) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3") out.push(b.text);
    if (b.type === "list") out.push(...b.items);
    if (b.type === "table") {
      out.push(...b.headers);
      for (const row of b.rows) out.push(...row);
      if (b.caption) out.push(b.caption);
    }
  }
  return out;
}

describe("methodology", () => {
  it("weights sum to 100", () => {
    expect(METHODOLOGY_TOTAL_WEIGHT).toBe(100);
  });

  it("covers exactly the six review-score dimensions", () => {
    const dimKeys = METHODOLOGY.map((d) => d.key).sort();
    const scoreKeys = Object.keys(reviews.geodnet.scores).sort();
    expect(dimKeys).toEqual(scoreKeys);
  });
});

describe("reports seed", () => {
  it("every report slug maps to a real project", () => {
    const slugs = new Set(seed.map((p) => p.slug));
    for (const slug of getReportSlugs()) {
      expect(slugs.has(slug), `report ${slug} has no project`).toBe(true);
    }
  });

  it("ships every report as a draft for now", () => {
    for (const slug of getReportSlugs()) {
      expect(getReport(slug)!.status).toBe("draft");
    }
  });

  it("has a report for geodnet with all required parts", () => {
    const r = getReport("geodnet")!;
    expect(r).toBeTruthy();
    expect(r.executiveSummary.length).toBeGreaterThanOrEqual(1);
    expect(r.profile.length).toBeGreaterThanOrEqual(4);
    expect(r.body.length).toBeGreaterThan(5);
  });

  it("provides a dimension note for all six methodology dimensions", () => {
    for (const slug of getReportSlugs()) {
      const notes = getReport(slug)!.dimensionNotes;
      for (const d of METHODOLOGY) {
        expect(notes[d.key], `${slug} missing note for ${d.key}`).toBeTruthy();
      }
    }
  });

  it("uses no em dashes in any report string", () => {
    for (const slug of getReportSlugs()) {
      for (const s of reportStrings(slug)) {
        expect(s.includes("—"), `em dash in ${slug}: ${s}`).toBe(false);
      }
    }
  });

  it("uses no banned words in any report string", () => {
    for (const slug of getReportSlugs()) {
      for (const s of reportStrings(slug)) {
        const lower = s.toLowerCase();
        for (const word of BANNED) {
          expect(lower.includes(word), `"${word}" in ${slug}: ${s}`).toBe(false);
        }
      }
    }
  });

  it("keeps every table row aligned to its header count", () => {
    for (const slug of getReportSlugs()) {
      for (const b of getReport(slug)!.body) {
        if (b.type === "table") {
          for (const row of b.rows) {
            expect(row.length, `${slug} table "${b.caption}"`).toBe(
              b.headers.length,
            );
          }
        }
      }
    }
  });
});
