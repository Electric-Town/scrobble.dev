---
type: Defined Concept
title: Media activity lifecycle
description: The boundary between now playing, progress, durable history and completion.
resource: https://scrobble.dev/learn/lifecycle/
tags: [scrobbling, activity, progress, completion]
status: stable
generated: { by: human:scrobble-dev-maintainers, at: 2026-08-11T23:00:00Z }
verified: { by: human:scrobble-dev-maintainers, at: 2026-08-11T23:00:00Z }
stale_after: 2027-02-11
sources:
  - { id: lastfm-submissions, resource: "https://www.last.fm/api/submissions", title: "Last.fm submissions protocol", last_modified: 2009-03-26 }
---

# Media activity lifecycle

A temporary player state becomes a scrobble when an implementation records it as durable history. Progress and completion can be related records, but neither is automatically the same event.

## Now playing

Now playing describes what a player is handling at the moment. Last.fm's retired submissions protocol separated this state from a historical submission.[^lastfm-submissions]

## Progress

Progress is mutable position expressed in a native unit such as seconds, pages, chapters or turns.

## Scrobble

A scrobble is durable history with an event time, media context and provenance.

## Completion

Completion records that a defined unit is finished according to a named source or policy. It should not rely on one universal percentage for every medium.

## Related concepts

- [Scrobbling](./scrobbling.md)
- [Scrobble event](./scrobble-event.md)
- [Interoperability](./interoperability.md)

[^lastfm-submissions]: Last.fm submissions protocol.
