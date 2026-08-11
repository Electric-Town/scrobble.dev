---
type: Collection
title: Scrobbling project catalogue
description: Source-checked services, trackers, clients and connectors grouped by media type and role.
resource: https://scrobble.dev/projects/
status: stable
version: 0.2
language: en
last_checked: 2026-08-11
stale_after: 2026-11-11
generated: { by: process:scrobble-dev-editorial, at: 2026-08-11T21:00:00Z }
sources:
  - { id: floppy, resource: "https://github.com/dannyvfilms/Floppy", title: "Floppy repository" }
  - { id: floppydesktop, resource: "https://github.com/Electric-Town/FloppyDesktop", title: "FloppyDesktop repository" }
  - { id: trakt, resource: "https://docs.trakt.tv/reference/about-scrobble", title: "Trakt scrobble documentation" }
  - { id: simkl, resource: "https://simkl.com/", title: "Simkl" }
  - { id: letterboxd, resource: "https://letterboxd.com/welcome/", title: "Letterboxd welcome guide" }
  - { id: wetrakr, resource: "https://github.com/wetrakr/wetrakr-kodi", title: "WeTrakr Kodi scrobbler" }
  - { id: lastfm, resource: "https://www.last.fm/about/trackmymusic", title: "Last.fm track my music" }
  - { id: listenbrainz, resource: "https://github.com/metabrainz/listenbrainz-server", title: "ListenBrainz server repository" }
---

# Scrobbling project catalogue

This catalogue records what each project says it does. Inclusion is not an endorsement. A project may cover more than one medium.

| Project | Media | Role | Capture | Source | Project or repository |
| --- | --- | --- | --- | --- | --- |
| Floppy | Film, television, anime, books, manga, comics, music, podcasts, video games, board games | Tracker | Manual entry, imports and integrations | AGPL-3.0 | https://github.com/dannyvfilms/Floppy |
| FloppyDesktop | Film, television, anime, books, manga, comics, music, podcasts, video games, board games | Client | Desktop client | AGPL-3.0 | https://github.com/Electric-Town/FloppyDesktop |
| Trakt | Film, television | Service | Manual history and media-center scrobbling | Source not published | https://trakt.tv/ |
| Simkl | Film, television, anime | Service | Automatic trackers, imports, API and manual updates | Source not published | https://simkl.com/ |
| Letterboxd | Film | Service | Manual logging and CSV import | Source not published | https://letterboxd.com/ |
| WeTrakr | Film, television | Service | Manual tracking and Kodi playback | Kodi add-on MIT; service source not published | https://github.com/wetrakr/wetrakr-kodi |
| Last.fm | Music | Service | Player and application submissions | Source not published | https://www.last.fm/about/trackmymusic |
| ListenBrainz | Music | Service | API submissions, imports and compatible clients | GPL-2.0 | https://github.com/metabrainz/listenbrainz-server |
| Web Scrobbler | Music | Client | Browser playback | MIT | https://github.com/web-scrobbler/web-scrobbler |
| multi-scrobbler | Music | Connector | Playback integrations and relays | MIT | https://github.com/FoxxMD/multi-scrobbler |
| Pano Scrobbler | Music | Client | Device playback | GPL-3.0 | https://github.com/kawaiiDango/pano-scrobbler |
| Maloja | Music | Tracker | Compatible clients and API submissions | GPL-3.0 | https://github.com/krateng/maloja |
| MAL-Sync | Anime, manga | Connector | Streaming and reading websites | GPL-3.0 | https://github.com/MALSync/MALSync |
| Trackma | Anime, manga | Client | Desktop playback and manual updates | GPL-3.0 | https://github.com/z411/trackma |
| Taiga | Anime | Client | Desktop playback recognition | GPL-3.0 | https://github.com/erengy/taiga |
| Movary | Film | Tracker | Manual entry and integrations | MIT | https://github.com/leepeuker/movary |
| Movary Kodi add-on | Film | Connector | Kodi playback | MIT | https://github.com/leepeuker/movary-kodi-addon |

## Add or correct an entry

Open an issue at https://github.com/Electric-Town/scrobble.dev/issues/new with the first-party source, factual summary, media types, capture method, source availability, licence and contribution URL. Keep one project or correction per change.

## Distributions

- JSON: https://scrobble.dev/projects.json
- CSV: https://scrobble.dev/projects.csv
- HTML: https://scrobble.dev/projects/
- Licence: https://creativecommons.org/publicdomain/zero/1.0/

## Improve Floppy

Use https://github.com/dannyvfilms/Floppy/issues for software changes. Include the media identity, provider identifiers, observed event, actual record and expected record. Add an anonymized fixture or round-trip test when the change affects synchronization, import or export.
