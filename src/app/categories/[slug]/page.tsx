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
import { tokenDisplay, costDisplay, yieldDisplay } from "@/lib/format";
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
    title: `Best ${cat.name} DePIN Projects (2026)`,
    description: `Compare ${cat.count} ${cat.name.toLowerCase()} DePIN projects by builder score, hardware cost, and reported yield. Verified data, updated weekly.`,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({
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

  const siblings = cats.filter((c) => c.slug !== slug);
  const editorial = CATEGORY_INTROS[cat.name];

  const jsonLd = [
    itemListSchema(
      `${cat.name} DePIN Projects`,
      projects.map((p) => ({ name: p.name, slug: p.slug })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: cat.name, path: `/categories/${slug}` },
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] text-muted">
          <Link href="/" className="hover:text-orange-ink">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/projects" className="hover:text-orange-ink">Projects</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{cat.name}</span>
        </nav>

        <SectionHeader
          kicker={`${cat.count} projects`}
          title={`${cat.name} DePIN Projects`}
          action={
            <Link href={`/best/${slug}`}>
              <Button variant="ghost" size="sm">
                Best of {cat.name} &rarr;
              </Button>
            </Link>
          }
        />

        {/* Editorial intro */}
        {editorial && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            {editorial.intro}
          </p>
        )}

        {/* Project list */}
        <div className="mt-8 space-y-3">
          {projects.map((p) => {
            const si = seedAll.findIndex((s) => s.slug === p.slug);
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="flex items-center gap-4 rounded-[6px] border-[1.5px] border-line bg-surface px-5 py-4 transition-all hover:border-ink hover:shadow-[var(--shadow)]"
              >
                <span
                  className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[7px] font-display text-sm font-bold text-white"
                  style={{ backgroundColor: chipColor(si >= 0 ? si : 0) }}
                >
                  {p.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-base font-semibold">
                      {p.name}
                    </span>
                    <VerifiedBadge verified={p.verified} />
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted">
                    {tokenDisplay(p.token)} · {p.chain} · {tierDisplay(p.tier)}
                  </div>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase text-muted">Cost</div>
                    <div className="text-sm font-semibold">{costDisplay(p.hardwareCostUsd)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase text-muted">Yield/day</div>
                    <div className="text-sm font-semibold text-orange-ink">{yieldDisplay(p)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase text-muted">Score</div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-base font-bold">{p.builderScore}</span>
                      <FrictionBars level={p.frictionLevel} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sibling categories */}
        <div className="mt-10">
          <h2 className="mb-3 font-display text-lg font-semibold">Other categories</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/categories/${s.slug}`}>
                <Tag>{s.name} ({s.count})</Tag>
              </Link>
            ))}
          </div>
        </div>

        <Disclosure className="mt-8 max-w-3xl">
          All yields and costs are indicative, drawn from public sources and operator
          reports. Token-denominated rewards fluctuate with price. Nothing here is
          financial advice.
        </Disclosure>
      </div>
    </div>
  );
}
