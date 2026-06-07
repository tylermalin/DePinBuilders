# Project images

Per-project imagery lives here, one folder per project slug.

```
public/images/projects/<slug>/
  site.png        website screenshot (any name, referenced from media.seed.ts)
  <product>.jpg   official product / sensor / hardware images
```

To make an image appear on a project page, add an entry in
`src/data/media.seed.ts` keyed by the project slug:

- `screenshot`: a screenshot of the official website. Renders in a browser
  frame near the top of the project page and links to the live site.
- `products`: official product / sensor images. Each must carry a `credit`
  (the source, e.g. the project name) so attribution renders.

Every image requires descriptive `alt` text. Projects without an entry render
no images. Use raster formats (PNG, JPG, WebP); prefer reasonably sized files
since Next.js optimizes them at build time.
