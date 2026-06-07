import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { METHODOLOGY, METHODOLOGY_TOTAL_WEIGHT } from "@/lib/methodology";
import { Kicker } from "@/components/ui/kicker";
import { SectionHeader } from "@/components/ui/section-header";
import { Disclosure } from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";

export function generateMetadata() {
  return pageMeta({
    title: "How We Score DePIN Projects: Methodology and Disclosures",
    description:
      "The editorial standard behind DePin.Builders: the six-dimension scoring framework, what a verified badge means, the founder conflict disclosure, and the full affiliate and not-financial-advice block.",
    path: "/about",
  });
}

export default function AboutPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
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

      <article className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        {/* Hero: one h1 */}
        <div className="border-b-2 border-ink pb-[14px]">
          <Kicker className="mb-2 block">About and methodology</Kicker>
          <h1 className="font-display text-[clamp(28px,4vw,44px)] font-bold leading-none tracking-tight">
            Measured, not estimated.
          </h1>
        </div>

        <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-ink-soft">
          DePin.Builders is an independent research hub for Decentralized
          Physical Infrastructure Networks. We list and verify projects, review
          hardware, rank networks, and give operators the tools to price a
          deployment before they buy. We earn through clearly disclosed
          affiliate links, paid placement, and verification services, and none
          of that moves a score.
        </p>

        {/* Editorial standard */}
        <section className="mt-12">
          <SectionHeader kicker="The standard" title="Verified, not vibes" />
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            Every listed project is scored against a public methodology.
            Verification status is editorial and stays separate from any
            commercial relationship. We lead with the point, we say plainly when
            a network only works while the subsidy lasts, and we present every
            yield, ROI, and token figure as indicative or reported, never
            guaranteed.
          </p>
        </section>

        {/* The framework */}
        <section className="mt-12">
          <SectionHeader
            kicker="How we score"
            title="The six-dimension framework"
          />
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            Each project is scored 0 to 100 on six weighted dimensions. The
            headline builder score is the weighted editorial composite of these
            dimensions, scored on the same methodology for every project,
            including the one affiliated with our founder. The composite is
            editorial, not a strict average, and it is not financial advice.
          </p>

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
                    What it measures
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]">
                    Benchmark
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
                    <td className="px-3 py-2.5 tabular-nums text-ink-soft">
                      {d.weight}%
                    </td>
                    <td className="px-3 py-2.5 text-ink-soft">{d.summary}</td>
                    <td className="px-3 py-2.5 text-ink-soft">{d.benchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <figcaption className="mt-2 font-mono text-[11px] text-muted">
              DePIN Geospatial Rating Framework. Weights sum to{" "}
              {METHODOLOGY_TOTAL_WEIGHT}.
            </figcaption>
          </figure>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/rankings">
              <Button variant="fill" size="sm">
                See the DePIN Score Matrix
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                Browse the directory
              </Button>
            </Link>
          </div>
        </section>

        {/* Verification */}
        <section className="mt-12">
          <SectionHeader kicker="Verification" title="What a badge means" />
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            Get Verified is an editorial review against this published
            methodology. The fee buys the review and a listing, never a score
            and never a better rank. A verified badge means a project cleared
            our checks against the framework above, nothing more. Scores and
            verification are decided on the editorial side of a firewall that
            commercial relationships do not cross.
          </p>
        </section>

        {/* Founder conflict */}
        <section className="mt-12">
          <SectionHeader
            kicker="Conflict disclosure"
            title="The founder-affiliated project"
          />
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            One listed project, Mālama Labs, is operated by our founder. It is
            listed transparently, scored on the exact same six dimensions as
            every other network, and never defaults to the top rank. Its
            disclosure renders on its project page, in its analytical report,
            and anywhere its score appears.
          </p>
        </section>

        {/* Disclosures */}
        <section className="mt-12">
          <SectionHeader kicker="Disclosures" title="The fine print" />
          <Disclosure className="mt-5 max-w-4xl">
            Affiliate and editorial disclosure: DePin.Builders may earn
            commissions on hardware purchased through links on this site, and
            charges for verification and paid placement. These relationships are
            labeled and do not influence editorial scores or reviews. Reported
            yields, ROI figures, and token data are indicative, drawn from
            public disclosures and operator reports, and change frequently. This
            site does not provide financial, investment, legal, or tax advice.
            Do your own research before deploying capital or hardware.
          </Disclosure>
        </section>
      </article>
    </div>
  );
}
