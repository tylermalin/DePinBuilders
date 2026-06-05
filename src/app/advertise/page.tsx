import { pageMeta } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/section-header";
import { AdvertiseForm } from "./form";

export function generateMetadata() {
  return pageMeta({
    title: "Advertise with DePin.Builders",
    description:
      "Reach builders and operators pricing their next DePIN deployment. Featured placement, newsletter sponsorship, and podcast reads. All paid placement is labeled.",
    path: "/advertise",
  });
}

export default function AdvertisePage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[var(--max-w)] px-7 py-12">
        <SectionHeader
          kicker="For advertisers"
          title="Advertise with DePin.Builders"
        />

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Reach builders and operators who are actively pricing their next
          deployment. Options include featured directory placement,
          newsletter sponsorship, and podcast reads. All paid placement is
          labeled as sponsored and never affects editorial scores or
          reviews.
        </p>

        <div className="mt-8 max-w-lg">
          <AdvertiseForm />
        </div>
      </div>
    </div>
  );
}
