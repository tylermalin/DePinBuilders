import { notFound } from "next/navigation";
import Link from "next/link";

/** ISR: revalidate project pages every hour for live price data */
export const revalidate = 3600;
import {
  getAllProjects,
  getProject,
  getRelatedProjects,
  getComparisonPairsForProject,
  tierDisplay,
  slugify,
} from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { productSchema, breadcrumbSchema, reviewSchema } from "@/lib/schema";
import { ReviewSection } from "@/components/project/review-section";
import { ReportSummary } from "@/components/project/report-summary";
import { ProjectLinks } from "@/components/project/project-links";
import { getReport } from "@/data/reports.seed";
import { getLinks } from "@/data/links.seed";
import { projectTitle, projectDescription } from "@/lib/project-meta";
import {
  tokenDisplay,
  yieldDisplay,
  costDisplay,
  breakEvenDisplay,
} from "@/lib/format";
import { chipColor } from "@/lib/colors";
import { projects as seedAll } from "@/data/projects.seed";
import { Tag } from "@/components/ui/tag";
import { FrictionBars, frictionLabel } from "@/components/ui/friction-bars";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { CodeChip } from "@/components/ui/code-chip";
import { Disclosure, ConflictDisclosure } from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// ── Static params ──

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Metadata ──

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMeta({
    title: projectTitle(project),
    description: projectDescription(project),
    path: `/projects/${slug}`,
  });
}

// ── Page ──

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const [related, comparisonPairs] = await Promise.all([
    getRelatedProjects(slug, 3),
    getComparisonPairsForProject(slug),
  ]);

  const report = getReport(slug);
  const projectLinks = getLinks(slug);

  // Stable color index from seed ordering
  const seedIndex = seedAll.findIndex((s) => s.slug === slug);
  const color = chipColor(seedIndex >= 0 ? seedIndex : 0);
  const categorySlug = slugify(project.category);
  const chainSlug = slugify(project.chain);

  const jsonLd = [
    productSchema({
      name: project.name,
      description: project.blurb,
      slug: project.slug,
      hardwareCostUsd: project.hardwareCostUsd,
      builderScore: project.builderScore,
      category: project.category,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path: `/projects/${slug}` },
    ]),
    ...(project.review
      ? [
          reviewSchema({
            name: project.name,
            slug: project.slug,
            verdict: project.review.verdict,
            builderScore: project.builderScore,
            category: project.category,
          }),
        ]
      : []),
  ];

  const specRows = [
    { label: "Builder score", value: `${project.builderScore} / 100` },
    { label: "Hardware cost", value: costDisplay(project.hardwareCostUsd) },
    { label: "Reported yield", value: yieldDisplay(project) },
    {
      label: "Est. break-even",
      value: breakEvenDisplay(project.breakEvenMonths),
    },
    { label: "Friction level", value: frictionLabel(project.frictionLevel) },
    {
      label: "Power draw",
      value: project.powerWatts ? `${project.powerWatts} W` : "n/a",
    },
    { label: "Chain", value: project.chain },
    {
      label: "30-day score change",
      value: `${project.change30d >= 0 ? "+" : ""}${project.change30d}%`,
    },
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
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-mono text-[11px] text-muted"
        >
          <Link href="/" className="hover:text-orange-ink">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/projects" className="hover:text-orange-ink">
            Projects
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{project.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-4">
              <span
                className="grid h-[54px] w-[54px] flex-none place-items-center rounded-[11px] font-display text-[22px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {project.name[0]}
              </span>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight">
                  {project.name}
                </h1>
                <div className="mt-1 font-mono text-xs text-muted">
                  {tokenDisplay(project.token)} · {project.chain}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag variant="tier">{tierDisplay(project.tier)}</Tag>
              <Link href={`/categories/${categorySlug}`}>
                <Tag>{project.category}</Tag>
              </Link>
              {project.verified && (
                <VerifiedBadge verified showLabel />
              )}
              {!project.verified && (
                <VerifiedBadge verified={false} showLabel />
              )}
            </div>

            {/* Blurb */}
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {project.blurb}
            </p>

            {/* Analytical report summary with CTA to the full report */}
            {report && (
              <ReportSummary report={report} projectName={project.name} />
            )}

            {/* Affiliate code */}
            {project.affiliateCode && (
              <div className="mt-6">
                <CodeChip
                  code={project.affiliateCode}
                  discount={project.affiliateDiscount}
                />
              </div>
            )}

            {/* Conflict disclosure */}
            {project.conflictDisclosure && (
              <div className="mt-6 max-w-xl">
                <ConflictDisclosure>
                  {project.conflictDisclosure}
                </ConflictDisclosure>
              </div>
            )}

            {/* Editorial review: verdict, score breakdown, strengths, risks */}
            <ReviewSection project={project} />

            {/* Internal links */}
            <div className="mt-12">
              <h2 className="mb-3 font-display text-lg font-semibold">
                Explore further
              </h2>
              <div className="flex flex-wrap gap-2">
                <Link href={`/categories/${categorySlug}`}>
                  <Button variant="ghost" size="sm">
                    {project.category} projects
                  </Button>
                </Link>
                <Link href={`/chains/${chainSlug}`}>
                  <Button variant="ghost" size="sm">
                    {project.chain} DePIN
                  </Button>
                </Link>
                {comparisonPairs.map((cp) => (
                  <Link key={cp.pair} href={`/compare/${cp.pair}`}>
                    <Button variant="ghost" size="sm">
                      vs {cp.otherName}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related projects */}
            {related.length > 0 && (
              <div className="mt-10">
                <SectionHeader
                  kicker="Related projects"
                  title="Similar networks"
                  className="mb-6"
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => {
                    const ri = seedAll.findIndex((s) => s.slug === r.slug);
                    return (
                      <Link
                        key={r.slug}
                        href={`/projects/${r.slug}`}
                        className="group rounded-[6px] border-[1.5px] border-line bg-surface p-4 transition-all hover:border-ink hover:shadow-[var(--shadow)]"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] font-display text-sm font-bold text-white"
                            style={{
                              backgroundColor: chipColor(ri >= 0 ? ri : 0),
                            }}
                          >
                            {r.name[0]}
                          </span>
                          <div className="min-w-0">
                            <div className="truncate font-display font-semibold group-hover:text-orange-ink">
                              {r.name}
                            </div>
                            <div className="font-mono text-[10px] text-muted">
                              {tokenDisplay(r.token)} · {r.chain}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Tag variant="tier">{tierDisplay(r.tier)}</Tag>
                          <span className="font-display text-sm font-bold">
                            {r.builderScore}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column: spec sheet */}
          <div className="sticky top-[82px]">
            <div className="overflow-hidden rounded-[6px] border-2 border-ink bg-surface shadow-[6px_6px_0_var(--ink)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-4 py-3 text-paper">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  Project Spec Sheet
                </span>
                {project.verified && (
                  <span className="font-mono text-[10px] text-yellow">
                    VERIFIED ✓
                  </span>
                )}
              </div>

              {/* Spec rows */}
              <div className="px-4 py-4">
                {specRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between py-[11px] text-[13px] ${
                      i < specRows.length - 1
                        ? "border-b border-dashed border-line"
                        : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
                      {row.label}
                    </span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Friction visual */}
              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  Install friction
                </span>
                <FrictionBars level={project.frictionLevel} />
              </div>

              {/* Footer */}
              <div className="border-t-[1.5px] border-ink bg-surface-2 px-4 py-3">
                <Disclosure>
                  Figures are indicative and change with token price and
                  saturation. Not financial advice.
                </Disclosure>
              </div>
            </div>

            {projectLinks && (
              <div className="mt-6">
                <ProjectLinks links={projectLinks} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
