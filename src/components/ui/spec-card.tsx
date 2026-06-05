import { cn } from "@/lib/utils";

interface SpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface SpecCardProps {
  headerLeft: string;
  headerRight?: string;
  rows: SpecRow[];
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Spec card: 2px ink border, 6px offset hard shadow, dark header bar with
 * mono label, dashed dividers between rows.
 */
export function SpecCard({
  headerLeft,
  headerRight,
  rows,
  footer,
  className,
}: SpecCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border-2 border-ink bg-surface shadow-[6px_6px_0_var(--ink)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-4 py-3 text-paper">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
          {headerLeft}
        </span>
        {headerRight && (
          <span className="font-mono text-[10px] text-yellow">
            {headerRight}
          </span>
        )}
      </div>

      {/* Body rows */}
      <div className="px-4 py-[18px]">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex items-baseline justify-between py-[9px] text-[13px]",
              i < rows.length - 1 &&
                "border-b border-dashed border-line",
            )}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
              {row.label}
            </span>
            <span
              className={cn(
                "font-semibold",
                row.highlight && "text-orange-ink",
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-between border-t-[1.5px] border-ink bg-surface-2 px-4 py-[13px]">
          {footer}
        </div>
      )}
    </div>
  );
}
