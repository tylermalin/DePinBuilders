import Link from "next/link";
import type { ProjectReport } from "@/data/reports.seed";
import { Kicker } from "@/components/ui/kicker";
import { Button } from "@/components/ui/button";

/** Labels surfaced as the at-a-glance metric row on the project page. */
const TEASER_LABELS = [
  "Annualized recurring revenue",
  "Active reference nodes",
  "Total raised",
  "Token burn",
];

/**
 * The report's executive summary, a few headline metrics, and a call to action
 * to the full analytical report. Rendered on the project page when a report
 * exists, so the deep evaluation is summarized in place and one click away.
 */
export function ReportSummary({
  report,
  projectName,
}: {
  report: ProjectReport;
  projectName: string;
}) {
  const teaser = TEASER_LABELS.map((label) =>
    report.profile.find((m) => m.label === label),
  ).filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="mt-10 rounded-[6px] border-[1.5px] border-ink bg-surface p-6 shadow-[var(--shadow)]">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <Kicker>Analytical report</Kicker>
        {report.status === "draft" && (
          <span className="rounded-full border border-line bg-yellow/30 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink">
            Draft
          </span>
        )}
      </div>

      <h2 className="max-w-3xl font-display text-xl font-bold leading-snug">
        {report.title}
      </h2>

      {/* First paragraph of the executive summary */}
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
        {report.executiveSummary[0]}
      </p>

      {/* Headline metrics */}
      {teaser.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-4">
          {teaser.map((m) => (
            <div key={m.label} className="bg-surface px-3 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">
                {m.label}
              </dt>
              <dd className="mt-1 text-[13px] font-semibold leading-snug">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href={`/reports/${report.slug}`}>
          <Button variant="fill" size="sm">
            Read the full report
          </Button>
        </Link>
        <span className="font-mono text-[11px] text-muted">
          {report.readingMinutes} min read on {projectName}
        </span>
      </div>
    </section>
  );
}
