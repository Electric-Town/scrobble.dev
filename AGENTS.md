# AGENTS.md

## Mission

Maintain scrobble.dev as an authoritative, neutral, implementation-aware knowledge base for scrobbling and portable media tracking. The site must remain useful to people who never use Floppy while providing clear contribution paths into Floppy and FloppyDesktop.

## Source-of-truth hierarchy

1. Domain definitions and interoperability principles in `public/knowledge/`.
2. Human-facing explanations in `src/pages/`.
3. Project-specific behavior from primary project repositories and documentation.
4. External ecosystem sources, preferring primary documentation over summaries.

If two sources disagree, do not silently choose one. Record scope, version, provenance, and the unresolved difference.

## Domain boundaries

Keep these concepts distinct unless an explicit relationship is being described:
- scrobble event
- media entity / identity
- user progress state
- rating / review
- watchlist / backlog intent
- collection / ownership
- list membership
- derived statistics
- recommendation signal
- synchronization operation

A page may compose them; storage and documentation should not collapse them.

## Content architecture

- Put reusable definitions in one canonical concept file.
- Link rather than duplicate.
- Give concepts stable paths.
- Preserve project-specific semantics under project context.
- Use progressive disclosure: definition → practical examples → edge cases → implementation detail.
- Keep one clear H1 and descriptive H2/H3 headings.
- Avoid walls of prose; optimize for scanning without reducing technical precision.

## Knowledge files

Concept documents use Markdown with YAML frontmatter and a non-empty `type`. Prefer these fields when meaningful:
- `type`
- `title`
- `description`
- `resource`
- `tags`
- `timestamp`
- `status`
- `trust`

Relationships should use normal Markdown links. For externally sourced claims, include source/provenance information when adding or materially changing a concept.

## Structured data

Use Schema.org types only where they truthfully describe visible content. Default page markup comes from `BaseLayout.astro`. Add page-specific entities for genuinely useful concepts such as `TechArticle`, `DefinedTerm`, `DefinedTermSet`, and `SoftwareApplication`.

Do not add fake reviews, ratings, authorship, dates, pricing, FAQ markup, or other properties solely for search appearance.

## Design system

Material You is the visual foundation, not a license for decoration.
- Tokens belong in `src/styles/global.css`.
- Use tonal surfaces instead of white cards and heavy borders.
- Buttons are pill-shaped.
- Cards and major containers use generous radii.
- Keep motion functional and restrained.
- Respect `prefers-reduced-motion`.
- Avoid continuous animation, parallax, attention-stealing glows, and widespread hover scaling.
- Maintain visible focus and minimum 44px targets.

## Accessibility and cognitive accessibility

Before merging material UI changes, verify:
- keyboard navigation and focus visibility
- semantic landmarks and heading order
- contrast
- zoom/reflow at narrow widths
- reduced-motion behavior
- link purpose from surrounding text
- no color-only meaning
- predictable navigation
- limited simultaneous calls to action
- content chunking and descriptive headings

For ADHD/AuDHD usability, prefer stable layouts, low distraction, explicit current context, short task paths, and progressive disclosure over novelty.

## UX review

Use Nielsen heuristics and Gestalt principles as review lenses, not slogans. Specifically check:
- visibility of system status
- match with real-world terminology
- user control and recovery
- consistency
- error prevention
- recognition over recall
- flexibility without clutter
- minimal but sufficient visual design
- useful recovery guidance
- help/documentation proximity
- proximity, similarity, common region, continuity, and figure/ground

## Voice

Write like technical documentation maintained by practitioners.
- direct, concrete, calm
- no marketing filler
- no claims that another tool is inferior
- no invented consensus
- no “revolutionary,” “game-changing,” or similar generic hype
- explain trade-offs and ambiguity directly
- define jargon at first use

## Floppy relationship

Floppy is a reference implementation and primary contribution funnel, not the definition of scrobbling. Link implementation work to `https://github.com/dannyvfilms/Floppy/issues`. FloppyDesktop work belongs at `https://github.com/Electric-Town/FloppyDesktop`.

## Validation before PR

Run:

```bash
npm install
npm run build
```

Then inspect generated pages for canonical URLs, sitemap output, `llms.txt`, `robots.txt`, keyboard focus, mobile reflow, and JSON-LD validity. Changes to definitions should update both the relevant knowledge concept and human-facing explanation when both surfaces exist.
