---
type: Domain Concept
title: Source-local media identity
description: The media information an activity record preserves from the system that observed or submitted it.
resource: https://scrobble.dev/learn/scrobbling/#event
tags: [identity, provenance, scrobbling, portability]
status: stable
verified: { by: OpenAI/Codex-2026-08-11, at: 2026-08-11T20:58:36Z }
stale_after: 2027-08-11
sources:
  - { id: lastfm-scrobbling, resource: "https://www.last.fm/api/scrobbling", title: "Last.fm Scrobbling 2.0" }
  - { id: listenbrainz-json, resource: "https://listenbrainz.readthedocs.io/en/latest/users/json.html", title: "ListenBrainz JSON documentation" }
---

# Source-local media identity

Source-local media identity is the information an activity record preserves about the item known to the player, tracker or person that created it.

## What to preserve

When the source supplies them, a portable event should retain:

- the media type and item grain, such as track, episode, book or game session
- the source namespace and source item identifier
- the title or display label used at the time
- edition, release, season, episode or platform context relevant to the event
- the origin and provenance of that information

The source-local value should remain available after import or synchronization. A receiving system can attach its own local reference without erasing what the sender knew.

## Incomplete identity

An incomplete record should remain explicit. A tracker can mark the subject as unresolved or request a correction; it should not invent certainty or silently attach the event to a different item.

## Why this matters

Retries, imports and corrections need a stable account of the subject that was originally recorded. Preserving the supplied identity also makes disagreements inspectable instead of hiding them behind a replacement value.

## Related concepts

- [Scrobble event](./scrobble-event.md)
- [Scrobbling](./scrobbling.md)
- [Interoperability](./interoperability.md)
