"use client";

import { cn } from "@/lib/utils";

interface AffiliateLinkProps {
  href: string;
  projectSlug: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Outbound affiliate link with:
 * - rel="sponsored noopener" (per SEO.md)
 * - Server-side click tracking via /api/affiliate-click
 * - Always labeled as affiliate
 */
export function AffiliateLink({
  href,
  projectSlug,
  children,
  className,
}: AffiliateLinkProps) {
  function handleClick() {
    // Fire-and-forget click tracking
    navigator.sendBeacon?.(
      `/api/affiliate-click?project=${encodeURIComponent(projectSlug)}`,
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      onClick={handleClick}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {children}
    </a>
  );
}
