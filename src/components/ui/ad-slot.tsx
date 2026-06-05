import { cn } from "@/lib/utils";

interface AdSlotProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Labeled sponsored placement slot. Dashed border, vertical "Sponsored" label.
 */
export function AdSlot({
  title,
  description,
  action,
  className,
}: AdSlotProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[14px] rounded-[6px] border-[1.5px] border-dashed border-line-2 bg-surface p-4",
        className,
      )}
    >
      <span className="flex shrink-0 items-center self-stretch border-l-2 border-orange pl-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted [writing-mode:vertical-rl] [transform:rotate(180deg)]">
        Sponsored
      </span>
      <div className="flex-1">
        <h4 className="font-display text-lg font-semibold">{title}</h4>
        <p className="mt-[3px] text-[13px] text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
