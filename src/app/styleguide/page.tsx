import { pageMeta } from "@/lib/seo";
import { projects } from "@/data/projects.seed";
import { tierDisplay } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { FrictionBars } from "@/components/ui/friction-bars";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { SpecCard } from "@/components/ui/spec-card";
import { CtaBand } from "@/components/ui/cta-band";
import { CodeChip } from "@/components/ui/code-chip";
import { Ticker, type TickerItem } from "@/components/ui/ticker";
import { Kicker } from "@/components/ui/kicker";
import { SectionHeader } from "@/components/ui/section-header";
import { AdSlot } from "@/components/ui/ad-slot";
import { Disclosure, ConflictDisclosure } from "@/components/ui/disclosure";

export function generateMetadata() {
  return pageMeta({
    title: "Design System Styleguide",
    description:
      "Component reference for the DePin.Builders design system.",
    path: "/styleguide",
    noIndex: true,
  });
}

export default function StyleguidePage() {
  const geodnet = projects[0];
  const malama = projects.find((p) => p.conflictDisclosure)!;

  const tickerItems: TickerItem[] = projects
    .filter((p) => p.token)
    .slice(0, 10)
    .map((p) => ({
      token: p.token!,
      score: p.builderScore,
      change: p.change30d,
    }));

  return (
    <div className="bg-paper">
      {/* Ticker */}
      <Ticker items={tickerItems} />

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Component Styleguide
        </h1>
        <p className="mt-2 text-muted">
          Phase 1 design system. Every signature component from BRAND.md.
        </p>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="fill">Explore verified projects</Button>
            <Button>Calculate your earnings</Button>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button variant="fill" size="sm">
              Get Verified
            </Button>
            <Button variant="link">View all</Button>
          </div>
        </Section>

        {/* ── Tags ── */}
        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            <Tag variant="tier">Set &amp; Forget</Tag>
            <Tag variant="tier">Infrastructure</Tag>
            <Tag variant="tier">Frictionless</Tag>
            <Tag variant="tier">Enterprise</Tag>
            <Tag>Positioning</Tag>
            <Tag>Sensors</Tag>
            <Tag>Compute</Tag>
            <Tag>Bandwidth</Tag>
            <Tag>Storage</Tag>
            <Tag>Mapping</Tag>
            <Tag>Wireless</Tag>
            <Tag>Climate / Compute</Tag>
          </div>
        </Section>

        {/* ── Friction bars ── */}
        <Section title="Friction Bars">
          <div className="flex flex-wrap items-center gap-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <FrictionBars level={n} />
                <span className="font-mono text-xs text-muted">
                  Level {n}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Verified Badge ── */}
        <Section title="Verified Badge">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <VerifiedBadge verified={true} showLabel />
            </div>
            <div className="flex items-center gap-2">
              <VerifiedBadge verified={false} showLabel />
            </div>
          </div>
        </Section>

        {/* ── Kicker ── */}
        <Section title="Kicker">
          <Kicker>Independent DePIN Research · Updated weekly · 2026</Kicker>
        </Section>

        {/* ── Section Header ── */}
        <Section title="Section Header">
          <SectionHeader
            kicker="Start here"
            title="Find your tier"
            action={
              <Button variant="link" size="sm">
                All projects &rarr;
              </Button>
            }
          />
        </Section>

        {/* ── Spec Card ── */}
        <Section title="Spec Card">
          <div className="max-w-md">
            <SpecCard
              headerLeft="Spec Sheet · Editor's Pick"
              headerRight="VERIFIED ✓"
              rows={[
                { label: "Project", value: geodnet.name },
                { label: "Category", value: geodnet.category },
                {
                  label: "Hardware cost",
                  value: `$${geodnet.hardwareCostUsd}`,
                },
                {
                  label: "Reported yield",
                  value: `$${geodnet.yieldLowUsd.toFixed(2)} to $${geodnet.yieldHighUsd.toFixed(2)} / day`,
                  highlight: true,
                },
                {
                  label: "Est. break-even",
                  value: `~${geodnet.breakEvenMonths} months`,
                },
                { label: "Friction level", value: "High (rooftop)" },
              ]}
              footer={
                <>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-good">
                    <span className="h-[7px] w-[7px] rounded-full bg-good" />
                    Real revenue · token burn positive
                  </span>
                  <span className="rounded-[3px] bg-ink px-[7px] py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] text-yellow">
                    Featured
                  </span>
                </>
              }
            />
          </div>
        </Section>

        {/* ── CTA Band ── */}
        <Section title="CTA Band">
          <CtaBand>
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.05] tracking-tight">
                  One brief a week. The signal, not the noise.
                </h2>
                <p className="mt-3 text-[15px] opacity-90">
                  New verifications, hardware reviews, yield shifts, and
                  the incentive changes that move the market. Written for
                  operators, builders, and investors.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex overflow-hidden rounded-[4px] border-2 border-white bg-white">
                  <input
                    type="email"
                    placeholder="you@builder.xyz"
                    className="flex-1 border-none px-3.5 py-3.5 font-mono text-[13px] text-ink outline-none"
                    aria-label="Email"
                    readOnly
                  />
                  <span className="bg-ink px-5 py-3.5 font-mono text-xs font-semibold uppercase text-white">
                    Join
                  </span>
                </div>
                <span className="font-mono text-[10px] opacity-85">
                  No spam. Unsubscribe anytime. 18,000+ builders.
                </span>
              </div>
            </div>
          </CtaBand>
        </Section>

        {/* ── Code Chip ── */}
        <Section title="Affiliate Code Chip">
          <div className="flex flex-wrap gap-6">
            <CodeChip
              code={geodnet.affiliateCode!}
              discount={geodnet.affiliateDiscount}
            />
            <CodeChip code="Y7TR22SA" discount="discount" />
          </div>
        </Section>

        {/* ── Ad Slot ── */}
        <Section title="Ad Slot (Sponsored Placement)">
          <AdSlot
            title="Your project here"
            description="Paid placement for verified DePIN networks. Reach builders actively pricing their next deployment."
            action={<Button size="sm">Advertise with us</Button>}
          />
        </Section>

        {/* ── Disclosures ── */}
        <Section title="Disclosures">
          <div className="max-w-2xl space-y-4">
            <Disclosure>
              Hardware costs, reported yields, and ROI estimates are
              indicative and drawn from public sources, project
              disclosures, and operator reports. Token-denominated rewards
              fluctuate with price. Nothing here is financial advice.
              Always model your own break-even before deploying.
              DePin.Builders may earn affiliate commissions on some
              hardware links, disclosed on each project.
            </Disclosure>
            <ConflictDisclosure>
              {malama.conflictDisclosure}
            </ConflictDisclosure>
          </div>
        </Section>

        {/* ── Color Tokens ── */}
        <Section title="Color Tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {[
              ["Paper", "bg-paper border border-line"],
              ["Surface", "bg-surface"],
              ["Surface 2", "bg-surface-2"],
              ["Ink", "bg-ink"],
              ["Orange", "bg-orange"],
              ["Orange Soft", "bg-orange-soft"],
              ["Yellow", "bg-yellow"],
              ["Blue", "bg-blue"],
              ["Good", "bg-good"],
              ["Bad", "bg-bad"],
            ].map(([name, cls]) => (
              <div key={name} className="text-center">
                <div
                  className={`h-12 rounded-[4px] border border-line ${cls}`}
                />
                <span className="mt-1 block font-mono text-[10px] text-muted">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] text-muted">
                Display (Bricolage Grotesque)
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                The verified hub for DePIN builders.
              </h2>
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted">
                Body (Hanken Grotesk)
              </span>
              <p className="text-base text-ink-soft">
                DePin.Builders is the independent research desk for
                Decentralized Physical Infrastructure Networks. We verify
                the projects, test the hardware, and run the numbers.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted">
                Mono (JetBrains Mono)
              </span>
              <p className="font-mono text-sm text-muted">
                $1.56/day · 91/100 · SET_AND_FORGET · GEODNET
              </p>
            </div>
          </div>
        </Section>

        {/* ── Project Data Sample ── */}
        <Section title="Project Data (seed, first 5)">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  {[
                    "Name",
                    "Token",
                    "Category",
                    "Tier",
                    "Chain",
                    "Cost",
                    "Score",
                    "Verified",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((p) => (
                  <tr
                    key={p.slug}
                    className="border-b border-dashed border-line"
                  >
                    <td className="px-3 py-2 font-display font-semibold">
                      {p.name}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs text-muted">
                      {p.token ?? "pre-token"}
                    </td>
                    <td className="px-3 py-2">
                      <Tag>{p.category}</Tag>
                    </td>
                    <td className="px-3 py-2">
                      <Tag variant="tier">{tierDisplay(p.tier)}</Tag>
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">
                      {p.chain}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">
                      {p.hardwareCostUsd
                        ? `$${p.hardwareCostUsd}`
                        : "BYO"}
                    </td>
                    <td className="px-3 py-2 font-display font-bold">
                      {p.builderScore}
                    </td>
                    <td className="px-3 py-2">
                      <VerifiedBadge verified={p.verified} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 border-b border-line pb-2 font-display text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}
