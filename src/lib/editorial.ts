/**
 * Hand-written editorial framing for programmatic pages.
 * Every paragraph is genuinely unique. No template duplication.
 * No em dashes. No banned words.
 */

// ── Category intros ──

export const CATEGORY_INTROS: Record<string, { intro: string; bestOf: string }> = {
  Bandwidth: {
    intro:
      "Bandwidth DePIN networks let operators share unused internet capacity in exchange for token rewards. The range runs from zero-cost browser extensions to dedicated relay hardware. What separates a real bandwidth network from an airdrop play is whether the demand side is paying for the traffic or the token is subsidizing it.",
    bestOf:
      "The bandwidth DePIN category spans relay hardware and browser-based sharing. The networks listed here have active demand or a credible path to it. Returns vary sharply: relay hardware earns more per node but costs more to run, while browser clients cost nothing and return accordingly.",
  },
  "Climate / Compute": {
    intro:
      "Climate and compute DePIN combines hardware-signed environmental sensing with on-device AI inference. The thesis is that compliance-grade data (carbon, air quality, energy) needs a chain of custody that starts at the sensor, not at a spreadsheet. This category is small and early, with enterprise revenue models replacing emission-funded yields.",
    bestOf:
      "Climate-focused DePIN is a niche where hardware provenance matters more than node count. The projects here target enterprise buyers (carbon registries, insurers, regulators) rather than retail operators chasing daily yield. Expect longer payback periods and more structured deployment requirements.",
  },
  Compute: {
    intro:
      "Compute DePIN aggregates distributed GPU and CPU capacity for AI inference, rendering, and general workloads. Supply grew fast in 2024 and 2025. The constraint now is demand: which networks have paying customers, and which are still subsidizing utilization with emissions. Operator economics depend on your hardware, your electricity rate, and how many jobs your node actually lands.",
    bestOf:
      "The compute DePIN space is crowded, and the real differentiator is demand. Rendering has proven buyers. AI inference is growing but concentrated. The projects ranked here are scored on verified demand, operator economics, and team execution, not on how large the stated network capacity is.",
  },
  Mapping: {
    intro:
      "Mapping DePIN networks crowdsource spatial data (telecom signals, traffic flow, road conditions) from phones and dashcams. Most are pre-token and compensate with points. The value proposition is selling structured location data to logistics companies, planners, and telecom operators. Entry cost is zero, which means participation is easy but per-user returns are modest.",
    bestOf:
      "Mapping networks are the easiest DePIN to start: download an app, walk or drive. The tradeoff is that returns are small and depend on how valuable your area is to the data buyers. The projects below are ranked by data quality, partnership traction, and realistic operator expectations.",
  },
  Positioning: {
    intro:
      "Positioning DePIN deploys RTK GNSS base stations that deliver centimeter-accurate corrections for drones, robotics, and autonomous vehicles. The hardware is real, the install is physical (rooftop, clear sky view), and the demand side is already buying corrections from legacy providers. This is one of the few DePIN categories with demonstrable real revenue and token burn.",
    bestOf:
      "RTK positioning is physical DePIN at its most concrete: a base station on a roof, corrections sold to real buyers. The projects here compete on coverage density, correction quality, and operator yield. Location and line-of-sight determine everything about what you earn.",
  },
  Sensors: {
    intro:
      "Sensor DePIN covers weather stations, air-quality monitors, flight trackers, and noise-level sensors. These networks produce signed, location-stamped data that is harder to fake than a spreadsheet estimate. The hardware ranges from $139 portable stations to $986 aviation receivers. Yields vary widely by network maturity, data demand, and regional saturation.",
    bestOf:
      "Sensor networks produce the kind of ground-truth data that insurers, forecasters, and planners actually pay for. The ranking below weighs data demand, hardware quality, verification design, and realistic yield ranges. Cheaper hardware does not always mean better ROI if the network is saturated.",
  },
  Storage: {
    intro:
      "Storage DePIN offers decentralized file storage as an alternative to centralized cloud. The challenge is not adding capacity (anyone can plug in a drive) but winning paid, useful storage deals against incumbents with established SLAs. Operator economics at scale favor efficiency and reliability over raw terabytes.",
    bestOf:
      "Decentralized storage is one of the oldest DePIN categories, and the competitive dynamics are well-understood. The projects below are ranked by real utilization, operator economics, and the gap between stated capacity and actual paid usage.",
  },
  Wireless: {
    intro:
      "Wireless DePIN builds coverage networks (LoRaWAN IoT, CBRS cellular offload, Wi-Fi) using operator-deployed hardware instead of carrier-owned towers. The original thesis was crowdsourced coverage. The current economics depend on carrier offload deals, regional density, and whether your hex is already saturated. Yields have compressed in dense metros but remain meaningful where coverage is thin.",
    bestOf:
      "Wireless DePIN pioneered the category but the economics have shifted. Metro saturation crushed early returns, while carrier offload deals created new value in coverage gaps. The ranking below reflects current operator economics, not the 2021 hotspot gold rush.",
  },
};

// ── Chain intros ──

export const CHAIN_INTROS: Record<string, string> = {
  Arbitrum:
    "Arbitrum hosts DePIN projects that need Ethereum-grade settlement with lower fees. The L2 is popular with compute and sensor networks that run frequent reward distributions. Operator-facing economics benefit from cheaper on-chain transactions without leaving the Ethereum security umbrella.",
  "BNB Chain":
    "BNB Chain carries a handful of sensor and weather DePIN projects that chose it for low fees and large existing user bases. The chain is less common in DePIN than Solana or Arbitrum, but projects here benefit from BNB's retail distribution reach.",
  Cardano:
    "Cardano's DePIN footprint is small and specialized. The projects building here tend to focus on compliance, provenance, and formal verification, which aligns with Cardano's academic and governance-oriented design philosophy.",
  Ethereum:
    "Ethereum mainnet is used by DePIN projects that prioritize maximum decentralization and composability with the broader DeFi ecosystem. Gas costs make it less common for high-frequency reward distribution, so projects here often batch settlements or use L2s for day-to-day operations.",
  Filecoin:
    "Filecoin is both a chain and a DePIN network. Projects built natively on Filecoin inherit its storage primitives and deal-making infrastructure. Operator economics revolve around winning paid storage deals rather than earning block rewards from empty capacity.",
  Hedera:
    "Hedera hosts a small number of DePIN projects, typically those that value its enterprise governance model and fast finality. The Hedera ecosystem is less retail-oriented than Solana, which tends to attract projects targeting institutional or enterprise data buyers.",
  Polygon:
    "Polygon supports DePIN projects that want EVM compatibility with lower fees. Storage and sensor networks on Polygon benefit from the chain's mature tooling and its large existing developer ecosystem.",
  Solana:
    "Solana is the most common chain for DePIN, hosting more projects than any other network. Its high throughput and low fees make it practical for the frequent, small-value reward transactions that characterize most operator payouts. The Helium migration to Solana in 2023 anchored DePIN as a core use case for the chain.",
};

// ── Comparison verdicts ──

import type { Project } from "./data";

export function comparisonVerdict(a: Project, b: Project): string {
  const scoreDiff = a.builderScore - b.builderScore;
  const costA = a.hardwareCostUsd;
  const costB = b.hardwareCostUsd;
  const yieldA = a.yieldHighUsd;
  const yieldB = b.yieldHighUsd;

  // Both BYO
  if (costA === 0 && costB === 0) {
    if (scoreDiff > 5)
      return `${a.name} scores higher on verified demand and team execution. ${b.name} is a credible alternative with a different compute model. Both are BYO hardware with no upfront cost.`;
    if (scoreDiff < -5)
      return `${b.name} has a stronger builder score and more established demand. ${a.name} offers a lighter onboarding path. Neither requires dedicated hardware.`;
    return `Both ${a.name} and ${b.name} require no dedicated hardware purchase. The choice depends on your existing rig, the type of workload you want to serve, and which network is landing more paid jobs in your region.`;
  }

  // One costs more but yields more
  if (costA > costB && yieldA > yieldB) {
    return `${a.name} costs more upfront ($${costA} vs ${costB > 0 ? "$" + costB : "BYO"}) but reports higher daily yields. ${b.name} is the lower-risk entry if you want to test the ${a.category} category before committing more capital.`;
  }
  if (costB > costA && yieldB > yieldA) {
    return `${b.name} has the higher ticket size ($${costB} vs ${costA > 0 ? "$" + costA : "BYO"}) and reports stronger daily yields. ${a.name} is the lighter entry point, better suited if you want exposure to ${a.category} without the larger upfront commitment.`;
  }

  // Score-based fallback
  if (scoreDiff > 3)
    return `${a.name} carries a higher builder score (${a.builderScore} vs ${b.builderScore}), reflecting stronger verified demand and operator economics. ${b.name} is worth watching if its roadmap addresses the gaps in demand or coverage.`;
  if (scoreDiff < -3)
    return `${b.name} edges ahead on builder score (${b.builderScore} vs ${a.builderScore}), with stronger current fundamentals. ${a.name} remains competitive on ${costA > costB ? "coverage" : "entry cost"} and may close the gap as its network matures.`;

  return `${a.name} and ${b.name} are closely matched in the ${a.category} category. The right choice depends on your location, existing hardware, and whether you prioritize yield stability or network growth potential.`;
}
