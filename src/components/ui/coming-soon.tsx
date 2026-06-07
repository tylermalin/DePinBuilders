import Link from "next/link";
import { Kicker } from "./kicker";
import { Button } from "./button";

interface ComingSoonProps {
  title: string;
  message: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Plain, honest "coming soon" state for sections that are not built yet.
 * Renders one h1 so the route stays a valid, indexable page without showing
 * any placeholder or fabricated content.
 */
export function ComingSoon({
  title,
  message,
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonProps) {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-[var(--max-w)] flex-col items-center justify-center px-7 py-20 text-center">
      <Kicker className="mb-3 block">Coming soon</Kicker>
      <h1 className="max-w-2xl font-display text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
        {message}
      </p>
      <div className="mt-6">
        <Link href={backHref}>
          <Button variant="ghost">{backLabel}</Button>
        </Link>
      </div>
    </div>
  );
}
