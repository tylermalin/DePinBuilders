import Image from "next/image";
import type { ProjectImage } from "@/data/media.seed";

function hostFrom(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

/**
 * Website screenshot, framed in a simple browser chrome with the project's
 * domain in the address bar. Links to the live site. Rendered only when a
 * screenshot has been added for the project.
 */
export function ProjectScreenshot({
  image,
  website,
}: {
  image: ProjectImage;
  website?: string;
}) {
  const domain = website ? hostFrom(website) : undefined;

  const frame = (
    <div className="overflow-hidden rounded-[8px] border-2 border-ink shadow-[6px_6px_0_var(--ink)]">
      <div className="flex items-center gap-2 border-b-[1.5px] border-ink bg-surface-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        {domain && (
          <span className="ml-2 truncate font-mono text-[11px] text-muted">
            {domain}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] bg-surface-2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 620px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );

  return (
    <figure className="mt-6 max-w-2xl">
      {website ? (
        <a href={website} target="_blank" rel="noopener noreferrer">
          {frame}
        </a>
      ) : (
        frame
      )}
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        {image.caption ?? `Screenshot of the ${domain ?? "official"} website.`}
      </figcaption>
    </figure>
  );
}

/**
 * Grid of official product / sensor / hardware images. Each carries its own
 * alt text and attribution credit. Rendered only when products are present.
 */
export function ProjectGallery({
  images,
  projectName,
}: {
  images: ProjectImage[];
  projectName: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 font-display text-lg font-semibold">
        Hardware &amp; product
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <figure key={img.src}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border-2 border-ink bg-surface-2">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-contain"
              />
            </div>
            {(img.caption || img.credit) && (
              <figcaption className="mt-2 text-[12px] leading-snug text-ink-soft">
                {img.caption}
                {img.credit && (
                  <span className="block font-mono text-[10px] text-muted">
                    Image: {img.credit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-muted">
        Product images supplied by or sourced from {projectName}. Used for
        reference.
      </p>
    </section>
  );
}
