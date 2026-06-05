"use client";

import { useActionState } from "react";
import { submitVerification, type VerifyFormState } from "@/lib/actions/verify";
import { Button } from "@/components/ui/button";

const initial: VerifyFormState = { success: false };

export function VerifyForm() {
  const [state, action, pending] = useActionState(submitVerification, initial);

  if (state.success) {
    return (
      <div className="rounded-[6px] border-[1.5px] border-good bg-surface p-6 text-center">
        <div className="font-display text-xl font-bold text-good">
          Verification request submitted
        </div>
        <p className="mt-2 text-sm text-muted">
          Our team will review your project and respond within 5 business
          days. Verification is editorial and independent of any fee.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="max-w-lg space-y-5">
      {state.error && (
        <div className="rounded-[4px] bg-bad/10 px-4 py-2 text-sm text-bad">
          {state.error}
        </div>
      )}

      <Field
        label="Project name"
        name="project"
        placeholder="Your network"
        errors={state.fieldErrors?.project}
      />
      <Field label="Category" name="category" type="select" />
      <Field
        label="Website"
        name="website"
        placeholder="https://"
        errors={state.fieldErrors?.website}
      />
      <Field
        label="Contact email"
        name="email"
        type="email"
        placeholder="team@project.xyz"
        errors={state.fieldErrors?.email}
      />

      <Button variant="fill" type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Request verification"}
      </Button>

      <p className="font-mono text-[10px] leading-relaxed text-muted">
        Verification is editorial and scored independently of any fee.
        Paid placement and advertising are separate products and always
        labeled.
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
  const inputClasses =
    "w-full rounded-[3px] border-[1.5px] border-line-2 bg-surface px-3.5 py-[11px] font-mono text-[13px] text-ink focus:border-orange focus:outline-none";

  return (
    <div>
      <label className="mb-[7px] block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      {type === "select" ? (
        <select name={name} className={inputClasses} required>
          <option value="">Select a category</option>
          {[
            "Bandwidth",
            "Climate / Compute",
            "Compute",
            "Mapping",
            "Positioning",
            "Sensors",
            "Storage",
            "Wireless",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          required
        />
      )}
      {errors?.map((e) => (
        <p key={e} className="mt-1 text-xs text-bad">
          {e}
        </p>
      ))}
    </div>
  );
}
