import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { ComingSoon } from "@/components/ui/coming-soon";

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Coverage Map",
    description:
      "An interactive coverage and node-density map of DePIN networks is in development.",
    path: "/map",
  });
}

export default function MapPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
  ]);

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ComingSoon
        title="The DePIN coverage map is in development"
        message="We are building an interactive coverage and node-density view, filterable by network, wired to verified geodata. We will not ship indicative density dressed up as live coverage, so this stays here until the real data is in place."
        backHref="/projects"
        backLabel="Browse the directory"
      />
    </div>
  );
}
