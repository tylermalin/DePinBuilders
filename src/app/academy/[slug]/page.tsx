import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourses, getCourse } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { courseSchema, breadcrumbSchema } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { chipColor } from "@/lib/colors";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return pageMeta({
    title: `${course.title}: DePIN Course (${course.free ? "Free" : "$" + course.priceUsd})`,
    description: course.summary,
    path: `/academy/${slug}`,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const allCourses = await getCourses();
  const courseIndex = allCourses.findIndex((c) => c.slug === slug);

  const jsonLd = [
    courseSchema({
      title: course.title,
      description: course.summary,
      slug: course.slug,
      priceUsd: course.priceUsd,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Academy", path: "/academy" },
      { name: course.title, path: `/academy/${slug}` },
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
          <Link href="/academy" className="hover:text-orange-ink">Academy</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{course.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {/* Header */}
            <div
              className="grid h-[160px] place-items-center rounded-[6px] px-4 text-center font-display text-2xl font-bold text-white"
              style={{ backgroundColor: chipColor(courseIndex >= 0 ? courseIndex : 0) }}
            >
              {course.title}
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {course.summary}
            </p>
            <div className="mt-3 font-mono text-xs text-muted">
              {course.modules}
            </div>

            {/* Curriculum */}
            <div className="mt-8">
              <SectionHeader kicker="Course content" title="What you will cover" />
              <div className="mt-5 space-y-4">
                {course.curriculum.map((m, mi) => (
                  <div
                    key={mi}
                    className="overflow-hidden rounded-[6px] border-[1.5px] border-line"
                  >
                    <div className="flex items-center justify-between gap-3 bg-surface-2 px-4 py-2.5">
                      <span className="font-display text-sm font-semibold">
                        <span className="font-mono text-[11px] text-muted">
                          Module {mi + 1}
                        </span>{" "}
                        · {m.title}
                      </span>
                      <span className="flex-none font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                        {m.lessons.length} lessons
                      </span>
                    </div>
                    <ol className="divide-y divide-line">
                      {m.lessons.map((l, li) => (
                        <li
                          key={li}
                          className="flex items-baseline gap-3 px-4 py-2.5 text-[13px]"
                        >
                          <span className="font-mono text-[11px] text-muted">
                            {mi + 1}.{li + 1}
                          </span>
                          <span className="text-ink-soft">{l}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* Enroll */}
            <div className="mt-8 rounded-[6px] border-2 border-ink bg-surface-2 p-6 shadow-[var(--shadow)]">
              {course.free ? (
                <>
                  <div className="font-display text-lg font-bold">
                    Free course
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Open access. Start anytime, no purchase needed.
                  </p>
                  <div className="mt-4">
                    <Button variant="fill">Start the course</Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-display text-lg font-bold">
                    Enroll for ${course.priceUsd}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    One-time purchase with lifetime access to every module
                    above.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="fill">Enroll for ${course.priceUsd}</Button>
                    <Button variant="ghost">Sign in</Button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/academy">
                <Button variant="ghost">&larr; All courses</Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-[82px] overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-surface">
              <div className="border-b border-ink bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper">
                Course details
              </div>
              <div className="px-4 py-4 text-sm">
                <Row label="Price" value={course.free ? "Free" : `$${course.priceUsd}`} />
                <Row label="Modules" value={course.modules} />
                <Row label="Access" value={course.free ? "Open" : "Purchase required"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-line py-2.5 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
