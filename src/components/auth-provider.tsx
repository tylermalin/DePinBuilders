import { ClerkProvider } from "@clerk/nextjs";

/**
 * Wraps children with ClerkProvider when Clerk keys are configured.
 * Falls through gracefully when keys are missing (local dev without auth).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasClerk = !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY
  );

  if (!hasClerk) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
