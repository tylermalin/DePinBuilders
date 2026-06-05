import { cn } from "@/lib/utils";

export interface TickerItem {
  token: string;
  score: number;
  change: number;
}

interface TickerProps {
  items: TickerItem[];
  className?: string;
}

/**
 * Scrolling market ticker. Duplicated items for seamless loop.
 */
export function Ticker({ items, className }: TickerProps) {
  const rendered = items.map((item, i) => (
    <span
      key={`${item.token}-${i}`}
      className="inline-flex items-baseline gap-[7px] border-r border-line px-5 font-mono text-[11.5px] leading-[36px] text-muted"
    >
      {item.token}{" "}
      <span className="font-medium text-ink">{item.score}</span>{" "}
      <span className={item.change >= 0 ? "text-good" : "text-bad"}>
        {item.change >= 0 ? "+" : ""}
        {item.change}%
      </span>
    </span>
  ));

  return (
    <div
      className={cn(
        "overflow-hidden border-b border-line bg-surface",
        className,
      )}
    >
      <div className="flex h-9 items-center">
        {/* Label */}
        <div className="flex h-9 flex-none items-center gap-[7px] border-r border-line px-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange shadow-[0_0_8px_var(--orange)]" />
          DePIN&nbsp;Market
        </div>

        {/* Track */}
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[scrollx_52s_linear_infinite] hover:[animation-play-state:paused]">
            {rendered}
            {rendered}
          </div>
        </div>
      </div>
    </div>
  );
}
