---
type: Governance
title: Scrobble.dev governance
description: The review path for factual corrections, vocabulary changes, draft-profile changes, project updates and unresolved questions.
resource: https://scrobble.dev/about/#governance
tags: [governance, contributions, drafts, versioning]
status: stable
verified: { by: OpenAI/Codex-2026-08-11, at: 2026-08-11T20:58:36Z }
stale_after: 2027-02-11
sources:
  - { id: scrobble-dev-repository, resource: "https://github.com/Electric-Town/scrobble.dev", title: "Scrobble.dev repository" }
  - { id: contributing-guide, resource: "https://github.com/Electric-Town/scrobble.dev/blob/main/CONTRIBUTING.md", title: "Scrobble.dev contributing guide" }
  - { id: okf-spec, resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md", title: "Open Knowledge Format v0.2 specification" }
---

# Scrobble.dev governance

Scrobble.dev is maintained in public through its repository, issues and pull requests. Published material distinguishes stable editorial definitions from versioned draft profiles.

## Factual corrections

A focused issue or pull request may correct a project fact, source, date, example or wording error. The change should include the primary source and date checked.

## Vocabulary changes

A material change to a core definition should state:

- the term and current definition
- the reason for change
- established examples or behaviour
- effects on related pages and machine-readable files
- compatibility concerns

## Draft-profile changes

A draft-profile change should include a concrete case or fixture and identify its effect:

1. Clarification: semantics do not change.
2. Extension: an optional capability is added.
3. Addition: a new versioned surface is introduced.
4. Breaking change: existing semantics become incompatible and require a new version.

Draft profiles are published for testing and comment. They are not adopted industry standards.

## Project updates

Project entries should record current sources, verification dates and unknown facts explicitly. Inclusion does not endorse or rank a project. A stale claim remains queued for review until evidence confirms, changes or removes it.

## Open questions

Unresolved questions may be published with their evidence and consequences. Editorial completeness does not justify invented consensus.

## Contribution routes

- Scrobble.dev facts and documentation: https://github.com/Electric-Town/scrobble.dev/issues/new
- Floppy application work: https://github.com/dannyvfilms/Floppy/issues
- FloppyDesktop application work: https://github.com/Electric-Town/FloppyDesktop/issues

Maintainer work can be supported at https://github.com/sponsors/dannyvfilms and https://github.com/sponsors/ryan-winkler.

## Related documents

- [Editorial and evidence method](./method.md)
- [Frequently asked questions](./faq.md)
- [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
