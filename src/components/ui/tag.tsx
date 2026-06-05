import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "category" | "tier";
  className?: string;
}

/**
 * Mono uppercase tag. Tier tags use orange-soft, category tags use surface-2.
 */
export function Tag({ children, variant = "category", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-[3px] px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.04em]",
        variant === "tier"
          ? "bg-orange-soft text-orange-ink"
          : "bg-surface-2 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
