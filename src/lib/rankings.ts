/**
 * Pure ranking helpers for the DePIN Score Matrix.
 *
 * Projects are ranked by the editorial composite (builderScore) or by any one
 * of the six published methodology dimensions. Sorting is stable and the
 * tiebreak is alphabetical by name, so the founder-affiliated project never
 * floats to the top on a tie. See docs/DATA-MODEL.md.
 */

import type { Project, ReviewScores } from "./types";

export type RankSortKey = "composite" | keyof ReviewScores;

/**
 * Numeric value for a project on a given sort key. The composite is the
 * headline builderScore. A project with no review returns -1 on a dimension
 * so unreviewed projects sink to the bottom rather than rank as zero.
 */
export function scoreFor(p: Project, key: RankSortKey): number {
  if (key === "composite") return p.builderScore;
  return p.review ? p.review.scores[key] : -1;
}

/**
 * Stable sort by the given key and direction (1 ascending, -1 descending).
 * Ties break alphabetically by name, a neutral tiebreak that does not favor
 * any project, including the conflict-disclosed one.
 */
export function rankProjects(
  projects: Project[],
  key: RankSortKey,
  dir: 1 | -1,
): Project[] {
  return [...projects].sort((a, b) => {
    const diff = (scoreFor(a, key) - scoreFor(b, key)) * dir;
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
}
