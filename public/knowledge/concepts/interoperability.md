---
type: Domain Concept
title: Scrobbling interoperability
description: Practices that let media histories move between trackers, players, libraries, metadata providers, and analytical tools without silently losing meaning.
resource: https://scrobble.dev/standard/
tags: [interoperability, sync, portability, provenance]
timestamp: 2026-08-11T17:38:00Z
status: stable
---
# Scrobbling interoperability

Scrobbling interoperability is the ability to exchange media-consumption history while preserving the semantics needed to interpret and correct it.

## Minimum concerns
- identity mapping
- event identity and deduplication
- event time versus ingestion time
- progress semantics
- provenance
- corrections and deletion
- round-trip behavior
- user export and migration
- privacy and data minimization

## Compatibility
Compatibility is scoped. A project should name the version, media types, fields, extensions, and known losses it supports rather than claiming generic compatibility when behavior differs.

## Related concepts
- [Scrobbling](./scrobbling.md)
- [Scrobble event](./scrobble-event.md)
- [Media identity](./media-identity.md)
