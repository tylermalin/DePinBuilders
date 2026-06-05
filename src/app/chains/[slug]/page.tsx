import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getChains,
  getProjectsByChain,
  tierDisplay,
} from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { CHAIN_INTROS } from "@/lib/editorial";
import { tokenDisplay, costDisplay, yieldDisplay } from "@/lib/format";
import { chipColor } from "@/lib/colors";
import { projects as seedAll } from "@/data/projects.seed";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { FrictionBars } from "@/components/ui/friction-bars";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Disclosure } from "@/components/ui/disclosure";

export async function generateStaticParams() {
  const chains = await getChains();
  return chains.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chains = await getChains();
  const chain = chains.find((c) => c.slug === slug);
  if (!chain) return {};
  return pageMeta({
    title: `${chain.name} DePIN Projects (2026)`,
    description: `All ${chain.count} DePIN projects building on ${chain.name}. Compare by builder score, hardware cost, and yield. Updated weekly.`,
    path: `/chains/${slug}`,
  });
}

export default async function ChainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [chains, projects] = await Promise.all([
    getChains(),
    getProjectsByChain(slug),
  ]);
  const chain = chains.find((c) => c.slug === slug);
  if (!chain || projects.length === 0) notFound();

  const siblings = chains.filter((c) => c.slug !== slug);
  const editorial = CHAIN_INTROS[chain.name];

  const jsonLd = [
    itemListSchema(
      `${chain.name} DePIN Projects`,
      projects.map((p) => ({ name: p.name, slug: p.slug })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: chain.name, path: `/chains/${slug}` },
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
          <span className="text-ink">{chain.name}</span>
        </nav>

        <SectionHeader
          kicker={`${chain.count} projects on ${chain.name}`}
          title={`${chain.name} DePIN Projects`}
        />

        {editorial && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            {editorial}
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
                    <span className="truncate font-display text-base font-semibold">{p.name}</span>
                    <VerifiedBadge verified={p.verified} />
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted">
                    {tokenDisplay(p.token)} · {p.category} · {tierDisplay(p.tier)}
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

        {/* Sibling chains */}
        <div className="mt-10">
          <h2 className="mb-3 font-display text-lg font-semibold">Other chains</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/chains/${s.slug}`}>
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
