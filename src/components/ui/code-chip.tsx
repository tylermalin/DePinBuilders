"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeChipProps {
  code: string;
  discount?: string | null;
  className?: string;
}

/**
 * Affiliate code chip: dashed orange border, copy on tap, with disclosure label.
 */
export function CodeChip({ code, discount, className }: CodeChipProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={className}>
      {discount && (
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
          Affiliate discount · {discount}
        </div>
      )}
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-dashed border-orange bg-orange-soft px-[10px] py-[6px] font-mono text-xs text-orange-ink transition-colors hover:border-solid hover:bg-orange hover:text-white",
        )}
      >
        {code}
        <span className="text-[9px] uppercase opacity-70">
          {copied ? "Copied" : "Tap to copy"}
        </span>
      </button>
    </div>
  );
}
