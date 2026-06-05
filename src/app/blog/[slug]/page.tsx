import { notFound } from "next/navigation";
import Link from "next/link";
import { getPosts, getPost, getProject } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

const TYPE_LABELS: Record<string, string> = {
  REVIEW: "Review",
  RESEARCH: "Research",
  GUIDE: "Guide",
  PROJECT_UPDATE: "Project Update",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedProject = post.projectSlug
    ? await getProject(post.projectSlug)
    : null;

  const jsonLd = [
    articleSchema({
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      publishedAt: new Date(post.publishedAt).toISOString(),
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
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
          <Link href="/blog" className="hover:text-orange-ink">Blog</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{TYPE_LABELS[post.type] ?? post.type}</span>
        </nav>

        <article className="max-w-3xl">
          <Tag variant="tier">{TYPE_LABELS[post.type] ?? post.type}</Tag>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 font-mono text-xs text-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · DePin.Builders
          </div>

          <div className="prose mt-8">
            <p className="text-base leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
            <p className="mt-4 text-sm italic text-muted">
              Full article content will be authored in MDX or loaded from a
              CMS in a later phase. This page demonstrates the route,
              metadata, schema, and internal linking structure.
            </p>
          </div>

          {/* Related project link */}
          {relatedProject && (
            <div className="mt-8 rounded-[6px] border-[1.5px] border-line bg-surface p-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                Related project
              </div>
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="font-display text-lg font-semibold hover:text-orange-ink"
              >
                {relatedProject.name} &rarr;
              </Link>
              <p className="mt-1 text-sm text-muted">
                {relatedProject.category} · Score {relatedProject.builderScore}/100
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Link href="/blog">
              <Button variant="ghost">&larr; All articles</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost">Browse projects</Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
