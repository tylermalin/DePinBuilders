// src/data/links.seed.ts
// Official project links, keyed by slug. Entries come from the projects' own
// official channels (sites, docs, verified socials) or, for token contracts,
// from a block explorer (Solscan, PolygonScan) or the project's own report.
// Anything that could not be confidently verified is left out rather than
// guessed. Operators should still confirm against official channels before
// transacting.

export interface ContractLink {
  chain: string;
  address: string;
}

export interface ProjectLinks {
  website?: string;
  docs?: string;
  whitepaper?: string;
  explorer?: string;
  x?: string;
  telegram?: string;
  discord?: string;
  github?: string;
  youtube?: string;
  linkedin?: string;
  medium?: string;
  substack?: string;
  reddit?: string;
  warpcast?: string;
  instagram?: string;
  facebook?: string;
  appStore?: string;
  playStore?: string;
  contracts?: ContractLink[];
}

export const links: Record<string, ProjectLinks> = {
  geodnet: {
    website: "https://geodnet.com",
    x: "https://x.com/GEODNET",
    telegram: "https://t.me/geodnet",
    discord: "https://discord.gg/geodnet",
    youtube: "https://www.youtube.com/@GEODNET",
    linkedin: "https://www.linkedin.com/company/geodnet/",
    substack: "https://geodnetinfo.substack.com/",
    reddit: "https://www.reddit.com/r/Geodnet",
    facebook: "https://facebook.com/geodnet",
    contracts: [
      { chain: "Solana", address: "7JA5eZdCzztSfQbJvS8aVVxMFfd81Rs9VvwnocV1mKHu" },
    ],
  },
  weatherxm: {
    website: "https://weatherxm.com",
    docs: "https://docs.weatherxm.com",
    whitepaper: "https://weatherxm.com/whitepaper",
    explorer: "https://explorer.weatherxm.com/",
    x: "https://x.com/WeatherXM",
    discord: "https://weatherxm.com/discord",
    github: "https://github.com/weatherxm-network",
    youtube: "https://www.youtube.com/channel/UCAxcV0Jes225AuaLGdFue3g",
    linkedin: "https://www.linkedin.com/company/weatherxm",
    warpcast: "https://warpcast.com/weatherxm",
  },
  onocoy: {
    website: "https://onocoy.com",
    docs: "https://docs.onocoy.com",
    x: "https://x.com/onocoyRTK",
    discord: "https://discord.com/invite/CHKxSpPQ8p",
    youtube: "https://www.youtube.com/@onocoy",
    linkedin: "https://www.linkedin.com/company/onocoy",
  },
  aethir: {
    website: "https://aethir.com",
    docs: "https://docs.aethir.com",
    x: "https://x.com/AethirCloud",
    contracts: [
      { chain: "Arbitrum", address: "0xc87d779Da055666173E628b9aa5a0c7C42883fcf" },
    ],
  },
  anyone: {
    website: "https://anyone.io",
    docs: "https://docs.anyone.io",
    whitepaper: "https://anyone.io/whitepaper",
    x: "https://x.com/anyonefdn",
    telegram: "https://t.me/anyoneprotocol",
    discord: "https://discord.gg/anyoneprotocol",
    github: "https://github.com/anyone-protocol",
    youtube: "https://youtube.com/anyoneprotocol",
    medium: "https://anyone-protocol.medium.com/",
    contracts: [
      { chain: "Ethereum", address: "0xfeac2ab969f109077c3a115b81a17274026dc724" },
    ],
  },
  helium: {
    website: "https://helium.com",
    docs: "https://docs.helium.com",
    x: "https://x.com/helium",
    contracts: [
      { chain: "Solana (HNT)", address: "hntyVP6YFm86u4fbe5jfH8nCDMcKL743Z96UsA49KDo" },
      { chain: "Solana (IOT)", address: "iotEwZ995TYGqg68stgLym62w68N3K76An1G6Y7BRsC" },
      { chain: "Solana (MOBILE)", address: "mb1etFMRm2C6ZgZsJuQ67u77E71pA7769wM1Wn7Do" },
    ],
  },
  render: {
    website: "https://rendernetwork.com",
    docs: "https://know.rendernetwork.com",
    x: "https://x.com/RenderNetwork",
    linkedin: "https://www.linkedin.com/company/render-network-foundation/",
    medium: "https://rendernetwork.medium.com/",
  },
  "io-net": {
    website: "https://io.net",
    docs: "https://io.net/docs",
    x: "https://x.com/ionet",
  },
  filecoin: {
    website: "https://filecoin.io",
    docs: "https://docs.filecoin.io",
    x: "https://x.com/Filecoin",
  },
  nosana: {
    website: "https://nosana.io",
    docs: "https://docs.nosana.io",
  },
  grass: {
    website: "https://www.grass.io",
    docs: "https://grass-foundation.gitbook.io/grass-docs",
    x: "https://x.com/grass",
    discord: "https://discord.gg/getgrass",
    reddit: "https://www.reddit.com/r/Grass_io/",
    instagram: "https://www.instagram.com/getgrass_io/",
    contracts: [
      { chain: "Solana", address: "Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs" },
    ],
  },
  natix: {
    website: "https://natix.network",
    docs: "https://docs.natix.network",
    whitepaper: "https://docs.natix.network/whitepaper/",
    x: "https://x.com/NATIXNetwork",
    telegram: "https://t.me/NATIXNetwork",
    discord: "https://discord.gg/natixnetwork",
    youtube: "https://www.youtube.com/@natixnetwork",
    contracts: [
      { chain: "Solana", address: "FRySi8LPkuByB7VPSCCggxpewFUeeJiwEGRKKuhwpKcX" },
    ],
  },
  silencio: {
    website: "https://silencio.network",
    whitepaper: "https://whitepaper.silencio.network/",
    x: "https://x.com/silencioNetwork",
    linkedin: "https://www.linkedin.com/company/silencionetwork/",
  },
  skyx: {
    website: "https://skyxglobal.com",
    docs: "https://skyx.gitbook.io/learn",
    x: "https://x.com/SkyX_Network",
    medium: "https://medium.com/@SkyX_Network",
  },
  nubila: {
    website: "https://nubila.ai",
    docs: "https://nubila.gitbook.io/nubila",
    whitepaper: "https://nubila.gitbook.io/nubila/nubila-litepaper",
    x: "https://x.com/nubilanetwork",
    discord: "https://discord.com/invite/nubila",
    appStore: "https://apps.apple.com/us/app/nubila/id6736720461",
    playStore: "https://play.google.com/store/apps/details?id=ai.nubila.weatherapp",
    contracts: [
      { chain: "BNB Chain", address: "0xc2bD425A63800731E3Ae42b6596BDD783299fCb1" },
    ],
  },
  "375ai": {
    website: "https://375.ai",
    x: "https://x.com/375ai_",
    discord: "https://discord.gg/375ai",
    appStore: "https://apps.apple.com/us/app/375go/id6661034501",
    playStore: "https://play.google.com/store/apps/details?id=com.ai375.go",
  },
  denet: {
    website: "https://denet.pro",
    docs: "https://docs.denet.pro/",
    x: "https://x.com/DeNetPro",
    discord: "https://discord.com/invite/GBBKVC65qE",
    youtube: "https://www.youtube.com/@denetpro",
    medium: "https://medium.com/denetpro",
  },
  "4dsky": {
    website: "https://4dsky.com",
    docs: "https://docs.4dsky.com",
    x: "https://x.com/4dskyapp",
    discord: "https://discord.gg/X6EVsv6gDR",
    linkedin: "https://linkedin.com/company/4dsky",
  },
  "malama-labs": {
    website: "https://malamalabs.com",
    x: "https://x.com/malamalabs",
    youtube: "https://www.youtube.com/@malamalabs",
    linkedin: "https://www.linkedin.com/company/malama-labs",
    medium: "https://medium.com/@malamalabs",
  },
};

export function getLinks(slug: string): ProjectLinks | null {
  return links[slug] ?? null;
}
