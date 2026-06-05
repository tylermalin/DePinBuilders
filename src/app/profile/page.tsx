import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/section-header";

export function generateMetadata() {
  return pageMeta({
    title: "Your Profile",
    description: "Manage your DePin.Builders account, favorites, and course progress.",
    path: "/profile",
    noIndex: true,
  });
}

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader kicker="Account" title="Your Profile" />

        <div className="mt-8 max-w-2xl">
          {/* User info */}
          <div className="rounded-[6px] border-[1.5px] border-line bg-surface p-6">
            <div className="flex items-center gap-4">
              {user.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              )}
              <div>
                <div className="font-display text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </div>
                <div className="font-mono text-xs text-muted">
                  {user.emailAddresses[0]?.emailAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Favorites placeholder */}
          <div className="mt-8">
            <h2 className="mb-3 font-display text-xl font-semibold">
              Favorite projects
            </h2>
            <p className="text-sm text-muted">
              Your favorite projects will appear here once you start
              starring them from the directory. Favorites sync to your
              account across devices.
            </p>
          </div>

          {/* Course progress placeholder */}
          <div className="mt-8">
            <h2 className="mb-3 font-display text-xl font-semibold">
              Course progress
            </h2>
            <p className="text-sm text-muted">
              Your enrolled courses and progress will appear here. Visit
              the Academy to start a course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
