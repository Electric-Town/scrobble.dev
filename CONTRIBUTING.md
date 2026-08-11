# Contributing to Scrobble.dev

Scrobble.dev accepts factual corrections, project updates, examples, conformance cases, accessibility fixes and implementation guidance about scrobbling and media activity.

Application features and bugs belong in the [Floppy issue tracker](https://github.com/dannyvfilms/Floppy/issues) or, for desktop-specific work, the [FloppyDesktop issue tracker](https://github.com/Electric-Town/FloppyDesktop/issues).

## Scope

Scrobble.dev documents activity, now playing, progress, completion, history, retries, correction, deletion, synchronization, portability, privacy and project capabilities.

It does not rank projects, operate a media catalogue, resolve provider identifiers or require another project to depend on Scrobble.dev at runtime.

## Before opening a change

1. Identify the concept or factual claim being changed.
2. Check whether it already has a canonical file under `public/knowledge/`.
3. Update the canonical fact once and generate or link other views where possible.
4. Use a primary source for a current project claim.
5. Record the source type and date checked.
6. State the project, version, medium and region when they limit the claim.
7. Preserve uncertainty; undocumented does not mean unsupported.

Keep one factual correction or one coherent topic per change.

## Claim classes

Public prose must distinguish:

- official requirements from upstream specifications or APIs
- current statements made by a project
- behaviour reproduced against a named version
- historical records from archived sources
- editorial interpretation
- versioned Scrobble.dev proposals
- facts that remain unknown or unverified

Use the [editorial and evidence method](./public/knowledge/method.md) for wording and metadata. A draft proposal must not be presented as ecosystem consensus.

## Project-catalogue changes

Include:

- project name and canonical URL
- media types
- project role and capture method
- source availability and licence when published
- contribution route
- primary evidence URLs
- date checked
- unknown capabilities left explicitly unknown

Inclusion describes a project; it does not endorse or rank it.

## Interoperability reports

Include:

- media type
- applications or services involved
- direction of synchronization, import or export
- relevant versions
- source-local identifiers with personal account data removed
- event and recorded-time semantics
- observed behaviour
- expected behaviour
- retry and duplicate behaviour
- correction and deletion behaviour
- a reproducible sequence, fixture or private-data-safe payload

## Writing

Write in a calm, third-person institutional voice.

- Answer the page's question before adding background.
- Attribute project behaviour to the project and source.
- Name Scrobble.dev when stating a recommendation or proposal.
- Use concrete examples instead of promotional claims.
- Keep headings descriptive.
- Avoid slogans, mirrored card copy, generic benefit lists and unsupported claims of authority.
- Do not expose internal planning language such as funnels, modules or optimization targets in public copy.
- Do not repeat a fact only to make a page look complete.

Facts should be reusable; explanations should be written for the page that contains them.

## Knowledge files

Reusable knowledge belongs under `public/knowledge/` and follows [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf).

New concept documents require:

- a non-empty `type`
- `title`, `description` and stable `resource`
- `status`
- `verified` and `stale_after` when the content can become outdated
- sources for externally verifiable claims
- ordinary Markdown links to related concepts

Do not add opaque generator identities or freshness dates that do not correspond to a substantive review.

## Accessibility

UI changes must preserve:

- semantic landmarks and heading order
- keyboard access and visible focus
- usable zoom and narrow-screen reflow
- reduced-motion behaviour
- sufficient contrast
- descriptive links and labels
- core reading without client-side JavaScript

Use a table when values need comparison. Do not replace a useful table with decorative cards.

## Development

```bash
npm install
npm run dev
npm run build
```

A production build must pass before merge. Inspect generated HTML, metadata, JSON-LD, Markdown and machine-readable distributions when the change affects public facts.

## Pull requests

Explain:

- the problem
- the user or developer impact
- the concept or claim affected
- the implementation
- evidence and sources
- accessibility implications
- structured-data implications when applicable
- trade-offs and remaining uncertainty

The [governance note](./public/knowledge/governance.md) describes the review path for factual corrections, vocabulary changes and draft-profile changes.
