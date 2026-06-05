import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getComparisonPairs,
  getProject,
  tierDisplay,
  slugify,
  type Project,
} from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { comparisonVerdict } from "@/lib/editorial";
import {
  tokenDisplay,
  costDisplay,
  yieldDisplay,
  breakEvenDisplay,
} from "@/lib/format";
import { frictionLabel } from "@/components/ui/friction-bars";
import { chipColor } from "@/lib/colors";
import { projects as seedAll } from "@/data/projects.seed";
import { SectionHeader } from "@/components/ui/section-header";
import { FrictionBars } from "@/components/ui/friction-bars";
import { Disclosure } from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const pairs = await getComparisonPairs();
  return pairs.map((pair) => ({ pair }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const [slugA, slugB] = parsePair(pair);
  const [a, b] = await Promise.all([getProject(slugA), getProject(slugB)]);
  if (!a || !b) return {};
  return pageMeta({
    title: `${a.name} vs ${b.name}: DePIN Comparison (2026)`,
    description: `Side-by-side comparison of ${a.name} and ${b.name}. Hardware cost, reported yield, builder score, and install friction compared. Which ${a.category} DePIN project fits your setup?`,
    path: `/compare/${pair}`,
  });
}

function parsePair(pair: string): [string, string] {
  const idx = pair.indexOf("-vs-");
  if (idx === -1) return ["", ""];
  return [pair.slice(0, idx), pair.slice(idx + 4)];
}

const SPEC_ROWS: {
  label: string;
  fn: (p: Project) => string;
}[] = [
  { label: "Token", fn: (p) => tokenDisplay(p.token) },
  { label: "Category", fn: (p) => p.category },
  { label: "Tier", fn: (p) => tierDisplay(p.tier) },
  { label: "Chain", fn: (p) => p.chain },
  { label: "Hardware cost", fn: (p) => costDisplay(p.hardwareCostUsd) },
  { label: "Reported yield/day", fn: (p) => yieldDisplay(p) },
  { label: "Break-even", fn: (p) => breakEvenDisplay(p.breakEvenMonths) },
  { label: "Friction", fn: (p) => frictionLabel(p.frictionLevel) },
  { label: "Power draw", fn: (p) => (p.powerWatts ? `${p.powerWatts} W` : "n/a") },
  { label: "Verified", fn: (p) => (p.verified ? "Yes" : "No") },
  { label: "Builder score", fn: (p) => `${p.builderScore} / 100` },
  { label: "30-day change", fn: (p) => `${p.change30d >= 0 ? "+" : ""}${p.change30d}%` },
];

export default async function ComparePage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const [slugA, slugB] = parsePair(pair);
  const [a, b] = await Promise.all([getProject(slugA), getProject(slugB)]);
  if (!a || !b) notFound();

  const siA = seedAll.findIndex((s) => s.slug === a.slug);
  const siB = seedAll.findIndex((s) => s.slug === b.slug);
  const verdict = comparisonVerdict(a, b);

  const jsonLd = [
    itemListSchema(`${a.name} vs ${b.name}`, [
      { name: a.name, slug: a.slug },
      { name: b.name, slug: b.slug },
    ]),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: `${a.name} vs ${b.name}`, path: `/compare/${pair}` },
    ]),
  ];

  return (
    <div className="bg-paper">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] text-muted">
          <Link href="/" className="hover:text-orange-ink">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/projects" className="hover:text-orange-ink">Projects</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{a.name} vs {b.name}</span>
        </nav>

        <SectionHeader
          kicker={`${a.category} comparison`}
          title={`${a.name} vs ${b.name}`}
        />

        {/* Verdict */}
        <div className="mt-6 max-w-3xl rounded-[6px] border-l-[3px] border-orange bg-surface p-5">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-orange-ink">
            Verdict
          </div>
          <p className="text-[15px] leading-relaxed text-ink-soft">{verdict}</p>
        </div>

        {/* Side-by-side table */}
        <div className="mt-8 overflow-hidden rounded-[6px] border-[1.5px] border-ink">
          {/* Header */}
          <div className="grid grid-cols-[160px_1fr_1fr] border-b-[1.5px] border-ink bg-ink text-paper max-sm:grid-cols-[100px_1fr_1fr]">
            <div className="px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted" />
            {[a, b].map((p, idx) => (
              <div
                key={p.slug}
                className="flex items-center gap-2.5 border-l border-line px-3.5 py-3"
              >
                <span
                  className="grid h-[28px] w-[28px] flex-none place-items-center rounded-[5px] font-display text-xs font-bold text-white"
                  style={{
                    backgroundColor: chipColor(idx === 0 ? (siA >= 0 ? siA : 0) : (siB >= 0 ? siB : 0)),
                  }}
                >
                  {p.name[0]}
                </span>
                <span className="font-display text-base font-semibold">{p.name}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {SPEC_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[160px_1fr_1fr] border-b border-line last:border-b-0 max-sm:grid-cols-[100px_1fr_1fr]"
            >
              <div className="flex items-center bg-surface-2 px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                {row.label}
              </div>
              <div className="border-l border-line px-3.5 py-3 text-[13.5px] font-semibold">
                {row.fn(a)}
              </div>
              <div className="border-l border-line px-3.5 py-3 text-[13.5px] font-semibold">
                {row.fn(b)}
              </div>
            </div>
          ))}

          {/* Friction visual row */}
          <div className="grid grid-cols-[160px_1fr_1fr] border-t border-line max-sm:grid-cols-[100px_1fr_1fr]">
            <div className="flex items-center bg-surface-2 px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
              Friction (visual)
            </div>
            <div className="flex items-center border-l border-line px-3.5 py-3">
              <FrictionBars level={a.frictionLevel} />
            </div>
            <div className="flex items-center border-l border-line px-3.5 py-3">
              <FrictionBars level={b.frictionLevel} />
            </div>
          </div>
        </div>

        {/* Links back to both projects */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/projects/${a.slug}`}>
            <Button>View {a.name} &rarr;</Button>
          </Link>
          <Link href={`/projects/${b.slug}`}>
            <Button>View {b.name} &rarr;</Button>
          </Link>
          <Link href={`/categories/${slugify(a.category)}`}>
            <Button variant="ghost">All {a.category} projects</Button>
          </Link>
        </div>

        <Disclosure className="mt-8 max-w-3xl">
          All data is indicative and drawn from public sources and operator reports.
          Token prices and yields change frequently. Nothing here is financial advice.
        </Disclosure>
      </div>
    </div>
  );
}
