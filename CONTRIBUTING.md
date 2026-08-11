# Contributing to scrobble.dev

Scrobble.dev accepts documentation, examples, mappings, data fixtures, UX improvements, accessibility fixes, structured-data improvements, and interoperability research.

For Floppy application features and bugs, contribute upstream at https://github.com/dannyvfilms/Floppy/issues. For desktop-specific work, use https://github.com/Electric-Town/FloppyDesktop.

## Before opening a change

1. Identify the domain concept being changed.
2. Check whether it already has a canonical knowledge file under `public/knowledge/`.
3. Prefer updating and linking to that source instead of repeating the definition elsewhere.
4. For behavior claims, use a primary source, reproducible example, fixture, API response, or implementation reference.
5. State scope when behavior is specific to a project, version, provider, mapping, medium, or region.

## Good interoperability reports

Include:
- media type
- tools/providers involved
- direction of synchronization or import/export
- relevant versions
- identifiers involved
- event timestamp semantics
- observed behavior
- expected behavior
- whether retry creates duplicates
- whether correction/deletion round-trips
- evidence with private data removed

## Writing

Use direct technical prose. Avoid marketing filler, adversarial comparisons, and unsupported claims of consensus. Explain uncertainty when identity or mappings are ambiguous.

## Accessibility

UI changes must preserve keyboard access, visible focus, semantic hierarchy, usable zoom/reflow, reduced motion, and sufficient contrast. Avoid adding attention-demanding animation where a static state communicates the same information.

## Development

```bash
npm install
npm run dev
npm run build
```

A production build must pass before merge.

## Pull requests

Explain:
- problem
- user/developer impact
- domain concept affected
- implementation
- evidence or sources
- accessibility implications
- structured-data/SEO implications if applicable
- trade-offs and known limitations
- follow-up work

Small, coherent changes are easier to validate than broad rewrites.
