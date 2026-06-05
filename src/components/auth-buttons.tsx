"use client";

import Link from "next/link";
import { Button } from "./ui/button";

/**
 * Auth buttons for the nav bar.
 * When Clerk keys are configured, the ClerkAuthButtons component
 * (in auth-buttons-clerk.tsx) is used instead via conditional import
 * in site-nav.tsx. This is the fallback when Clerk is not configured.
 */
export function AuthButtons() {
  return (
    <Link href="/profile" className="max-sm:hidden">
      <Button variant="ghost" size="sm">
        Sign in
      </Button>
    </Link>
  );
}
