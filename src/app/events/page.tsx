import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { ComingSoon } from "@/components/ui/coming-soon";

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Events Calendar",
    description:
      "Summits, AMAs, workshops, and meetups for DePIN operators and builders. Coming soon.",
    path: "/events",
  });
}

export default function EventsPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ]);

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ComingSoon
        title="The DePIN events calendar is coming soon"
        message="Summits, AMAs, workshops, and operator meetups will be listed here, with add-to-calendar links, once the schedule is set."
        backHref="/"
        backLabel="Back to home"
      />
    </div>
  );
}
