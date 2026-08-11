---
type: Defined Concept
title: Scrobbling
description: Recording media activity as durable, time-stamped history.
resource: https://scrobble.dev/learn/scrobbling/
tags: [scrobbling, media-tracking, history, interoperability]
status: stable
generated: { by: human:scrobble-dev-maintainers, at: 2026-08-11T23:00:00Z }
verified: { by: human:scrobble-dev-maintainers, at: 2026-08-11T23:00:00Z }
stale_after: 2027-02-11
sources:
  - { id: lastfm-history, resource: "https://blog.last.fm/2008/05/21/building-the-next-lastfm", title: "Building the Next Last.fm", author: team:lastfm, last_modified: 2008-05-21 }
  - { id: lastfm-submissions, resource: "https://www.last.fm/api/submissions", title: "Last.fm submissions protocol", author: team:lastfm, last_modified: 2009-03-26 }
---

# Scrobbling

A scrobble keeps a durable history of what someone watched, read, heard or played, and when. Scrobbling is the act of making that record.

Last.fm traces Audioscrobbler to 2002.[^lastfm-history] Its retired submissions protocol distinguished temporary now-playing state from historical submissions.[^lastfm-submissions]

## Distinctions

A watchlist records intent. A collection records ownership or availability. A rating records opinion. A scrobble records activity in history. Implementations may connect these concepts without storing them as the same fact.

## Media context

Music plays, film watches, episode history, reading progress, podcast listening and game sessions can all enter a durable media history. Their useful progress units and identity context remain different.

## Related concepts

- [Media activity lifecycle](./activity-lifecycle.md)
- [Scrobble event](./scrobble-event.md)
- [Media identity](./media-identity.md)
- [Interoperability](./interoperability.md)

[^lastfm-history]: Building the Next Last.fm.
[^lastfm-submissions]: Last.fm submissions protocol.
