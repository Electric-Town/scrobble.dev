---
type: Domain Concept
title: Media identity and mappings
description: How media entities are identified and reconciled across providers, editions, numbering systems, and local databases.
resource: https://scrobble.dev/standard/#identity
tags: [identity, mappings, metadata, crosswalk]
timestamp: 2026-08-11T17:38:00Z
status: active
trust: curated
---
# Media identity and mappings

Media identity is the problem of determining whether records from different sources refer to the same work, edition, release, season, episode, track, chapter, issue, game version, or other media unit.

## Principles
- Carry multiple provider identifiers when available.
- Preserve the source of every identifier and mapping.
- Treat mappings as claims with scope, not universal truth.
- Represent confidence or ambiguity when a one-to-one mapping is uncertain.
- Distinguish a work from its editions, releases, cuts, platforms, translations, volumes, seasons, tracks, and other domain-specific manifestations.
- Do not destroy source identity when resolving to a preferred local record.

## Why this matters
Synchronization fails when two systems agree that an event happened but disagree about what the event refers to. Anime season numbering, book editions, podcast feed migrations, music recordings/releases, game platforms, and alternate cuts are common examples.

## Related concepts
- [Scrobble event](./scrobble-event.md)
- [Interoperability](./interoperability.md)
