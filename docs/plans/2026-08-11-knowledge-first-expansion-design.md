# Scrobble.dev knowledge-first expansion

Status: approved for implementation on 11 August 2026

## Decision

Scrobble.dev will expand as an evidence-led field guide first and a home for draft interoperability proposals second. It will not implement the research handoff as a route-count or content-volume target.

The first release corrects the present public scope, evidence and navigation defects. Later releases add distinct learning material, reliability guidance and, after governance and fixtures exist, draft profiles.

## Product boundary

Scrobble.dev documents scrobbling, media-activity tracking and interoperability. It does not teach or catalogue the adjacent identifier-resolution initiative described in the private research handoff.

Floppy remains visible as software used to test the guidance. It does not define scrobbling or occupy the site's primary editorial position.

Two invariants apply to every release:

1. The global footer links to Floppy and FloppyDesktop.
2. Relevant pages include a small contextual contribution path for Scrobble.dev and Floppy without interrupting the page's primary task.
3. The global footer retains the Scrobble.dev repository and the sponsor links for Danny and Ryan.
4. The knowledge bundle links to the official Open Knowledge Format v0.2 specification.

## Audience and first decisions

The first visit must answer one question: what is scrobbling?

After the definition, the interface offers two routes:

- I use trackers.
- I build trackers.

Protocol vocabulary, machine files and institutional process do not appear before those choices.

## Information architecture

The primary navigation has at most five destinations:

1. Learn
2. Build
3. Draft profiles
4. Projects
5. Contribute

Home remains available through the wordmark. About and Reference live in the footer and contextual navigation. Frequently asked questions become task-focused Learn material rather than an additional primary destination.

On small screens, navigation uses a labelled native disclosure. Links must not be hidden in an off-screen horizontal row.

Every interior page provides its section, title, a path back to the section index and a breadcrumb when deeper than one level.

## Homepage

The homepage contains five editorial bands:

1. A plain definition and one concrete event.
2. Separate paths for tracker users and tracker builders.
3. A lifecycle comparison: now playing, progress, durable history and completion.
4. Meaningful differences between media and the draft principles.
5. Projects, contribution routes and current artifact status.

The homepage will not use ten equal media cards, a grid of machine-readable assets or a full copy of a draft profile.

## Editorial narrator

Scrobble.dev speaks as a maintained editorial reference. It does not speak as an invisible expert or marketing persona.

Claims use these forms:

- `Project documentation states...` for an upstream claim.
- `A test against VERSION on DATE produced...` for observed behaviour.
- `Together, these examples suggest...` for an inference.
- `Scrobble.dev proposes...` for a project proposal.
- `No confirming source was verified as of DATE.` for an unknown.

Each substantive section presents a direct answer, evidence or example, the boundary of the evidence, the implication and any proposal in that order.

Public copy avoids self-certified terms such as authoritative, canonical, best, universal or industry standard. Descriptive headings take precedence over slogans.

## Evidence model

Volatile claims are atomic records with:

- claim identifier;
- subject and asserted value;
- source identifier and exact scope;
- source version or retrieval date;
- verification state;
- reviewer;
- refresh policy.

Project facts also carry lifecycle and last-verified dates. `false`, `unknown` and `not applicable` remain distinct.

Human tables, project JSON, CSV, Markdown and structured data derive from the same factual registry. Explanatory prose remains authored; it may cite canonical claim records but is not generated from them.

## Open Knowledge Format

OKF v0.2 compliance is a release requirement. The public knowledge directory is a conformant bundle under the [official OKF project](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) and its [v0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md), not merely a set of Markdown files described as OKF-like.

CI verifies the specification's conformance rules:

- every non-reserved Markdown document has parseable YAML frontmatter;
- every concept has a non-empty `type`;
- reserved `index.md` and `log.md` files follow their specified structures;
- the bundle-root index declares `okf_version: "0.2"`;
- optional provenance, trust and lifecycle families use the v0.2 field shapes when present;
- per-claim footnotes resolve to matching `sources[].id` entries;
- internal concept links and public resource links are checked separately, even though OKF consumers must tolerate broken links.

The site visibly links to both the OKF overview and v0.2 specification. The repository records the exact upstream revision used by CI so a change on the upstream `main` branch cannot silently redefine a release.

## Project catalogue

The initial catalogue interface keeps three controls visible:

- project search;
- media;
- project category.

Hosting, capability, API, status and licence filters appear under a labelled `More filters` disclosure only when the underlying evidence supports them.

Filter and sort state use query parameters. The catalogue provides Reset all, visible active filters, a polite result count and a useful no-results recovery path. The unfiltered table remains readable without JavaScript.

Individual project pages ship only when they have a current primary source, lifecycle, last-verified date, a defensible description and a correction route. Route count is not a success metric.

## Contribution paths

Contribution prompts stay subordinate to the content:

- Learn: correct a fact or add a source.
- Build: contribute a reproducible failure case or implementation note.
- Draft profiles: add a fixture or comment on the proposal.
- Project page: correct this project.
- Floppy page: reproduce or fix the software behaviour.

The footer always contains `Scrobble.dev source`, `Floppy`, `FloppyDesktop`, `Improve this field guide`, `Work on Floppy`, `Sponsor Danny` and `Sponsor Ryan`. These are ordinary text links, not a promotional banner.

Issue links should prefill the affected page or project, claim, proposed correction, source URL, evidence type and verification date where GitHub supports it.

## Accessibility and cognitive load

The interface follows WCAG 2.2 AA and these additional constraints:

- no more than five primary choices;
- the direct answer precedes page contents;
- optional detail may use disclosure, but definitions, safety guidance and conclusions may not;
- native controls and semantic tables remain the default;
- no colour-only status;
- practical 44-pixel touch targets;
- visible focus and visited-link distinction;
- no essential motion;
- one stable reading path per page;
- tables retain a visible overflow instruction whenever they can overflow.

Manual release checks cover keyboard use, screen readers, 200 and 400 percent zoom, 320 CSS-pixel reflow, text spacing, forced colours, reduced motion and mobile table comprehension.

## Draft-profile legitimacy

Governance precedes normative artifacts. Before a draft profile can move beyond an exploratory proposal, the project must publish:

- decision authority and public review rules;
- conflict and appeal handling;
- contribution and intellectual-property terms;
- version lifecycle and deprecation rules;
- a security reporting policy;
- a processing model and negative fixtures;
- security and privacy considerations.

A candidate profile requires independently maintained producer and consumer implementations, including one independent of Electric Town and Floppy. Until then, public language says `discussion draft` or `proposal`, never `adopted standard`.

## GitHub and production

GitHub is the canonical source. Production never writes back to the repository.

Deployments publish the source commit fingerprint. A scheduled GitHub workflow compares production with the expected `main` commit and reports drift. Builds generate derived public assets from canonical records and fail when generated artifacts differ from committed output.

This design avoids a production credential with repository write permission.

## Release sequence

### Stage 0: make current claims honest

- Remove the excluded public subject from rendered and machine-readable output.
- Add a generated-output scope guard.
- Reconcile the public definition of scrobbling.
- Replace unsupported `source-checked`, global date and OKF conformance claims.
- Bring the knowledge bundle into verified OKF v0.2 conformance and link the official specification.
- Preserve current routes while correcting navigation.

### Stage 1: evidence and governance

- Add claim, source, project and proposal records using existing Astro and Node patterns.
- Generate factual HTML and machine views from those records.
- Publish the correction, governance and versioning process.

### Stage 2: knowledge core

- Publish the lifecycle comparison.
- Publish task-focused guidance for users and builders.
- Add media-specific material only where a distinct sourced question earns a page.
- Begin with a small human-reviewed retrieval set tied to shipped routes.

### Stage 3: reliability handbook

- Document observation, command and state boundaries.
- Cover idempotency, retries, ordering, reconciliation, correction and erasure.
- Publish the threat model before a normative schema.

### Stage 4: pre-standard proposal

- Define the processing model.
- Add difficult and negative fixtures.
- Draft modular payloads and a deterministic runner.
- Run an independent implementation pilot before candidate status.

## Release gates

A release fails when:

- excluded public vocabulary appears in any generated artifact;
- a current claim lacks evidence and a checked date;
- human and machine views disagree on a canonical fact;
- the OKF v0.2 conformance check fails;
- structured data asserts content that is not visible;
- a proposal is presented as an ecosystem requirement;
- a route is empty, orphaned or substantially duplicates another route;
- the Scrobble.dev, Floppy, FloppyDesktop, OKF or sponsor links disappear from their required locations;
- keyboard, no-JavaScript, mobile or automated accessibility checks regress;
- the production fingerprint does not match the deployed `main` release.
