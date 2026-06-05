import Link from "next/link";
import { getEpisodes } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

export function generateMetadata() {
  return pageMeta({
    title: "The DePin.Builders Podcast: DePIN Founders and Operators",
    description:
      "Conversations with the founders and operators actually building decentralized infrastructure. Strategy, hardware, and incentive design, in their words.",
    path: "/podcasts",
  });
}

export default async function PodcastsIndexPage() {
  const episodes = await getEpisodes();

  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Podcasts", path: "/podcasts" },
  ]);

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader
          kicker="Listen"
          title="The DePin.Builders Podcast"
          action={
            <span className="font-mono text-[11px] text-muted">
              Spotify · Apple · YouTube
            </span>
          }
        />
        <p className="mt-4 max-w-[44em] text-base leading-relaxed text-muted">
          Conversations with the founders and operators actually building
          decentralized infrastructure. The strategy, the hardware, and
          the incentive design, in their words.
        </p>

        <div className="mt-8 space-y-3">
          {episodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/podcasts/${ep.slug}`}
              className="group flex items-center gap-4 rounded-[6px] border-[1.5px] border-line bg-surface px-[18px] py-[18px] transition-all hover:border-ink hover:shadow-[var(--shadow)]"
            >
              <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-orange text-lg text-white transition-transform group-hover:scale-[1.08]">
                &#9654;
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-orange-ink">
                  Episode #{ep.number}
                </div>
                <h3 className="mt-1 font-display text-[17px] font-semibold leading-tight tracking-tight">
                  {ep.title}
                </h3>
                <div className="mt-0.5 font-mono text-[10.5px] text-muted">
                  {ep.durationMin} min · {ep.guest}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="max-sm:hidden">
                Listen
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
