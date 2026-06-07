import { describe, it, expect } from "vitest";
import {
  calculate,
  fmtDollar,
  fmtBreakEven,
  fmtRoi,
  type CalcInputs,
} from "../calc";

/**
 * The prototype sets defaults as:
 *   daily = (yieldLow + yieldHigh) / 2
 *   rate = 0.15
 *   tok = 1.0
 *   cost = project.hardwareCostUsd
 *   power = project.powerWatts
 *
 * These tests verify our pure function matches the prototype's recalc() exactly.
 */

// Helper: prototype's recalc logic for independent verification
function protoCalc(daily: number, rate: number, tok: number, cost: number, power: number) {
  const gross = daily * tok;
  const powerCost = (power / 1000) * 24 * rate;
  const net = gross - powerCost;
  return {
    gross,
    powerCost,
    net,
    month: net * 30,
    year: net * 365,
    be: net > 0 ? cost / (net * 30) : null,
    roi: cost > 0 ? ((net * 365 - cost) / cost) * 100 : 0,
  };
}

describe("calculate", () => {
  describe("GEODNET at default inputs", () => {
    // GEODNET: yLow=1.56, yHigh=1.80, cost=695, power=2
    const inputs: CalcInputs = {
      dailyEarnings: (1.56 + 1.80) / 2, // 1.68
      electricityRate: 0.15,
      tokenMultiplier: 1.0,
      hardwareCost: 695,
      powerWatts: 2,
    };
    const result = calculate(inputs);
    const proto = protoCalc(1.68, 0.15, 1, 695, 2);

    it("gross daily = $1.68", () => {
      expect(result.grossDaily).toBeCloseTo(1.68, 4);
      expect(result.grossDaily).toBeCloseTo(proto.gross, 4);
    });

    it("power cost/day = $0.01 (2W)", () => {
      expect(result.powerCostDaily).toBeCloseTo(0.0072, 4);
      expect(fmtDollar(result.powerCostDaily)).toBe("$0.01");
    });

    it("net daily matches prototype", () => {
      expect(result.netDaily).toBeCloseTo(proto.net, 4);
      // prototype shows "$1.67" for net (1.68 - 0.0072 = 1.6728)
      expect(fmtDollar(result.netDaily)).toBe("$1.67");
    });

    it("net monthly matches prototype", () => {
      expect(result.netMonthly).toBeCloseTo(proto.month, 2);
      expect(fmtDollar(result.netMonthly, 0)).toBe("$50");
    });

    it("net yearly matches prototype", () => {
      expect(result.netYearly).toBeCloseTo(proto.year, 1);
      expect(fmtDollar(result.netYearly, 0)).toBe("$611");
    });

    it("break-even matches prototype", () => {
      expect(result.breakEvenMonths).not.toBeNull();
      expect(result.breakEvenMonths).toBeCloseTo(proto.be!, 1);
      // 695 / (1.6728 * 30) = ~13.8
      expect(fmtBreakEven(result.breakEvenMonths)).toBe("~13.8 months");
    });

    it("year-1 ROI matches prototype", () => {
      expect(result.year1Roi).toBeCloseTo(proto.roi, 0);
      expect(fmtRoi(result.year1Roi)).toBe("-12%");
    });
  });

  describe("WeatherXM at default inputs", () => {
    // WeatherXM: yLow=0.10, yHigh=0.19, cost=139, power=3
    const inputs: CalcInputs = {
      dailyEarnings: (0.1 + 0.19) / 2, // 0.145
      electricityRate: 0.15,
      tokenMultiplier: 1.0,
      hardwareCost: 139,
      powerWatts: 3,
    };
    const result = calculate(inputs);
    const proto = protoCalc(0.145, 0.15, 1, 139, 3);

    it("gross daily = $0.15 (rounded from 0.145)", () => {
      expect(result.grossDaily).toBeCloseTo(0.145, 4);
      expect(fmtDollar(result.grossDaily)).toBe("$0.15");
    });

    it("power cost/day for 3W", () => {
      // 3/1000 * 24 * 0.15 = 0.0108
      expect(result.powerCostDaily).toBeCloseTo(0.0108, 4);
    });

    it("net daily", () => {
      expect(result.netDaily).toBeCloseTo(proto.net, 4);
      expect(fmtDollar(result.netDaily)).toBe("$0.13");
    });

    it("net monthly", () => {
      expect(fmtDollar(result.netMonthly, 0)).toBe("$4");
    });

    it("net yearly", () => {
      expect(fmtDollar(result.netYearly, 0)).toBe("$49");
    });

    it("break-even", () => {
      expect(result.breakEvenMonths).not.toBeNull();
      expect(fmtBreakEven(result.breakEvenMonths)).toBe("~34.5 months");
    });

    it("year-1 ROI (negative for long payback)", () => {
      expect(result.year1Roi).toBeLessThan(0);
      expect(fmtRoi(result.year1Roi)).toBe("-65%");
    });
  });

  describe("Aethir at default inputs", () => {
    // Aethir: yLow=0.29, yHigh=0.58, cost=1349, power=20
    const inputs: CalcInputs = {
      dailyEarnings: (0.29 + 0.58) / 2, // 0.435
      electricityRate: 0.15,
      tokenMultiplier: 1.0,
      hardwareCost: 1349,
      powerWatts: 20,
    };
    const result = calculate(inputs);
    const proto = protoCalc(0.435, 0.15, 1, 1349, 20);

    it("gross daily", () => {
      expect(result.grossDaily).toBeCloseTo(0.435, 4);
    });

    it("power cost/day for 20W", () => {
      // 20/1000 * 24 * 0.15 = 0.072
      expect(result.powerCostDaily).toBeCloseTo(0.072, 4);
    });

    it("net daily", () => {
      expect(result.netDaily).toBeCloseTo(proto.net, 4);
      expect(fmtDollar(result.netDaily)).toBe("$0.36");
    });

    it("net monthly", () => {
      expect(fmtDollar(result.netMonthly, 0)).toBe("$11");
    });

    it("net yearly", () => {
      expect(fmtDollar(result.netYearly, 0)).toBe("$132");
    });

    it("break-even", () => {
      expect(result.breakEvenMonths).not.toBeNull();
      expect(fmtBreakEven(result.breakEvenMonths)).toMatch(/~12[34]\.\d months/);
    });

    it("year-1 ROI (deeply negative)", () => {
      expect(result.year1Roi).toBeLessThan(-80);
      expect(fmtRoi(result.year1Roi)).toBe("-90%");
    });
  });

  describe("edge cases", () => {
    it("zero hardware cost returns 0 ROI and null break-even", () => {
      const result = calculate({
        dailyEarnings: 1.0,
        electricityRate: 0.15,
        tokenMultiplier: 1.0,
        hardwareCost: 0,
        powerWatts: 0,
      });
      expect(result.year1Roi).toBe(0);
      expect(result.breakEvenMonths).toBeNull();
    });

    it("net negative returns null break-even", () => {
      const result = calculate({
        dailyEarnings: 0.001,
        electricityRate: 0.40,
        tokenMultiplier: 0.5,
        hardwareCost: 500,
        powerWatts: 100,
      });
      expect(result.netDaily).toBeLessThan(0);
      expect(result.breakEvenMonths).toBeNull();
    });

    it("uptime defaults to 100% when omitted", () => {
      const withUptime = calculate({
        dailyEarnings: 2.0,
        electricityRate: 0,
        tokenMultiplier: 1.0,
        hardwareCost: 100,
        powerWatts: 0,
        uptime: 1.0,
      });
      const omitted = calculate({
        dailyEarnings: 2.0,
        electricityRate: 0,
        tokenMultiplier: 1.0,
        hardwareCost: 100,
        powerWatts: 0,
      });
      expect(omitted.grossDaily).toBeCloseTo(withUptime.grossDaily, 4);
      expect(omitted.grossDaily).toBeCloseTo(2.0, 4);
    });

    it("uptime scales gross earnings but not power cost", () => {
      const result = calculate({
        dailyEarnings: 2.0,
        electricityRate: 0.15,
        tokenMultiplier: 1.0,
        hardwareCost: 100,
        powerWatts: 100,
        uptime: 0.5,
      });
      // gross = 2.0 * 1.0 * 0.5 = 1.0
      expect(result.grossDaily).toBeCloseTo(1.0, 4);
      // power cost charged at full 24h regardless of uptime: 100/1000*24*0.15 = 0.36
      expect(result.powerCostDaily).toBeCloseTo(0.36, 4);
      expect(result.netDaily).toBeCloseTo(0.64, 4);
    });

    it("token multiplier 2x doubles gross", () => {
      const base = calculate({
        dailyEarnings: 1.0,
        electricityRate: 0,
        tokenMultiplier: 1.0,
        hardwareCost: 100,
        powerWatts: 0,
      });
      const doubled = calculate({
        dailyEarnings: 1.0,
        electricityRate: 0,
        tokenMultiplier: 2.0,
        hardwareCost: 100,
        powerWatts: 0,
      });
      expect(doubled.grossDaily).toBeCloseTo(base.grossDaily * 2, 4);
    });
  });
});

describe("formatting helpers", () => {
  it("fmtDollar formats correctly", () => {
    expect(fmtDollar(1.678)).toBe("$1.68");
    expect(fmtDollar(49.2, 0)).toBe("$49");
    expect(fmtDollar(0.0072)).toBe("$0.01");
  });

  it("fmtBreakEven formats correctly", () => {
    expect(fmtBreakEven(8.0)).toBe("~8.0 months");
    expect(fmtBreakEven(null)).toBe("never at these inputs");
  });

  it("fmtRoi formats with sign", () => {
    expect(fmtRoi(86)).toBe("+86%");
    expect(fmtRoi(-12)).toBe("-12%");
    expect(fmtRoi(0)).toBe("+0%");
  });
});
