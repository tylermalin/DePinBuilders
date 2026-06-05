import Link from "next/link";
import { getCourses } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { chipColor } from "@/lib/colors";

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Academy: Learn DePIN from Scratch (2026)",
    description:
      "Structured tracks on how DePIN works, how to pick networks, install hardware, and think about token economics before you commit capital. Free and premium courses.",
    path: "/academy",
  });
}

export default async function AcademyPage() {
  const courses = await getCourses();

  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Academy", path: "/academy" },
  ]);

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader
          kicker="Learn"
          title="DePin.Builders Academy"
          action={
            <span className="font-mono text-[11px] text-muted">
              Free + premium tracks
            </span>
          }
        />

        <p className="mt-4 max-w-[46em] text-base leading-relaxed text-muted">
          Go from curious to deployed. Structured tracks on how DePIN
          actually works, how to pick networks, how to install and run
          hardware, and how to think about token economics before you
          commit capital.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Link
              key={c.slug}
              href={`/academy/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-[6px] border-[1.5px] border-line bg-surface transition-all hover:border-ink hover:shadow-[var(--shadow)]"
            >
              <div
                className="grid h-[120px] place-items-center border-b-[1.5px] border-ink px-3 text-center font-display text-[22px] font-bold text-white"
                style={{ backgroundColor: chipColor(i) }}
              >
                {c.title}
              </div>
              <div className="flex flex-1 flex-col p-[18px]">
                <h3 className="font-display text-[19px] font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">
                  {c.summary}
                </p>
                <div className="mt-3.5 font-mono text-[10.5px] uppercase tracking-[0.05em] text-muted">
                  {c.modules}
                </div>
                <div className="mt-3.5 flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-semibold ${c.free ? "text-good" : "text-orange-ink"}`}
                  >
                    {c.free ? "Free" : `$${c.priceUsd}`}
                  </span>
                  <span className="font-mono text-[11px] uppercase text-muted group-hover:text-orange-ink">
                    View course &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
