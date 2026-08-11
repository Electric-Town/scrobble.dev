---
type: Event Model
title: Scrobble event
description: A structured record of media-consumption activity.
resource: https://scrobble.dev/standard/#event
tags: [event, progress, provenance, timestamp]
timestamp: 2026-08-11T17:38:00Z
status: stable
---
# Scrobble event

A scrobble event records a meaningful unit of media-consumption activity.

## Portable core
Recommended fields:
- stable event identifier
- event type
- media type
- subject identity or identifiers
- occurred-at timestamp
- recorded-at timestamp when materially different
- progress or completion state
- provenance
- optional domain context

## Design requirements
Events should support safe retry and deduplication. Corrections and deletion should be representable without manufacturing false consumption activity. Native progress units should be preserved when a percentage would lose information.

## Related concepts
- [Scrobbling](./scrobbling.md)
- [Media identity](./media-identity.md)
- [Interoperability](./interoperability.md)
