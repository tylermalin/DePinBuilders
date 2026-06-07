/**
 * The DePIN Geospatial Rating Framework.
 *
 * The six dimensions that every project review and analytical report is scored
 * against. Each carries a weight (the weights sum to 100), the structural
 * metric it measures, and the target benchmark. The dimension keys match
 * ReviewScores so a project's scores, its review, and its full report all line
 * up against the same methodology.
 */

import type { ReviewScores } from "./types";

export interface MethodologyDimension {
  key: keyof ReviewScores;
  label: string;
  /** Relative weight in the composite, as a percentage. Weights sum to 100. */
  weight: number;
  /** One-line definition of what the dimension measures. */
  summary: string;
  /** The structural or mathematical metric, in plain readable form. */
  metric: string;
  /** The target benchmark a strong project clears. */
  benchmark: string;
}

export const METHODOLOGY: MethodologyDimension[] = [
  {
    key: "realRevenue",
    label: "Demand-side revenue",
    weight: 20,
    summary: "Real enterprise revenue measured against token incentive emissions.",
    metric: "Demand-to-Emission ratio = on-chain ARR / annual value of emitted tokens",
    benchmark: "Ratio at or above 0.50, with annual recurring revenue over $500k",
  },
  {
    key: "tokenEconomics",
    label: "Token economics",
    weight: 15,
    summary: "Emission schedule, burn mechanics, and payout sustainability.",
    metric: "Deflation ARR = annual emission value / burn rate (0.80 here)",
    benchmark: "Net-positive token deflation within three years of mainnet",
  },
  {
    key: "decentralization",
    label: "Network decentralization",
    weight: 15,
    summary: "Geographic and operator distribution across the physical footprint.",
    metric: "Spacing coefficient = unique occupied hexagons / total active nodes",
    benchmark: "Coefficient at or above 0.85, no single entity over 20% of nodes",
  },
  {
    key: "hardwareEconomics",
    label: "Hardware economics",
    weight: 15,
    summary: "Capital expenditure, operating cost, and payback velocity.",
    metric: "Payback period = (hardware cost + shipping) / (daily yield x token price)",
    benchmark: "Payback at or under 12 months, power footprint under 5 watts",
  },
  {
    key: "operatorFriction",
    label: "Operator ease",
    weight: 15,
    summary: "Physical install barriers, electrical and network dependencies, approvals.",
    metric: "Onboarding friction score across obstruction, dependency, and zoning",
    benchmark: "Receive-only hardware, zero RF emissions, pre-configured firmware",
  },
  {
    key: "transparency",
    label: "Protocol transparency",
    weight: 20,
    summary: "Public verifiability of data, rewards, and on-chain proofs.",
    metric: "Public verifiability index across proofs, explorer access, open drivers",
    benchmark: "Real-time on-chain data, open-source drivers, auditable burns",
  },
];

/** Sum of all dimension weights. Should always equal 100. */
export const METHODOLOGY_TOTAL_WEIGHT = METHODOLOGY.reduce(
  (sum, d) => sum + d.weight,
  0,
);
