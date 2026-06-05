"use client";

import {
  useAuth,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

/**
 * Clerk-powered auth buttons. Only imported when CLERK keys are set.
 */
export function ClerkAuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <div className="max-sm:hidden">
        <UserButton />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button variant="ghost" size="sm" className="max-sm:hidden">
        Sign in
      </Button>
    </SignInButton>
  );
}
