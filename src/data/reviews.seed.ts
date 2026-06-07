// src/data/reviews.seed.ts
// Editorial review content, keyed by project slug. Kept separate from the
// spec data in projects.seed.ts so editorial work and reported figures stay
// cleanly divided.
//
// IMPORTANT: every review below carries status "draft". These are editorial
// drafts, not published verdicts. The project page renders a visible draft
// label until a review is promoted to "published". Verdicts and risks are
// editorial opinion, not financial advice.
//
// Scores are 0..100 on six published dimensions (see ReviewScores). The
// headline builderScore on each project is the weighted editorial composite
// of these dimensions, not a strict average. Reviews are scored on the same
// methodology for every project, including the founder-affiliated one.

import type { ReviewScores, ProjectReview } from "@/lib/types";

export type { ReviewScores, ProjectReview };

/** Human labels and one-line definitions for each score dimension */
export const SCORE_DIMENSIONS: {
  key: keyof ReviewScores;
  label: string;
  description: string;
}[] = [
  {
    key: "realRevenue",
    label: "Real revenue",
    description: "Demand-side revenue versus pure token emission.",
  },
  {
    key: "tokenEconomics",
    label: "Token economics",
    description: "Emission schedule, burn, and payout sustainability.",
  },
  {
    key: "decentralization",
    label: "Decentralization",
    description: "Geographic and operator distribution.",
  },
  {
    key: "hardwareEconomics",
    label: "Hardware economics",
    description: "Payback, cost-to-yield, resale, and capital efficiency.",
  },
  {
    key: "operatorFriction",
    label: "Operator ease",
    description: "How simple the network is to install and run.",
  },
  {
    key: "transparency",
    label: "Transparency",
    description: "Public stats, verifiable data, and disclosure quality.",
  },
];

export const reviews: Record<string, ProjectReview> = {
  geodnet: {
    status: "draft",
    verdict:
      "The steadiest payout-to-cost ratio in physical DePIN, backed by real RTK correction demand rather than emissions alone. Install is a rooftop antenna job, but once mounted it runs untouched.",
    strengths: [
      "Centimeter RTK correction sells into robotics, drones, survey, and autonomy, so rewards track paying demand.",
      "A roughly eight-month break-even is among the fastest for dedicated hardware in the directory.",
      "Triple-band base stations draw two watts and need no maintenance after mounting.",
    ],
    risks: [
      "The best sites need a clear sky view and a stable rooftop mount, which rules out many renters.",
      "Correction revenue concentrates where autonomy customers cluster, so rural placements earn less.",
      "Token price swings move the dollar yield more than network growth does.",
    ],
    scores: {
      realRevenue: 88,
      tokenEconomics: 80,
      decentralization: 82,
      hardwareEconomics: 86,
      operatorFriction: 58,
      transparency: 84,
    },
  },
  weatherxm: {
    status: "draft",
    verdict:
      "A credible data business with real institutional demand, held back by a payback measured in years at current token prices. You buy this for the long game, not the monthly check.",
    strengths: [
      "Signed stations across 80+ countries feed a data marketplace with named enterprise buyers.",
      "Proof of Location and Quality of Data tie rewards to useful, verifiable readings.",
      "Low three-watt draw and a mature install process keep running costs negligible.",
    ],
    risks: [
      "A reported break-even near four years is unforgiving if the token price slips further.",
      "Saturation in well-covered regions thins per-station rewards.",
      "The data-demand story is real but still early relative to the emission schedule.",
    ],
    scores: {
      realRevenue: 78,
      tokenEconomics: 72,
      decentralization: 80,
      hardwareEconomics: 58,
      operatorFriction: 66,
      transparency: 82,
    },
  },
  skyx: {
    status: "draft",
    verdict:
      "A clean, low-friction entry for renters and mobile operators, but pre-token and unproven on yield. Treat any earnings projection as speculative until the token and payout data exist.",
    strengths: [
      "No permanent mount makes it one of the few weather options that works for renters.",
      "Sub-$200 hardware and a one-step setup keep the downside small.",
      "Positioned against a clear, large market in consumer weather data.",
    ],
    risks: [
      "Pre-token with no established yield, so returns are unknown.",
      "Not yet verified on our methodology.",
      "Portable placement can mean lower-quality, lower-paid readings than fixed stations.",
    ],
    scores: {
      realRevenue: 70,
      tokenEconomics: 72,
      decentralization: 82,
      hardwareEconomics: 90,
      operatorFriction: 94,
      transparency: 80,
    },
  },
  nubila: {
    status: "draft",
    verdict:
      "Promising early daily returns from a weather network feeding machine-learning forecasts, with the volatility you expect from a young token. The validator tiers are interesting; the durability is unproven.",
    strengths: [
      "Early daily yields are among the higher reported ranges for sensor hardware.",
      "Sunny, Rainy, and Cloud validator tiers add a path to scale rewards.",
      "Low two-to-three watt draw and a simple install.",
    ],
    risks: [
      "A young network and volatile token make the yield range unreliable.",
      "Not yet verified on our methodology.",
      "Forecast-model demand is a thinner moat than signed enterprise data contracts.",
    ],
    scores: {
      realRevenue: 68,
      tokenEconomics: 65,
      decentralization: 72,
      hardwareEconomics: 79,
      operatorFriction: 82,
      transparency: 70,
    },
  },
  "4dsky": {
    status: "draft",
    verdict:
      "A specialist ADS-B play with serious line-of-sight demands and a high entry price. The Jetvision hardware holds resale value, which is the main thing protecting the downside while the token is pending.",
    strengths: [
      "Reaches aircraft up to 250 nautical miles, a genuinely differentiated data feed.",
      "Jetvision hardware retains strong resale value if you exit.",
      "Aviation tracking has established, paying consumers of the data.",
    ],
    risks: [
      "Extreme line-of-sight needs make siting the hardest in the directory.",
      "Nearly $1,000 entry with no token and no established yield.",
      "Six-watt draw and a friction-five install suit dedicated hobbyists, not casual operators.",
    ],
    scores: {
      realRevenue: 88,
      tokenEconomics: 68,
      decentralization: 62,
      hardwareEconomics: 88,
      operatorFriction: 62,
      transparency: 92,
    },
  },
  onocoy: {
    status: "draft",
    verdict:
      "The most direct alternative to GEODNET in GNSS corrections, dense in Europe and expanding. Solid economics, though a notch behind the category leader on break-even and reach.",
    strengths: [
      "A community RTK network with real correction demand and an 18-month reported break-even.",
      "Dense European coverage gives strong rewards to well-placed EU stations.",
      "Validated with the European Space Agency and ETH Zurich, with on-chain data verification.",
    ],
    risks: [
      "Competes head-on with a larger, faster-paying GEODNET for the same customers.",
      "Coverage outside Europe is still thin, so non-EU placements earn less.",
      "Rooftop, clear-sky siting limits who can run it well.",
    ],
    scores: {
      realRevenue: 81,
      tokenEconomics: 85,
      decentralization: 88,
      hardwareEconomics: 89,
      operatorFriction: 60,
      transparency: 94,
    },
  },
  aethir: {
    status: "draft",
    verdict:
      "Real enterprise GPU demand and named partnerships sit behind this, but current operator yields are still emission-led. The institutional story is the reason to watch it; the present economics are not yet the reason to buy.",
    strengths: [
      "Institutional partnerships point to genuine enterprise GPU and inference demand.",
      "The edge device targets AI inference and cloud gaming, both growing markets.",
      "Verified, with a clear roadmap from emissions toward usage revenue.",
    ],
    risks: [
      "Current yields are emission-led, not demand-led, so they can compress.",
      "A $1,349 device drawing 20 watts raises both capex and running cost.",
      "No reported break-even yet, which reflects the uncertainty.",
    ],
    scores: {
      realRevenue: 83,
      tokenEconomics: 79,
      decentralization: 85,
      hardwareEconomics: 78,
      operatorFriction: 82,
      transparency: 91,
    },
  },
  anyone: {
    status: "draft",
    verdict:
      "A privacy relay with a committed Web3 user base and steady mid-range yields. The technical gotcha is CGNAT on consumer ISPs, which can quietly kill earnings if you skip the check.",
    strengths: [
      "Multi-encrypted relay traffic serves a real, ideologically committed privacy market.",
      "Mid-range reported yields with a moderate hardware cost.",
      "Verified, with an active community and transparent network stats.",
    ],
    risks: [
      "CGNAT on retail ISP connections can prevent relaying and zero out rewards.",
      "A 14-watt draw is meaningful for an always-on device.",
      "Relay rewards depend on sustained demand for the Anon network.",
    ],
    scores: {
      realRevenue: 85,
      tokenEconomics: 90,
      decentralization: 92,
      hardwareEconomics: 88,
      operatorFriction: 84,
      transparency: 91,
    },
  },
  helium: {
    status: "draft",
    verdict:
      "The original consumer DePIN, now split between a saturated IoT layer and a mobile offload business with real carrier demand. The mobile side is the live story; IoT-only operators in dense metros should expect little.",
    strengths: [
      "The mobile CBRS offload layer carries genuine carrier demand and revenue.",
      "The largest brand and community in the category, now settled on Solana.",
      "Wide, mature coverage with transparent on-chain reward data.",
    ],
    risks: [
      "IoT earnings in saturated metros have collapsed to marginal levels.",
      "The reward range is wide and placement-dependent, so outcomes vary sharply.",
      "Years of pivots make forward economics harder to project.",
    ],
    scores: {
      realRevenue: 92,
      tokenEconomics: 88,
      decentralization: 78,
      hardwareEconomics: 84,
      operatorFriction: 64,
      transparency: 94,
    },
  },
  render: {
    status: "draft",
    verdict:
      "One of the clearest demand stories in compute DePIN, with no dedicated hardware to buy. If you already own a capable GPU, the capital risk is essentially zero.",
    strengths: [
      "Real, paying demand from studios and 3D artists, not just emissions.",
      "No hardware purchase; you contribute an existing GPU.",
      "An established brand with strong transparency and a long operating history.",
    ],
    risks: [
      "Earnings depend on render-job demand, which is cyclical.",
      "Competitive GPU supply can compress per-job pay.",
      "Power and wear on your own hardware are real costs the headline ignores.",
    ],
    scores: {
      realRevenue: 84,
      tokenEconomics: 78,
      decentralization: 76,
      hardwareEconomics: 88,
      operatorFriction: 78,
      transparency: 84,
    },
  },
  "io-net": {
    status: "draft",
    verdict:
      "Aggregated GPU compute whose returns track real AI inference demand rather than raw capacity. Bring your own rig and you are exposed to exactly where the market is tightening.",
    strengths: [
      "Rewards follow live inference demand, the part of compute with real pull.",
      "No hardware to buy; you contribute existing GPUs.",
      "A fast-growing network with verified, transparent job data.",
    ],
    risks: [
      "Inference demand is volatile and can swing earnings month to month.",
      "Crowded GPU supply pressures per-job rates.",
      "Young enough that operator economics are still settling.",
    ],
    scores: {
      realRevenue: 85,
      tokenEconomics: 78,
      decentralization: 74,
      hardwareEconomics: 89,
      operatorFriction: 62,
      transparency: 86,
    },
  },
  filecoin: {
    status: "draft",
    verdict:
      "Mature decentralized storage where the work has shifted from adding capacity to winning paid, useful deals. Operator economics now reward scale and efficiency, not hobbyists.",
    strengths: [
      "Serious, proven capacity and a real market for paid storage deals.",
      "A long operating history with deep transparency and tooling.",
      "Demand is increasingly about useful, paid storage rather than raw supply.",
    ],
    risks: [
      "A friction-four setup and deal-making favor professional operators.",
      "Margins favor scale, so small operators struggle to compete.",
      "Returns hinge on winning paid deals, not just providing capacity.",
    ],
    scores: {
      realRevenue: 68,
      tokenEconomics: 74,
      decentralization: 76,
      hardwareEconomics: 85,
      operatorFriction: 34,
      transparency: 91,
    },
  },
  nosana: {
    status: "draft",
    verdict:
      "A lighter GPU marketplace for AI inference on Solana, easier to join than enterprise tiers. Returns track live job demand, so expect them to move with the market.",
    strengths: [
      "A low barrier to entry relative to enterprise compute tiers.",
      "An inference focus that aligns with where compute demand is real.",
      "No dedicated hardware purchase required.",
    ],
    risks: [
      "Returns are tightly tied to live job demand and can be uneven.",
      "A smaller network means thinner, less predictable job flow.",
      "Competes with larger compute marketplaces for the same workloads.",
    ],
    scores: {
      realRevenue: 87,
      tokenEconomics: 88,
      decentralization: 84,
      hardwareEconomics: 92,
      operatorFriction: 82,
      transparency: 90,
    },
  },
  grass: {
    status: "draft",
    verdict:
      "Near-zero capex residential bandwidth sharing with a strong referral engine and a large network effect. Per-user returns are modest, so this is a volume and referral play, not a yield play.",
    strengths: [
      "No hardware and a one-click browser client make onboarding effortless.",
      "Strong referral mechanics compound a large network effect.",
      "Verified, with bandwidth feeding real AI data-collection demand.",
    ],
    risks: [
      "Per-user returns are small, so single-node income is minimal.",
      "Residential IP sharing carries ISP terms-of-service questions.",
      "Reward value is sensitive to token price and data demand.",
    ],
    scores: {
      realRevenue: 84,
      tokenEconomics: 76,
      decentralization: 95,
      hardwareEconomics: 98,
      operatorFriction: 94,
      transparency: 82,
    },
  },
  "375ai": {
    status: "draft",
    verdict:
      "A frictionless phone-app mapping play earning points toward a future airdrop. With no token yet, you are spending attention for a speculative claim, not a known yield.",
    strengths: [
      "Zero hardware and a one-tap app make participation effortless.",
      "Telecom signal mapping has clear buyers in logistics and planning.",
      "Points may convert to a future airdrop for early contributors.",
    ],
    risks: [
      "Pre-token, so all value is a speculative airdrop expectation.",
      "Not yet verified on our methodology.",
      "Points programs can change terms or dilute before any token exists.",
    ],
    scores: {
      realRevenue: 70,
      tokenEconomics: 71,
      decentralization: 82,
      hardwareEconomics: 97,
      operatorFriction: 94,
      transparency: 75,
    },
  },
  denet: {
    status: "draft",
    verdict:
      "A storage network pitched as a cheaper Dropbox, with mobile and PC node roles. The private-key onboarding step is the friction that matters, and it is not yet verified.",
    strengths: [
      "Two node roles let you contribute storage or just verify replication.",
      "No dedicated hardware purchase to start.",
      "Targets a clear, large market in consumer cloud storage.",
    ],
    risks: [
      "Private-key onboarding adds a security step that trips up new users.",
      "Not yet verified on our methodology.",
      "Consumer storage is crowded and price-competitive.",
    ],
    scores: {
      realRevenue: 73,
      tokenEconomics: 71,
      decentralization: 85,
      hardwareEconomics: 95,
      operatorFriction: 91,
      transparency: 79,
    },
  },
  natix: {
    status: "draft",
    verdict:
      "On-device camera mapping with a genuine privacy design, easy to run alongside Silencio. Yields are not yet established, so the draw is coverage-building and future rewards, not current income.",
    strengths: [
      "On-device processing gives a credible privacy story for camera data.",
      "One-tap smartphone onboarding with no hardware.",
      "Pairs with Silencio for efficient dual-app participation.",
    ],
    risks: [
      "Reported yields are not yet established.",
      "Not yet verified on our methodology.",
      "Camera-based mapping invites regulatory and privacy scrutiny over time.",
    ],
    scores: {
      realRevenue: 74,
      tokenEconomics: 72,
      decentralization: 84,
      hardwareEconomics: 96,
      operatorFriction: 92,
      transparency: 78,
    },
  },
  silencio: {
    status: "draft",
    verdict:
      "Noise-pollution mapping with a clean privacy design and real scale at 170k+ users. The data has obvious buyers in real estate and planning; the operator yield is still early.",
    strengths: [
      "170k+ users give it real coverage and a credible data set.",
      "Measures decibels without recording audio, a strong privacy stance.",
      "Clear demand from real-estate and urban-planning buyers.",
    ],
    risks: [
      "Operator yields are still early and modest.",
      "Not yet verified on our methodology.",
      "Phone-mic data quality varies widely by device and placement.",
    ],
    scores: {
      realRevenue: 76,
      tokenEconomics: 74,
      decentralization: 88,
      hardwareEconomics: 98,
      operatorFriction: 95,
      transparency: 76,
    },
  },
  "malama-labs": {
    status: "draft",
    verdict:
      "A compliance-grade environmental data play with a rare plan to end emissions after Year 3 in favor of enterprise revenue. It is operated by the DePin.Builders founder, disclosed here and scored on the same public methodology as every other project.",
    strengths: [
      "Hardware-signed data targets compliance-grade carbon registries, a paying enterprise market.",
      "Emissions stop after Year 3, shifting rewards toward real revenue earlier than most.",
      "Verified, with a transparent Genesis 200 reservation structure.",
    ],
    risks: [
      "A $2,000 entry via the Genesis 200 program is the highest capex in the directory.",
      "Pre-token, so near-term yields are unestablished.",
      "Founder affiliation is a conflict we disclose; weigh our score with that in mind.",
    ],
    scores: {
      realRevenue: 84,
      tokenEconomics: 94,
      decentralization: 68,
      hardwareEconomics: 82,
      operatorFriction: 72,
      transparency: 98,
    },
  },
};

/** Look up a review by project slug, or null when none exists yet */
export function getReview(slug: string): ProjectReview | null {
  return reviews[slug] ?? null;
}
