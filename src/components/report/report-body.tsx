import type { ReportBlock } from "@/data/reports.seed";

/**
 * Renders a report's typed body blocks with consistent, themeable styling.
 * Reused across every project report so the long-form format stays uniform.
 */
export function ReportBody({ blocks }: { blocks: ReportBlock[] }) {
  return (
    <div className="mt-2">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ReportBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 border-b-2 border-ink pb-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 mb-3 font-display text-lg font-semibold">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-4 max-w-3xl space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft"
            >
              <span aria-hidden className="mt-0.5 font-bold text-orange-ink">
                &middot;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <figure className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-ink text-paper">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.06em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-line align-top odd:bg-surface even:bg-surface-2"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={
                        ci === 0
                          ? "px-3 py-2.5 font-semibold text-ink"
                          : "px-3 py-2.5 text-ink-soft"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="mt-2 font-mono text-[11px] text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "diagram":
      return (
        <pre className="mt-6 overflow-x-auto rounded-[6px] border-[1.5px] border-line bg-surface-2 p-4 font-mono text-[11px] leading-tight text-ink-soft">
          {block.text}
        </pre>
      );
    case "formula":
      return (
        <p className="mt-4 max-w-3xl rounded-[3px] border-l-2 border-orange bg-orange-soft px-3 py-2 font-mono text-[13px] text-ink">
          {block.text}
        </p>
      );
  }
}
