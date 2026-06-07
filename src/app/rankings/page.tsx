import { getAllProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { rankProjects } from "@/lib/rankings";
import { SCORE_DIMENSIONS } from "@/data/reviews.seed";
import { Kicker } from "@/components/ui/kicker";
import { Disclosure } from "@/components/ui/disclosure";
import { ScoreMatrix } from "./matrix";

/** ISR: revalidate hourly so rankings track score and price changes */
export const revalidate = 3600;

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Score Matrix: Projects Ranked by Methodology 2026",
    description:
      "Every DePIN project scored on six dimensions: real revenue, token economics, decentralization, hardware economics, operator ease, and transparency. Sort the matrix and rank networks on what matters to you.",
    path: "/rankings",
  });
}

export default async function RankingsPage() {
  const projects = await getAllProjects();
  const ranked = rankProjects(projects, "composite", -1);

  const jsonLd = [
    itemListSchema(
      "DePIN Score Matrix 2026",
      ranked.map((p) => ({ name: p.name, slug: p.slug })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Rankings", path: "/rankings" },
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
        {/* Hero: one h1 for the page */}
        <div className="border-b-2 border-ink pb-[14px]">
          <Kicker className="mb-2 block">The score matrix</Kicker>
          <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold leading-none tracking-tight">
            DePIN project rankings
          </h1>
        </div>

        <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-ink-soft">
          Every listed project, scored on the same six dimensions and ranked by
          our editorial composite. Sort by any column to see where a network
          actually earns its place. Measured, not estimated.
        </p>

        {/* Methodology legend */}
        <div className="mt-7 grid gap-x-8 gap-y-3 rounded-[6px] border-[1.5px] border-line bg-surface-2 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCORE_DIMENSIONS.map((d) => (
            <div key={d.key}>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-ink">
                {d.label}
              </div>
              <div className="mt-0.5 text-[12px] leading-snug text-muted">
                {d.description}
              </div>
            </div>
          ))}
        </div>

        <ScoreMatrix projects={projects} />

        <p className="mt-4 font-mono text-[11px] text-muted">
          Scores are current editorial drafts and move as networks, token
          prices, and saturation change. The headline score is our weighted
          composite of the six dimensions. The double dagger marks a
          founder-affiliated project, disclosed and scored on the same
          methodology.
        </p>

        <Disclosure className="mt-6 max-w-4xl">
          Scores are editorial and independent of any commercial relationship.
          Affiliate links, paid placement, and verification fees never move a
          score. Reported figures are indicative and drawn from public sources
          and operator reports. Nothing here is financial advice.
        </Disclosure>
      </section>
    </div>
  );
}
