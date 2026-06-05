import { getEvents } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { eventSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";

export function generateMetadata() {
  return pageMeta({
    title: "DePIN Events Calendar 2026",
    description:
      "Summits, AMAs, workshops, and meetups for DePIN operators and builders. Add to your calendar directly from this page.",
    path: "/events",
  });
}

function googleCalUrl(ev: {
  title: string;
  description: string;
  location: string;
  startsAt: string;
}) {
  const start = new Date(ev.startsAt);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2h default
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+/, "");
  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(ev.title)}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(ev.description)}&location=${encodeURIComponent(ev.location)}`;
}

export default async function EventsPage() {
  const events = await getEvents();

  const eventsJsonLd = events.map((ev) =>
    eventSchema({
      title: ev.title,
      description: ev.description,
      slug: ev.slug,
      location: ev.location,
      startsAt: ev.startsAt,
      online: ev.online,
    }),
  );
  const crumbJsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ]);

  return (
    <div className="bg-paper">
      {[crumbJsonLd, ...eventsJsonLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader kicker="Calendar" title="DePIN Events" />

        <div className="mt-8 space-y-3">
          {events.map((ev) => {
            const d = new Date(ev.startsAt);
            const month = d
              .toLocaleDateString("en-US", { month: "short" })
              .toUpperCase();
            const day = d.getDate();
            return (
              <div
                key={ev.slug}
                className="flex gap-[18px] rounded-[6px] border-[1.5px] border-line bg-surface p-5 transition-all hover:border-ink hover:shadow-[var(--shadow)]"
              >
                {/* Date block */}
                <div className="flex w-16 flex-none flex-col items-center border-r-[1.5px] border-line pr-[18px] text-center">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-orange-ink">
                    {month}
                  </div>
                  <div className="font-display text-[32px] font-bold leading-none">
                    {day}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-display text-[18px] font-semibold tracking-tight">
                    {ev.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">
                    {ev.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3.5 font-mono text-[10.5px] text-muted">
                    <span>
                      {ev.online ? "Online" : ev.location}
                    </span>
                    <a
                      href={googleCalUrl(ev)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-ink hover:underline"
                    >
                      + Add to calendar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
