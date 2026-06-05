import { cn } from "@/lib/utils";

interface CtaBandProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CTA band: 2px ink border, orange fill, 8px offset ink shadow, display heading.
 */
export function CtaBand({ children, className }: CtaBandProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-ink bg-orange px-11 py-11 text-white shadow-[8px_8px_0_var(--ink)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
