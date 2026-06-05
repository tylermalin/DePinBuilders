import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Mono uppercase kicker label in orange-ink.
 */
export function Kicker({ children, className }: KickerProps) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
