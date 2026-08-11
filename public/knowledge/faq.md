---
type: Reference
title: Scrobbling frequently asked questions
description: Answers about anime classification, tracker differences, mapping failures, progress conflicts and reusable mapping data.
resource: https://scrobble.dev/faq/
tags: [scrobbling, anime, mappings, licensing, trackers]
status: stable
stale_after: 2026-11-11
generated: { by: process:scrobble-dev-editorial, at: 2026-08-11T21:00:00Z }
sources:
  - { id: okf, resource: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md", title: "Open Knowledge Format v0.2" }
  - { id: trakt, resource: "https://docs.trakt.tv/reference/about-scrobble", title: "Trakt scrobble documentation" }
  - { id: simkl, resource: "https://simkl.com/", title: "Simkl" }
  - { id: letterboxd, resource: "https://letterboxd.com/welcome/", title: "Letterboxd welcome guide" }
  - { id: wetrakr, resource: "https://github.com/wetrakr/wetrakr-kodi", title: "WeTrakr Kodi scrobbler" }
  - { id: aiometadata, resource: "https://github.com/cedya77/aiometadata", title: "AIOMetadata repository" }
  - { id: nuvio-1027, resource: "https://github.com/NuvioMedia/NuvioMobile/issues/1027", title: "Nuvio Mobile issue 1027" }
  - { id: nuvio-1679, resource: "https://github.com/NuvioMedia/NuvioMobile/issues/1679", title: "Nuvio Mobile issue 1679" }
  - { id: nuvio-1026, resource: "https://github.com/NuvioMedia/NuvioMobile/issues/1026", title: "Nuvio Mobile issue 1026" }
  - { id: eu-database, resource: "https://digital-strategy.ec.europa.eu/en/policies/protection-databases", title: "European Commission database protection summary" }
  - { id: cc0, resource: "https://creativecommons.org/publicdomain/zero/1.0/", title: "CC0 1.0" }
---

# Frequently asked questions about scrobbling

## Why is anime its own media type?

It is a catalogue facet for tracking workflows that use anime-native identifiers, absolute episode numbering, split releases and different handling of specials. It is not a claim that anime sits outside film or television. Projects can appear under more than one media type.

## How do common trackers differ?

They differ in media scope, capture method, hosting model and portability. The [HTML FAQ](https://scrobble.dev/faq/#trackers) compares Floppy, Last.fm, ListenBrainz, Trakt, Simkl, Letterboxd and WeTrakr.

## Why are there so many mapping solutions?

Providers model different things at different grains and use different numbering. Coverage, evidence, acquisition routes and licences also differ. A reliable mapping preserves source identifiers, ranges, offsets and unresolved claims.

## Are specialist anime tools a universal fix?

No. Anime-native providers and multi-source metadata add-ons can improve a particular integration. They do not remove the need to preserve numbering schemes, provenance and conflicts.

## What do the Nuvio Mobile reports establish?

They identify testable failure modes in absolute numbering, metadata enrichment and progress synchronization. Some were static-analysis reports and later closed administratively, so they do not prove that every current release has the defect.

## Can mapping data be reused commercially?

Only when the licence and acquisition routes permit it. Code and data can carry different terms. Scrobble.dev calls for a provenance-backed CC0 mapping corpus, with descriptive metadata excluded unless its own terms permit reuse.

## Related concepts

- [Media identity](./concepts/media-identity.md)
- [Scrobble event](./concepts/scrobble-event.md)
- [Interoperability](./concepts/interoperability.md)
- [Project catalogue](./projects.md)
