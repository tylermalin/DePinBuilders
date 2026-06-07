"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { SCORE_DIMENSIONS } from "@/data/reviews.seed";
import { rankProjects, scoreFor, type RankSortKey } from "@/lib/rankings";
import { scoreHeat, chipColor } from "@/lib/colors";
import { tokenDisplay } from "@/lib/format";

/** Short column headers for the six dimensions (full text in the title attr) */
const SHORT: Record<string, string> = {
  realRevenue: "Revenue",
  tokenEconomics: "Tokenomics",
  decentralization: "Decentral.",
  hardwareEconomics: "Hardware",
  operatorFriction: "Ease",
  transparency: "Transp.",
};

interface Props {
  projects: Project[];
}

/**
 * The DePIN Score Matrix. Server passes projects with their review scores;
 * this island handles column sorting and renders the heatmap. Rows link to the
 * project page. Default sort is the editorial composite, highest first.
 */
export function ScoreMatrix({ projects }: Props) {
  const [sortKey, setSortKey] = useState<RankSortKey>("composite");
  const [dir, setDir] = useState<1 | -1>(-1);

  // Stable chip colors keyed by the incoming (composite) order
  const colorIndex = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p, i) => m.set(p.slug, i));
    return m;
  }, [projects]);

  const ranked = useMemo(
    () => rankProjects(projects, sortKey, dir),
    [projects, sortKey, dir],
  );

  function handleSort(key: RankSortKey) {
    if (key === sortKey) {
      setDir((d) => (d === -1 ? 1 : -1));
    } else {
      setSortKey(key);
      setDir(-1);
    }
  }

  const indicator = (key: RankSortKey) =>
    key === sortKey ? (dir < 0 ? " ▾" : " ▴") : "";

  const headBtn =
    "font-mono text-[10px] uppercase tracking-[0.06em] hover:text-orange transition-colors";

  return (
    <div className="mt-6 overflow-x-auto rounded-[6px] border-[1.5px] border-ink bg-surface">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="bg-ink text-paper">
            <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-[0.08em]">
              #
            </th>
            <th className="px-3 py-3">
              <button onClick={() => handleSort("composite")} className={headBtn}>
                Project
              </button>
            </th>
            <th className="px-3 py-3 text-center">
              <button
                onClick={() => handleSort("composite")}
                className={headBtn}
                title="The headline builder score: our weighted editorial composite of the six dimensions."
              >
                Score{indicator("composite")}
              </button>
            </th>
            {SCORE_DIMENSIONS.map((d) => (
              <th key={d.key} className="px-3 py-3 text-center">
                <button
                  onClick={() => handleSort(d.key)}
                  className={headBtn}
                  title={`${d.label}: ${d.description}`}
                >
                  {SHORT[d.key]}
                  {indicator(d.key)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ranked.map((p, i) => (
            <tr
              key={p.slug}
              className="border-t border-line transition-colors hover:bg-surface-2"
            >
              <td className="px-3 py-3 font-mono text-[12px] text-muted tabular-nums">
                {i + 1}
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid h-[28px] w-[28px] flex-none place-items-center rounded-[6px] font-display text-[12px] font-bold text-white"
                    style={{ backgroundColor: chipColor(colorIndex.get(p.slug) ?? 0) }}
                  >
                    {p.name[0]}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-display text-[14px] font-semibold hover:text-orange-ink"
                    >
                      {p.name}
                    </Link>
                    {p.conflictDisclosure && (
                      <span
                        className="ml-1 cursor-help font-bold text-orange-ink"
                        title="Founder-affiliated. Disclosed and scored on the same public methodology as every other project."
                        aria-label="Founder-affiliated, disclosed"
                      >
                        &#8225;
                      </span>
                    )}
                    <div className="font-mono text-[10px] text-muted">
                      {tokenDisplay(p.token)} &middot; {p.chain}
                    </div>
                  </div>
                </div>
              </td>
              <td
                className="px-3 py-3 text-center font-display text-[15px] font-bold tabular-nums"
                style={{ backgroundColor: scoreHeat(p.builderScore) }}
              >
                {p.builderScore}
              </td>
              {SCORE_DIMENSIONS.map((d) => {
                const v = scoreFor(p, d.key);
                return (
                  <td
                    key={d.key}
                    className="px-3 py-3 text-center text-[13px] font-semibold tabular-nums"
                    style={{ backgroundColor: scoreHeat(v) }}
                  >
                    {v < 0 ? "—" : v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
