import { describe, it, expect } from "vitest";
import { rankProjects, scoreFor } from "../rankings";
import { scoreHeat } from "../colors";
import { getAllProjects } from "../data";

describe("scoreFor", () => {
  it("returns builderScore for the composite key", async () => {
    const [p] = await getAllProjects();
    expect(scoreFor(p, "composite")).toBe(p.builderScore);
  });

  it("returns the dimension score when a review exists", async () => {
    const projects = await getAllProjects();
    const geodnet = projects.find((p) => p.slug === "geodnet")!;
    expect(scoreFor(geodnet, "realRevenue")).toBe(
      geodnet.review!.scores.realRevenue,
    );
  });

  it("returns -1 on a dimension when there is no review", () => {
    const stub = {
      slug: "x",
      name: "X",
      builderScore: 50,
      review: null,
    } as Parameters<typeof scoreFor>[0];
    expect(scoreFor(stub, "transparency")).toBe(-1);
    // composite still works off builderScore
    expect(scoreFor(stub, "composite")).toBe(50);
  });
});

describe("rankProjects", () => {
  it("ranks by composite descending by default", async () => {
    const projects = await getAllProjects();
    const ranked = rankProjects(projects, "composite", -1);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].builderScore).toBeGreaterThanOrEqual(
        ranked[i].builderScore,
      );
    }
    // highest builder score is GEODNET (91)
    expect(ranked[0].slug).toBe("geodnet");
  });

  it("never puts the founder-affiliated project at the default top sort", async () => {
    // The guardrail (DATA-MODEL.md) is that the conflict-disclosed project must
    // never be the DEFAULT top rank, which is the composite. It may legitimately
    // lead a single dimension it genuinely scores highest on (e.g. transparency).
    const projects = await getAllProjects();
    const ranked = rankProjects(projects, "composite", -1);
    expect(ranked[0].slug).not.toBe("malama-labs");
  });

  it("sorts ascending when direction is 1", async () => {
    const projects = await getAllProjects();
    const ranked = rankProjects(projects, "composite", 1);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].builderScore).toBeLessThanOrEqual(
        ranked[i].builderScore,
      );
    }
  });

  it("orders correctly when sorting by a dimension", async () => {
    const projects = await getAllProjects();
    const ranked = rankProjects(projects, "decentralization", -1);
    for (let i = 1; i < ranked.length; i++) {
      expect(scoreFor(ranked[i - 1], "decentralization")).toBeGreaterThanOrEqual(
        scoreFor(ranked[i], "decentralization"),
      );
    }
  });

  it("does not mutate the input array", async () => {
    const projects = await getAllProjects();
    const before = projects.map((p) => p.slug);
    rankProjects(projects, "composite", -1);
    expect(projects.map((p) => p.slug)).toEqual(before);
  });
});

describe("scoreHeat", () => {
  it("returns transparent for a missing score", () => {
    expect(scoreHeat(-1)).toBe("transparent");
  });

  it("uses the good token for high scores and bad for low", () => {
    expect(scoreHeat(90)).toContain("--good");
    expect(scoreHeat(45)).toContain("--bad");
  });

  it("scales intensity with the score", () => {
    const pct = (s: string) => Number(s.match(/(\d+)%/)![1]);
    expect(pct(scoreHeat(95))).toBeGreaterThan(pct(scoreHeat(72)));
  });
});
