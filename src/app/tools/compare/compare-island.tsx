"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { tierDisplay } from "@/lib/types";
import {
  tokenDisplay,
  costDisplay,
  yieldDisplay,
  breakEvenDisplay,
} from "@/lib/format";
import { frictionLabel } from "@/components/ui/friction-bars";
import { FrictionBars } from "@/components/ui/friction-bars";
import { chipColor } from "@/lib/colors";

interface Props {
  projects: Project[];
  defaultSlugs: string[];
  indexMap: Record<string, number>;
}

const ROWS: { label: string; fn: (p: Project) => string }[] = [
  { label: "Token", fn: (p) => tokenDisplay(p.token) },
  { label: "Category", fn: (p) => p.category },
  { label: "Tier", fn: (p) => tierDisplay(p.tier) },
  { label: "Chain", fn: (p) => p.chain },
  { label: "Hardware cost", fn: (p) => costDisplay(p.hardwareCostUsd) },
  { label: "Reported yield/day", fn: (p) => yieldDisplay(p) },
  { label: "Break-even", fn: (p) => breakEvenDisplay(p.breakEvenMonths) },
  { label: "Friction", fn: (p) => frictionLabel(p.frictionLevel) },
  { label: "Verified", fn: (p) => (p.verified ? "Yes" : "No") },
  { label: "Builder score", fn: (p) => `${p.builderScore} / 100` },
];

export function CompareIsland({ projects, defaultSlugs, indexMap }: Props) {
  const [selected, setSelected] = useState<string[]>(defaultSlugs);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  }

  const cols = selected
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined);

  const gridCols = `160px repeat(${cols.length}, 1fr)`;

  return (
    <div>
      {/* Picker */}
      <div className="mb-5 flex flex-wrap gap-[10px]">
        {projects.map((p) => (
          <button
            key={p.slug}
            onClick={() => toggle(p.slug)}
            className={`rounded-[3px] border-[1.5px] px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.03em] transition-colors ${
              selected.includes(p.slug)
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {cols.length === 0 ? (
        <p className="py-8 text-center font-mono text-sm text-muted">
          Select up to 4 projects to compare.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="min-w-[500px] overflow-hidden rounded-[6px] border-[1.5px] border-ink"
          >
            {/* Header row */}
            <div
              className="grid border-b-[1.5px] border-ink bg-ink text-paper"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div className="px-3.5 py-3" />
              {cols.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-2 border-l border-line px-3.5 py-3"
                >
                  <span
                    className="grid h-[24px] w-[24px] flex-none place-items-center rounded-[4px] font-display text-xs font-bold text-white"
                    style={{ backgroundColor: chipColor(indexMap[p.slug] ?? 0) }}
                  >
                    {p.name[0]}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="font-display text-base font-semibold hover:text-yellow"
                  >
                    {p.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="grid border-b border-line last:border-b-0"
                style={{ gridTemplateColumns: gridCols }}
              >
                <div className="flex items-center bg-surface-2 px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  {row.label}
                </div>
                {cols.map((p) => (
                  <div
                    key={p.slug}
                    className="border-l border-line px-3.5 py-3 text-[13.5px] font-semibold"
                  >
                    {row.fn(p)}
                  </div>
                ))}
              </div>
            ))}

            {/* Friction visual row */}
            <div
              className="grid border-t border-line"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div className="flex items-center bg-surface-2 px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                Friction (visual)
              </div>
              {cols.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center border-l border-line px-3.5 py-3"
                >
                  <FrictionBars level={p.frictionLevel} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
