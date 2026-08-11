---
type: Reference
title: Scrobbling frequently asked questions
description: Answers about the anime catalogue facet, tracker differences, portable records, catalogue licensing and contribution routes.
resource: https://scrobble.dev/faq/
tags: [scrobbling, anime, trackers, portability, licensing]
status: stable
verified: { by: OpenAI/Codex-2026-08-11, at: 2026-08-11T20:58:36Z }
stale_after: 2026-11-11
sources:
  - { id: lastfm, resource: "https://www.last.fm/about/trackmymusic", title: "Last.fm Track My Music" }
  - { id: listenbrainz, resource: "https://listenbrainz.org/", title: "ListenBrainz" }
  - { id: trakt, resource: "https://docs.trakt.tv/reference/about-scrobble", title: "Trakt scrobble documentation" }
  - { id: simkl, resource: "https://simkl.com/", title: "Simkl" }
  - { id: letterboxd, resource: "https://letterboxd.com/welcome/", title: "Letterboxd welcome guide" }
  - { id: wetrakr, resource: "https://github.com/wetrakr/wetrakr-kodi", title: "WeTrakr Kodi scrobbler" }
  - { id: cc0, resource: "https://creativecommons.org/publicdomain/zero/1.0/", title: "CC0 1.0 Universal" }
  - { id: eu-database, resource: "https://digital-strategy.ec.europa.eu/en/policies/protection-databases", title: "European Commission database protection summary" }
---

# Frequently asked questions about scrobbling

## Why is anime a separate catalogue facet?

Anime is a separate filter because it helps people find projects that track episodes, specials, split releases, continuing titles and rewatches. It is a navigation choice, not a claim that anime sits outside film or television. A project can appear under more than one media type.

## How do common tracking projects differ?

Projects differ in media scope, capture method, hosting model and the records they keep. Some receive playback events, some provide a diary, some keep listening history, and some store a self-hosted record across several media. The [HTML FAQ](https://scrobble.dev/faq/#trackers) compares Floppy, Last.fm, ListenBrainz, Trakt, Simkl, Letterboxd and WeTrakr.

## What should a portable scrobble preserve?

A portable record should preserve stable event identity, the media type, the source-local identity known at the time, event and recorded timestamps, native progress, provenance, correction or deletion state, and enough retry information to prevent duplicate history.

## Can the Scrobble.dev catalogue be reused commercially?

Yes. Scrobble.dev releases the catalogue under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). That dedication covers the catalogue published by Scrobble.dev. Linked projects, repositories and upstream data retain their own terms. A software licence does not automatically grant rights to data used by that software.

## How can I contribute?

Use the [Scrobble.dev issue tracker](https://github.com/Electric-Town/scrobble.dev/issues/new) for a factual correction or project update. Include the claim, a primary source and the date checked. Use the [Floppy issue tracker](https://github.com/dannyvfilms/Floppy/issues) or [FloppyDesktop issue tracker](https://github.com/Electric-Town/FloppyDesktop/issues) for application changes.

## Related concepts

- [Scrobble event](./concepts/scrobble-event.md)
- [Source-local media identity](./concepts/media-identity.md)
- [Interoperability](./concepts/interoperability.md)
- [Editorial method](./method.md)
- [Project catalogue](./projects.md)
