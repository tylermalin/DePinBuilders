// src/data/links.seed.ts
// Official project links, keyed by slug. Every entry was verified against the
// project's own site, official docs, or a block explorer (Solscan, PolygonScan)
// before being added, or sourced from the contract addresses in the project's
// own report. Anything that could not be confidently verified is left out
// rather than guessed, in line with the no-fake-info standard. Operators should
// still confirm against the project's official channels before transacting.

export interface ContractLink {
  chain: string;
  address: string;
}

export interface ProjectLinks {
  website?: string;
  docs?: string;
  x?: string;
  discord?: string;
  contracts?: ContractLink[];
}

export const links: Record<string, ProjectLinks> = {
  geodnet: {
    website: "https://geodnet.com",
    x: "https://x.com/GEODNET",
    contracts: [
      { chain: "Solana", address: "7JA5eZdCzztSfQbJvS8aVVxMFfd81Rs9VvwnocV1mKHu" },
    ],
  },
  weatherxm: {
    website: "https://weatherxm.com",
    docs: "https://docs.weatherxm.com",
    x: "https://x.com/WeatherXM",
  },
  onocoy: {
    website: "https://onocoy.com",
    docs: "https://docs.onocoy.com",
    x: "https://x.com/onocoyRTK",
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
    x: "https://x.com/anyonefdn",
    discord: "https://discord.gg/anyoneprotocol",
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
    x: "https://x.com/rendernetwork",
  },
  "io-net": {
    website: "https://io.net",
    docs: "https://docs.io.net",
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
    website: "https://getgrass.io",
    x: "https://x.com/getgrass_io",
    contracts: [
      { chain: "Solana", address: "Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs" },
    ],
  },
  natix: {
    website: "https://natix.network",
    docs: "https://docs.natix.network",
    contracts: [
      { chain: "Solana", address: "FRySi8LPkuByB7VPSCCggxpewFUeeJiwEGRKKuhwpKcX" },
    ],
  },
  silencio: {
    website: "https://silencio.network",
  },
  skyx: {
    website: "https://skyxglobal.com",
    x: "https://x.com/SkyX_Network",
  },
  nubila: {
    website: "https://nubila.ai",
    x: "https://x.com/nubilanetwork",
    contracts: [
      { chain: "BNB Chain", address: "0xc2bD425A63800731E3Ae42b6596BDD783299fCb1" },
    ],
  },
  "375ai": {
    website: "https://375.ai",
    x: "https://x.com/375ai_",
  },
  denet: {
    website: "https://denet.pro",
    x: "https://x.com/DeNetPro",
  },
  "4dsky": {
    website: "https://4dsky.com",
    docs: "https://docs.4dsky.com",
  },
  "malama-labs": {
    website: "https://malamalabs.com",
  },
};

export function getLinks(slug: string): ProjectLinks | null {
  return links[slug] ?? null;
}
