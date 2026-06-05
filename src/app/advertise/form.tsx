"use client";

import { useActionState } from "react";
import {
  submitAdInquiry,
  type AdvertiseFormState,
} from "@/lib/actions/advertise";
import { Button } from "@/components/ui/button";

const initial: AdvertiseFormState = { success: false };

export function AdvertiseForm() {
  const [state, action, pending] = useActionState(submitAdInquiry, initial);

  if (state.success) {
    return (
      <div className="rounded-[6px] border-[1.5px] border-good bg-surface p-6 text-center">
        <div className="font-display text-xl font-bold text-good">
          Media kit request received
        </div>
        <p className="mt-2 text-sm text-muted">
          We will follow up within 2 business days with placement options
          and pricing.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {state.error && (
        <div className="rounded-[4px] bg-bad/10 px-4 py-2 text-sm text-bad">
          {state.error}
        </div>
      )}

      <Field
        label="Company"
        name="company"
        placeholder="Your company"
        errors={state.fieldErrors?.company}
      />

      <div>
        <label className="mb-[7px] block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Budget range
        </label>
        <select
          name="budget"
          className="w-full rounded-[3px] border-[1.5px] border-line-2 bg-surface px-3.5 py-[11px] font-mono text-[13px] text-ink focus:border-orange focus:outline-none"
          required
        >
          <option value="$1k-5k / mo">$1k to $5k / mo</option>
          <option value="$5k-15k / mo">$5k to $15k / mo</option>
          <option value="$15k+ / mo">$15k+ / mo</option>
        </select>
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.xyz"
        errors={state.fieldErrors?.email}
      />

      <Button variant="fill" type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Request media kit"}
      </Button>

      <p className="font-mono text-[10px] leading-relaxed text-muted">
        Sponsored placement never affects editorial scores or reviews.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  errors,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label className="mb-[7px] block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[3px] border-[1.5px] border-line-2 bg-surface px-3.5 py-[11px] font-mono text-[13px] text-ink focus:border-orange focus:outline-none"
        required
      />
      {errors?.map((e) => (
        <p key={e} className="mt-1 text-xs text-bad">
          {e}
        </p>
      ))}
    </div>
  );
}
