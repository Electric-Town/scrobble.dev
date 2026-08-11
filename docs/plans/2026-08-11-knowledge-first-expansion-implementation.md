# Knowledge-first expansion implementation plan

Design: [2026-08-11-knowledge-first-expansion-design.md](./2026-08-11-knowledge-first-expansion-design.md)

## Outcome

Ship a calmer, evidence-led Scrobble.dev release whose human and machine views agree, whose knowledge bundle conforms to OKF v0.2, whose catalogue facts expose their verification state, and whose contribution paths keep Floppy present without making it the definition.

The release uses the existing Astro stack and native browser controls. It does not add a search service, component framework, schema registry or new content-management system.

## Task 1: encode the public contract

Files:

- `src/data/site.mjs`
- `tests/public-contract.test.mjs`
- `src/layouts/BaseLayout.astro`

Work:

1. Centralize the five primary destinations, footer links, sponsor links and official OKF links.
2. Render those shared records in the header and footer.
3. Add contract tests for Scrobble.dev source, Floppy, FloppyDesktop, both contribution paths, both sponsor links and the OKF project/specification.
4. Accept a page-specific modification date instead of assigning one global date.
5. Use a native mobile disclosure while retaining an ordinary navigation landmark.

Acceptance:

- No required link is duplicated as an independently maintained string.
- The footer remains useful without becoming a banner.
- Keyboard focus reaches every navigation item in reading order.

## Task 2: enforce the public-scope boundary

Files:

- `config/public-scope.json`
- `scripts/validate-public.mjs`
- `src/pages/faq/index.astro`
- `public/knowledge/faq.md`
- `public/knowledge/concepts/media-identity.md`
- `public/llms-full.txt`
- `tests/public-contract.test.mjs`

Work:

1. Remove public teaching about the adjacent identifier-resolution initiative, named specialist tools and source-specific issue reports.
2. Keep the in-scope questions: why anime is a useful catalogue facet, how trackers differ, portable event requirements, catalogue licensing and contribution.
3. Scan generated HTML, metadata, JSON-LD, Markdown, JSON, CSV, feed-like output and `llms*` for the internal exclusion list.
4. Fail the build on a scope hit and report the artifact path only; do not echo secrets or credentials.

Acceptance:

- The exclusion test fails against the current baseline and passes after the correction.
- No public page teaches provider-ID resolution.
- The anime explanation remains practical and does not declare a disputed ontology.

## Task 3: make the OKF bundle conformant and useful

Files:

- `config/okf-v0.2.json`
- `scripts/validate-okf.mjs`
- `public/knowledge/index.md`
- `public/knowledge/log.md`
- `public/knowledge/**/*.md`
- `tests/okf.test.mjs`
- `README.md`
- `CONTRIBUTING.md`

Work:

1. Pin official OKF source revision `374e0bc4c644310ff56cdf9c0fe81eccdec862b0` with permanent overview and specification URLs.
2. Parse every concept's YAML frontmatter rather than validating with regular expressions.
3. Enforce a non-empty `type` for non-reserved documents.
4. Enforce the v0.2 rules for `index.md`, `log.md`, `sources`, `generated`, `verified`, `status` and `stale_after` when present.
5. Ensure every per-claim footnote resolves to a `sources[].id`.
6. Add a dated bundle log and keep the root version declaration.
7. Link the official OKF project and specification from the site, repository documentation and knowledge index.

Acceptance:

- The complete bundle passes the pinned OKF v0.2 validator.
- A fixture for each malformed contract family fails with a useful error.
- Build output contains the same compliant bundle as the repository.

## Task 4: make project evidence explicit and DRY

Files:

- `src/data/projects.mjs`
- `scripts/generate-public.mjs`
- `src/pages/projects/index.astro`
- `src/pages/projects.json.js`
- `src/pages/projects.csv.js`
- `public/knowledge/projects.md`
- `tests/projects.test.mjs`

Work:

1. Give every project a stable ID, primary-source record, checked date, lifecycle state and explicit source state.
2. Preserve `unknown` rather than inferring `false` or inactive.
3. Generate the catalogue Markdown and changing `llms` catalogue facts from project records.
4. Test parity across HTML, JSON, CSV, OKF Markdown and Dataset/ItemList JSON-LD.
5. Remove claims stronger than the recorded evidence.

Acceptance:

- Every visible project fact identifies its verification date and primary source.
- All distributions contain the same project IDs and canonical values.
- Regeneration leaves the worktree clean.

## Task 5: simplify the navigation and homepage

Files:

- `src/pages/index.astro`
- `src/pages/learn/index.astro`
- `src/pages/build/index.astro`
- `src/pages/standard/index.astro`
- `src/styles/global.css`
- `tests/rendered-html.test.mjs`

Work:

1. Reduce the homepage to the approved five editorial bands.
2. Put the plain definition and one example before protocol vocabulary.
3. Add separate Learn and Build paths.
4. Publish the lifecycle distinction as the first knowledge expansion.
5. Rename public standards language to `Draft profiles` while preserving `/standard/`.
6. Replace unclear metaphor headings and `rules` language with descriptive draft wording.
7. Keep a small contribution line near relevant material and the full link set in the footer.

Acceptance:

- The first viewport answers what scrobbling is and offers two next steps.
- Primary navigation contains at most five choices.
- Floppy appears as software used to test guidance, never as the definition.
- No content region contains more than four equal cards.

## Task 6: improve the project catalogue interaction

Files:

- `src/pages/projects/index.astro`
- `src/data/projects.mjs`
- `src/styles/global.css`
- `tests/projects.test.mjs`

Work:

1. Keep project search, media and category visible.
2. Put source state and licence under a native `More filters` disclosure.
3. Store search, filter and sort state in query parameters.
4. Add Reset all, active-filter text, polite counts and recoverable no-results copy.
5. Keep the full semantic table readable without JavaScript.
6. Show the overflow instruction whenever the table can overflow.

Acceptance:

- A shared filtered URL restores the same view.
- Sorting updates `aria-sort`, the announcement and URL state.
- `unknown`, `false` and `not applicable` never share a display value.

## Task 7: publish method and governance without route inflation

Files:

- `src/pages/about/index.astro`
- `public/knowledge/method.md`
- `public/knowledge/governance.md`
- `src/pages/contribute/index.astro`
- `CONTRIBUTING.md`

Work:

1. Publish the evidence method, correction path, narrator contract and status vocabulary.
2. Publish minimal decision authority, review, conflict, version and security-reporting rules.
3. Keep About out of primary navigation and link it from the footer and claim-status context.
4. Add issue templates or prefilled issue URLs for a site correction, project correction and Floppy failure report.

Acceptance:

- A reader can identify who maintains the site, how a claim is checked and how to correct it.
- Governance exists before any stronger draft-profile claim.
- Contribution prompts do not interrupt the primary task.

## Task 8: generate truthful discovery surfaces

Files:

- `src/layouts/BaseLayout.astro`
- `src/pages/**/*.astro`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/robots.txt`
- `tests/discovery.test.mjs`

Work:

1. Generate changing counts, dates and project summaries from canonical records.
2. Keep `llms.txt` as a concise experimental index; generate or remove duplicated prose in `llms-full.txt`.
3. Validate every JSON-LD block and compare asserted values with visible content.
4. Use page-specific dates and statuses.
5. Keep human HTML canonical and mark Markdown as alternate representations.
6. Preserve sitemap, canonical, Open Graph and crawler metadata without adding unsupported rich-result fields.

Acceptance:

- Structured data parses and mirrors visible content.
- No hard-coded project count or global modification date can drift.
- Machine surfaces do not introduce claims absent from canonical records.

## Task 9: keep GitHub and Sites traceable

Files:

- `.openai/hosting.json`
- `src/pages/release.json.js`
- `.github/workflows/quality.yml`
- `.github/workflows/production-drift.yml`
- `docs/DEPLOYMENT.md`
- Sites source adapter files selected during packaging

Work:

1. Record the existing Sites project ID without credentials.
2. Publish the GitHub source commit in `/release.json` and page metadata.
3. Push the exact release source state to both GitHub and the Sites source repository before saving a Sites version.
4. Package the deployable Sites adapter from the same commit and canonical records.
5. Add a scheduled and manually dispatchable GitHub workflow that compares production's release fingerprint with the expected deployed commit.
6. Report drift as a failed workflow with remediation; do not grant production write access to GitHub.

Acceptance:

- GitHub and Sites identify the same source commit for a release.
- The drift job passes on the deployed commit and fails on a mismatched fixture.
- No token, Cloudflare credential or Sites repository credential is committed.

## Task 10: review, merge and deploy

Verification:

1. Clean install and full build on Node 22.
2. Unit and generated-artifact contracts.
3. OKF, scope, link, structured-data and parity checks.
4. Axe serious/critical count of zero on representative routes.
5. Manual keyboard, no-JavaScript, mobile navigation/table, zoom/reflow, text-spacing, forced-colours and reduced-motion checks.
6. Journalism, AI-slop, Nielsen, Gestalt, red-team and blue-team regression review.
7. Pull request with required GitHub checks.
8. Merge only after checks pass.
9. Save and deploy the exact merged Sites version.
10. Verify `scrobble.dev`, custom-domain status, certificate, routes, content types, release fingerprint, footer links and contribution paths.

The deployment is incomplete until the custom domain serves the merged source fingerprint and the scheduled drift check passes.
