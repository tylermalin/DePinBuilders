"use client";

import { useState, useMemo } from "react";
import { calculate, fmtDollar, fmtBreakEven, fmtRoi } from "@/lib/calc";
import type { Project } from "@/lib/data";

interface Props {
  devices: Pick<
    Project,
    "slug" | "name" | "category" | "hardwareCostUsd" | "yieldLowUsd" | "yieldHighUsd" | "powerWatts"
  >[];
}

export function CalculatorIsland({ devices }: Props) {
  const [selectedSlug, setSelectedSlug] = useState(devices[0]?.slug ?? "");

  const device = useMemo(
    () => devices.find((d) => d.slug === selectedSlug) ?? devices[0],
    [devices, selectedSlug],
  );

  const mid = (device.yieldLowUsd + device.yieldHighUsd) / 2;
  const maxDaily = +(device.yieldHighUsd * 1.5).toFixed(2);

  const [daily, setDaily] = useState(mid);
  const [rate, setRate] = useState(0.15);
  const [tokenMul, setTokenMul] = useState(1.0);
  const [cost, setCost] = useState(device.hardwareCostUsd);

  // When device changes, reset to its defaults
  function selectDevice(slug: string) {
    setSelectedSlug(slug);
    const d = devices.find((x) => x.slug === slug) ?? devices[0];
    const m = (d.yieldLowUsd + d.yieldHighUsd) / 2;
    setDaily(m);
    setCost(d.hardwareCostUsd);
  }

  const result = calculate({
    dailyEarnings: daily,
    electricityRate: rate,
    tokenMultiplier: tokenMul,
    hardwareCost: cost,
    powerWatts: device.powerWatts,
  });

  return (
    <div className="overflow-hidden rounded-[6px] border-2 border-ink bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Input panel */}
        <div className="border-b-[1.5px] border-ink p-7 md:border-b-0 md:border-r-[1.5px]">
          {/* Device select */}
          <Field label="Device / network">
            <select
              value={selectedSlug}
              onChange={(e) => selectDevice(e.target.value)}
              className="w-full rounded-[3px] border-[1.5px] border-line-2 bg-surface px-3.5 py-[11px] font-mono text-[13px] text-ink"
            >
              {devices.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} · {d.category}
                </option>
              ))}
            </select>
          </Field>

          {/* Daily earnings slider */}
          <Field label="Reported daily earnings (USD)">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={maxDaily}
                step="0.01"
                value={daily}
                onChange={(e) => setDaily(+e.target.value)}
                className="flex-1 accent-orange"
              />
              <span className="min-w-[64px] text-right font-mono text-[13px] font-semibold">
                {fmtDollar(daily)}
              </span>
            </div>
          </Field>

          {/* Electricity rate slider */}
          <Field label="Electricity cost ($/kWh)">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="flex-1 accent-orange"
              />
              <span className="min-w-[64px] text-right font-mono text-[13px] font-semibold">
                {fmtDollar(rate)}
              </span>
            </div>
          </Field>

          {/* Token price slider */}
          <Field label="Token price assumption">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={tokenMul}
                onChange={(e) => setTokenMul(+e.target.value)}
                className="flex-1 accent-orange"
              />
              <span className="min-w-[64px] text-right font-mono text-[13px] font-semibold">
                {tokenMul.toFixed(2)}&times;
              </span>
            </div>
          </Field>

          {/* Hardware cost */}
          <Field label="Hardware cost (USD)">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(+e.target.value)}
              className="w-full rounded-[3px] border-[1.5px] border-line-2 bg-surface px-3.5 py-[11px] font-mono text-[13px] text-ink focus:border-orange focus:outline-none"
            />
          </Field>
        </div>

        {/* Output panel */}
        <div className="bg-surface-2 p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Net daily profit
          </div>
          <div className="mt-2 font-display text-[46px] font-bold leading-none text-orange-ink">
            {fmtDollar(result.netDaily)}
          </div>

          <div className="mt-6 space-y-0">
            <OutputRow label="Gross / day" value={fmtDollar(result.grossDaily)} />
            <OutputRow label="Power cost / day" value={fmtDollar(result.powerCostDaily)} />
            <OutputRow label="Net / month" value={fmtDollar(result.netMonthly, 0)} />
            <OutputRow label="Net / year" value={fmtDollar(result.netYearly, 0)} />
            <OutputRow label="Break-even" value={fmtBreakEven(result.breakEvenMonths)} />
            <OutputRow label="Year-1 ROI" value={fmtRoi(result.year1Roi)} />
          </div>

          <div className="mt-3.5 rounded-[0_3px_3px_0] border-l-2 border-orange bg-orange-soft p-2.5 font-mono text-[10px] leading-relaxed text-muted">
            Estimates only. Real yields depend on regional saturation, uptime,
            network rewards, and token price, all of which change. This is not
            financial advice.
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-[18px]">
      <label className="mb-[7px] block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-line py-3 text-sm last:border-b-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
        {label}
      </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
