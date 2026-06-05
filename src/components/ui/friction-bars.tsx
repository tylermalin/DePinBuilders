import { cn } from "@/lib/utils";

interface FrictionBarsProps {
  level: number; // 1..5
  className?: string;
}

const LABELS = ["", "Very low", "Low", "Medium", "High", "Very high"];

/**
 * Five vertical bars filled in orange to indicate install difficulty.
 */
export function FrictionBars({ level, className }: FrictionBarsProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-[3px]", className)}
      role="img"
      aria-label={`Friction: ${LABELS[level] ?? level}`}
      title={LABELS[level]}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[14px] w-[6px] rounded-[1px]",
            i < level ? "bg-orange" : "bg-line-2",
          )}
        />
      ))}
    </span>
  );
}

export function frictionLabel(level: number): string {
  return LABELS[level] ?? `${level}`;
}
