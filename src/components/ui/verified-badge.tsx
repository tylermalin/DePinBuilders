import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  verified: boolean;
  className?: string;
  showLabel?: boolean;
}

/**
 * Verified check glyph. Uses good color when verified, line-2 when not.
 * Always uses glyph plus color (never color alone) per accessibility rules.
 */
export function VerifiedBadge({
  verified,
  className,
  showLabel = false,
}: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        verified ? "text-good" : "text-line-2",
        className,
      )}
      aria-label={verified ? "Verified" : "Unverified"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[18px] w-[18px]"
      >
        <path d="M12 1l3 3 4-1 1 4 3 3-3 3 1 4-4-1-3 3-3-3-4 1-1-4-3-3 3-3-1-4 4 1z" />
        {verified && (
          <path
            d="M8 12l3 3 5-6"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
      {showLabel && (
        <span className="font-mono text-[9px] uppercase tracking-[0.08em]">
          {verified ? "Verified" : "Unverified"}
        </span>
      )}
    </span>
  );
}
