# scrobble.dev

Scrobble.dev is an open knowledge site for scrobbling, media tracking, interoperability, and portable media history. It explains the domain independently of any single product while using [Floppy](https://github.com/dannyvfilms/Floppy) and [FloppyDesktop](https://github.com/Electric-Town/FloppyDesktop) as reference implementations and contribution paths.

## Goals

1. Define scrobbling and media-tracking concepts clearly enough for users, developers, researchers, and agents.
2. Preserve a neutral, constructive view of the ecosystem: explain trade-offs and compatibility without disparaging other tools or mappings.
3. Make media history portability, provenance, correction, and interoperability normal expectations.
4. Funnel contributors into concrete Floppy, FloppyDesktop, and scrobble.dev work.
5. Publish the same knowledge in human-facing pages and machine-friendly Markdown.

## Architecture

- `src/pages/` — canonical human-facing pages.
- `src/layouts/` — shared semantic layout and structured-data behavior.
- `src/styles/` — centralized Material You design tokens and accessibility behavior.
- `public/knowledge/` — OKF-style Markdown knowledge bundle; stable URLs are part of the interface.
- `public/llms.txt` — agent discovery map.
- `public/robots.txt` — crawler guidance and sitemap discovery.
- `wrangler.jsonc` — Cloudflare static-assets deployment target.

Content is organized around domain concepts rather than pages or teams. Definitions should be authored once, linked from related concepts, and reused rather than copied into project-specific documentation.

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Deployment

The site is static Astro output and is intended to be served at `https://scrobble.dev` through Cloudflare. The build output is `dist/` and `wrangler.jsonc` points Cloudflare static assets at that directory.

Cloudflare account/project binding and DNS are intentionally not committed as secrets. Configure the custom domain `scrobble.dev` in Cloudflare after the Worker/Pages project exists.

## Content rules

- Prefer primary sources and reproducible behavior.
- Separate ecosystem concepts from project-specific implementation details.
- Do not imply a universal mapping when a relationship is ambiguous or provider-specific.
- Keep event provenance, identity, timestamps, and correction semantics explicit.
- Avoid unsupported superlatives and competitive put-downs.
- Write for scanning: direct headings, short paragraphs, concrete examples, and progressive detail.
- If a concept belongs in the knowledge graph, update its Markdown concept file as well as the rendered page.

## Accessibility and UX baseline

- Semantic landmarks and heading order.
- Visible keyboard focus.
- 44px minimum interactive targets.
- Reduced-motion support.
- Responsive single-column reading paths.
- No color-only state communication.
- Restrained motion and atmospheric decoration to reduce distraction.
- Nielsen heuristic and Gestalt reviews are expected for material UI changes.

## Structured discovery

Pages include canonical metadata and JSON-LD. The project uses specific Schema.org types where they describe the visible content accurately (`WebSite`, `WebPage`, `TechArticle`, `DefinedTerm`, `DefinedTermSet`, `SoftwareApplication`). Do not add structured data only to chase rich results; markup must match visible content.

## Open Knowledge Format

`public/knowledge/` follows the Open Knowledge Format direction: Markdown concepts, YAML frontmatter, stable paths, ordinary links, and version-controlled provenance. The knowledge layer is intentionally useful without a proprietary service.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). For product implementation work, start with [Floppy issues](https://github.com/dannyvfilms/Floppy/issues).

## Support maintainers

- [Sponsor Danny](https://github.com/sponsors/dannyvfilms)
- [Sponsor Ryan](https://github.com/sponsors/ryan-winkler)
