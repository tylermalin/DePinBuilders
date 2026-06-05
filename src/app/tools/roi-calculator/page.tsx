import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { softwareAppSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { Disclosure } from "@/components/ui/disclosure";
import { CalculatorIsland } from "./calculator-island";

export function generateMetadata() {
  return pageMeta({
    title: "DePIN ROI and Earnings Calculator (2026)",
    description:
      "Model your DePIN hardware investment before you buy. Select a device, adjust yield and token price, and see net daily, monthly, yearly earnings, break-even, and year-1 ROI. Free, no signup required.",
    path: "/tools/roi-calculator",
  });
}

const CALC_FAQ = [
  {
    question: "How does the DePIN ROI calculator work?",
    answer:
      "Select a device, set reported daily earnings, your electricity rate, a token price assumption, and the hardware cost. The calculator computes gross and net daily profit, monthly and yearly totals, the break-even month, and year-1 ROI. All math is transparent and runs in your browser.",
  },
  {
    question: "Are the earnings guaranteed?",
    answer:
      "No. All figures are indicative and based on reported operator data. Real yields depend on regional saturation, uptime, token price, and network reward schedules, all of which change. Always model your own scenarios before committing capital.",
  },
  {
    question: "What does the token price multiplier do?",
    answer:
      "It lets you model what happens if the token price goes up or down. A 1.0x multiplier uses current reported yields. 2.0x models a scenario where the token doubles. 0.5x models a 50% decline.",
  },
  {
    question: "Why does the break-even show a different number than the project page?",
    answer:
      "The project page shows a static estimate from the seed data. The calculator lets you adjust every input (daily yield, electricity cost, token price, hardware cost) to model your specific situation.",
  },
];

export default async function RoiCalculatorPage() {
  const allProjects = await getAllProjects();
  const devices = allProjects
    .filter((p) => p.hardwareCostUsd > 0 && p.yieldHighUsd > 0)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      hardwareCostUsd: p.hardwareCostUsd,
      yieldLowUsd: p.yieldLowUsd,
      yieldHighUsd: p.yieldHighUsd,
      powerWatts: p.powerWatts,
    }));

  const jsonLd = [
    softwareAppSchema(),
    faqSchema(CALC_FAQ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools/roi-calculator" },
      { name: "ROI Calculator", path: "/tools/roi-calculator" },
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
          <span className="text-ink">ROI Calculator</span>
        </nav>

        <SectionHeader
          kicker="Builder tools"
          title="DePIN Earnings and ROI Calculator"
        />

        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Model your return before you deploy. Pick a device, adjust the
          reported yield and token price, and see net daily, monthly, and
          yearly earnings alongside the break-even point and year-1 ROI.
          Every number is indicative, not a guarantee.
        </p>

        <div className="mt-8">
          <CalculatorIsland devices={devices} />
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <SectionHeader kicker="Common questions" title="Calculator FAQ" />
          <div className="mt-6 overflow-hidden rounded-[6px] border-[1.5px] border-line bg-surface">
            {CALC_FAQ.map((item, i) => (
              <div
                key={i}
                className={`px-5 py-4 ${i < CALC_FAQ.length - 1 ? "border-b border-line" : ""}`}
              >
                <h3 className="font-display text-[17px] font-semibold tracking-tight">
                  {item.question}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Disclosure className="mt-8 max-w-3xl">
          All calculations are for informational purposes only. Reported
          yields, token prices, and costs change frequently. This is not
          financial, investment, legal, or tax advice. Do your own research
          before deploying capital or hardware.
        </Disclosure>
      </div>
    </div>
  );
}
