import { notFound } from "next/navigation";
import Link from "next/link";
import { getEpisodes, getEpisode } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { podcastEpisodeSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const eps = await getEpisodes();
  return eps.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = await getEpisode(slug);
  if (!ep) return {};
  return pageMeta({
    title: `#${ep.number}: ${ep.title}`,
    description: ep.summary,
    path: `/podcasts/${slug}`,
  });
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = await getEpisode(slug);
  if (!ep) notFound();

  const jsonLd = [
    podcastEpisodeSchema({
      title: ep.title,
      description: ep.summary,
      slug: ep.slug,
      episodeNumber: ep.number,
      publishedAt: ep.publishedAt,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Podcasts", path: "/podcasts" },
      { name: `#${ep.number}`, path: `/podcasts/${slug}` },
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
          <Link href="/podcasts" className="hover:text-orange-ink">Podcasts</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">#{ep.number}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange-ink">
            Episode #{ep.number} · {ep.durationMin} min
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight">
            {ep.title}
          </h1>
          <div className="mt-2 font-mono text-xs text-muted">
            {ep.guest} ·{" "}
            {new Date(ep.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          {/* Player placeholder */}
          <div className="mt-8 flex items-center gap-4 rounded-[6px] border-2 border-ink bg-surface-2 px-6 py-5">
            <div className="grid h-14 w-14 flex-none place-items-center rounded-full bg-orange text-xl text-white">
              &#9654;
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold">{ep.title}</div>
              <div className="font-mono text-xs text-muted">
                {ep.durationMin}:00 · Audio player loads in production
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader kicker="Episode summary" title="About this episode" />
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {ep.summary}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <Link href="/podcasts">
              <Button variant="ghost">&larr; All episodes</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost">Browse projects</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
