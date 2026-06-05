import Link from "next/link";

const SEO_TERMS = [
  "best DePIN projects 2026",
  "DePIN ROI calculator",
  "GEODNET miner earnings",
  "WeatherXM vs SkyX vs Nubila",
  "Aethir Edge daily earnings",
  "DePIN with no hardware",
  "Grass airdrop guide",
  "is Helium hotspot worth it",
  "Hivemapper Bee review",
  "DePIN passive income",
  "cheapest DePIN to start",
  "Solana DePIN projects",
  "Anyone router review",
  "DePIN coverage map",
  "carbon DePIN projects",
  "DePIN mining profitability",
  "how to verify a DePIN project",
  "DePIN hardware comparison",
];

export function SiteFooter() {
  return (
    <footer className="mt-5 border-t-2 border-ink bg-surface px-7 pb-9 pt-14">
      <div className="mx-auto max-w-[var(--max-w)]">
        {/* SEO cloud */}
        <div className="mb-7 border-b border-line pb-7">
          <h5 className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Popular searches
          </h5>
          <div className="flex flex-wrap gap-2">
            {SEO_TERMS.map((term) => (
              <Link
                key={term}
                href="/projects"
                className="rounded-full border border-line px-3 py-[5px] font-mono text-[11.5px] text-muted transition-colors hover:border-orange hover:text-orange-ink"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer grid */}
        <div className="mb-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-[26px] font-bold tracking-tight">
              DePin<span className="text-orange">.</span>Builders
            </div>
            <p className="mt-3 max-w-[30em] text-[13.5px] leading-relaxed text-muted">
              The independent research hub for Decentralized Physical
              Infrastructure Networks. Verified projects, hardware reviews,
              earnings tools, rankings, and an academy for operators.
            </p>
          </div>
          <FooterCol
            title="Explore"
            links={[
              { href: "/projects", label: "Projects" },
              { href: "/projects", label: "Rankings" },
              { href: "/map", label: "Map" },
              { href: "/tools/roi-calculator", label: "Tools and Calculator" },
              { href: "/academy", label: "Academy" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { href: "/blog", label: "Blog" },
              { href: "/podcasts", label: "Podcasts" },
              { href: "/events", label: "Events" },
              { href: "/about", label: "About" },
            ]}
          />
          <FooterCol
            title="Account and Community"
            links={[
              { href: "/get-verified", label: "Get verified" },
              { href: "/advertise", label: "Advertise" },
            ]}
          />
        </div>

        {/* Disclosure */}
        <p className="max-w-[62em] font-mono text-[10.5px] leading-relaxed text-muted">
          <span className="font-semibold">
            Affiliate and editorial disclosure:
          </span>{" "}
          DePin.Builders may earn commissions on hardware purchased through
          links on this site, and charges for verification badges and paid
          placement. These relationships are labeled and do not influence
          editorial scores or reviews. Reported yields, ROI figures, and
          token data are indicative, sourced from public disclosures and
          operator reports, and change frequently. This site does not
          provide financial, investment, legal, or tax advice. Do your own
          research before deploying capital or hardware.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] text-muted">
          <span>&copy; 2026 DePin.Builders. Independent DePIN research.</span>
          <span>Privacy · Terms · Methodology · Contact</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h5 className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {title}
      </h5>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="mb-2.5 block text-sm text-ink-soft transition-colors hover:text-orange-ink"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
