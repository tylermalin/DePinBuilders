"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { tierDisplay } from "@/lib/types";
import { tokenDisplay, yieldDisplay, costDisplay, breakEvenDisplay } from "@/lib/format";
import { chipColor } from "@/lib/colors";
import { FrictionBars } from "@/components/ui/friction-bars";
import { VerifiedBadge } from "@/components/ui/verified-badge";

type SortKey = "name" | "cat" | "cost" | "yield" | "roi" | "score";

interface Props {
  projects: Project[];
  categories: string[];
  chains: string[];
}

export function ProjectsDirectory({ projects, categories, chains }: Props) {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("");
  const [category, setCategory] = useState("");
  const [chain, setChain] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  // Build a stable index map so chip colors stay consistent
  const indexMap = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p, i) => m.set(p.slug, i));
    return m;
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = projects.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !(p.token ?? "").toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q)
      )
        return false;
      if (tier && tierDisplay(p.tier) !== tier) return false;
      if (category && p.category !== category) return false;
      if (chain && p.chain !== chain) return false;
      if (verifiedOnly && !p.verified) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      let x: number | string, y: number | string;
      switch (sortKey) {
        case "name":
          x = a.name.toLowerCase();
          y = b.name.toLowerCase();
          return x < y ? -sortDir : x > y ? sortDir : 0;
        case "cat":
          x = a.tier;
          y = b.tier;
          return x < y ? -sortDir : x > y ? sortDir : 0;
        case "cost":
          x = a.hardwareCostUsd;
          y = b.hardwareCostUsd;
          break;
        case "yield":
          x = a.yieldHighUsd;
          y = b.yieldHighUsd;
          break;
        case "roi":
          x = a.breakEvenMonths ?? 999;
          y = b.breakEvenMonths ?? 999;
          break;
        default:
          x = a.builderScore;
          y = b.builderScore;
      }
      return ((x as number) - (y as number)) * sortDir;
    });

    return list;
  }, [projects, query, tier, category, chain, verifiedOnly, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === -1 ? 1 : -1));
    } else {
      setSortKey(key);
      setSortDir(
        key === "name" || key === "cat" || key === "cost" || key === "roi"
          ? 1
          : -1,
      );
    }
  }

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortDir < 0 ? " \u25BE" : " \u25B4") : "";

  return (
    <div className="mt-6">
      {/* Filter bar */}
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded-[3px] border-[1.5px] border-line px-3 py-2">
          <span className="text-muted">&#x2315;</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, token, category..."
            aria-label="Search projects"
            className="w-full bg-transparent font-mono text-xs text-ink outline-none placeholder:text-muted"
          />
        </div>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="rounded-[3px] border-[1.5px] border-line bg-surface px-3 py-2 font-mono text-[11.5px] text-ink"
          aria-label="Filter by tier"
        >
          <option value="">All tiers</option>
          <option>Set &amp; Forget</option>
          <option>Infrastructure</option>
          <option>Frictionless</option>
          <option>Enterprise</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-[3px] border-[1.5px] border-line bg-surface px-3 py-2 font-mono text-[11.5px] text-ink"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="rounded-[3px] border-[1.5px] border-line bg-surface px-3 py-2 font-mono text-[11.5px] text-ink"
          aria-label="Filter by chain"
        >
          <option value="">All chains</option>
          {chains.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={verifiedOnly ? "1" : ""}
          onChange={(e) => setVerifiedOnly(e.target.value === "1")}
          className="rounded-[3px] border-[1.5px] border-line bg-surface px-3 py-2 font-mono text-[11.5px] text-ink"
          aria-label="Filter verified"
        >
          <option value="">All</option>
          <option value="1">Verified only</option>
        </select>
      </div>

      {/* Count */}
      <div className="mb-2 font-mono text-[11px] text-muted">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-surface">
        {/* Header */}
        <div
          className="sticky top-[66px] z-10 grid h-[46px] items-center gap-2 bg-ink px-4 text-paper"
          style={{
            gridTemplateColumns: "34px 2.2fr 1.3fr 1fr 1fr 1fr 1.1fr 50px",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
            #
          </span>
          <SortHead label="Project" sortKey="name" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} />
          <SortHead label="Category / Tier" sortKey="cat" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} className="max-lg:hidden" />
          <SortHead label="Hardware" sortKey="cost" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} />
          <SortHead label="Yield/day" sortKey="yield" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} className="max-lg:hidden" />
          <SortHead label="ROI" sortKey="roi" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} className="max-lg:hidden" />
          <SortHead label="Builder score" sortKey="score" current={sortKey} dir={sortDir} indicator={sortIndicator} onSort={handleSort} />
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
            ✓
          </span>
        </div>

        {/* Rows */}
        {filtered.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="grid h-16 cursor-pointer items-center gap-2 border-b border-line px-4 transition-colors last:border-b-0 hover:bg-surface-2"
            style={{
              gridTemplateColumns:
                "34px 2.2fr 1.3fr 1fr 1fr 1fr 1.1fr 50px",
            }}
          >
            {/* Rank */}
            <span className="font-display text-base font-bold text-muted">
              {i + 1}
            </span>

            {/* Name */}
            <div className="flex min-w-0 items-center gap-[11px]">
              <span
                className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] font-display text-sm font-bold text-white"
                style={{
                  backgroundColor: chipColor(indexMap.get(p.slug) ?? i),
                }}
              >
                {p.name[0]}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-base font-semibold leading-tight">
                  {p.name}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {tokenDisplay(p.token)} · {p.chain}
                </span>
              </span>
            </div>

            {/* Category / Tier */}
            <div className="max-lg:hidden">
              <div className="text-[13px] font-semibold">{p.category}</div>
              <div className="text-[11px] text-muted">
                {tierDisplay(p.tier)}
              </div>
            </div>

            {/* Hardware */}
            <div className="font-sans text-[13.5px] font-semibold">
              {costDisplay(p.hardwareCostUsd)}
            </div>

            {/* Yield/day */}
            <div className="font-mono text-[12.5px] font-semibold text-orange-ink max-lg:hidden">
              {yieldDisplay(p)}
            </div>

            {/* ROI */}
            <div className="font-mono text-[12.5px] max-lg:hidden">
              {breakEvenDisplay(p.breakEvenMonths)}
            </div>

            {/* Score + friction */}
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold">
                {p.builderScore}
              </span>
              <FrictionBars level={p.frictionLevel} />
            </div>

            {/* Verified */}
            <VerifiedBadge verified={p.verified} />
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center font-mono text-sm text-muted">
            No projects match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

/** Sortable column header */
function SortHead({
  label,
  sortKey,
  indicator,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  current?: SortKey;
  dir?: 1 | -1;
  indicator: (k: SortKey) => string;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`flex cursor-pointer select-none items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] hover:text-yellow ${className ?? ""}`}
    >
      {label}
      {indicator(sortKey)}
    </button>
  );
}
