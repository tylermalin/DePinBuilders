import { pageMeta } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/section-header";
import { VerifyForm } from "./form";

export function generateMetadata() {
  return pageMeta({
    title: "Get Your DePIN Project Verified",
    description:
      "Submit your DePIN project for editorial review against the DePin.Builders methodology. Verification is editorial and scored independently of any fee.",
    path: "/get-verified",
  });
}

export default function GetVerifiedPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader
          kicker="For project teams"
          title="Get your project verified"
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              Submit your DePIN project for editorial review against our
              published methodology. Verified projects get a badge, a full
              spec sheet, and placement in the directory, map, and
              rankings.
            </p>

            <div className="mt-8">
              <VerifyForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="rounded-[6px] border-[1.5px] border-line bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">
                What verification means
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>
                  Scored against a public methodology covering hardware,
                  verification design, token economics, and demand.
                </li>
                <li>
                  Editorial review is independent of any commercial
                  relationship. The fee covers review and listing, never a
                  score.
                </li>
                <li>
                  Verified projects appear in the directory, rankings, map,
                  and comparison pages.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
