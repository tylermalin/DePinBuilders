import type { Project } from "@/lib/types";
import { SCORE_DIMENSIONS } from "@/data/reviews.seed";
import { SectionHeader } from "@/components/ui/section-header";

/** Small amber chip marking unpublished editorial content */
function DraftBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-yellow/30 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      Editorial draft
    </span>
  );
}

/** One score dimension as a labeled 0..100 bar */
function ScoreRow({
  label,
  description,
  value,
}: {
  label: string;
  description: string;
  value: number;
}) {
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
          {label}
        </span>
        <span className="font-display text-sm font-bold tabular-nums">
          {value}
          <span className="text-[11px] font-normal text-muted"> / 100</span>
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} score`}
      >
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-snug text-muted">{description}</p>
    </div>
  );
}

/**
 * Editorial review block: verdict, the six-dimension score breakdown, and the
 * strengths and risks lists. Renders a graceful state when no review exists,
 * and a visible draft label while status is "draft".
 */
export function ReviewSection({ project }: { project: Project }) {
  const review = project.review;

  if (!review) {
    return (
      <section className="mt-12">
        <SectionHeader
          kicker="Editorial review"
          title="Full review in progress"
          className="mb-5"
        />
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
          We score every project on the same public methodology. This one is
          queued for a full written review. The spec sheet and builder score
          reflect our current read.
        </p>
      </section>
    );
  }

  const isDraft = review.status === "draft";

  return (
    <section className="mt-12">
      <SectionHeader
        kicker="Editorial review"
        title="The verdict"
        className="mb-6"
        action={isDraft ? <DraftBadge /> : undefined}
      />

      {/* Verdict */}
      <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-ink">
        {review.verdict}
      </p>

      {/* Score breakdown */}
      <div className="mt-8 overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-surface">
        <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-4 py-2.5 text-paper">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            Score breakdown
          </span>
          <span className="font-display text-sm font-bold tabular-nums">
            {project.builderScore}
            <span className="text-[11px] font-normal opacity-70"> / 100</span>
          </span>
        </div>
        <div className="grid gap-x-8 px-4 py-1 sm:grid-cols-2">
          {SCORE_DIMENSIONS.map((d) => (
            <ScoreRow
              key={d.key}
              label={d.label}
              description={d.description}
              value={review.scores[d.key]}
            />
          ))}
        </div>
        <p className="border-t border-line bg-surface-2 px-4 py-3 text-[12px] leading-snug text-muted">
          The headline builder score of {project.builderScore} is our weighted
          editorial composite of the six dimensions above, scored on the same
          public methodology for every project. It is editorial, not a
          guarantee, and not financial advice.
        </p>
      </div>

      {/* Strengths and risks */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-good">
            Strengths
          </h3>
          <ul className="space-y-2.5">
            {review.strengths.map((s, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[14px] leading-snug text-ink-soft"
              >
                <span aria-hidden className="mt-0.5 font-bold text-good">
                  +
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-bad">
            Risks
          </h3>
          <ul className="space-y-2.5">
            {review.risks.map((r, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[14px] leading-snug text-ink-soft"
              >
                <span aria-hidden className="mt-0.5 font-bold text-bad">
                  !
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
