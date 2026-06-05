import type { Project } from "./data";
import { tierDisplay } from "./data";

/**
 * Generate a written, keyword-led meta description for a project page.
 * Each description must be unique, under 160 characters, no em dashes, no banned words.
 * Includes the project name, a key number, and a reason to click.
 */
export function projectDescription(p: Project): string {
  const cost = p.hardwareCostUsd > 0 ? `$${p.hardwareCostUsd}` : "no hardware";
  const yieldPart =
    p.yieldHighUsd > 0
      ? `Reported daily yield: $${p.yieldLowUsd.toFixed(2)} to $${p.yieldHighUsd.toFixed(2)}.`
      : "Pre-token, yields not yet established.";
  const scorePart = `Builder score: ${p.builderScore}/100.`;
  const base = `${p.name} ${p.category} DePIN on ${p.chain}. ${tierDisplay(p.tier)} tier, ${cost}. ${yieldPart} ${scorePart}`;

  // Truncate to 160 chars max
  if (base.length <= 160) return base;
  return base.slice(0, 157) + "...";
}

/**
 * Generate a keyword-led title for a project page.
 * Pattern: "PROJECT_NAME Review, ROI and Specs (YEAR)"
 */
export function projectTitle(p: Project): string {
  const yearSuffix = `(${new Date().getFullYear()})`;
  if (p.hardwareCostUsd > 0) {
    return `${p.name} Miner Review, ROI and Specs ${yearSuffix}`;
  }
  return `${p.name} Review, Earnings and Specs ${yearSuffix}`;
}
