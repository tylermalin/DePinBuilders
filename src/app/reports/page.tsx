import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { getReport, getReportSlugs } from "@/data/reports.seed";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { Kicker } from "@/components/ui/kicker";
import { Disclosure } from "@/components/ui/disclosure";

export const revalidate = 3600;

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Analytical Reports: In-Depth Project Evaluations 2026",
    description:
      "Long-form analytical reports on DePIN projects, each scored against the same six-dimension methodology: revenue, token economics, decentralization, hardware, operator ease, and transparency.",
    path: "/reports",
  });
}

export default async function ReportsIndexPage() {
  const slugs = getReportSlugs();
  const projects = await getAllProjects();

  const items = slugs
    .map((slug) => {
      const report = getReport(slug)!;
      const project = projects.find((p) => p.slug === slug) ?? null;
      return { report, project };
    })
    .sort(
      (a, b) =>
        new Date(b.report.publishedAt).getTime() -
        new Date(a.report.publishedAt).getTime(),
    );

  const jsonLd = [
    itemListSchema(
      "DePIN Analytical Reports 2026",
      slugs.map((slug) => ({ name: slug, slug, prefix: "reports" })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Reports", path: "/reports" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-paper">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <section className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <div className="border-b-2 border-ink pb-[14px]">
          <Kicker className="mb-2 block">Analytical reports</Kicker>
          <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold leading-none tracking-tight">
            In-depth DePIN evaluations
          </h1>
        </div>

        <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-ink-soft">
          Each report runs a project through the same six-dimension framework,
          with the data, the math, and the trade-offs in full. Measured, not
          estimated.
        </p>

        <div className="mt-8 grid gap-5">
          {items.map(({ report, project }) => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="group rounded-[6px] border-[1.5px] border-ink bg-surface p-6 transition-all hover:shadow-[var(--shadow)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-display text-lg font-bold group-hover:text-orange-ink">
                      {project?.name ?? report.slug}
                    </h2>
                    {report.status === "draft" && (
                      <span className="rounded-full border border-line bg-yellow/30 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
                    {report.dek}
                  </p>
                  <div className="mt-3 font-mono text-[11px] text-muted">
                    {report.readingMinutes} min read
                  </div>
                </div>
                {project && (
                  <div className="flex-none text-right">
                    <div className="font-display text-3xl font-bold tabular-nums">
                      {project.builderScore}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                      Builder score
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Disclosure className="mt-8 max-w-4xl">
          Reports are editorial and independent of any commercial relationship.
          Figures are indicative and sourced from public disclosures and
          operator reports. Nothing here is financial advice.
        </Disclosure>
      </section>
    </div>
  );
}
