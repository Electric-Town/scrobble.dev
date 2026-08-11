# Deployment and production drift

GitHub is the canonical source for Scrobble.dev. The public Sites deployment is built from the same commit and exposes that commit at `/release.json` and in the `source-commit` page metadata.

## Release sequence

1. Merge a pull request after the `Quality` workflow passes.
2. Build the merged commit with `SCROBBLE_RELEASE_SHA` set to the full commit SHA.
3. Package the generated `dist/server/index.js` and `.openai/hosting.json` with the Sites packaging helper.
4. Save and deploy that exact commit through Sites.
5. Verify `https://scrobble.dev/release.json`, representative routes, machine-readable files and the required footer links.
6. Run the `Production drift` workflow manually after deployment.

The scheduled drift check runs every six hours. It compares the production fingerprint with the current `main` commit and fails with a remediation message when they differ. Production does not receive a GitHub write credential.

## Custom domain

The Sites project is recorded in `.openai/hosting.json`. Domain and certificate state are managed through Sites and Cloudflare; credentials and validation tokens are never stored in the repository.

## Search and discovery after deployment

1. Verify `/robots.txt`, `/sitemap-index.xml`, `/llms.txt` and `/knowledge/index.md`.
2. Validate representative pages with Google Rich Results Test and Schema Markup Validator.
3. Submit `https://scrobble.dev/sitemap-index.xml` in Google Search Console.
4. Verify canonical handling and social metadata.

## Manual release checks

Test keyboard navigation, screen-reader landmarks and headings, 200% and 400% reflow, text spacing, forced colours, reduced motion, focus visibility, table comprehension and link contrast.
