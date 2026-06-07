// src/data/reports.seed.ts
// In-depth analytical reports, keyed by project slug. Each report follows the
// DePIN Geospatial Rating Framework (see lib/methodology.ts) and shares its six
// dimension scores with the project's ProjectReview, so the directory, the
// review, and the full report all line up against one methodology.
//
// Reports ship as drafts until an editor promotes them. Content is brand-clean:
// no em dashes, no banned words. Figures are indicative and sourced from public
// disclosures and operator reports, not guarantees, and not financial advice.

import type { ReviewScores } from "@/lib/types";

export interface ReportMetric {
  label: string;
  value: string;
}

export type ReportBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "diagram"; text: string }
  | { type: "formula"; text: string };

export interface ProjectReport {
  slug: string;
  status: "draft" | "published";
  title: string;
  dek: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  /** Executive summary paragraphs, also surfaced on the project page. */
  executiveSummary: string[];
  /** Key structured metrics, indexed into our reporting. */
  profile: ReportMetric[];
  /** Profile labels to feature in the project-page teaser. Falls back to the
   *  first four non-score metrics when omitted. */
  teaserLabels?: string[];
  /** The long-form body, rendered as typed blocks. */
  body: ReportBlock[];
  /** Per-dimension rationale, keyed to the six methodology dimensions. */
  dimensionNotes: Record<keyof ReviewScores, string>;
}

export const reports: Record<string, ProjectReport> = {
  geodnet: {
    slug: "geodnet",
    status: "draft",
    title:
      "Decentralized Geodetic Infrastructure: An Analytical Evaluation of GEODNET ($GEOD)",
    dek: "A premier RTK correction marketplace, scored against a standardized physical sensing evaluation framework.",
    publishedAt: "2026-06-07",
    readingMinutes: 14,
    executiveSummary: [
      "In the DePIN landscape, protocols are shifting from speculative, incentive-skewed emissions toward verifiable, utility-driven service models. The Global Earth Observation Decentralized Network (GEODNET) is a premier implementation of that shift, a dual-sided marketplace for high-precision Real-Time Kinematic (RTK) geodetic corrections. Originally chartered as a Singapore non-profit, GEODNET uses a crowdsourced network of terrestrial reference stations to correct the atmospheric and orbital errors inherent in standard Global Navigation Satellite Systems (GNSS).",
      "The commercial model connects independent hardware hosts, the so-called satellite miners, with enterprise clients that need centimeter-level positioning: precision agriculture platforms, autonomous vehicle fleets, and drone navigation developers. Unlike the 2018 to 2022 class of DePIN designs that ran on extreme inflation and lacked external demand, GEODNET is defined by strong demand-side recurring revenue, supported by an automated buyback-and-burn engine that bridges off-chain commercial data sales directly into on-chain token value.",
      "Our assessment of performance, technical design, and market viability yields a composite Headline Builder Score of 91 out of 100. That rating reflects a strong integration of real-world demand and capital-efficient hardware deployment, balanced against physical installation bottlenecks and a long-term emission decay schedule.",
    ],
    profile: [
      { label: "Headline builder score", value: "91 / 100" },
      { label: "Native token", value: "$GEOD (Solana SPL)" },
      {
        label: "Solana contract",
        value: "7JA5eZdCzztSfQbJvS8aVVxMFfd81Rs9VvwnocV1mKHu",
      },
      {
        label: "Active reference nodes",
        value: "21,433 across 160 countries (mid-2026)",
      },
      { label: "Annualized recurring revenue", value: "$9.72M (mid-2026)" },
      { label: "Token burn", value: "80% of data revenue to buyback and burn" },
      {
        label: "Total raised",
        value: "$15M (incl. $8M strategic, Multicoin, Feb 2025)",
      },
      { label: "Circulating supply", value: "~438M to 450M $GEOD" },
      { label: "Maximum supply", value: "1,000,000,000 $GEOD" },
      { label: "Prior settlement layers", value: "Polygon, IoTeX" },
    ],
    teaserLabels: [
      "Annualized recurring revenue",
      "Active reference nodes",
      "Total raised",
      "Token burn",
    ],
    body: [
      { type: "h2", text: "Technical architecture and kinematic correction" },
      {
        type: "p",
        text: "To understand GEODNET's value proposition, it helps to examine the physics of satellite positioning. Standard GNSS constellations such as GPS, GLONASS, Galileo, and BeiDou broadcast from orbits roughly 20,000 kilometers above Earth. By the time those signals penetrate the atmosphere they pick up ionospheric delay, tropospheric refraction, and local multipath interference, degrading standard receiver accuracy to a range of three to ten meters.",
      },
      {
        type: "p",
        text: "RTK positioning removes those errors. A stationary terrestrial receiver (a reference station) is installed at a precisely surveyed coordinate and measures the exact error in the incoming satellite carrier waves. It packages those corrections into standard RTCM (Radio Technical Commission for Maritime Services) formats and streams them over the internet via the NTRIP (Networked Transport of RTCM via Internet Protocol) standard.",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|                 GNSS Satellite Constellations               |
|                (GPS, Galileo, GLONASS, BeiDou)              |
+-------------------------------------------------------------+
                 /                             \
                /                               \
        (Atmospheric Delay)              (Atmospheric Delay)
              /                                   \
             v                                     v
+-----------------------------+        +-------------------------+
|     GEODNET Base Station    |        |       Mobile Rover      |
|     (Precisely Surveyed)    |        |   (Drone/Tractor/Robot) |
+-----------------------------+        +-------------------------+
              |                                     ^
              | (Raw phase corrections)             |
              v                                     | (cm-level RTCM)
+-----------------------------+                     |
|     NTRIP Regional Server   |                     |
|     (AWS EC2 infrastructure)|                     |
+-----------------------------+                     |
              +---(Streams RTCM corrections via internet)---+`,
      },
      {
        type: "p",
        text: "To stream corrections, a rover uploads its coarse location as a National Marine Electronics Association (NMEA) GGA sentence. The regional server picks the nearest operational base station and streams the matching RTCM corrections, reducing common-mode errors and bringing accuracy down to one to two centimeters with sub-second latency. To serve global enterprise traffic, GEODNET routes data through regional AWS EC2 instances.",
      },
      {
        type: "table",
        caption: "GEODNET regional server network",
        headers: ["Region", "Domain", "IPv4", "Port", "Format"],
        rows: [
          ["United States", "rtk.geodnet.com", "13.56.117.10", "2101", "NTRIP / RTCM 3.2"],
          ["Europe", "eu.geodnet.com", "3.73.41.96", "2101", "NTRIP / RTCM 3.2"],
          ["Australia", "aus.geodnet.com", "54.206.56.130", "2101", "NTRIP / RTCM 3.2"],
          ["South America", "sa.geodnet.com", "18.230.73.64", "2101", "NTRIP / RTCM 3.2"],
        ],
      },
      {
        type: "p",
        text: "The network was designed by industry veterans Mike Horton (project creator) and Yudan Yi (head of GNSS), alongside blockchain architect David Chen. The technical whitepaper was peer-reviewed and published in the Journal of Navigation after a presentation at the Institute of Navigation (ION) GNSS+ conference. On April 9, 2025, Mike Horton testified before the United States House Subcommittee on Commodity Markets, Digital Assets, and Rural Development, showing how crowdsourced, on-chain geodetic networks lower operational costs for precision agriculture across North America.",
      },

      { type: "h2", text: "Operational growth, partnerships, and funding" },
      {
        type: "p",
        text: "Between early 2023 and mid-2026 the network expanded from 1,700 stations to 21,433 active reference points across 160 countries, growth of over 1,100%. That scaling was funded by capital raises totaling $15 million, including an $8 million strategic round in February 2025 led by Multicoin Capital. The round built deep liquidity in the Solana ecosystem and accelerated B2B integration. Institutional asset manager VanEck later made a direct purchase of $GEOD, acquiring less than 50 basis points of the fully diluted supply.",
      },
      {
        type: "table",
        caption: "Key enterprise and technical partnerships",
        headers: ["Partner", "Date", "Objective"],
        rows: [
          ["DroneDeploy", "Apr 7, 2025", "Enterprise RTK corrections for drone reality capture and 3D terrain modeling."],
          ["ROVR Network", "Apr 2025", "GEODNET co-led a $2.6M seed round; ROVR uses GEODNET stations and dedicates 20% of native revenue to buy back and burn $GEOD."],
          ["Quectel Wireless", "May 27, 2025", "RTK corrections integrated into mass-market cellular and GNSS hardware modules."],
          ["DroneDash", "Apr 14, 2026", "Jointly launched GEODASH Aerosystems for map-free, AI-driven precision spraying in industrial agriculture."],
        ],
      },
      {
        type: "p",
        text: "These partnerships drove Annualized Recurring Revenue to $9.72 million by mid-2026. The network is also used by emerging robotics platforms such as Frodobots and integrated into consumer hardware like the Solana Seeker, making GEODNET a leading revenue-generating protocol in physical DePIN.",
      },

      { type: "h2", text: "Token economics, deflation, and the Solana migration" },
      {
        type: "p",
        text: "A key design driver is GIP-7 (GEODNET Improvement Proposal 7), which authorized migrating the core token ledger from Polygon to Solana in late 2025, supported by a Migration Bonus Program for holders and operators. Solana's throughput, low fees, and state compression suit DePIN: state compression lets the protocol issue millions of micro-rewards and node NFTs for negligible cost (often under $150 in gas), removing scalability bottlenecks seen on EVM chains.",
      },
      {
        type: "p",
        text: "The native token $GEOD has a maximum capped supply of 1,000,000,000. Its primary utilities are:",
      },
      {
        type: "list",
        items: [
          "Utility fees: enterprise users pay for RTK correction streams and space-weather data in fiat or $GEOD.",
          "Miner rewards: ground base stations receive daily token emissions for uploading high-quality geodetic data.",
          "Protocol governance: holders vote in GeoDAO to steer network updates and capital allocation.",
        ],
      },
      {
        type: "p",
        text: "To tie token value to adoption, commercial data revenues split 50/50 with third-party resellers. Of the share retained by the GEODNET Foundation, 80% buys $GEOD on the open market for permanent burn, and 20% goes to the treasury.",
      },
      {
        type: "diagram",
        text: String.raw`+--------------------------------------------------------+
|               Commercial Enterprise Client             |
|                (Pays RTK Subscription Fee)             |
+--------------------------------------------------------+
                            |
                            v
+--------------------------------------------------------+
|                   50 / 50 Revenue Share                |
+--------------------------------------------------------+
         /                                      \
        v                                        v
+-------------------------+            +-------------------------+
|   Third-Party Reseller  |            |   GEODNET Foundation    |
|    (Retains 50% share)  |            |    (Retains 50% share)  |
+-------------------------+            +-------------------------+
                                                  |
                                    +-------------+-------------+
                                   /                             \
                                  v                               v
                   +-----------------------------+  +-------------------------+
                   |    80% Open-Market Burn      |  |  20% Protocol Treasury  |
                   |  (Permanently removes $GEOD) |  | (Operations and grants) |
                   +-----------------------------+  +-------------------------+`,
      },
      {
        type: "p",
        text: "Annual emissions follow a yearly halving, so base rewards decay over time. By 2030 the daily reward is projected to fall to 0.56 $GEOD per base station per day. If the token price does not appreciate enough, or demand-side burns do not offset the decay, daily yield could fall below the marginal cost of host attention, risking node churn and coverage gaps.",
      },
      {
        type: "p",
        text: "To reach structural deflation, where the value of burned tokens exceeds new emissions, the network needs roughly $15.1 million in ARR at current emission rates and the 80% burn allocation. With ARR at $9.72 million today, GEODNET is on a clear trajectory toward net-deflationary status, but it is not there yet.",
      },

      { type: "h2", text: "Hardware, spatial scarcity, and installation friction" },
      {
        type: "p",
        text: "The physical layer relies on high-fidelity ground base stations. The primary unit is the MGW200 MobileCM Triple-Band GNSS Base-Station, priced at $695.",
      },
      {
        type: "table",
        caption: "MGW200 MobileCM base-station specifications",
        headers: ["Dimension", "Specification"],
        rows: [
          ["Retail cost", "$695.00 (10% affiliate discount via codes such as SWAN)"],
          ["Tracking channels", "Over 1,000 independent channels"],
          ["Frequencies", "L1, L2, and L5"],
          ["Constellations", "GPS, GLONASS, Galileo, BeiDou, QZSS"],
          ["Power consumption", "Under 2 watts via USB-C"],
          ["Internet interface", "2.4 GHz Wi-Fi (802.11 b/g/n); 5 GHz not supported"],
          ["Data bandwidth", "Typically 10 to 20 GB per month"],
          ["RF emissions", "Receive-only device, zero transmissions"],
          ["Shielding", "Survey-grade antenna with 9-meter shielded cable"],
        ],
      },
      {
        type: "p",
        text: "Other variants include the MGW310 Multi-Platform Station at $1,095, which supports dual-mining on GEODNET and the Wingbits flight-tracking network, and the GEO-PULSE receiver at $149, which brings centimeter tracking to robotic platforms using native ROS2 and Docker drivers.",
      },
      { type: "h3", text: "Spatial scarcity and Location NFTs (GIP-8)" },
      {
        type: "p",
        text: "To prevent redundant clusters in major cities and reward global expansion, GEODNET divides the Earth into hexagons roughly 20 kilometers wide using the Uber H3 spatial index, and enforces these rules:",
      },
      {
        type: "list",
        items: [
          "First-mover advantage: the first station in an empty hexagon earns 100% of the baseline daily rewards.",
          "Reward splitting: if several stations share a hexagon, the daily pool splits proportionally among them.",
          "Location NFTs (GIP-8): the first station to hold a 98% quality score for 30 consecutive days receives a Location NFT that guarantees 100% of baseline rewards and avoids splitting, even as others deploy nearby.",
          "SuperHex multipliers: temporary reward boosts for underserved zones, to pull coverage into thin areas.",
        ],
      },
      { type: "h3", text: "Physical installation friction" },
      {
        type: "p",
        text: "Despite strong hardware economics, installation is the main friction point, which sets the Operator Ease score at 58 out of 100. A base station needs a permanent, stable rooftop mount with a fully unobstructed sky view, with no obstruction above a 10-degree elevation angle to avoid multipath. The survey antenna connects to the indoor MobileCM receiver via the included 9-meter cable without sharp bends, then the receiver is configured over local Wi-Fi.",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|  1. Physical rooftop installation                           |
|     - Mount survey antenna at a 90-degree angle             |
|     - No obstruction above a 10-degree elevation angle      |
|     - Route the 9-meter shielded cable indoors, no bends    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  2. Local wireless configuration                            |
|     - Power on via USB-C; device broadcasts an AP Wi-Fi     |
|     - Connect to the MGW200 / MobileCM SSID                 |
|     - Open the config portal at 192.168.4.1                 |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  3. Router handshake and port binding                       |
|     - Enter 2.4 GHz home Wi-Fi SSID and password            |
|     - Create a Miner Key (minimum 12 characters)            |
|     - Confirm TRANSMITTING status in the WebUI              |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  4. Console registration                                    |
|     - Register at console.geodnet.com                       |
|     - Add the miner by serial number and Miner Key          |
|     - Link a Solana SPL wallet to receive rewards           |
+-------------------------------------------------------------+`,
      },
      {
        type: "p",
        text: "The process needs physical labor, roof access, and basic network configuration. That rules out many urban renters and concentrates optimal deployment among suburban and rural property owners, a challenge for dense urban expansion.",
      },

      { type: "h2", text: "Comparative analysis: DePIN versus centralized CORS" },
      {
        type: "p",
        text: "GEODNET's commercial case rests on competing with centralized Continuously Operating Reference Station (CORS) networks run by Trimble (VRS Now), Leica, Topcon, and Hexagon. Those providers buy real estate, secure zoning, and pay technicians to install and maintain stations, which carries high overhead. GEODNET crowdsources its physical infrastructure through token-incentivized operators, so it can offer high-precision RTK at a fraction of the cost.",
      },
      {
        type: "table",
        caption: "High-precision positioning network comparison",
        headers: ["Metric", "GEODNET", "Trimble VRS Now", "Terrastar", "ublox PointPerfect"],
        rows: [
          ["Annual subscription", "$400", "$1,850", "$1,050", "$660"],
          ["Spatial precision", "1 to 2 cm", "2 cm", "2.5 cm", "3 to 6 cm"],
          ["Convergence latency", "1 second", "8 seconds", "3 minutes", "30 seconds"],
          ["Protocol format", "NTRIP / RTCM 3.2", "Proprietary CORS", "Proprietary CORS", "Proprietary CORS"],
          ["Infrastructure", "Crowdsourced DePIN", "Centralized CORS", "Centralized CORS", "Centralized CORS"],
          ["Uptime and SLA", "Community-validated", "Legally binding SLAs", "Legally binding SLAs", "Legally binding SLAs"],
        ],
      },
      {
        type: "p",
        text: "Under standard conditions GEODNET delivers centimeter accuracy with near-instant convergence at $400 per year, an 80% discount to Trimble VRS Now. That price-to-performance is attractive to drone delivery fleets, agricultural tech startups, and autonomous vehicle operators. Traditional providers keep an edge in enterprise surveying and public infrastructure, where legally binding SLAs, documented support, and guaranteed regional consistency often justify the premium, and where GEODNET's rural density can vary.",
      },

      { type: "h2", text: "Strategic conclusions and future trajectory" },
      {
        type: "p",
        text: "GEODNET is a mature, revenue-generating protocol that integrates decentralized infrastructure with real-world commercial utility. The GIP-7 migration to Solana improved liquidity and throughput, while GIP-8 and Location NFTs strengthened network quality through strict uptime requirements and spatial scarcity. Combined with $15 million in funding and key B2B integrations, the protocol is positioned to capture growing demand for high-precision navigation across autonomous vehicles, robotics, and drones.",
      },
      {
        type: "p",
        text: "To hold that trajectory, three challenges stand out:",
      },
      {
        type: "list",
        items: [
          "Emissions decay management: the yearly halving risks operator churn if the token price falls. Expanding demand-side recurring revenue is what keeps buybacks and burns ahead of the decay.",
          "Installation friction: demanding antenna placement limits the operator pool. Simpler hardware options and better guides would lower onboarding friction and widen coverage.",
          "Enterprise SLA integration: to win high-liability surveying and public infrastructure contracts, the protocol could pair crowdsourced coverage with foundation-managed backup nodes and formal SLAs.",
        ],
      },
    ],
    dimensionNotes: {
      realRevenue:
        "By generating $9.72M in on-chain ARR from paying commercial clients in agriculture, construction, and drone networks, GEODNET shows that rewards track real, non-speculative demand. Its Demand-to-Emission ratio sits above the 0.50 industry-leader threshold, the primary marker separating durable physical networks from speculative ones.",
      tokenEconomics:
        "The 80% buyback-and-burn gives a transparent path to value accrual. The risk is the yearly halving: by 2030 incentives fall to about 0.56 $GEOD per station per day. At current emissions, the network needs roughly $15.1M ARR to reach net deflation, against $9.72M today. The trajectory is clear, but a sharp drawdown before that point could pressure operator economics.",
      decentralization:
        "With 21,433 nodes across 160 countries, the footprint is expansive. Correction revenue still concentrates where autonomy customers cluster, so rural placements in lower-density hexagons earn less than suburban ones. The spacing coefficient stays healthy, but fully uniform global coverage remains a work in progress.",
      hardwareEconomics:
        "A triple-band base station draws about 2 watts, so operating cost is negligible. Under favorable token pricing, payback can reach an exceptional 2 to 4 months. On conservative, risk-adjusted assumptions that account for token swings and reward splitting, payback is roughly eight months, among the fastest for dedicated hardware in the directory.",
      operatorFriction:
        "This is the limiting factor. The base station is receive-only with zero RF emissions and runs untouched once mounted, but the install is demanding: a clear sky view and a stable rooftop mount with no obstruction above a 10-degree elevation. That rules out many renters and concentrates deployment among property owners.",
      transparency:
        "The console at console.geodnet.com exposes real-time node status, signal quality, and reward history. Proof of Location and Proof of Accuracy are computed programmatically and committed on-chain, and the drivers ship with native ROS2 and Docker support. Public verifiability is high and guards the data against spoofing.",
    },
  },

  render: {
    slug: "render",
    status: "draft",
    title:
      "Distributed GPU Compute: An Analytical Evaluation of Render Network ($RENDER)",
    dek: "A two-sided GPU rendering and AI compute marketplace, scored against the same six-dimension framework.",
    publishedAt: "2026-06-06",
    readingMinutes: 11,
    executiveSummary: [
      "To test the framework beyond physical sensing, we apply it to a digital resource network: Render Network ($RENDER). Categorized as core compute DePIN infrastructure, Render has one of the longest operating histories and clearest demand stories in the sector. Rather than deploying earth-observation hardware, it runs a distributed, two-sided marketplace that matches idle consumer and enterprise GPUs with creators, studios, and AI developers that need large amounts of compute.",
      "Applying the six-dimension framework yields a composite Headline Builder Score of 85 out of 100. Render leads on capital velocity and low friction, with a zero-upfront bring-your-own-device model and software-only onboarding. It gives ground to GEODNET on the durability of a physical, geographically bound moat and on revenue predictability, since compute demand is more cyclical than subscription-style geodetic revenue.",
    ],
    profile: [
      { label: "Headline builder score", value: "85 / 100" },
      { label: "Native token", value: "$RENDER (formerly RNDR, Solana SPL)" },
      {
        label: "Core service model",
        value: "Distributed GPU rendering and AI/ML compute",
      },
      { label: "Tokenomics model", value: "Burn-and-Mint Equilibrium (BME)" },
      {
        label: "Hardware requirement",
        value: "Bring your own device (existing GPUs, NVIDIA preferred)",
      },
      { label: "Ecosystem category", value: "Core infrastructure / Compute" },
    ],
    teaserLabels: [
      "Native token",
      "Tokenomics model",
      "Hardware requirement",
      "Core service model",
    ],
    body: [
      { type: "h2", text: "The model: a two-sided GPU marketplace" },
      {
        type: "p",
        text: "Render matches idle GPUs with paid compute jobs. On one side are owners of consumer and enterprise graphics cards; on the other are media companies, architectural firms, 3D artists, and generative AI developers that need rendering and machine-learning compute. Unlike speculative DePIN loops where utility is generated mostly by other on-chain actors, Render's demand comes from mainstream commercial work, which gives it a pricing advantage over centralized cloud providers such as AWS and Azure.",
      },

      { type: "h2", text: "Comparative framework: GEODNET versus Render" },
      {
        type: "p",
        text: "Running both networks through the same six dimensions shows the structural trade-off between a physical sensing network and a digital resource marketplace.",
      },
      {
        type: "table",
        caption: "Framework comparison, GEODNET and Render",
        headers: ["Dimension", "Weight", "GEODNET", "Render", "Trade-off"],
        rows: [
          ["Demand-side revenue", "20%", "88", "84", "GEODNET's RTK data serves rigid industrial niches in agriculture and robotics; Render serves a dynamic but cyclical market of 3D studios, motion designers, and AI startups."],
          ["Token economics", "15%", "80", "78", "Both use Solana-backed burn mechanisms. GEODNET faces steeper long-term halving and miner-retention risk; Render is exposed to supply-side wage compression."],
          ["Decentralization", "15%", "82", "76", "GEODNET enforces strict geographic spacing via Uber H3 grids; Render is location-agnostic but clusters in low-cost energy zones."],
          ["Hardware economics", "15%", "86", "88", "GEODNET needs a specialized $695 device; Render uses a $0-CAPEX bring-your-own-device model, offset by GPU depreciation and energy costs."],
          ["Operator ease", "15%", "58", "78", "GEODNET needs rooftop mounts and sky-view calibration; Render needs only a software client, local network routing, and updates."],
          ["Transparency", "20%", "84", "84", "Both maintain detailed dashboards showing active jobs, completed transactions, and token burns."],
          ["Composite", "100%", "91", "85", "GEODNET leads on physical moat and revenue stability; Render excels in frictionless scaling and capital velocity."],
        ],
      },

      { type: "h2", text: "Token economics: the Burn-and-Mint Equilibrium" },
      {
        type: "p",
        text: "Render runs a refined Burn-and-Mint Equilibrium (BME), one of the healthiest burn-to-mint systems in DePIN. In this closed loop, end-users buy compute with USD or $RENDER and the corresponding tokens are burned from supply, while node operators earn newly minted tokens on a predictable, long-term emission schedule. The equilibrium price can be modeled as a function of paid demand against the structural emission rate.",
      },
      {
        type: "formula",
        text: "P(eq) = C(jobs) / S(emissions), where C(jobs) is the total USD value of submitted compute jobs and S(emissions) is the network emission rate over the same period.",
      },
      {
        type: "p",
        text: "The model aligns demand and emissions, but Render is exposed to supply-side wage compression: as the global supply of consumer GPUs grows, price-per-job can fall and individual operator yield with it. A prolonged drop in compute demand during a downturn risks diluting operators, who still carry electricity and maintenance costs.",
      },

      { type: "h2", text: "Hardware economics and capital velocity" },
      {
        type: "p",
        text: "This is Render's strongest dimension. It runs on a bring-your-own-device model, so for the millions who already own high-end NVIDIA cards the upfront capital cost to join is literally zero. Net yield of an active node is the gross token yield minus the running and wear costs.",
      },
      {
        type: "formula",
        text: "R(net) = Y(gross) - C(electricity) - D(hardware): hourly token yield minus local electricity cost under heavy load minus physical depreciation and wear of the silicon under thermal stress.",
      },
      {
        type: "p",
        text: "The watch-out is obsolescence. A geodetic antenna has an operational life beyond five to seven years, but consumer GPUs age fast. An operator on an older architecture, say an NVIDIA RTX 30-series card, faces reward dilution as newer 40- and 50-series or enterprise H100 cards join the network, compressing the payback on older equipment.",
      },

      { type: "h2", text: "Decentralization and concentration tendencies" },
      {
        type: "p",
        text: "Digital resource networks need less strict geographic distribution than physical sensing ones. A GPU can render a frame from any coordinate with high-bandwidth internet, so Render is location-agnostic. That flexibility creates concentration: operators cluster in regions with low electricity costs, cold climates, and fast broadband. The high-performance tier leans on institutional GPU clusters and professional data centers, a greater centralizing pull than crowdsourced, physically anchored sensors that cannot be moved or consolidated easily.",
      },

      { type: "h2", text: "Strategic conclusions and future trajectory" },
      {
        type: "p",
        text: "Scoring GEODNET at 91 and Render at 85 highlights the structural difference between physical sensing networks and digital resource marketplaces.",
      },
      {
        type: "list",
        items: [
          "Sensing versus commodity compute: GEODNET's base stations are a physical, geographically bound moat, hard to replace once deployed and insulated from digital copycats. Render competes in a globally fungible commodity compute market, scaling supply instantly but fighting continuously for demand against centralized cloud giants and rival compute DePINs.",
          "Infrastructure longevity: physical sensing networks face high setup friction (operator ease 58) but enjoy long-term stability and low obsolescence. Digital resource networks scale easily (operator ease 78) but face constant hardware replacement cycles and volatile demand.",
          "Solana's moat: both networks increasingly settle on Solana. State compression, sub-second finality, and deep liquidity have moved both from speculative minting loops toward efficient, high-frequency, utility-driven businesses.",
        ],
      },
    ],
    dimensionNotes: {
      realRevenue:
        "Render's revenue is anchored in real commercial utility: media companies, architectural firms, 3D artists, and generative AI developers, not circular on-chain loops. Compute volume tracks actual jobs submitted, which rose through 2025. The cap on the score is demand cyclicality, since rendering cycles and early-stage AI spending swing more than subscription-style ARR.",
      tokenEconomics:
        "The Burn-and-Mint Equilibrium is one of the healthiest burn-to-mint systems in DePIN: users burn $RENDER to buy compute, operators earn newly minted tokens on a predictable schedule. The risk is supply-side wage compression as consumer GPU supply grows, plus operator dilution if compute demand falls during downturns.",
      decentralization:
        "A GPU can render from anywhere with bandwidth, so the network is location-agnostic but clusters in low-cost-energy, cold-climate, high-broadband regions. The high-performance tier leans on institutional GPU clusters and data centers, a greater centralizing pull than physically anchored sensor nodes.",
      hardwareEconomics:
        "Its strongest dimension. The bring-your-own-device model means zero upfront capital for the millions who already own high-end NVIDIA GPUs. Net yield is gross token yield minus electricity minus depreciation. The watch-out is obsolescence: consumer GPUs age fast, and older cards face reward dilution as newer architectures join.",
      operatorFriction:
        "Onboarding is software-only: register a compatible GPU, link a Solana wallet, and configure firewall and ports. No roof access or mounting. The remaining friction is optimization, since near-100% uptime, fast uploads, and precise driver configuration are needed for high-value jobs and can trip up non-technical hosts.",
      transparency:
        "Render uses a Proof of Rendering mechanism to verify completed jobs without manipulation, and hosts public dashboards for active GPUs, completed jobs, real-time fees, and programmatic burns. A long operating history makes it one of the more trusted protocols in the sector.",
    },
  },

  weatherxm: {
    slug: "weatherxm",
    status: "draft",
    title:
      "Decentralized Meteorological Infrastructure: An Analytical Evaluation of WeatherXM ($WXM)",
    dek: "An open-access weather data network crowdsourcing high-resolution atmospheric observations, scored against the same six-dimension framework.",
    publishedAt: "2026-06-05",
    readingMinutes: 13,
    executiveSummary: [
      "WeatherXM is an open-access meteorological data network that crowdsources real-time, high-resolution atmospheric observations through a global array of community-owned sensing nodes. It targets the structural gaps in traditional meteorology: high capital cost, centralized control, and thin coverage in developing or geographically complex regions. Development began in early 2022 with a hardware MVP, and the native $WXM token launched on Arbitrum One on May 30, 2024.",
      "By 2026 the network runs 6,079 active stations and 9,787 total deployed units across 81 countries, holding a 99% data quality index, funded by $12.7M of venture capital across a 2022 seed and a 2024 Series A. The roadmap targets 17,000 active stations through demand-led targeted rollouts that place hardware where commercial contracts already exist.",
      "On our framework, WeatherXM earns a composite Headline Builder Score of 84 out of 100. It scores well on real data demand and transparency, with the main drag being long hardware payback and the leveling, alignment, and mechanical-wear friction of multi-parameter outdoor weather stations.",
    ],
    profile: [
      { label: "Headline builder score", value: "84 / 100" },
      { label: "Native token", value: "$WXM (ERC-20, Arbitrum One)" },
      { label: "Token launch", value: "May 30, 2024" },
      {
        label: "Active stations",
        value: "6,079 active, 9,787 deployed (2026)",
      },
      { label: "Coverage", value: "81 countries, 99% data quality" },
      { label: "Total funding", value: "$12.7M ($5M seed, $7.7M Series A)" },
      { label: "Maximum supply", value: "100,000,000 $WXM (hard cap)" },
      { label: "Emission", value: "14,246 $WXM/day, 10-year linear" },
      {
        label: "Buyback",
        value: "50% of targeted-rollout data revenue, every 3 hours",
      },
    ],
    teaserLabels: [
      "Active stations",
      "Coverage",
      "Total funding",
      "Buyback",
    ],
    body: [
      { type: "h2", text: "Genesis and funding" },
      {
        type: "p",
        text: "WeatherXM shipped its hardware MVP in early 2022 and prototyped its reward algorithms on Polygon's Mumbai testnet that April. A $5M seed round in June 2022 (Placeholder VC, Metaplanet, Consensys Mesh, SOSV, Protocol Labs, Borderless Capital, DLTx, plus angels including Juan Benet and Eleftherios Diakomichalis) funded early manufacturing. By December 2023 the project had shipped 5,000 stations, which supported a $7.7M Series A in May 2024 led by Lightspeed Faction, bringing total venture funding to $12.7M.",
      },
      {
        type: "p",
        text: "The $WXM ERC-20 token launched on Arbitrum One on May 30, 2024, and listed on Gate.io, MEXC, BitMart, Uniswap v3, and SwissBorg, opening price discovery and letting early operators claim accumulated beta rewards. By 2026 the network had grown to 6,079 active stations, 4,690 synoptic-grade stations, and 9,787 total deployed units across 81 countries, at a 99% data quality index.",
      },

      { type: "h2", text: "Hardware architecture and sensing" },
      {
        type: "p",
        text: "The network uses low-cost outdoor stations built for continuous operation, split into four bundles by communication protocol, gateway, and power. The WiFi bundles route data through an indoor gateway, the Helium bundle does edge processing on-station over LoRaWAN, and the Pulse bundle adds 4G/LTE for remote sites without local connectivity.",
      },
      {
        type: "table",
        caption: "Hardware bundles",
        headers: ["ID", "Bundle", "Original", "Promo", "Protocol", "Gateway"],
        rows: [
          ["WB1000", "M5 WiFi", "Legacy", "Out of stock", "WiFi (indoor)", "WG1000 LCD"],
          ["WB1200", "D1 WiFi", "$400", "$139", "WiFi (indoor)", "WG1200 open-source"],
          ["WS2001", "H2 Helium", "$400", "$139", "Helium LoRaWAN (edge)", "Integrated edge node"],
          ["WB3000", "Pulse 4G", "$900", "$810", "4G / LTE cellular", "WG3000 cellular"],
        ],
      },
      {
        type: "p",
        text: "Assembly aligns the wind-cup and wind-vane on the sensor shafts (the cups must spin freely, the vane has calibrated friction). The battery subsystem must use non-rechargeable 1.5V AA lithium or alkaline cells, since rechargeables lose voltage in cold and disrupt the daily on-board cryptographic hashing; the solar panel powers an internal supercapacitor for RF transmission spikes, not the batteries. Installation needs a rigid steel pole (30 to 40 mm) at least 2 meters up, leveled to a bubble target, with the North marker aligned to true North by compass. Misalignment degrades rain and light readings and skews wind direction.",
      },
      {
        type: "table",
        caption: "Sensor capabilities and tolerances",
        headers: ["Parameter", "Range", "Accuracy", "Resolution"],
        rows: [
          ["Temperature", "-40 to +80 C", "+/-0.5 C (0 to 80), +/-0.6 C (-40 to 0)", "0.1 C"],
          ["Relative humidity", "1% to 99%", "+/-3% (1 to 90), +/-4% (90 to 99)", "1%"],
          ["Precipitation", "0 to 450 mm/h", "+/-7%", "0.254 mm/h"],
          ["Wind speed", "0 to 50 m/s", "+/-0.5 m/s at 5 m/s", "0.1 m/s"],
          ["Wind direction", "0 to 360 deg", "+/-8 deg", "1 deg"],
          ["Barometric pressure", "540 to 1100 hPa", "+/-5 hPa (700+), +/-8 hPa (540 to 699)", "1 hPa"],
          ["Solar irradiance", "0 to 200k lux", "+/-5%", "1 lux"],
        ],
      },

      { type: "h2", text: "Geospatial density and grid optimization" },
      {
        type: "p",
        text: "WeatherXM distributes sensors with Uber's H3 spatial index at Resolution 7: hexagonal cells averaging about 5.16 square kilometers. Each cell carries a Cell Capacity, currently capped at 10 rewardable stations. When active stations exceed capacity, a daily ranking decides eligibility by reward score (data quality and location validation first), with ties broken by seniority via the last-claim-time timestamp. Stations outside the top 10 earn zero base reward that day, flagged MAX_CAPACITY_REACHED.",
      },
      {
        type: "p",
        text: "WeatherXM's own research (Designing a Global Weather Station Network based on H3 grid, by Keppas, Balis, and Pagonis) proposes a dynamic cell capacity that scales with land use and terrain ruggedness: dense urban areas and mountain slopes need 1 to 3 km spacing, flat terrain needs less. The paper estimates 35,990,052 stations for complete global coverage. The capacity algorithm is open-source under the MIT License and the 44GB global dataset is stored on IPFS.",
      },

      { type: "h2", text: "Consensus, validation, and rewards" },
      {
        type: "p",
        text: "The validation engine has gone through three versions. v1.0 checked only connection status and an active wallet, paying testnet rewards on Polygon Mumbai. v1.5 added Data Quality, Proof of Location, hardware classes, and cell capacity, but lacked low-gas claiming. v2.0, the current system, introduced Business Boost rewards and a Merkle-tree distribution: the network compiles daily balances, publishes a Merkle root to the RewardPool contract on Arbitrum One, and operators claim at their convenience for low L2 gas.",
      },
      {
        type: "table",
        caption: "Core smart contracts",
        headers: ["Contract", "Role", "Funding source"],
        rows: [
          ["WeatherXM", "Core ERC-20 token on Arbitrum One L2", "Token contract"],
          ["RewardPool", "Holds and distributes claimed $WXM rewards", "RewardVault and BusinessDevelopmentPool"],
          ["RewardVault", "Holds the unallocated reward pool", "Fixed 10-year emission, 14,246 $WXM/day"],
          ["BusinessDevelopmentPool", "Funds localized Business Boost rewards", "Network data revenues and residual tokens"],
        ],
      },
      {
        type: "p",
        text: "Each day, a station that clears the Proof of Location and Quality of Data thresholds gets a reward score, and the daily emission is allocated by hardware class weight.",
      },
      {
        type: "formula",
        text: "RewardScore = PoL x QoD, where PoL checks coordinates against registration and QoD runs out-of-bounds and self-quality checks for spikes and flatlines.",
      },
      {
        type: "formula",
        text: "TW = sum over hardware classes of (rewardable count x class weight). MaxReward(HC) = DailyEmission x class weight / TW. BaseReward = RewardScore x MaxReward(HC).",
      },
      {
        type: "p",
        text: "Outages are recorded and compensated. For example, on 2025-02-03 a 5,110-station incident distributed 12,186.48 $WXM, and on 2025-05-01 a 7,470-station incident distributed 3,923.77 $WXM.",
      },

      { type: "h2", text: "Economic engine and flywheel" },
      {
        type: "p",
        text: "The $WXM supply is hard-capped at 100 million, a predictable, non-inflationary model split across four buckets.",
      },
      {
        type: "diagram",
        text: String.raw`+-----------------------------------------------------------+
|                Total WXM Token Supply (100M)              |
+-----------------------------------------------------------+
                              |
      +-----------------------+-----------------------+
      | 55M                   | 30M                   | 15M
      v                       v                       v
+-------------+         +-------------+         +-------------+
|   Station   |         |   Initial   |         |  Treasury   |
|   Rewards   |         |  Supporters |         |   (10M) +   |
|  (10-year   |         |   (4-year   |         |  Liquidity  |
|  emission)  |         |   vesting)  |         |    (5M)     |
+-------------+         +-------------+         +-------------+`,
      },
      {
        type: "list",
        items: [
          "Station rewards (55M $WXM): distributed over 10 years, with 3M reserved for early beta adopters by rewardable station-hours.",
          "Initial supporters (30M $WXM): linear unlock over 4 years with a 1-year cliff.",
          "Treasury (10M $WXM): linear unlock over 5 years from launch.",
          "Liquidity support (5M $WXM): one-time issuance at launch to seed exchanges.",
        ],
      },
      {
        type: "p",
        text: "Three revenue mechanisms drive token utility. Manufacturers pay a flat $100 onboarding fee per device (Q2 2024 saw a first $300,000 of onboarding revenue for 3,000 devices). The Association auctions four commercial data licenses a year at a minimum bid of 100,000 $WXM, with the 2026 round awarded to WeatherXM AG and the Zeus Bittensor Subnet. Targeted Rollouts on Base fund stations through fractionalized NFTs (four NFTs fund one station): NFT supporters earn 75% of the station's $WXM and physical deployers earn 25% over a two-year cycle, the DAO matches rewards 1:1, and staked NFTs earn 5%, 8%, or 12% over 3, 6, or 12 months.",
      },
      {
        type: "p",
        text: "When commercial clients license data from targeted-rollout stations, 50% of the revenue funds open-market buybacks of $WXM, executed every three hours into the DAO treasury, tying token demand to commercial success. Separately, the SwissBorg Alpha deal deployed 2,270 stations to underserved areas on a 2-for-1 model, with subsidized hardware at $500 or 700 WXM.",
      },

      { type: "h2", text: "Application ecosystem" },
      {
        type: "list",
        items: [
          "Parametric crop insurance: with Etherisc, Sprout Insure, and ACRE Africa, stations act as localized crop oracles. In Burkina Faso the platform served 5,500 smallholder farmers, paying out to mobile money when rainfall drops below a threshold. It cut policy costs by up to 41%, premiums by up to 30%, and the payout cycle from three months to under one week.",
          "Decentralized AI weather prediction: the Zeus Bittensor subnet trains machine-learning weather models on WeatherXM's high-resolution dataset, a faster, lower-cost, more carbon-efficient alternative to physics-based numerical weather prediction.",
          "WeatherXM Pro: premium API tiers for enterprise clients, from a free personal tier to an enterprise tier at $100 per station per month.",
        ],
      },
      {
        type: "table",
        caption: "WeatherXM Pro API tiers",
        headers: ["Tier", "Monthly", "API calls/mo", "Features"],
        rows: [
          ["Personal", "Free", "1,000", "Personal license, latest observations, 7-day lookback"],
          ["Basic", "$10 / station", "10,000", "Commercial license, daily observations, 30-day lookback"],
          ["Basic+", "$20 / station", "10,000", "Commercial license, raw local observations, 30-day lookback"],
          ["Professional", "$20 / station", "20,000", "Raw observations, 30-day lookback, 1-business-day SLA"],
          ["Enterprise", "$100 / station", "50,000", "Full database, forecast accuracy tracking, 1-business-day SLA"],
        ],
      },

      { type: "h2", text: "WeatherXM versus GEODNET: architectural trade-offs" },
      {
        type: "table",
        caption: "Architectural comparison",
        headers: ["Dimension", "WeatherXM", "GEODNET", "Trade-off"],
        rows: [
          ["Node complexity", "Moderate: multi-parameter stations needing leveling and North alignment", "High: triple-band GNSS needing clear sky and survey-grade antennas", "WeatherXM's lower unit cost ($139 to $810) speeds deployment but exposes mechanical parts to wear and drift."],
          ["Data authenticity", "High: on-device cryptography via secure elements", "High: cryptographic signing of raw GNSS observations", "Both validate data origin on-device, removing reliance on intermediaries."],
          ["Density constraints", "H3 Res 7 cells (~5.16 km2), 10-node cell cap", "H3 Res 6/7 with distance-based decay curves", "WeatherXM's cap prevents over-saturation but its seniority tiebreaker can discourage late arrivals in dense areas."],
          ["Consensus engine", "Dual-gate: daily off-chain PoL and QoD", "Real-time validation of multipath, latency, and noise", "WeatherXM's daily batch allows deep consistency checks but adds latency to reward feedback."],
          ["Economic loop", "Onboarding fees, annual license auctions, rollout NFT sharing", "Burn-and-mint with corporate data subscriptions", "Annual auctions give clear upfront price discovery but lumpier cash flow than continuous billing."],
          ["Anti-spoofing", "Spatial-temporal: GPS packets versus declared location, relocation penalties", "Signal-consistency: local atmospheric delay versus neighbors", "WeatherXM's relocation penalties keep the network stable but need manual re-onboarding on false-positive GPS drift."],
        ],
      },

      { type: "h2", text: "Strategic outlook and conclusions" },
      {
        type: "p",
        text: "Decentralizing meteorological infrastructure is a viable model for crowdsourcing global environmental data. Settling core tokenomics on Arbitrum One and selling targeted-rollout NFTs on Base has cut the transaction costs that usually limit IoT-based DePIN. The shift from organic deployment to a demand-driven model, scaling from roughly 10,000 toward 17,000 active stations, places hardware where commercial contracts already exist and feeds the 50% buyback.",
      },
      {
        type: "list",
        items: [
          "Physical wear: mechanical sensors such as wind cups and rain buckets need ongoing calibration and maintenance, a constraint firmware updates cannot fully remove.",
          "Incentive transition: as the 10-year reward schedule winds down, the network must move from inflation-driven emissions to utility-generated fees.",
          "Anti-spoofing maturity: integrating differentiable AI weather models for gradient-based attribution would reward data by its actual contribution to forecast accuracy, moving beyond simple data-presence checks.",
        ],
      },
    ],
    dimensionNotes: {
      realRevenue:
        "WeatherXM has real, named demand: parametric crop insurance with Etherisc and ACRE Africa (5,500 farmers in Burkina Faso), the Zeus Bittensor subnet training forecast models on its data, and WeatherXM Pro API tiers up to $100 per station per month. Revenue mechanisms include $100 onboarding fees and four annual data-license auctions at a 100,000 $WXM minimum. The demand story is genuine but still early relative to the emission schedule.",
      tokenEconomics:
        "A 100M hard cap with a 10-year linear station emission (14,246 $WXM/day) gives a predictable, non-inflationary model, and the 50% buyback on targeted-rollout data revenue, executed every three hours, links token demand to commercial success. The open question is the handoff from inflation-driven emissions to utility fees as the 10-year schedule winds down.",
      decentralization:
        "An H3 Resolution 7 grid (~5.16 km2 cells) with a 10-station cap prevents urban over-saturation and pushes deployment toward data-sparse areas, with 6,079 active stations across 81 countries. The seniority tiebreaker that resolves over-capacity cells can discourage late arrivals in dense areas, a mild centralizing pull.",
      hardwareEconomics:
        "The weak point. Low unit cost ($139 to $810 on promotion) speeds deployment, but reported payback runs into years at current token prices, and the multi-parameter mechanical sensors wear and need calibration. Non-rechargeable lithium or alkaline AA cells are required, since rechargeables lose voltage in cold and disrupt on-device hashing.",
      operatorFriction:
        "Install is more involved than a plug-in node: a rigid two-meter steel pole, a bubble level inside a target circle, true-North alignment by compass, and careful wind-vane and rain-bucket setup. It is manageable for a committed operator but exposes data quality to physical drift. The hardware is otherwise low-power and runs unattended once mounted.",
      transparency:
        "Strong public verifiability. Daily validation runs Proof of Location and Quality of Data checks, rewards distribute through a Merkle root published on Arbitrum that operators claim themselves, the capacity algorithm is open-source under MIT, and the 44GB global dataset lives on IPFS. Outage events and their compensatory distributions are recorded publicly.",
    },
  },

  onocoy: {
    slug: "onocoy",
    status: "draft",
    title:
      "Decentralized Geodetic Infrastructure: An Analytical Evaluation of Onocoy ($ONO)",
    dek: "A Swiss RTK correction network with European Space Agency-backed verification, scored against the same six-dimension framework.",
    publishedAt: "2026-06-04",
    readingMinutes: 12,
    executiveSummary: [
      "Onocoy is a Swiss-founded RTK geodetic correction network: a dual-sided marketplace connecting independent reference-station operators with enterprise clients that need centimeter-level positioning for precision agriculture, autonomous vehicles, and drones. Like GEODNET, it crowdsources terrestrial reference stations to correct the atmospheric and orbital errors in standard GNSS, but it runs a dual-token model built around strict data verification and targeted hardware distribution.",
      "Our assessment yields a composite Headline Builder Score of 87 out of 100. The rating reflects a rigorous data-verification engine backed by the European Space Agency and ETH Zurich, and high station density across Europe, balanced against regional token-price exposure and the early stage of its global commercial scaling.",
    ],
    profile: [
      { label: "Headline builder score", value: "87 / 100" },
      { label: "Native token", value: "$ONO (Solana SPL, live on Jupiter)" },
      {
        label: "Total raised",
        value: "~$5.7M (incl. $1.5M ESA NAVISP grant, Ryze Labs)",
      },
      {
        label: "Active nodes",
        value: "~6,700+ across 50+ countries (Europe-concentrated)",
      },
      { label: "Annualized recurring revenue", value: "~$1.85M (est. mid-2026)" },
      { label: "Token burn", value: "100% of consumed Data Credits burned" },
      { label: "Circulating supply", value: "~80,730,000 $ONO" },
      { label: "Maximum supply", value: "810,000,000 $ONO" },
    ],
    teaserLabels: [
      "Active nodes",
      "Annualized recurring revenue",
      "Total raised",
      "Token burn",
    ],
    body: [
      { type: "h2", text: "Technical architecture and kinematic correction" },
      {
        type: "p",
        text: "Standard GNSS constellations (GPS, GLONASS, Galileo, BeiDou) broadcast from orbits roughly 20,000 kilometers up. Atmospheric delay, tropospheric refraction, and local multipath degrade a standard receiver to three to ten meters. RTK removes those errors: a stationary reference station at a precisely surveyed coordinate measures the exact error in the satellite carrier waves, then streams corrections in RTCM format over the NTRIP standard.",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|                GNSS Satellite Constellations                |
|              (GPS, Galileo, GLONASS, BeiDou)                |
+-------------------------------------------------------------+
                 /                             \
                /                               \
       (Atmospheric delay)             (Atmospheric delay)
              /                                   \
             v                                     v
+-----------------------------+        +-------------------------+
|     Onocoy Base Station     |        |       Mobile Rover      |
|     (Precisely Surveyed)    |        |  (Drone/Tractor/Robot)  |
+-----------------------------+        +-------------------------+
              |                                     ^
              | (Raw MSM7 phase corrections)        | (cm-level RTCM)
              v                                     |
+-----------------------------+                     |
|     Onocoy Caster Servers   |                     |
|   (servers.onocoy.com:2101) |                     |
+-----------------------------+                     |
              +---(Streams RTCM corrections via internet)---+`,
      },
      {
        type: "p",
        text: "A rover connects an NTRIP client to the Onocoy caster network at servers.onocoy.com:2101. Unlike single-station corrections, Onocoy uses a modern Multi-System Message approach (MSM4/5/6/7), tracking all available constellations at once.",
      },
      { type: "h3", text: "Leadership and validation" },
      {
        type: "p",
        text: "Onocoy was founded by satellite and GPS-telemetry veterans, including co-founder and president Daniel Ammann. Its standout credential is a $1.5M non-dilutive grant from the European Space Agency's NAVISP Element 2 program, funding a project with ETH Zurich to engineer an AI-driven, decentralized fraud-detection layer against GPS spoofing, signal injection, and data falsification.",
      },

      { type: "h2", text: "Operational growth, partnerships, and funding" },
      {
        type: "p",
        text: "The network has grown to over 6,700 active, verified reference points, capitalized by more than $5.7M. Early rounds drew Smart Island Capital and hardware executives, notably Thomas Seiler, the long-standing former CEO of GNSS manufacturer u-blox, who joined as a core strategic advisor. Institutional backing from Ryze Labs followed to accelerate international markets.",
      },
      {
        type: "table",
        caption: "Enterprise and technical partnerships",
        headers: ["Partner", "Objective"],
        rows: [
          ["ArduSimple", "Mainstream hardware distribution: pre-packaged triple-band CORS base stations (Septentrio simpleRTK3B Pro) pre-calibrated for Onocoy."],
          ["GNS Electronics", "Produces the NTRIP-X RTK base station, a plug-and-play appliance that lowers onboarding complexity."],
          ["LOCANOS", "Builds the Base Station Lite, with simultaneous Wi-Fi and Ethernet NTRIP streaming for industrial sites."],
          ["ETH Zurich", "R&D partner using ESA capital to implement spatial verification resilient against adversarial attacks."],
        ],
      },
      {
        type: "p",
        text: "These connections position Onocoy across precision agriculture, heavy-machinery tracking, and European drone-delivery corridors, for an estimated $1.85M of annualized recurring revenue as pilots move into commercial production.",
      },

      { type: "h2", text: "Token economics: the dual-token model" },
      {
        type: "p",
        text: "Onocoy settles on Solana for high throughput and sub-penny fees, and caps $ONO at 810,000,000. A strict dual-token model isolates the volatile crypto layer from consumer utility cost.",
      },
      {
        type: "list",
        items: [
          "Data Credits (DC): an internal, fiat-pegged currency used only to buy RTK correction streams. Enterprise clients buy DC with cash or $ONO.",
          "$ONO token: the crypto asset distributed daily to base-station operators for uploading continuous, multi-constellation data.",
        ],
      },
      {
        type: "diagram",
        text: String.raw`+--------------------------------------------------------+
|              Commercial Enterprise Client              |
|        (Buys fixed-value Data Credits with fiat)       |
+--------------------------------------------------------+
                            |
                            v
+--------------------------------------------------------+
|               Data Credit (DC) Consumption             |
|          (Client consumes the stream via NTRIP)        |
+--------------------------------------------------------+
                            |
                            v
+--------------------------------------------------------+
|                  On-Chain Token Burn                   |
|       (Corresponding $ONO is permanently burned)       |
+--------------------------------------------------------+
                            |
                            v
+--------------------------------------------------------+
|                 Operator Reward Cycle                  |
|   (New $ONO emitted to base stations meeting 98%+      |
|    quality standards)                                  |
+--------------------------------------------------------+`,
      },
      {
        type: "p",
        text: "High-Value Areas amplify emissions over industrial or underserved zones to pull supply where demand is, while over-dense clusters face severe reward dilution. Because 100% of the $ONO mapped to consumed Data Credits is burned on-chain, the network trends structurally toward net deflation as tracking operations scale past the fixed daily emission curve.",
      },

      { type: "h2", text: "Hardware, validation, and installation friction" },
      {
        type: "table",
        caption: "Onocoy reference hardware options",
        headers: ["Dimension", "Septentrio simpleRTK3B Pro", "GNS NTRIP-X"],
        rows: [
          ["Estimated cost", "~$650 to $1,100", "~$450 to $690"],
          ["Frequencies", "L1, L2, L5 triple-band", "L1, L2 dual-band"],
          ["Constellations", "GPS, GLONASS, Galileo, BeiDou, QZSS", "GPS, GLONASS, Galileo, BeiDou"],
          ["Connectivity", "RJ45 Ethernet / USB-C", "Wi-Fi / Ethernet"],
          ["Power", "Under 3 watts", "Under 2.5 watts"],
          ["Bandwidth", "~15 to 25 GB/month", "~12 to 18 GB/month"],
        ],
      },
      {
        type: "p",
        text: "On setup, a station does not earn full rewards immediately. A mandatory 24-to-36 hour validation test measures signal-to-noise ratio, tracking consistency, and antenna stability to screen out spoofed or indoor installs. Rewards are bound to location scarcity: devices placed in close proximity have baseline payouts reduced by mathematical decay functions to eliminate redundant overhead.",
      },
      { type: "h3", text: "Installation" },
      {
        type: "p",
        text: "Geodetic hardware remains a high barrier, setting the Operator Ease score at 60 out of 100. The antenna needs a rigid roof mast with a 360-degree clear sky view and no obstruction above a 10-degree elevation, low-loss coaxial routed indoors, wired Ethernet, and caster configuration.",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|  1. Antenna mechanical mounting                             |
|     - Secure a geodetic antenna on a rigid roof mast        |
|     - Achieve a 360-degree unobstructed view of the sky     |
|     - No barriers above a 10-degree elevation angle         |
+-------------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------------+
|  2. Hardware infrastructure                                 |
|     - Route low-loss coaxial cable indoors to the receiver  |
|     - Connect wired RJ45 Ethernet directly to the router    |
|     - Avoid sharp cable bends to limit signal attenuation   |
+-------------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------------+
|  3. Firmware and caster configuration                       |
|     - Open the WebUI at a local IP (e.g. 192.168.3.1)       |
|     - Set reference position to Auto for calibration        |
|     - Map NTRIP output to servers.onocoy.com:2101           |
|     - Activate RTCMv3 MSM7 blocks (1005, 1077, 1087)        |
+-------------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------------+
|  4. Dashboard onboarding                                    |
|     - Register the hardware serial on the Onocoy console    |
|     - Enter the NTRIP username and password                 |
|     - Link a Solana SPL wallet to complete mapping          |
+-------------------------------------------------------------+`,
      },

      { type: "h2", text: "Comparative analysis: Onocoy versus legacy networks" },
      {
        type: "table",
        caption: "High-precision positioning comparison",
        headers: ["Metric", "Onocoy", "Trimble VRS Now", "Legacy CORS"],
        rows: [
          ["Annual enterprise cost", "~$350 to $500 (Data Credits)", "~$1,850", "$1,200 to $2,500"],
          ["Spatial precision", "1 to 2 cm", "2 cm", "2.5 cm"],
          ["Verification", "Decentralized validator with AI fraud detection (ESA/ETH Zurich)", "Centralized server checks", "Manual engineering audits"],
          ["Infrastructure", "Crowdsourced DePIN (Solana)", "Corporate owned", "State / corporate monopolies"],
          ["Uptime", "Community matrix, density redundancy", "Legally binding SLAs", "Contractual SLAs"],
        ],
      },
      {
        type: "p",
        text: "Legacy providers keep an edge in long-standing legal SLAs and government contracting, but Onocoy's capital-efficient, token-incentivized scaling lets it compete hard on price-to-performance, putting centimeter-accurate data within reach of mass-market robotic and commercial software platforms.",
      },

      { type: "h2", text: "Editorial conclusion" },
      {
        type: "p",
        text: "Onocoy is a high-fidelity implementation of the physical-sensing DePIN model. By avoiding single-vendor hardware lock-in and securing cryptographic validation from top-tier academic and aerospace institutions, it builds a defensible, enterprise-grade geodetic layer on Solana. Its main challenge is translating a dense European footprint into demand capture across the Americas and Asian commercial shipping corridors.",
      },
    ],
    dimensionNotes: {
      realRevenue:
        "Healthy initial enterprise integrations in precision agriculture, machinery tracking, and European drone corridors, with a clean fiat separation through Data Credits. ARR is an estimated $1.85M as pilots move to production. The score is held back by demand still concentrated in the Euro-zone, with retail data use yet to broaden.",
      tokenEconomics:
        "A dual-token, burn-on-consumption design: 100% of the $ONO mapped to consumed Data Credits is burned on-chain, cleanly offsetting emissions, and High-Value Area rewards keep hardware incentives aligned with where demand is. One of the stronger token designs in the geodetic set.",
      decentralization:
        "Over 6,700 live nodes across 50+ countries make the network resilient, with spatial-scarcity decay preventing over-dense clusters. The main caveat is heavy European concentration, which leaves Americas and Asia coverage thin.",
      hardwareEconomics:
        "Ultra-low operating power (under 3 watts) and a choice of third-party hardware (ArduSimple Septentrio, GNS NTRIP-X) shield operators from vendor lock-in. Capital-efficient for the centimeter accuracy delivered.",
      operatorFriction:
        "Like other RTK networks, the rooftop install is demanding: a 360-degree clear sky view, no obstruction above 10 degrees, low-loss coaxial routing, wired Ethernet, and caster configuration. That limits deployment to property owners and tech-literate hosts.",
      transparency:
        "The standout dimension. Compliance and code integrity are validated with the European Space Agency and developed alongside ETH Zurich, with real-time data validation tracked on-chain and a 24-to-36 hour onboarding test against signal-to-noise and antenna stability to screen out spoofed or indoor installs.",
    },
  },

  helium: {
    slug: "helium",
    status: "draft",
    title:
      "Decentralized Wireless Infrastructure: An Analytical Evaluation of Helium ($HNT)",
    dek: "The pioneer wireless DePIN, spanning a saturated IoT layer and a carrier-grade mobile business, scored against the same framework.",
    publishedAt: "2026-06-03",
    readingMinutes: 13,
    executiveSummary: [
      "Helium is the pioneer wireless DePIN, a dual-sided marketplace for decentralized connectivity. Launched on its own Layer-1 in 2019, it migrated to Solana in April 2023, unifying two verticals under one token-incentivized network: a mature LoRaWAN IoT layer and a fast-growing CBRS and Wi-Fi mobile-offload layer. Independent hotspot hosts provide coverage, and enterprise clients and retail subscribers consume affordable data.",
      "Helium has evolved to tap real consumer demand, primarily through its Helium Mobile subsidiary, with the economy tied to a Burn-and-Mint Equilibrium that bridges real data consumption into token value. Our assessment yields a composite Headline Builder Score of 89 out of 100, reflecting unmatched network scale, strong institutional backing, and genuine carrier-grade mobile demand, balanced against severe IoT-layer saturation and localized install complexity.",
    ],
    profile: [
      { label: "Headline builder score", value: "89 / 100" },
      { label: "Native tokens", value: "$HNT, $IOT, $MOBILE (Solana SPL)" },
      { label: "Total raised", value: "$364.8M (incl. $200M Series D, 2022)" },
      { label: "IoT hotspots", value: "~380,000 active" },
      { label: "Mobile nodes", value: "~18,000 cell / Wi-Fi" },
      { label: "Mobile subscribers", value: "~115,000 (mid-2026)" },
      {
        label: "Token mechanism",
        value: "Burn-and-Mint Equilibrium (Data Credits at $0.00001 peg)",
      },
      { label: "Circulating supply", value: "~172,000,000 $HNT" },
      { label: "Maximum supply", value: "223,000,000 $HNT (hard cap)" },
    ],
    teaserLabels: [
      "IoT hotspots",
      "Mobile subscribers",
      "Total raised",
      "Maximum supply",
    ],
    body: [
      { type: "h2", text: "Technical architecture and wireless protocols" },
      {
        type: "p",
        text: "Legacy carriers run top-down: multi-billion-dollar spectrum licenses, commercial roof rights, and capital-intensive macro towers. Helium bypasses that capex by crowdsourcing its footprint across two sub-networks governed by Helium Improvement Proposal 51 (HIP-51).",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|                Helium Network Core Architecture             |
|                       (Solana Blockchain)                   |
+-------------------------------------------------------------+
                               |
         +---------------------+---------------------+
         v                                           v
+-----------------------------+             +-------------------------+
|      IoT Sub-Network         |            |    Mobile Sub-Network   |
|          ($IOT)              |            |        ($MOBILE)        |
+-----------------------------+             +-------------------------+
         |                                           |
         v                                           v
+-----------------------------+             +-------------------------+
| 915 MHz LoRaWAN hotspots    |             | CBRS small cells / Wi-Fi|
| (low bandwidth, long range) |             | (high speed, 3.5 GHz)   |
+-----------------------------+             +-------------------------+
         |                                           |
         v                                           v
+-----------------------------+             +-------------------------+
| IoT sensors, asset trackers |             | Retail subscribers,     |
| (smart cities, logistics)   |             | carrier data offload    |
+-----------------------------+             +-------------------------+`,
      },
      { type: "h3", text: "The IoT sub-network (LoRaWAN)" },
      {
        type: "p",
        text: "On the license-free sub-GHz band (915 MHz in North America, 868 MHz in Europe), a single 5-watt hotspot can carry small packets up to 15 kilometers line-of-sight. The data rate is restricted (0.3 to 50 kbps), so it cannot move voice or video, only telemetry from battery sensors, smart meters, and asset trackers.",
      },
      { type: "h3", text: "The mobile sub-network (CBRS and Wi-Fi)" },
      {
        type: "p",
        text: "For data-heavy consumer use, Helium added CBRS small cells in the 3.5 GHz band (Band 48), which act as local LTE towers over a wired backhaul, and carrier-grade Wi-Fi access points on 2.4 and 5 GHz that offload mobile devices over secure Passpoint. Routing and physical-state tracking are verified on Solana through on-chain state channels.",
      },
      {
        type: "table",
        caption: "Helium packet router network",
        headers: ["Layer", "Routing core", "Protocol", "Use case"],
        rows: [
          ["Global IoT", "router.helium.io", "LoRaWAN v1.0.3 / Semtech UDP", "Enterprise asset tracking and telemetry"],
          ["US mobile core", "mobile.core.helium.io", "3GPP LTE Band 48 (CBRS)", "High-speed mobile data offload"],
          ["Global Wi-Fi", "wifi.config.helium.io", "Passpoint / 802.11u", "Retail Wi-Fi offload"],
        ],
      },

      { type: "h2", text: "Growth, the T-Mobile partnership, and network dynamics" },
      {
        type: "p",
        text: "Helium scaled to over 900,000 registered LoRaWAN hotspots at peak, but hyper-growth caused extreme metro saturation, with dozens of hotspots stacked at the same coordinates diluting IoT rewards. The network consolidated to roughly 380,000 high-utility IoT nodes by mid-2026 and pivoted toward mobile, backed by $364.8M of venture funding from a16z, Tiger Global, and Multicoin, launching Helium Mobile as a hybrid network with T-Mobile rather than a standalone carrier.",
      },
      {
        type: "diagram",
        text: String.raw`[Helium Mobile Subscriber]
           |
           +---> Is a Helium Wi-Fi / CBRS node available?
                      |
                      +---> YES: connect to the Helium DePIN node ($0.50/GB to network)
                      |
                      +---> NO: roam onto a T-Mobile macro tower (MVNO backing)`,
      },
      {
        type: "p",
        text: "The hybrid model solves the cold-start coverage problem: subscribers get 5G across North America via T-Mobile macro towers, and whenever a device detects an active Helium Wi-Fi or CBRS node the connection shifts to the decentralized network. That lets Helium Mobile offer an aggressive $20 per month unlimited plan, driving over 115,000 active subscribers by mid-2026.",
      },
      {
        type: "table",
        caption: "Commercial and ecosystem partnerships",
        headers: ["Partner", "Date", "Objective"],
        rows: [
          ["T-Mobile", "Sep 2022", "Nationwide MVNO agreement providing cellular backup for Helium Mobile subscribers."],
          ["Google Cloud", "Oct 2024", "Native Helium Mobile eSIM profiles in Google Pixel devices."],
          ["Dish Network", "Oct 2021", "Multi-regional carrier offload over decentralized cells."],
          ["Solana Labs", "Apr 2023", "Migrated the settlement layer to Solana, freeing developer focus for wireless routing."],
        ],
      },

      { type: "h2", text: "Token economics: Burn-and-Mint and sub-DAOs" },
      {
        type: "p",
        text: "Helium runs a multi-token Burn-and-Mint Equilibrium. The core asset is $HNT, hard-capped at 223,000,000.",
      },
      {
        type: "diagram",
        text: String.raw`+------------------------------------+
|          Commercial User           |
|     (Buys Data Credits with USD)   |
+------------------------------------+
                  |
                  v
+------------------------------------+
|  Data Credits ($0.00001 USD peg)   |
+------------------------------------+
                  |
                  v
+------------------------------------+
| Equivalent $HNT burned from supply |
+------------------------------------+
                  |
       +----------+----------+
       v                     v
+------------------+   +------------------+
|  $IOT sub-DAO    |   |  $MOBILE sub-DAO |
| (mints to IoT)   |   | (mints to mobile)|
+------------------+   +------------------+`,
      },
      { type: "h3", text: "Data Credit mechanics" },
      {
        type: "p",
        text: "To move data, clients spend non-transferable Data Credits pegged to a fixed fiat price, and acquiring them removes $HNT from supply.",
      },
      {
        type: "formula",
        text: "1 Data Credit = $0.00001 USD. To get Data Credits, users buy $HNT and burn it on-chain, so rising commercial data use permanently removes $HNT from supply.",
      },
      { type: "h3", text: "HIP-51 sub-DAOs" },
      {
        type: "list",
        items: [
          "$IOT: earned by LoRaWAN hotspot hosts for coverage and for passing Proof of Coverage challenges.",
          "$MOBILE: earned by CBRS and Wi-Fi operators by regional verification and active data offload.",
          "Both are backed by a programmatic $HNT floor pool and redeemable for $HNT on-chain via automated market-maker formulas.",
        ],
      },
      {
        type: "p",
        text: "Net deflation needs burned $HNT to exceed minted rewards. The network emits about 1,215,000 $HNT per month on a two-year halving cycle, so at current run rates it needs sustained monthly Data Credit revenue near $12.15M to turn net-deflationary. The mobile layer's subscriber fees and corporate offload clearings are the main catalyst.",
      },

      { type: "h2", text: "Hardware, spatial scarcity, and installation friction" },
      {
        type: "table",
        caption: "Helium hardware suites",
        headers: ["Dimension", "Bobcat Miner 300 (IoT)", "Mobile Outdoor Wi-Fi AP", "FreedomFi + CBRS"],
        rows: [
          ["Retail cost", "$429", "$499", "$1,499"],
          ["Bands", "915 / 868 MHz", "2.4 and 5 GHz (Wi-Fi 6)", "3.5 GHz (LTE Band 48)"],
          ["Power", "Under 5 watts", "~12 watts", "~45 watts"],
          ["Backhaul", "10 to 30 GB/month", "100+ Mbps", "200+ Mbps"],
          ["Deployment", "Indoor window / rooftop", "Outdoor eaves / poles", "Outdoor mast, GPS lock"],
        ],
      },
      { type: "h3", text: "Spatial scarcity (HIP-17 and HIP-103)" },
      {
        type: "list",
        items: [
          "IoT (HIP-17): H3 Resolution 8 (~700 m) hexes. Stacking hotspots in one hex drops the reward scale proportionally (for example 1.0 to 0.2), discouraging multiple miners in a single home.",
          "Mobile (HIP-103): higher emission multipliers for high-demand urban hexes set by carrier heatmaps, with minimal baseline emissions in unpopulated rural hexes, focusing capital where subscribers are.",
        ],
      },
      { type: "h3", text: "Installation friction" },
      {
        type: "p",
        text: "Friction depends on the layer, which sets a composite Operator Ease score of 64 out of 100. Indoor Wi-Fi is plug-and-play over Ethernet, but outdoor cellular nodes are a real step up.",
      },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|  1. Structural mounting                                     |
|     - Secure roof access or mount a heavy mast              |
|     - Verify line-of-sight over target traffic zones        |
|     - Shield the chassis against weather                    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  2. Power and backhaul                                      |
|     - Route outdoor-rated Cat6 Ethernet                     |
|     - Deploy PoE+ (802.3at) injectors                       |
|     - Ensure backhaul over 220 Mbps down                    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  3. SAS handshake and cryptographic lock                   |
|     - Connect the GPS receiver to a sky window              |
|     - Register coordinates with the FCC database via SAS    |
|     - Wait for cloud authorization to transmit              |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  4. Solana on-chain registration                            |
|     - Pair hardware with the Helium Mobile wallet via BLE   |
|     - Mint the unique device NFT on Solana                  |
|     - Stake entry fees to begin earning                     |
+-------------------------------------------------------------+`,
      },

      { type: "h2", text: "Comparative analysis: decentralized connectivity versus centralized telecom" },
      {
        type: "table",
        caption: "Wireless infrastructure comparison",
        headers: ["Metric", "Helium Mobile", "Traditional MVNO", "Tier-1 carrier"],
        rows: [
          ["Subscription", "$20/mo unlimited", "$30 to $45/mo", "$75 to $95/mo"],
          ["Infrastructure", "Crowdsourced DePIN, token-incentivized", "Leased from parent MNO", "Centralized macro towers"],
          ["Routing", "Local offload plus MVNO roaming", "Single-hop parent pipeline", "Direct base-station subsystem"],
          ["Capex", "Shifted to independent hosts", "No hardware owned", "Multi-billion annual budget"],
          ["SLA", "Best-effort community redundancy", "Secondary carrier tier", "Binding enterprise SLAs"],
        ],
      },
      {
        type: "p",
        text: "By shifting capex to hosts who buy and maintain the equipment for token incentives, Helium can offer a competitive $20 rate. Legacy carriers keep the edge for enterprise and public-safety work: licensed spectrum free of open-band interference, binding SLAs, dedicated support, and guaranteed uptime on critical corridors, which matters where coverage density is thin.",
      },

      { type: "h2", text: "Editorial conclusion" },
      {
        type: "p",
        text: "Helium is the largest physical wireless deployment in web3 and, after the Solana migration and the T-Mobile partnership, the first DePIN to pair crowdsourced coverage with carrier-grade consumer demand. The IoT layer is mature but saturated, so the mobile business and its deflationary pull are the story to watch. Coverage gaps in sparse areas and binding enterprise SLAs remain the edge centralized carriers keep.",
      },
    ],
    dimensionNotes: {
      realRevenue:
        "Strong real-world traction for consumer DePIN: recurring on-chain revenue from retail cellular plans and enterprise data routing. Helium Mobile's $20 unlimited plan and ~115,000 subscribers give demand that is largely insulated from pure-emission speculation. The highest demand score in our set so far.",
      tokenEconomics:
        "The Burn-and-Mint Equilibrium ties usage to value: Data Credits are bought by burning $HNT, so growing data use removes supply. The system stays sensitive to token price, since a lower $HNT raises emissions per dollar burned, so it needs steady subscriber growth to hold equilibrium.",
      decentralization:
        "An expansive dual-network footprint, but with structural imbalance. The IoT layer is saturated in dense urban hexes, diluting host rewards, while the mobile layer depends on dense urban placement to capture offload traffic, which makes uniform rural coverage hard.",
      hardwareEconomics:
        "Capital needs vary by tier. Legacy IoT nodes are low-power with simple installs and manageable payback. High-speed CBRS mobile nodes need larger upfront capital, more complex installs, and fast backhaul, which stretches their payback.",
      operatorFriction:
        "Friction depends on layer. Indoor Wi-Fi access points are plug-and-play, but outdoor cellular nodes need Power-over-Ethernet cabling, high mast mounts, and FCC Spectrum Access System clearance, a real step up in effort.",
      transparency:
        "High transparency since the Solana migration: Proof of Coverage challenges, data-transmission receipts, and sub-DAO treasury balances are all recorded on-chain and auditable in real time through tools like the Helium explorer and Solana block explorers, guarding against spoofed coverage.",
    },
  },

  "io-net": {
    slug: "io-net",
    status: "draft",
    title:
      "Decentralized Compute Infrastructure: An Analytical Evaluation of io.net ($IO)",
    dek: "An enterprise-grade GPU clustering layer for AI, scored against the same six-dimension framework.",
    publishedAt: "2026-06-02",
    readingMinutes: 13,
    executiveSummary: [
      "In DePIN, a structural shift is underway: protocols are moving from speculative, capacity-inflated emissions toward verifiable, demand-driven orchestration. io.net is a premier example, an enterprise-grade decentralized clustering layer for high-performance GPUs. It aggregates underused compute from independent data centers, crypto-mining farms, and consumer hosts (the io.workers) into a globally distributed virtual supercomputer.",
      "The protocol attacks a real bottleneck in the AI economy: the shortage and centralized control of high-end silicon (NVIDIA H100, A100, and Blackwell-class) needed for model training, fine-tuning, and low-latency inference. Unlike earlier distributed-compute networks that treated nodes as isolated instances, io.net clusters GPUs over decentralized connections for multi-node training. Our assessment yields a composite Headline Builder Score of 88 out of 100, reflecting strong market timing, an innovative clustering architecture, and deep capitalization, balanced against wide-area networking bottlenecks, data-center compliance barriers, and a competitive AI compute market.",
    ],
    profile: [
      { label: "Headline builder score", value: "88 / 100" },
      { label: "Native token", value: "$IO (Solana SPL)" },
      {
        label: "Total raised",
        value: "$30M+ Series A (Hack VC, Multicoin, Delphi, Animoca)",
      },
      {
        label: "Verified GPUs",
        value: "45,000+ cluster-ready, 200,000+ total nodes",
      },
      { label: "Annualized recurring revenue", value: "~$14.2M (est. mid-2026)" },
      {
        label: "Token mechanism",
        value: "Buyback-and-burn from demand-side fees (up to 2%)",
      },
      { label: "Circulating supply", value: "~95M to 110M $IO" },
      { label: "Maximum supply", value: "800,000,000 $IO" },
    ],
    teaserLabels: [
      "Verified GPUs",
      "Annualized recurring revenue",
      "Total raised",
      "Maximum supply",
    ],
    body: [
      { type: "h2", text: "Technical architecture and clustering" },
      {
        type: "p",
        text: "Deep-learning training and distributed reinforcement learning cannot run on a single node. They need dozens to thousands of GPUs communicating synchronously, exchanging weights and gradients with minimal latency. Centralized data centers do this over physical InfiniBand or NVLink at up to 900 GB/s. Across a decentralized network, nodes are separated by geography, residential ISPs, and firewalls, so naive synchronous training stalls on latency.",
      },
      {
        type: "p",
        text: "io.net works around that with an orchestration engine built on Ray, Kubernetes, and Anyscale that groups distributed GPUs into one software-defined cluster. Custom execution topologies using Exatensor and DeepSpeed apply data-parallel, pipeline-parallel, and tensor-parallel strategies to slice models into pipelines, minimizing the data sent over wide-area networks so cross-node latency does not bottleneck the GPUs.",
      },
      {
        type: "diagram",
        text: String.raw`+-----------------------------------------------------------------------+
|                       io.net Orchestration Layer                      |
|                 (Ray / Kubernetes Cluster Controller)                 |
+-----------------------------------------------------------------------+
          /                          |                          \
         v                           v                           v
+-------------------------+ +-------------------------+ +-------------------------+
|  Independent Node A     | |  Independent Node B     | |  Independent Node C     |
|  (Data Center GPU Rig)  | |  (Mining Farm Array)    | |  (Consumer Node H100)   |
+-------------------------+ +-------------------------+ +-------------------------+
| - Ray Worker Daemon     | | - Ray Worker Daemon     | | - Ray Worker Daemon     |
| - Docker Container      | | - Docker Container      | | - Docker Container      |
| - Local NVLink Bridge   | | - Local NVLink Bridge   | | - Local NVLink Bridge   |
+-------------------------+ +-------------------------+ +-------------------------+
         ^                           ^                           ^
         +---(Inter-node mesh VPN via WireGuard / Netmaker)------+`,
      },
      {
        type: "p",
        text: "Secure low-latency links between nodes run over an automated mesh VPN using WireGuard and Netmaker. The orchestrator monitors topology continuously, evaluating round-trip time, packet drop, and bandwidth, then places clusters to minimize routing bottlenecks.",
      },
      {
        type: "diagram",
        text: String.raw`Select nodes where:
   MIN(RTT_latency) AND MAX(inter-node_bandwidth)
   subject to: GPU_model == requested_spec
               AND CUDA_version >= minimum_requirement`,
      },
      {
        type: "table",
        caption: "Global orchestration network",
        headers: ["Region", "Control plane", "Telemetry", "Gateway"],
        rows: [
          ["North America", "us-east.ionet.network", "gRPC / WSS", "Anycast (Cloudflare/AWS edge)"],
          ["Europe", "eu-central.ionet.network", "gRPC / WSS", "Anycast (Cloudflare/AWS edge)"],
          ["Asia-Pacific", "ap-southeast.ionet.network", "gRPC / WSS", "Anycast (Cloudflare/AWS edge)"],
        ],
      },

      { type: "h2", text: "Growth, capitalization, and ecosystem" },
      {
        type: "p",
        text: "io.net's supply growth tracked crypto-mining economics. After Ethereum moved to proof-of-stake, industrial mining facilities held large GPU inventories that were no longer profitable, and io.net converted those rigs into AI inference and rendering clusters. Between early 2024 and mid-2026 the verified footprint passed 45,000 enterprise-grade, cluster-ready units (A100, H100, L40S, RTX 4090) alongside hundreds of thousands of consumer devices, supported by a $30M Series A led by Hack VC with Multicoin, Delphi Digital, Animoca, and OKX Ventures.",
      },
      {
        type: "table",
        caption: "Enterprise and protocol integrations",
        headers: ["Partner", "Objective"],
        rows: [
          ["Render Network", "Cross-network routing of heavy 3D rendering and spatial pipelines to io.net GPU clusters."],
          ["Filecoin", "Decentralized storage for machine-learning checkpoints and model datasets."],
          ["Aethir", "Inter-network aggregation of enterprise edge clusters to lift cross-protocol utilization."],
          ["B2B AI incubators", "Subsidized compute giving early-stage AI startups low-cost fine-tuning and batch inference."],
        ],
      },
      {
        type: "formula",
        text: "Demand-to-Emission ratio = on-chain annualized compute spend / annual dollar value of incentive emissions. Above 0.60 marks a self-sustaining network.",
      },
      {
        type: "p",
        text: "This B2B pipeline pushed estimated demand-side ARR to $14.2M by mid-2026, making io.net one of the largest capital-backed compute networks in DePIN.",
      },

      { type: "h2", text: "Token economics: burn-to-mint on Solana" },
      {
        type: "p",
        text: "The $IO token launched with an 800,000,000 cap under a burn-to-mint and utility model. Settling on Solana lets the control plane run micro-transactions for telemetry validation, register nodes via compressed state, and pay thousands of workers continuously at minimal fees.",
      },
      {
        type: "list",
        items: [
          "Payment settlement: $IO is the preferred currency for buying clusters, and paying in $IO avoids payment surcharges.",
          "Worker collateral and staking: providers stake $IO proportional to the value and tier of their GPUs, a bond against spoofing or unexpected downtime.",
          "Governance: holders vote in the io.net DAO on protocol changes, emission decay, and treasury grants.",
        ],
      },
      {
        type: "p",
        text: "For enterprises that cannot hold crypto on the balance sheet, io.net routes fiat payments through an internal stablecoin unit (IOSD, pegged 1:1 to USD): a 2% protocol fee is retained and the rest funds an automated swap that buys $IO on the open market and burns it.",
      },
      {
        type: "diagram",
        text: String.raw`+--------------------------------------------------------+
|               Enterprise Compute Client                |
|            (Pays cluster fee in fiat / USD)            |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|              io.net Gateway Routing Engine             |
|    (Deducts 2% protocol fee, allocates 98% to pool)    |
+--------------------------------------------------------+
              /                                    \
             v                                      v
+--------------------------+          +--------------------------+
|  2% Platform Revenue     |          |  98% Swap Infrastructure |
|  (Retained by Treasury)  |          |  (Automated Market Swap) |
+--------------------------+          +--------------------------+
                                                   |
                                                   v
                                      +--------------------------+
                                      | Open-Market $IO Buyback  |
                                      | and Programmatic Burn    |
                                      +--------------------------+`,
      },
      { type: "h3", text: "Emissions decay and risks" },
      {
        type: "p",
        text: "Worker emissions follow an annual halving to enforce scarcity, which creates a hardware attrition threshold: if the $IO price falls far in a downturn, programmatic rewards can drop below the electricity cost of running high-end GPUs. Because data centers operate on tight margins, a prolonged deficit can trigger rapid node disconnection and availability gaps.",
      },
      {
        type: "formula",
        text: "Net deflation needs burned tokens to exceed minted rewards. At current emission baselines, io.net needs roughly $22.5M in ARR to become net-deflationary.",
      },

      { type: "h2", text: "Hardware onboarding and operational friction" },
      {
        type: "table",
        caption: "Worker classifications",
        headers: ["Tier", "Silicon", "Infrastructure", "Use cases"],
        rows: [
          ["Enterprise", "NVIDIA H100, A100, H200, L40S", "Data center, static IPv4, 10+ Gbps symmetric", "Large LLM training, multi-node deep learning"],
          ["Mid-market", "RTX 4090, 3090, A6000, A5000", "Mining farms or high-tier residential, 1+ Gbps", "Fine-tuning, batch inference, rendering"],
          ["Consumer / edge", "Apple Silicon M1 to M4 Max/Ultra", "Standard residential, low-power uptime", "Low-latency inference, edge AI"],
        ],
      },
      { type: "h3", text: "Proof-of-Compute verification" },
      {
        type: "diagram",
        text: String.raw`+-------------------------------------------------------------+
|  1. Secure containerized deployment                         |
|     - Worker runs the official io.net Docker daemon         |
|     - Grants access to the NVIDIA Management Library        |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  2. Cryptographic hardware handshake                        |
|     - Control plane queries GPU UUIDs and microcode         |
|     - Verifies hardware signatures via a secure enclave     |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  3. Deterministic stress testing                            |
|     - Orchestrator sends isolated CUDA kernels              |
|     - Validates speed against expected TFLOPS               |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|  4. Network performance auditing                            |
|     - Continuous ping, packet-loss, and speed runs          |
|     - Records verified metrics to Solana via compressed     |
|       state structures                                      |
+-------------------------------------------------------------+`,
      },
      { type: "h3", text: "Installation and friction" },
      {
        type: "p",
        text: "Despite streamlined tooling, onboarding carries real friction, setting the Operator Ease score at 62 out of 100. Enterprise nodes need Linux administration (Ubuntu 22.04), CUDA toolkit management, and Docker permissions, and residential CGNAT blocks the inbound ports clustering needs. Data centers must clear corporate firewall policy and compliance such as SOC2 and ISO 27001. That concentrates reliable supply among experienced miners and institutional providers.",
      },

      { type: "h2", text: "Comparative analysis: distributed compute versus hyperscalers" },
      {
        type: "table",
        caption: "GPU compute provider comparison",
        headers: ["Metric", "io.net", "Lambda / CoreWeave", "AWS"],
        rows: [
          ["A100 80GB hourly", "$1.10 to $1.60", "$1.90 to $2.20", "$4.10 to $4.90"],
          ["Provisioning time", "Under 90 seconds", "Minutes to hours", "Instant if allocation exists"],
          ["Availability", "High, global elastic supply", "Limited, supply queues", "Strict quotas, contract lock-ins"],
          ["Interconnect", "Variable WAN, software mesh VPN", "Local NVLink / InfiniBand up to 900 GB/s", "Local NVLink / Elastic Fabric Adapter"],
          ["SLA", "Community-bond, dynamic node replacement", "Binding enterprise SLAs", "Tier-4 binding SLAs"],
          ["Compliance", "Pseudonymous nodes, encrypted pipelines", "SOC2 / HIPAA options", "Federal, healthcare, corporate"],
        ],
      },
      {
        type: "p",
        text: "io.net runs up to 70% cheaper than AWS and about 30% under specialized web2 GPU clouds, because it is capital-light: it buys no real estate, substations, or cooling, and passes third-party infrastructure savings to developers. Hyperscalers keep the edge for the heaviest jobs, training a trillion-parameter model from scratch stays bottlenecked by WAN latency and suits physical InfiniBand fabrics, and compliance regimes like HIPAA and SOC2 Type II often require data in verified, physically secure environments. io.net is building encrypted container and zero-knowledge compute environments to close that gap.",
      },

      { type: "h2", text: "Editorial conclusion" },
      {
        type: "p",
        text: "io.net pairs sharp market timing with a genuine technical answer to decentralized clustering, and it is one of the best-capitalized compute networks in DePIN. The durable questions are physical: WAN interconnect limits the largest training jobs, enterprise compliance favors hyperscalers for sensitive data, and emission decay against tight data-center margins makes scaling organic demand the priority.",
      },
    ],
    dimensionNotes: {
      realRevenue:
        "Real commercial traction: an estimated $14.2M ARR from AI firms and developers, with demand-side volume expanding. The Demand-to-Emission ratio shows paying customers are a meaningful share of operator yield, though still minor against total emissions at this bootstrapping stage.",
      tokenEconomics:
        "Programmatic payments on Solana give a clear path to value accrual through buyback-and-burn on demand-side fees. The risk is the hardware attrition threshold: because data centers run on tight margins, a sharp token-price drop can push rewards below electricity cost and trigger node churn. Net deflation needs roughly $22.5M ARR.",
      decentralization:
        "Hundreds of thousands of registered consumer nodes, but the cluster-ready enterprise GPU capacity concentrates in specialized data-center partnerships and re-allocated mining facilities, a moderate concentration risk on a Herfindahl basis.",
      hardwareEconomics:
        "Its strongest dimension. By prioritizing already-amortized silicon, re-allocated mining rigs and underused enterprise tiers, io.net sidesteps most upfront capital, giving fast payback windows for operators whose hardware is already paid off.",
      operatorFriction:
        "Consumer setups are straightforward, but enterprise nodes need real Linux administration, CUDA toolchain management, and Docker orchestration, and residential CGNAT blocks the inbound ports clustering needs. Data centers must clear SOC2 and ISO 27001. That concentrates reliable supply among experienced operators.",
      transparency:
        "The Proof-of-Compute pipeline audits real hardware specs, telemetry is exposed through a public explorer, and network state is committed to Solana, giving enterprise buyers clear operational visibility.",
    },
  },
};

/** Look up a report by project slug, or null when none exists yet. */
export function getReport(slug: string): ProjectReport | null {
  return reports[slug] ?? null;
}

/** All report slugs, for static generation and the reports index. */
export function getReportSlugs(): string[] {
  return Object.keys(reports);
}
