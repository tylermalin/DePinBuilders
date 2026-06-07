import type { ProjectLinks } from "@/data/links.seed";

function Ext({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 border-b border-dashed border-line py-2.5 text-[13px] last:border-b-0 hover:text-orange-ink"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
        {label}
      </span>
      <span className="truncate font-semibold text-orange-ink">
        {href.replace(/^https?:\/\//, "").replace(/\/$/, "")} &#8599;
      </span>
    </a>
  );
}

/**
 * Official links block for a project. Renders only the links that exist, so a
 * project with partial data shows a clean partial block rather than blanks.
 * All entries are verified or sourced from the project's own report.
 */
export function ProjectLinks({ links }: { links: ProjectLinks }) {
  const hasAny =
    links.website ||
    links.docs ||
    links.x ||
    links.discord ||
    (links.contracts && links.contracts.length > 0);
  if (!hasAny) return null;

  return (
    <div className="overflow-hidden rounded-[6px] border-2 border-ink bg-surface">
      <div className="border-b-[1.5px] border-ink bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper">
        Official links
      </div>
      <div className="px-4 py-2">
        {links.website && <Ext href={links.website} label="Website" />}
        {links.docs && <Ext href={links.docs} label="Docs" />}
        {links.x && <Ext href={links.x} label="X" />}
        {links.discord && <Ext href={links.discord} label="Discord" />}
      </div>

      {links.contracts && links.contracts.length > 0 && (
        <div className="border-t border-line px-4 py-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            Token contract
          </div>
          <div className="space-y-2">
            {links.contracts.map((c) => (
              <div key={c.address}>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">
                  {c.chain}
                </div>
                <div className="break-all font-mono text-[11px] text-ink-soft">
                  {c.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-line bg-surface-2 px-4 py-2.5 font-mono text-[10px] leading-relaxed text-muted">
        Always confirm links and contract addresses against the project&apos;s
        official channels before transacting.
      </div>
    </div>
  );
}
