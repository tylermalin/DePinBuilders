// src/data/posts.seed.ts
// Authored blog posts. Only fully written posts live here; the unwritten
// stubs were removed. Body uses the shared ReportBlock format so the blog
// renders through the same block renderer as the analytical reports.
// Brand-clean: no em dashes, no banned words, citations stripped.

import type { ReportBlock } from "./reports.seed";

export interface BlogPostSeed {
  slug: string;
  type: "REVIEW" | "RESEARCH" | "GUIDE" | "PROJECT_UPDATE";
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string; // ISO date
  projectSlug: string | null;
  readingMinutes: number;
  body: ReportBlock[];
}

export const posts: BlogPostSeed[] = [
  {
    slug: "gpu-depin-squeeze-2026",
    type: "RESEARCH",
    title:
      "The GPU DePIN Squeeze: Strategic Convergence and the Race for Inference Demand in 2026",
    excerpt:
      "Supply aggregation was the easy part. As io.net, Aethir, and Render converge on the same pool of asynchronous inference demand, the winner will be the protocol that bridges the friction between cryptographic infrastructure and corporate procurement, not the one with the most idle hardware.",
    author: "Tyler Malin",
    publishedAt: "2026-06-07",
    projectSlug: "io-net",
    readingMinutes: 16,
    body: [
      { type: "h2", text: "Executive summary" },
      {
        type: "p",
        text: "By mid-2026 the AI computing sector has collided with a structural reality: aggregating physical hardware supply was the initial and simplest phase of the decentralized infrastructure build-out. As the global AI compute market accelerates toward a projected $700 billion valuation by the end of the decade, the DePIN narrative has gone through a ruthless correction. The 2024 and 2025 cycles rewarded protocols for bootstrapping supply, connecting hundreds of thousands of latent GPUs to decentralized orchestration layers. The true pool of accessible, paying demand has proven far smaller and more constrained than token charts and fully diluted valuations implied.",
      },
      {
        type: "p",
        text: "That constraint engineered a squeeze. Decentralized networks rely on global, asynchronous connections over the public internet, which makes them unsuited to the synchronous, tightly coupled operations required to train frontier foundation models. The vast reserves of decentralized compute are functionally locked out of the highest-margin segment of the AI arms race, forcing the three dominant GPU protocols, io.net, Aethir, and Render Network, to pivot and chase the same demographic: asynchronous AI inference, lightweight fine-tuning, and batch processing.",
      },
      {
        type: "p",
        text: "As io.net overhauls inflationary tokenomics to reflect actual usage, Aethir pioneers corporate digital-asset treasuries to secure enterprise commitments, and Render folds massive consumer subnets into its deflationary model, the competition has shifted from a war of hardware aggregation to a battle for enterprise compliance, tokenomic sustainability, and automated API demand. The victor will not be the network with the most idle hardware, but the protocol that bridges the friction between cryptographic infrastructure and traditional corporate procurement.",
      },

      { type: "h2", text: "The macroeconomic and physical architecture of AI computing" },
      { type: "h3", text: "The hardware arms race and hyperscaler monopolization" },
      {
        type: "p",
        text: "The compute required to train frontier models is doubling roughly every 3.4 months, while per-chip silicon performance improves only about 20% a year, forcing massive horizontal scaling. By early 2026 hyperscalers and frontier labs moved from standard data centers to fortress-like megaclusters. The xAI Colossus facility in Memphis aggregated 550,000 to 555,000 NVIDIA GPUs by January 2026, an estimated $18 billion capital outlay, on a roadmap toward one million GPUs. Project Stargate, a Microsoft, OpenAI, and SoftBank initiative, deployed over 450,000 GPUs in Abilene, Texas.",
      },
      { type: "h3", text: "The imminent power grid bottleneck" },
      {
        type: "p",
        text: "The ceiling is no longer silicon, it is electrical power. Colossus draws a continuous 350 megawatts on on-site gas turbines and over 168 Tesla Megapacks, with a planned expansion to 1.5 gigawatts; Stargate targets 1.2 gigawatts. End-of-decade clusters are projected to demand up to 10 gigawatts, rivaling the Grand Coulee Dam, and even 5 gigawatts to one contiguous location stresses regional grids severely. Recognizing this hard limit, AWS, GCP, and Azure have used their hardware monopolies to enforce steep markups and punitive egress fees, with H100 cluster wait times often spanning 8 to 12 months through 2023 and 2024.",
      },

      { type: "h2", text: "The DePIN economic model and the hardware supply glut" },
      {
        type: "p",
        text: "DePIN engineers a cost advantage by avoiding the capital expense of contiguous hyperscale facilities. Instead of buying land, securing gigawatt contracts, and building cooling, protocols use token incentives to organize independent operators: Tier 3 and Tier 4 data centers, miners leaving proof-of-work, and consumer rig owners. The pricing gap is large. AWS lists a premier H100 instance near $12.29 per hour; decentralized networks list comparable hardware at $1.19 to $2.19. Older A100 access runs 45% to 60% cheaper than AWS, with short-duration workloads reaching 75% to 80% reductions.",
      },
      {
        type: "p",
        text: "The first quarter of 2026 was a maturation point. In January 2026, leading DePIN networks generated about $150 million in verifiable on-chain revenue from non-crypto-native enterprise clients paying for storage, compute, and data routing, an 800% year-over-year increase for several protocols. By the end of March 2026 the sector's market capitalization settled near $9.423 billion across nearly 250 projects, down from a $19.2 billion peak in September 2025 but still a 270% expansion on the 2024 baseline of $5.2 billion. Annualized GPU-network revenue passed $200 million by early 2026, even as a misaligned supply-and-demand dynamic began to bite.",
      },

      { type: "h2", text: "The core squeeze: demand constraints and the inference pivot" },
      {
        type: "p",
        text: "Supply aggregation was the easy part. Through 2024 and 2025, protocols competed on supply metrics, using inflationary emissions to subsidize operators for simply connecting idle GPUs. Aethir amassed over 435,000 GPU containers; io.net connected over 130,000 devices across 130 countries. But valuations implied an omnivorous demand that physical reality did not support.",
      },
      {
        type: "p",
        text: "AI demand is bifurcated. Training frontier models needs thousands of GPUs in absolute synchronicity, sharing memory states over ultra-high-bandwidth, zero-latency interconnects like NVLink. DePIN nodes are geographically isolated and run over the public internet at fluctuating bandwidths (200 megabits to 100 gigabits) with latency spikes; a single dropped packet between continents stalls a synchronous training loop. So decentralized GPUs are structurally restricted from the most lucrative segment, and must target inference: querying a trained model, which is atomizable and parallelizable across disparate nodes. Roughly 70% of global GPU demand in 2026 is inference, a large but specific market, and every major protocol is now forced to compete for the same latency-tolerant pool.",
      },
      { type: "h3", text: "Enterprise adoption blockers" },
      {
        type: "p",
        text: "Even within that 70%, friction nullifies much of the headline savings. Enterprises rely on legally binding Service Level Agreements; DePIN offers algorithmic slashing, which burns or seizes a provider's stake on failure but does not satisfy corporate risk and compliance, so engineers overprovision and build redundancy that erodes the cost edge. The stack is fragmented: a production deployment might stitch io.net for orchestration, Filecoin for storage, and Gensyn for verification, compounding engineering overhead. The deepest barrier is accounting: corporate finance runs on fiat invoicing and net-30 terms, while decentralized compute requires acquiring and spending volatile utility tokens, where every micro-transaction is a distinct taxable event that standard ERP software cannot process without specialized blockchain analytics.",
      },

      { type: "h2", text: "Deep dive: io.net, the AI-native clustering aggregator" },
      {
        type: "p",
        text: "io.net positions as the Internet of GPUs, operating over 130,000 devices across 130 countries with a focus on cluster orchestration rather than single-instance spot rental. Its layer deploys thousands of fully orchestrated global GPU clusters in minutes with no contracts or waitlists, attractive to agile AI startups scaling fine-tuning. It settles on Solana for high-throughput, sub-second micro-transactions, and has secured partners including Dell and the creative platform KREA, which provisions A100-80GB clusters at roughly a third of centralized price.",
      },
      {
        type: "p",
        text: "Its historical model is the existential risk. io.net bootstrapped 130,000 devices through inflationary $IO emissions paid for proof of availability, regardless of paying usage. As the market realized verifiable demand trailed aggregated capacity, that mechanic threatened catastrophic dilution. The Incentive Dynamics Engine, scheduled for Q2 2026, phases out inflation-driven incentives and couples emissions and provider income strictly to verifiable usage, aiming to cut circulating $IO supply by an estimated 50%. The pivot makes io.net a pure demand aggregator: if it cannot secure paying workloads, providers face income cuts and migrate. It must also absorb monthly unlocks near 14.14 million $IO, about 4.73% of circulating supply.",
      },

      { type: "h2", text: "Deep dive: Aethir, the enterprise edge network" },
      {
        type: "p",
        text: "Aethir targets the risk-averse end of demand: Web2 enterprises and cloud-gaming studios. By early 2026 it led the track with roughly $150 million in annual recurring revenue and quarterly revenue approaching $40 million in late 2025. It avoids consumer desktop GPUs, integrating enterprise-grade hardware in Tier 4 data centers through a three-tier architecture of Containers, Checkers, and Indexers. Workloads run in standardized virtual containers for a consistent environment, routed across an edge network of 200+ locations in 93 countries. A zero-trust model assumes every node may be faulty: 91,000+ Checker nodes continuously audit performance and output, shifting work to standby nodes and achieving a verified 99.31% uptime across 435,000 containers.",
      },
      {
        type: "p",
        text: "Aethir's standout 2026 move dismantled accounting friction through the first Strategic Compute Reserve, with the AI medical-research firm Predictive Oncology. The company raised $50.8 million in cash and received $292.7 million in ATH to fund a digital-asset strategy, using ATH as collateral and medium of exchange to guarantee GPU access for molecular screening, then leasing excess capacity and buying more ATH with the proceeds. It is a compliant operational blueprint, but it shows the friction too: in Q3 2025 Predictive Oncology reported a $77.7 million net loss, of which $74.4 million was a non-cash derivative-liability remeasurement tied to ATH volatility. Bridging the compute gap is solved; fitting volatile tokens into GAAP balance sheets is not.",
      },

      { type: "h2", text: "Deep dive: Render Network and the Burn-Mint Equilibrium" },
      {
        type: "p",
        text: "Render built its dominance as a specialized GPU rendering network for Hollywood studios, VFX artists, and spatial computing, aggregating high-end consumer cards tuned for Blender, Cinema 4D, and OctaneRender, and processing over 68 million frames. Recognizing that VFX is dwarfed by the $700 billion AI market, it launched the Dispersed subnet to court generative-AI inference, which its consumer GPUs handle well.",
      },
      {
        type: "p",
        text: "In April 2026, governance proposal RNP-023 integrated the Salad Network, over 60,000 latent consumer GPUs, as an exclusive subnet, supporting Salad's low-cost agentic LLM API and committing all of Salad's payments on-chain in RENDER. That demand plugs into Render's Burn-Mint Equilibrium: when a client buys compute, the fiat-equivalent value of RENDER is burned, while the protocol mints new tokens to pay operators for verifiable output. The Salad volume is calibrated so burned tokens consistently exceed minted tokens, producing a deflationary dynamic that buffers RENDER against market volatility while it holds its creative-rendering monopoly and siphons inference demand.",
      },

      { type: "h2", text: "Secondary competitors and the decentralized AI stack" },
      {
        type: "p",
        text: "Akash Network is a formidable generalist, using a reverse-auction model where providers bid down price to win workloads, discovering the floor: an H100 reached about $1.33 per hour versus $3.93 for an AWS p5 instance. Akash posted 428% year-over-year usage growth into 2026, utilization above 80%, and over $5 million in Q1 compute spend, and launched Starcluster to acquire 7,200 NVIDIA GB200 GPUs via Starbonds. Around the GPU marketplaces, a verification stack is forming: Fluence offers certified-data-center CPU and VM compute with Trusted Execution Environments; Bittensor coordinates intelligence across 128 subnets, rewarding model outputs rather than raw cycles; and OpenLedger curates verifiable on-chain training data with Proof of Attribution, integrating with io.net and Aethir to give AI agents on-chain receipts for every action.",
      },

      { type: "h2", text: "Market dynamics, valuation disparities, and liquidity" },
      {
        type: "p",
        text: "Commoditization has set a rigid pricing hierarchy that penalizes hyperscalers and exposes each protocol's strategy.",
      },
      {
        type: "table",
        caption: "Infrastructure pricing benchmarks (Q1 to Q2 2026)",
        headers: ["Provider", "Focus", "A100 / hr", "H100 / hr", "Primary client"],
        rows: [
          ["AWS (centralized)", "Synchronous training", "$4.00 to $7.90", "$12.29", "Enterprise / Fortune 500"],
          ["Aethir (ATH)", "Enterprise inference, gaming", "$0.33", "$1.19", "Web2 enterprise, hospitals"],
          ["Akash (AKT)", "General-purpose compute", "$0.33 to $0.78", "$1.33", "Cost-sensitive developers"],
          ["io.net (IO)", "AI startups, ML clusters", "$0.76", "$1.19 to $2.19", "AI-native startups, researchers"],
          ["Render (RENDER)", "Creative VFX, subnet inference", "Job / frame based", "Job / frame based", "3D artists, agentic AI APIs"],
        ],
      },
      {
        type: "p",
        text: "Aethir's $0.33 A100 reflects fully depreciated enterprise hardware; io.net's $0.76 A100 carries a premium for its orchestration layer, which lets resource-constrained startups skip bare-metal container management. Institutional markets price these networks with sharply divergent risk profiles.",
      },
      {
        type: "table",
        caption: "Token valuations (June 2026)",
        headers: ["Token", "Market cap", "Circulating", "Thesis"],
        rows: [
          ["Render (RENDER)", "$1.05B to $1.11B", "518.74M", "Trades at a premium on years of track record, verifiable frame metrics, and BME deflationary clarity."],
          ["io.net (IO)", "$63.09M", "333.52M", "Depressed circulating cap against a large fully diluted valuation; the market hedges the Q2 2026 IDE transition."],
          ["Aethir (ATH)", "$84.58M to $103.70M", "20.12B", "Highest ARR ($150M) but priced near $0.0042, suppressed by a 42B max-supply overhang and accounting derivatives."],
        ],
      },
      {
        type: "p",
        text: "The data exposes an institutional reality: the 2026 market rewards historical resilience, integration track record, and clear token mechanisms over raw revenue. Render, serving a smaller primary market than Aethir's enterprise cloud, commands a circulating cap nearly ten times larger, because investors prize the mathematical clarity of Burn-Mint Equilibrium over the experimental transitions at Aethir and io.net. DePIN tokens are also exposed to market-wide liquidity and short squeezes driven by derivatives, so even structurally sound networks suffer correlated drawdowns when sentiment turns risk-off, and a DePIN GPU trade requires automated, institutional-grade execution to manage news-driven moves from governance votes and corporate deployments.",
      },

      { type: "h2", text: "Strategic conclusions: the autonomous buyer and the API gateway" },
      {
        type: "p",
        text: "The 2026 sector represents a structural shift from speculative hardware accumulation to competitive demand acquisition. The idea that DePIN would replace hyperscalers everywhere is falsified by the physics of synchronous training: centralized entities keep their monopoly over the gigawatt-scale, NVLink-bound superclusters that train multi-trillion-parameter models. But DePIN has carved out a profitable, fast-growing dominion in asynchronous inference, data preprocessing, and lightweight fine-tuning, generating hundreds of millions in verifiable enterprise revenue off the back of legacy cloud shortages and pricing.",
      },
      {
        type: "p",
        text: "The squeeze has forced convergence: io.net abandons inflationary subsidies for demand-driven tokenomics and deployment velocity, Aethir pioneers the Strategic Compute Reserve to prove enterprises can use tokens as a hedge to secure edge compute, and Render siphons consumer GPUs into a deflationary Burn-Mint model. Ultimately the winner will not aggregate the most idle cards, since bare-metal hardware is a depreciating commodity. The future buyer is not human: autonomous AI agents managing treasuries and generating content will reshape demand, and centralized cloud is hostile to them, requiring KYC, fiat cards, and corporate identities. Permissionless smart contracts are the frictionless gateway for that non-human activity, so sustained dominance belongs to the network that abstracts crypto-payment friction, builds enterprise-adjacent compliance, and routes the programmatic API demand of the autonomous-agent economy into its tokenized ecosystem.",
      },
    ],
  },
];

export function getBlogPosts(): BlogPostSeed[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPost(slug: string): BlogPostSeed | null {
  return posts.find((p) => p.slug === slug) ?? null;
}
