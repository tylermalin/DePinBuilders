/** Seed data for content types, extracted from the prototype. */

export interface EpisodeSeed {
  slug: string;
  number: number;
  title: string;
  summary: string;
  durationMin: number;
  guest: string;
  publishedAt: string;
}

export const episodes: EpisodeSeed[] = [
  {
    slug: "088-rovr-network",
    number: 88,
    title: "ROVR Network: powering real-world AI with mapping data",
    summary:
      "The ROVR founding team explains how mapping data feeds AI training pipelines, the economics of dashcam DePIN, and where drive-to-earn meets real demand.",
    durationMin: 55,
    guest: "ROVR founding team",
    publishedAt: "2026-05-28",
  },
  {
    slug: "087-weatherxm-economics",
    number: 87,
    title: "WeatherXM: targeted rollouts and the economics of weather data",
    summary:
      "WeatherXM on expanding beyond Europe, the data partnerships driving real revenue, and what the station economics look like after two years of operation.",
    durationMin: 48,
    guest: "WeatherXM",
    publishedAt: "2026-05-21",
  },
  {
    slug: "086-gpu-depin-squeeze",
    number: 86,
    title: "The GPU DePIN squeeze: where AI compute demand actually goes",
    summary:
      "A panel with io.net, Aethir, and Nosana on competing for the same demand pool, what real utilization looks like, and the gap between stated capacity and paid jobs.",
    durationMin: 61,
    guest: "Panel: io.net, Aethir, Nosana",
    publishedAt: "2026-05-14",
  },
  {
    slug: "085-geodnet-rtk",
    number: 85,
    title: "GEODNET: building the largest RTK network nobody talks about",
    summary:
      "GEODNET on centimeter positioning for autonomy, the burn model that makes their token economics unusual, and what rooftop operators actually earn.",
    durationMin: 52,
    guest: "GEODNET",
    publishedAt: "2026-05-07",
  },
  {
    slug: "084-hardware-signed-truth",
    number: 84,
    title: "Hardware-signed truth: carbon, compute, and proof at the source",
    summary:
      "How hardware-signed data changes the compliance game for carbon registries and AI energy reporting. The case for provenance over estimation.",
    durationMin: 58,
    guest: "Malama Labs",
    publishedAt: "2026-04-30",
  },
  {
    slug: "083-how-we-score",
    number: 83,
    title: "Verified, not vibes: how we score DePIN projects",
    summary:
      "The DePin.Builders desk walks through the scoring methodology, what earns a verification badge, and the editorial firewall between scores and revenue.",
    durationMin: 39,
    guest: "DePin.Builders desk",
    publishedAt: "2026-04-23",
  },
];

export interface EventSeed {
  slug: string;
  title: string;
  description: string;
  location: string;
  online: boolean;
  startsAt: string;
}

export const events: EventSeed[] = [
  {
    slug: "depin-builders-summit-2026",
    title: "DePIN Builders Summit 2026",
    description:
      "Two days of hardware teardown sessions, operator workshops, and network deep-dives.",
    location: "Austin, TX",
    online: false,
    startsAt: "2026-06-18T09:00:00-05:00",
  },
  {
    slug: "weatherxm-ama-jul-2026",
    title: "WeatherXM x DePin.Builders AMA",
    description:
      "Live Q&A on station economics, targeted rollouts, and the WeatherAI roadmap.",
    location: "Discord stage",
    online: true,
    startsAt: "2026-07-09T18:00:00Z",
  },
  {
    slug: "gpu-depin-roundtable-jul-2026",
    title: "GPU DePIN Roundtable",
    description:
      "io.net, Aethir, and Nosana on where real AI compute demand is landing.",
    location: "YouTube Live",
    online: true,
    startsAt: "2026-07-24T17:00:00Z",
  },
  {
    slug: "rooftop-operators-meetup-aug-2026",
    title: "Rooftop Operators Meetup",
    description:
      "For GEODNET, Helium, and weather-station operators. Antenna clinic included.",
    location: "Denver, CO",
    online: false,
    startsAt: "2026-08-06T10:00:00-06:00",
  },
  {
    slug: "tokenomics-teardown-aug-2026",
    title: "Tokenomics Teardown: live workshop",
    description:
      "We model three live networks past their emission cliff. Bring a spreadsheet.",
    location: "Online (Academy)",
    online: true,
    startsAt: "2026-08-21T16:00:00Z",
  },
];

export interface CourseSeed {
  slug: string;
  title: string;
  summary: string;
  modules: string;
  priceUsd: number;
  free: boolean;
}

export const courses: CourseSeed[] = [
  {
    slug: "introduction-to-depin",
    title: "Introduction to DePIN",
    summary:
      "Your complete starting point. What DePIN is, how the incentives work, and how to evaluate a network before you touch hardware.",
    modules: "4 modules · 12 lessons · 1h 40m",
    priceUsd: 0,
    free: true,
  },
  {
    slug: "depin-hardware-bootcamp",
    title: "DePIN Hardware Bootcamp",
    summary:
      "Hands-on install, antenna placement, network setup, uptime, and troubleshooting across the most common sensor and compute devices.",
    modules: "5 modules · 22 lessons · 3h 10m",
    priceUsd: 35,
    free: false,
  },
  {
    slug: "tokenomics-for-operators",
    title: "Tokenomics for Operators",
    summary:
      "Read an emissions schedule, spot a subsidy that will not last, and model real break-even past the cold-start phase.",
    modules: "3 modules · 14 lessons · 2h 05m",
    priceUsd: 60,
    free: false,
  },
  {
    slug: "picking-networks-that-survive",
    title: "Picking Networks That Survive",
    summary:
      "A framework for separating real demand from emission-funded supply, using live case studies across compute, wireless, and sensors.",
    modules: "4 modules · 18 lessons · 2h 40m",
    priceUsd: 80,
    free: false,
  },
  {
    slug: "map-your-first-deployment",
    title: "Map Your First Deployment",
    summary:
      "From rooftop access and line-of-sight to power and connectivity. Plan a deployment that actually earns where you live.",
    modules: "2 modules · 9 lessons · 1h 15m",
    priceUsd: 0,
    free: true,
  },
  {
    slug: "depin-for-investors",
    title: "DePIN for Investors",
    summary:
      "Market structure, defensibility, and the questions that separate a network with a moat from a token with a story.",
    modules: "3 modules · 11 lessons · 1h 50m",
    priceUsd: 120,
    free: false,
  },
];
