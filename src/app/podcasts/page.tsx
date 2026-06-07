import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { ComingSoon } from "@/components/ui/coming-soon";

export function generateMetadata() {
  return pageMeta({
    title: "The DePin.Builders Podcast",
    description:
      "Conversations with the founders and operators building decentralized infrastructure. Coming soon.",
    path: "/podcasts",
  });
}

export default function PodcastsIndexPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Podcasts", path: "/podcasts" },
  ]);

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ComingSoon
        title="The DePin.Builders Podcast is coming soon"
        message="Conversations with the founders and operators actually building decentralized infrastructure. Episodes will land here once they are recorded."
        backHref="/blog"
        backLabel="Read the research"
      />
    </div>
  );
}
