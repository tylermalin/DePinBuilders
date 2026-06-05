import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

export function generateMetadata() {
  return pageMeta({
    title: "Verified DePIN Projects, Hardware Reviews, ROI Calculator and Rankings (2026)",
    description:
      "The independent research hub for Decentralized Physical Infrastructure Networks. Compare verified DePIN projects, calculate hardware ROI, and find the best DePIN to deploy in 2026. Measured, not estimated.",
    path: "/",
  });
}

export default function Home() {
  const jsonLd = [organizationSchema(), webSiteSchema()];

  return (
    <div className="bg-paper">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}
      {/* Hero */}
      <section className="relative overflow-hidden py-16">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(120% 90% at 90% 0, #000, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 90% 0, #000, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[var(--max-w)] px-7">
          <div className="grid items-center gap-11 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-ink">
                Independent DePIN Research · Updated weekly · 2026
              </p>
              <h1 className="mt-4 font-display text-[clamp(38px,5.2vw,66px)] font-semibold leading-[1.0] tracking-tight">
                The verified hub for{" "}
                <span className="text-orange">DePIN</span> builders.
              </h1>
              <p className="mt-5 max-w-[34em] text-[17px] leading-relaxed text-muted">
                DePin.Builders is the independent research desk for
                Decentralized Physical Infrastructure Networks. We{" "}
                <span className="font-semibold text-ink">
                  verify the projects
                </span>
                , test the hardware, and run the numbers so you can deploy
                with proof instead of hype. Measured, not estimated.
              </p>

              {/* Triad */}
              <div className="mt-[22px] flex flex-wrap gap-2 font-mono text-xs font-medium uppercase tracking-[0.04em]">
                <span className="rounded-[3px] border-[1.5px] border-line-2 px-3 py-[7px]">
                  <span className="text-orange-ink">Find</span> the
                  opportunity
                </span>
                <span className="rounded-[3px] border-[1.5px] border-line-2 px-3 py-[7px]">
                  <span className="text-orange-ink">Price</span> the risk
                </span>
                <span className="rounded-[3px] border-[1.5px] border-line-2 px-3 py-[7px]">
                  <span className="text-orange-ink">Deploy</span> with
                  proof
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/projects">
                  <Button variant="fill">Explore verified projects</Button>
                </Link>
                <Link href="/tools/roi-calculator">
                  <Button>Calculate your earnings &rarr;</Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  ["142", "Projects tracked"],
                  ["58", "Verified projects"],
                  ["31", "Hardware reviews"],
                  ["9", "Categories"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-[30px] font-bold leading-none">
                      {n}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec card */}
            <div className="overflow-hidden rounded-[6px] border-2 border-ink bg-surface shadow-[6px_6px_0_var(--ink)]">
              <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-4 py-3 text-paper">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  Spec Sheet · Editor&apos;s Pick
                </span>
                <span className="font-mono text-[10px] text-yellow">
                  VERIFIED ✓
                </span>
              </div>
              <div className="space-y-0 px-4 py-4">
                {[
                  ["Project", "GEODNET"],
                  ["Category", "Positioning / GNSS"],
                  ["Hardware cost", "$695"],
                  ["Reported yield", "$1.56 to $1.80 / day"],
                  ["Est. break-even", "~8 months"],
                  ["Friction level", "High (rooftop)"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between border-b border-dashed border-line py-[9px] text-[13px] last:border-b-0"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                      {k}
                    </span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t-[1.5px] border-ink bg-surface-2 px-4 py-3">
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-good">
                  <span className="h-[7px] w-[7px] rounded-full bg-good" />
                  Real revenue · token burn positive
                </span>
                <span className="rounded-[3px] bg-ink px-[7px] py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] text-yellow">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
