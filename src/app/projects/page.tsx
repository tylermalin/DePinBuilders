import { getAllProjects, getCategories, getChains } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { Disclosure } from "@/components/ui/disclosure";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectsDirectory } from "./directory";

export function generateMetadata() {
  return pageMeta({
    title: "Verified DePIN Projects Directory and Rankings 2026",
    description:
      "Compare every DePIN project by builder score, hardware cost, reported yield, and ROI. Filter by category, chain, and tier. Server-rendered, updated weekly.",
    path: "/projects",
  });
}

export default async function ProjectsPage() {
  const [projects, categories, chains] = await Promise.all([
    getAllProjects(),
    getCategories(),
    getChains(),
  ]);

  const jsonLd = [
    itemListSchema(
      "DePIN Projects Directory 2026",
      projects.slice(0, 20).map((p) => ({ name: p.name, slug: p.slug })),
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
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
        <SectionHeader
          kicker="The directory"
          title="Verified DePIN projects"
          action={
            <span className="font-mono text-[11px] text-muted">
              {projects.length} projects
            </span>
          }
        />

        <ProjectsDirectory
          projects={projects}
          categories={categories.map((c) => c.name)}
          chains={chains.map((c) => c.name)}
        />

        <Disclosure className="mt-6 max-w-4xl">
          Hardware costs, reported yields, and ROI estimates are indicative
          and drawn from public sources, project disclosures, and operator
          reports. Token-denominated rewards fluctuate with price. Nothing
          here is financial advice. Always model your own break-even before
          deploying. DePin.Builders may earn affiliate commissions on some
          hardware links, disclosed on each project.
        </Disclosure>
      </section>
    </div>
  );
}
