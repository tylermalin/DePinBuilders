"use client";

import { useActionState } from "react";
import {
  subscribeNewsletter,
  type SubscribeFormState,
} from "@/lib/actions/subscribe";

const initial: SubscribeFormState = { success: false };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(
    subscribeNewsletter,
    initial,
  );

  if (state.success) {
    return (
      <span className="font-mono text-[13px] font-semibold">
        ✓ You are in. First brief lands Sunday.
      </span>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-2.5">
      <div className="flex overflow-hidden rounded-[4px] border-2 border-white bg-white">
        <input
          name="email"
          type="email"
          placeholder="you@builder.xyz"
          required
          aria-label="Email"
          className="flex-1 border-none px-3.5 py-3.5 font-mono text-[13px] text-ink outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-5 py-3.5 font-mono text-xs font-semibold uppercase text-white"
        >
          {pending ? "..." : "Join"}
        </button>
      </div>
      {state.error && (
        <span className="text-xs text-white/80">{state.error}</span>
      )}
      <span className="font-mono text-[10px] opacity-85">
        No spam. Unsubscribe anytime. 18,000+ builders.
      </span>
    </form>
  );
}
