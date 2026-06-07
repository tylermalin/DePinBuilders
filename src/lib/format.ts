import type { Project } from "./types";

/** Format token display: null => "pre-token", else "$TOKEN" */
export function tokenDisplay(token: string | null): string {
  return token ? `$${token}` : "pre-token";
}

/** Format yield range: both 0 => "pre-TGE", else "$low-$high" */
export function yieldDisplay(p: Pick<Project, "yieldLowUsd" | "yieldHighUsd">): string {
  if (p.yieldHighUsd === 0) return "pre-TGE";
  return `$${p.yieldLowUsd.toFixed(2)}\u2013${p.yieldHighUsd.toFixed(2)}`;
}

/** Format hardware cost: 0 => "BYO", else "$N" */
export function costDisplay(cost: number): string {
  return cost > 0 ? `$${cost}` : "BYO";
}

/** Format break-even: null/0 => "n/a", else "~N mo" */
export function breakEvenDisplay(months: number | null): string {
  if (!months) return "n/a";
  return `~${months} mo`;
}
