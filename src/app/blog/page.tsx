import Link from "next/link";
import { getPosts } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";

const TYPE_LABELS: Record<string, string> = {
  REVIEW: "Review",
  RESEARCH: "Research",
  GUIDE: "Guide",
  PROJECT_UPDATE: "Project updates",
};

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Blog: Reviews, Research and Guides (2026)",
    description:
      "In-depth DePIN hardware reviews, market research, operator guides, and project updates. Written for builders, not speculators.",
    path: "/blog",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader kicker="Research and reviews" title="The DePIN Blog" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-[6px] border-[1.5px] border-line bg-surface transition-all hover:border-ink hover:shadow-[var(--shadow)]"
            >
              <div className="h-2 bg-orange" />
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-orange-ink">
                  {TYPE_LABELS[post.type] ?? post.type}
                </div>
                <h3 className="font-display text-[20px] font-semibold leading-tight tracking-tight group-hover:text-orange-ink">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-3.5 flex justify-between border-t border-line pt-3 font-mono text-[10.5px] text-muted">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>Read &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
