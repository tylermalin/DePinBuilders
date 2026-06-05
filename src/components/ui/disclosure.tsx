import { cn } from "@/lib/utils";

interface DisclosureProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard disclosure block. Always renders when present.
 */
export function Disclosure({ children, className }: DisclosureProps) {
  return (
    <p
      className={cn(
        "font-mono text-[10.5px] leading-relaxed text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Conflict disclosure with a background highlight.
 */
export function ConflictDisclosure({
  children,
  className,
}: DisclosureProps) {
  return (
    <p
      className={cn(
        "rounded-[4px] bg-surface-2 p-[10px] font-mono text-[10.5px] leading-relaxed text-muted",
        className,
      )}
    >
      <span className="font-semibold">Disclosure:</span> {children}
    </p>
  );
}
