/** Logo chip colors matching the prototype's COLORS array. */
const COLORS = [
  "#FF4D17",
  "#1B3FE0",
  "#0E8A4A",
  "#7A3FF0",
  "#E0901B",
  "#0FB5C4",
  "#D23A8E",
  "#3a3d44",
];

export function chipColor(index: number): string {
  return COLORS[index % COLORS.length];
}

/**
 * Background tint for a 0..100 score in the score matrix. Green above 70, red
 * below, intensity scaling with distance from that midpoint. Returns a
 * color-mix on theme tokens so the heatmap adapts to light and dark mode.
 * A negative score (no review) returns transparent.
 */
export function scoreHeat(score: number): string {
  if (score < 0) return "transparent";
  if (score >= 70) {
    const pct = Math.round(15 + ((Math.min(score, 100) - 70) / 30) * 55);
    return `color-mix(in srgb, var(--good) ${pct}%, transparent)`;
  }
  const pct = Math.round(10 + ((70 - Math.max(score, 30)) / 40) * 45);
  return `color-mix(in srgb, var(--bad) ${pct}%, transparent)`;
}
