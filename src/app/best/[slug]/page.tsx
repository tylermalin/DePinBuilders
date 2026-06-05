import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategories,
  getProjectsByCategory,
  tierDisplay,
} from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { CATEGORY_INTROS } from "@/lib/editorial";
import { tokenDisplay, costDisplay, yieldDisplay, breakEvenDisplay } from "@/lib/format";
import { chipColor } from "@/lib/colors";
import { projects as seedAll } from "@/data/projects.seed";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { FrictionBars } from "@/components/ui/friction-bars";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Disclosure } from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  return pageMeta({
    title: `Best ${cat.name} DePIN Projects to Deploy in 2026`,
    description: `Ranked list of the top ${cat.name.toLowerCase()} DePIN networks for operators in 2026. Scored on verified demand, hardware cost, and realistic yield. No hype, just data.`,
    path: `/best/${slug}`,
  });
}

export default async function BestOfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cats, projects] = await Promise.all([
    getCategories(),
    getProjectsByCategory(slug),
  ]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat || projects.length === 0) notFound();

  // Sort by score descending for the ranked list
  const ranked = [...projects].sort((a, b) => b.builderScore - a.builderScore);
  const editorial = CATEGORY_INTROS[cat.name];

  const jsonLd = [
    itemListSchema(
      `Best ${cat.name} DePIN Projects 2026`,
      ranked.map((p) => ({ name: p.name, slug: p.slug })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: `Best ${cat.name}`, path: `/best/${slug}` },
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
          <Link href={`/categories/${slug}`} className="hover:text-orange-ink">{cat.name}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">Best of 2026</span>
        </nav>

        <SectionHeader
          kicker={`Ranked · ${ranked.length} projects`}
          title={`Best ${cat.name} DePIN Projects 2026`}
        />

        {editorial && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            {editorial.bestOf}
          </p>
        )}

        {/* Ranked list */}
        <div className="mt-8 space-y-4">
          {ranked.map((p, i) => {
            const si = seedAll.findIndex((s) => s.slug === p.slug);
            return (
              <div
                key={p.slug}
                className="overflow-hidden rounded-[6px] border-[1.5px] border-line bg-surface transition-all hover:border-ink hover:shadow-[var(--shadow)]"
              >
                <div className="flex items-start gap-5 px-5 py-5">
                  {/* Rank number */}
                  <span className="flex-none font-display text-[28px] font-bold leading-none text-muted">
                    {i + 1}
                  </span>

                  {/* Logo */}
                  <span
                    className="mt-0.5 grid h-[42px] w-[42px] flex-none place-items-center rounded-[8px] font-display text-[17px] font-bold text-white"
                    style={{ backgroundColor: chipColor(si >= 0 ? si : 0) }}
                  >
                    {p.name[0]}
                  </span>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-display text-lg font-semibold hover:text-orange-ink"
                      >
                        {p.name}
                      </Link>
                      <VerifiedBadge verified={p.verified} />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Tag variant="tier">{tierDisplay(p.tier)}</Tag>
                      <span className="font-mono text-[10px] text-muted">
                        {tokenDisplay(p.token)} · {p.chain}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {p.blurb}
                    </p>
                  </div>

                  {/* Score column */}
                  <div className="hidden flex-none text-right sm:block">
                    <div className="font-display text-2xl font-bold">{p.builderScore}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                      Score
                    </div>
                    <div className="mt-2">
                      <FrictionBars level={p.frictionLevel} />
                    </div>
                  </div>
                </div>

                {/* Bottom stats bar */}
                <div className="grid grid-cols-3 border-t border-line sm:grid-cols-4">
                  <Stat label="Hardware" value={costDisplay(p.hardwareCostUsd)} />
                  <Stat label="Yield/day" value={yieldDisplay(p)} highlight />
                  <Stat label="Break-even" value={breakEvenDisplay(p.breakEvenMonths)} />
                  <div className="hidden border-l border-line sm:block">
                    <Stat label="Power" value={p.powerWatts ? `${p.powerWatts} W` : "n/a"} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/categories/${slug}`}>
            <Button variant="ghost">All {cat.name} projects &rarr;</Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost">Full directory &rarr;</Button>
          </Link>
        </div>

        <Disclosure className="mt-8 max-w-3xl">
          Rankings are editorial and based on the DePin.Builders methodology. All
          yields and costs are indicative. Nothing here is financial advice.
        </Disclosure>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="border-l border-line px-3.5 py-3 first:border-l-0">
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
        {label}
      </div>
      <div
        className={`mt-0.5 text-sm font-semibold ${highlight ? "text-orange-ink" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
