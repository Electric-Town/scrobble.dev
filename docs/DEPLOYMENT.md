# Deploy scrobble.dev on Cloudflare

## Preferred path

Use a Cloudflare Pages project connected to `Electric-Town/scrobble.dev`.

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22
- Custom domain: `scrobble.dev`

Astro produces a static site, so no application runtime is required for the current architecture.

## Domain

In the Cloudflare project, add `scrobble.dev` as the production custom domain. Keep DNS proxied through Cloudflare. Add `www.scrobble.dev` only if it will redirect canonically to the apex domain; the site itself declares `https://scrobble.dev` as canonical.

## Search and discovery after first production deploy

1. Verify `/robots.txt` returns 200.
2. Verify `/sitemap-index.xml` returns 200.
3. Verify `/llms.txt` and `/knowledge/index.md` return 200.
4. Run key pages through Google Rich Results Test and Schema Markup Validator.
5. Add the domain to Google Search Console and submit `https://scrobble.dev/sitemap-index.xml`.
6. Inspect canonical handling for apex versus `www` and HTTP versus HTTPS.
7. Verify social preview metadata.

## Accessibility QA

Test at minimum:
- keyboard-only navigation
- 200% and 400% zoom/reflow
- narrow mobile viewport
- `prefers-reduced-motion`
- screen-reader landmark/heading navigation
- focus visibility
- contrast for text, links, focus rings, and tonal surfaces

## UX review

Before significant visual releases, review the major flows against Nielsen's usability heuristics and the relevant Gestalt principles. Record concrete failures and fixes rather than checking principles off as labels.

## Security and privacy

The current site is static and has no forms, accounts, cookies, analytics, or server-side data. If those are added later, document data collection before deployment and keep optional telemetry separate from core site operation.
