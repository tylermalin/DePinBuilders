/**
 * Pure ROI calculation function matching the prototype's recalc() logic exactly.
 *
 * Formulas (from prototype):
 *   gross = dailyEarnings * tokenMultiplier
 *   powerCostPerDay = (powerWatts / 1000) * 24 * electricityRate
 *   netDaily = gross - powerCostPerDay
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
  const gross = inputs.dailyEarnings * inputs.tokenMultiplier;
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
