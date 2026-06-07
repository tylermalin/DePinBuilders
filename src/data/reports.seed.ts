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
};

/** Look up a report by project slug, or null when none exists yet. */
export function getReport(slug: string): ProjectReport | null {
  return reports[slug] ?? null;
}

/** All report slugs, for static generation and the reports index. */
export function getReportSlugs(): string[] {
  return Object.keys(reports);
}
