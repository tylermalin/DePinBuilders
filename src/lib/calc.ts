/**
 * Pure ROI calculation function matching the prototype's recalc() logic exactly.
 *
 * Formulas (from prototype):
 *   gross = dailyEarnings * tokenMultiplier * uptime
 *   powerCostPerDay = (powerWatts / 1000) * 24 * electricityRate
 *   netDaily = gross - powerCostPerDay
 *
 * Uptime scales rewards only. A node that is offline earns nothing for that
 * window but the operator still pays to keep the hardware powered, so power
 * cost is charged at the full 24 hours. That gives a deliberately conservative
 * net for any uptime below 100 percent.
 *   netMonthly = netDaily * 30
 *   netYearly = netDaily * 365
 *   breakEvenMonths = hardwareCost / (netDaily * 30)   [if netDaily > 0]
 *   year1Roi = ((netYearly - hardwareCost) / hardwareCost) * 100  [if hardwareCost > 0]
 */

export interface CalcInputs {
  /** Reported daily earnings in USD */
  dailyEarnings: number;
  /** Electricity cost in $/kWh */
  electricityRate: number;
  /** Token price multiplier (1.0 = current, 2.0 = double) */
  tokenMultiplier: number;
  /** Hardware purchase cost in USD */
  hardwareCost: number;
  /** Device power draw in watts */
  powerWatts: number;
  /** Fraction of time the node is online and earning (0 to 1). Defaults to 1. */
  uptime?: number;
}

export interface CalcOutputs {
  grossDaily: number;
  powerCostDaily: number;
  netDaily: number;
  netMonthly: number;
  netYearly: number;
  breakEvenMonths: number | null;
  year1Roi: number;
}

export function calculate(inputs: CalcInputs): CalcOutputs {
  const uptime = inputs.uptime ?? 1;
  const gross = inputs.dailyEarnings * inputs.tokenMultiplier * uptime;
  const powerCostDaily =
    (inputs.powerWatts / 1000) * 24 * inputs.electricityRate;
  const net = gross - powerCostDaily;
  const netMonthly = net * 30;
  const netYearly = net * 365;

  const breakEvenMonths =
    net > 0 && inputs.hardwareCost > 0
      ? inputs.hardwareCost / (net * 30)
      : null;

  const year1Roi =
    inputs.hardwareCost > 0
      ? ((netYearly - inputs.hardwareCost) / inputs.hardwareCost) * 100
      : 0;

  return {
    grossDaily: gross,
    powerCostDaily,
    netDaily: net,
    netMonthly,
    netYearly,
    breakEvenMonths,
    year1Roi,
  };
}

/** Format dollar amount: "$1.65" or "$49" */
export function fmtDollar(n: number, decimals = 2): string {
  return `$${n.toFixed(decimals)}`;
}

/** Format break-even: "~8.0 months" or "never at these inputs" */
export function fmtBreakEven(months: number | null): string {
  if (months === null) return "never at these inputs";
  return `~${months.toFixed(1)} months`;
}

/** Format ROI: "+86%" or "-12%" */
export function fmtRoi(pct: number): string {
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%`;
}
