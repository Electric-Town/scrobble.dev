---
type: Method
title: Scrobble.dev editorial and evidence method
description: How Scrobble.dev classifies claims, prefers sources, records freshness, separates facts from proposals and publishes corrections.
resource: https://scrobble.dev/about/#method
tags: [evidence, editorial-method, provenance, verification]
status: stable
verified: { by: OpenAI/Codex-2026-08-11, at: 2026-08-11T20:58:36Z }
stale_after: 2027-02-11
sources:
  - { id: scrobble-dev-repository, resource: "https://github.com/Electric-Town/scrobble.dev", title: "Scrobble.dev repository" }
  - { id: okf-spec, resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md", title: "Open Knowledge Format v0.2 specification" }
---

# Scrobble.dev editorial and evidence method

Scrobble.dev separates established facts, project statements, observed behaviour, historical records, interpretation, proposals and unknown claims.

## Claim classes

| Claim class | Meaning | Expected wording |
| --- | --- | --- |
| Official requirement | An upstream specification or API states a requirement. | “The API requires…” |
| Project statement | A project's current documentation states a capability. | “The project documentation states…” |
| Observed behaviour | A result was reproduced against a named version. | “A test against version X produced…” |
| Historical record | An archived or retired source describes earlier behaviour. | “Historically…” |
| Interpretation | The conclusion follows from cited evidence. | “This suggests…” |
| Proposal | A versioned Scrobble.dev draft recommends behaviour. | “The draft profile proposes…” |
| Unknown | No adequate source was verified. | “Not verified as of DATE.” |

## Source preference

Current claims should use the project's own documentation, repository, release or API specification where possible. Historical claims may use archived primary material. A secondary source should be identified as secondary when no adequate primary source is available.

A logo, dependency, issue title or marketing phrase does not establish a capability by itself.

## Freshness

Current project claims record the source and date checked. A stale date triggers review. It does not turn an unknown capability into false or keep a changed capability marked as current.

## Facts and explanations

A changing fact belongs in one canonical record. Tables, JSON and summaries can render from that record. Explanatory prose remains authored for its page and links to the canonical definition instead of repeating it unnecessarily.

## Institutional narrator

The site uses a third-person institutional narrator. Project behaviour is attributed to the project. Scrobble.dev recommendations name Scrobble.dev, their scope and, for draft profiles, their version. Uncertainty remains visible.

## Corrections

A correction should identify:

- the affected page or project
- the current claim
- the proposed correction
- the primary source
- the source type
- the date checked
- any remaining uncertainty

Open a correction at https://github.com/Electric-Town/scrobble.dev/issues/new.

## Related documents

- [Governance](./governance.md)
- [Frequently asked questions](./faq.md)
- [Project catalogue](./projects.md)
- [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
