import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { softwareAppSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { Disclosure } from "@/components/ui/disclosure";
import { CompareIsland } from "./compare-island";

export function generateMetadata() {
  return pageMeta({
    title: "Compare DePIN Projects Side by Side (2026)",
    description:
      "Select up to four DePIN projects and compare hardware cost, reported yield, builder score, friction, and chain in a single table. Free tool, no signup.",
    path: "/tools/compare",
  });
}

const COMPARE_FAQ = [
  {
    question: "How many projects can I compare at once?",
    answer:
      "Up to four. Click a project name to add or remove it from the comparison table.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "All data is drawn from public sources, project disclosures, and operator reports. Yields and costs are indicative and change frequently.",
  },
];

export default async function CompareToolPage() {
  const projects = await getAllProjects();

  const indexMap: Record<string, number> = {};
  projects.forEach((p, i) => {
    indexMap[p.slug] = i;
  });

  // Default to the same three the prototype uses
  const defaultSlugs = ["geodnet", "weatherxm", "aethir"].filter((s) =>
    projects.some((p) => p.slug === s),
  );

  const jsonLd = [
    softwareAppSchema(),
    faqSchema(COMPARE_FAQ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools/compare" },
      { name: "Compare", path: "/tools/compare" },
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
          <span className="text-ink">Compare Projects</span>
        </nav>

        <SectionHeader
          kicker="Side by side"
          title="Compare DePIN Projects"
        />

        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Pick up to four projects to see hardware cost, yield, builder
          score, chain, and friction side by side. Use this alongside the{" "}
          <Link
            href="/tools/roi-calculator"
            className="text-orange-ink hover:underline"
          >
            ROI calculator
          </Link>{" "}
          to model each option before you deploy.
        </p>

        <div className="mt-8">
          <CompareIsland
            projects={projects}
            defaultSlugs={defaultSlugs}
            indexMap={indexMap}
          />
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <SectionHeader kicker="Common questions" title="Compare Tool FAQ" />
          <div className="mt-6 overflow-hidden rounded-[6px] border-[1.5px] border-line bg-surface">
            {COMPARE_FAQ.map((item, i) => (
              <div
                key={i}
                className={`px-5 py-4 ${i < COMPARE_FAQ.length - 1 ? "border-b border-line" : ""}`}
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
          All data is indicative. Reported yields, costs, and scores change
          frequently. This is not financial, investment, legal, or tax
          advice.
        </Disclosure>
      </div>
    </div>
  );
}
