import { cn } from "@/lib/utils";
import { Kicker } from "./kicker";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Section top: 2px ink border bottom, kicker above heading, optional right-side action.
 */
export function SectionHeader({
  kicker,
  title,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-5 border-b-2 border-ink pb-[14px]",
        className,
      )}
    >
      <div>
        {kicker && <Kicker className="mb-2 block">{kicker}</Kicker>}
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-semibold leading-none tracking-tight">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
