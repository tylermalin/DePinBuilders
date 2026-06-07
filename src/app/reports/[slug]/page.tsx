import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/data";
import { getReport, getReportSlugs } from "@/data/reports.seed";
import { METHODOLOGY } from "@/lib/methodology";
import { pageMeta } from "@/lib/seo";
import { reportSchema, breadcrumbSchema } from "@/lib/schema";
import { ReportBody } from "@/components/report/report-body";
import { Kicker } from "@/components/ui/kicker";
import { Disclosure } from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return {};
  return pageMeta({
    title: `${report.title} | Report`,
    description: report.dek,
    path: `/reports/${slug}`,
  });
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  const project = await getProject(slug);
  const scores = project?.review?.scores ?? null;
  const isDraft = report.status === "draft";

  const jsonLd = [
    reportSchema({
      title: report.title,
      description: report.dek,
      slug: report.slug,
      publishedAt: report.publishedAt,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Reports", path: "/reports" },
      { name: project?.name ?? report.slug, path: `/reports/${slug}` },
    ]),
  ];

  const published = new Date(report.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-paper">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <article className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-mono text-[11px] text-muted"
        >
          <Link href="/" className="hover:text-orange-ink">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/reports" className="hover:text-orange-ink">
            Reports
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{project?.name ?? report.slug}</span>
        </nav>

        {/* Hero */}
        <div className="border-b-2 border-ink pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Kicker>Analytical report</Kicker>
            {isDraft && (
              <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-yellow/30 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                Editorial draft
              </span>
            )}
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.1] tracking-tight">
            {report.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-ink-soft">
            {report.dek}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
            <span>{published}</span>
            <span>{report.readingMinutes} min read</span>
            {project && (
              <Link
                href={`/projects/${slug}`}
                className="text-orange-ink hover:underline"
              >
                View {project.name} project page
              </Link>
            )}
          </div>
        </div>

        {/* Executive summary */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold">
            Executive summary
          </h2>
          {report.executiveSummary.map((para, i) => (
            <p
              key={i}
              className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft"
            >
              {para}
            </p>
          ))}
        </section>

        {/* Profile metrics */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold">
            Protocol profile
          </h2>
          <dl className="grid gap-x-8 gap-y-0 overflow-hidden rounded-[6px] border-[1.5px] border-ink sm:grid-cols-2">
            {report.profile.map((m, i) => (
              <div
                key={m.label}
                className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-2"
                }`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
                  {m.label}
                </dt>
                <dd className="break-all text-right text-[13px] font-semibold">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Long-form body */}
        <ReportBody blocks={report.body} />

        {/* Standardized framework + scored dimensions */}
        <section className="mt-12">
          <h2 className="mb-2 border-b-2 border-ink pb-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-tight">
            Standardized physical sensing evaluation framework
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            Physical networks face real-world constraints, hardware
            depreciation, geographic clustering, and install barriers, that pure
            digital resource networks do not. The framework scores every project
            across six weighted dimensions. The headline builder score is our
            weighted composite of these dimensions, scored on the same public
            methodology for every project.
          </p>

          {/* Framework table */}
          <figure className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="bg-ink text-paper">
                  <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]">
                    Dimension
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]">
                    Weight
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]">
                    Metric
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]">
                    Benchmark
                  </th>
                  <th className="px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.06em]">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {METHODOLOGY.map((d, i) => (
                  <tr
                    key={d.key}
                    className={`border-t border-line align-top ${
                      i % 2 === 0 ? "bg-surface" : "bg-surface-2"
                    }`}
                  >
                    <td className="px-3 py-2.5 font-semibold text-ink">
                      {d.label}
                    </td>
                    <td className="px-3 py-2.5 text-ink-soft tabular-nums">
                      {d.weight}%
                    </td>
                    <td className="px-3 py-2.5 text-ink-soft">{d.metric}</td>
                    <td className="px-3 py-2.5 text-ink-soft">{d.benchmark}</td>
                    <td className="px-3 py-2.5 text-center font-display text-[15px] font-bold tabular-nums">
                      {scores ? scores[d.key] : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <figcaption className="mt-2 font-mono text-[11px] text-muted">
              DePIN Geospatial Rating Framework. Weights sum to 100.
            </figcaption>
          </figure>

          {/* Per-dimension rationale */}
          <div className="mt-8 space-y-5">
            {METHODOLOGY.map((d) => {
              const score = scores ? scores[d.key] : null;
              return (
                <div
                  key={d.key}
                  className="rounded-[6px] border-[1.5px] border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-semibold">
                      {d.label}
                      <span className="ml-2 font-mono text-[11px] font-normal text-muted">
                        {d.weight}% weight
                      </span>
                    </h3>
                    {score !== null && (
                      <span className="font-display text-lg font-bold tabular-nums">
                        {score}
                        <span className="text-[12px] font-normal text-muted">
                          {" "}
                          / 100
                        </span>
                      </span>
                    )}
                  </div>
                  {score !== null && (
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-ink"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  )}
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {report.dimensionNotes[d.key]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclosures */}
        <Disclosure className="mt-10 max-w-4xl">
          This report is editorial and independent of any commercial
          relationship. Affiliate links, paid placement, and verification fees
          never move a score. Figures are indicative and drawn from public
          disclosures and operator reports, and they change. Nothing here is
          financial, investment, legal, or tax advice.
        </Disclosure>

        {project && (
          <div className="mt-8">
            <Link href={`/projects/${slug}`}>
              <Button variant="ghost" size="sm">
                Back to {project.name}
              </Button>
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
