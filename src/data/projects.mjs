export const CATALOGUE_CHECKED_AT = '2026-08-11';

export const MEDIA = ['Film', 'Television', 'Anime', 'Books', 'Manga', 'Comics', 'Music', 'Podcasts', 'Video games', 'Board games'];

const source = (id, title, url) => ({ id, title, url, checkedAt: CATALOGUE_CHECKED_AT });

/**
 * Catalogue facts are deliberately descriptive. `unknown` means the checked
 * sources did not establish a lifecycle state; it must not be rendered as
 * false or inactive.
 *
 * @type {Array<{
 *   id:string,
 *   name:string,
 *   summary:string,
 *   media:string[],
 *   category:string,
 *   capture:string,
 *   sourceState:'Open source'|'Partly open source'|'No public source repository verified',
 *   license:string|null,
 *   url:string,
 *   repository:string|null,
 *   contribute:string,
 *   lifecycle:'active'|'archived'|'unknown',
 *   checkedAt:string,
 *   sources:Array<{id:string,title:string,url:string,checkedAt:string}>
 * }>}
 */
export const PROJECTS = [
  {
    id: 'floppy',
    name: 'Floppy',
    summary: 'Self-hosted library, history and statistics across ten media types.',
    media: MEDIA,
    category: 'Tracker',
    capture: 'Manual entry, imports and integrations',
    sourceState: 'Open source',
    license: 'AGPL-3.0',
    url: 'https://github.com/dannyvfilms/Floppy',
    repository: 'https://github.com/dannyvfilms/Floppy',
    contribute: 'https://github.com/dannyvfilms/Floppy/issues',
    lifecycle: 'active',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('floppy-repository', 'Floppy repository', 'https://github.com/dannyvfilms/Floppy')]
  },
  {
    id: 'floppy-desktop',
    name: 'FloppyDesktop',
    summary: 'Native desktop client for a self-hosted Floppy instance.',
    media: MEDIA,
    category: 'Client',
    capture: 'Desktop client',
    sourceState: 'Open source',
    license: 'AGPL-3.0',
    url: 'https://github.com/Electric-Town/FloppyDesktop',
    repository: 'https://github.com/Electric-Town/FloppyDesktop',
    contribute: 'https://github.com/Electric-Town/FloppyDesktop/issues',
    lifecycle: 'active',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('floppy-desktop-repository', 'FloppyDesktop repository', 'https://github.com/Electric-Town/FloppyDesktop')]
  },
  {
    id: 'trakt',
    name: 'Trakt',
    summary: 'Film and television service with watch history, lists and media-centre scrobbling.',
    media: ['Film', 'Television'],
    category: 'Service',
    capture: 'Manual history and media-centre scrobbling',
    sourceState: 'No public source repository verified',
    license: null,
    url: 'https://trakt.tv/',
    repository: null,
    contribute: 'https://forums.trakt.tv/',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('trakt-scrobble-docs', 'Trakt scrobble documentation', 'https://docs.trakt.tv/reference/about-scrobble')]
  },
  {
    id: 'simkl',
    name: 'Simkl',
    summary: 'Service for tracking film, television and anime across apps, imports and an API.',
    media: ['Film', 'Television', 'Anime'],
    category: 'Service',
    capture: 'Automatic trackers, imports, API and manual updates',
    sourceState: 'No public source repository verified',
    license: null,
    url: 'https://simkl.com/',
    repository: null,
    contribute: 'https://support.simkl.org/',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('simkl-service', 'Simkl service', 'https://simkl.com/')]
  },
  {
    id: 'letterboxd',
    name: 'Letterboxd',
    summary: 'Film diary and social catalogue built around logs, ratings, reviews and lists.',
    media: ['Film'],
    category: 'Service',
    capture: 'Manual logging and CSV import',
    sourceState: 'No public source repository verified',
    license: null,
    url: 'https://letterboxd.com/',
    repository: null,
    contribute: 'https://letterboxd.com/contact/',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('letterboxd-welcome', 'Letterboxd welcome guide', 'https://letterboxd.com/welcome/')]
  },
  {
    id: 'wetrakr',
    name: 'WeTrakr',
    summary: 'Film and television tracker with an official open-source Kodi scrobbler.',
    media: ['Film', 'Television'],
    category: 'Service',
    capture: 'Manual tracking and Kodi playback',
    sourceState: 'Partly open source',
    license: 'Kodi add-on: MIT',
    url: 'https://wetrakr.com/',
    repository: 'https://github.com/wetrakr/wetrakr-kodi',
    contribute: 'https://github.com/wetrakr/wetrakr-kodi/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('wetrakr-kodi', 'WeTrakr Kodi scrobbler', 'https://github.com/wetrakr/wetrakr-kodi')]
  },
  {
    id: 'last-fm',
    name: 'Last.fm',
    summary: 'Music service built around listening history and recommendations.',
    media: ['Music'],
    category: 'Service',
    capture: 'Player and application submissions',
    sourceState: 'No public source repository verified',
    license: null,
    url: 'https://www.last.fm/about/trackmymusic',
    repository: null,
    contribute: 'https://support.last.fm/',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('lastfm-track-music', 'Last.fm Track My Music', 'https://www.last.fm/about/trackmymusic')]
  },
  {
    id: 'listenbrainz',
    name: 'ListenBrainz',
    summary: 'Open listening-history service operated by the MetaBrainz Foundation.',
    media: ['Music'],
    category: 'Service',
    capture: 'API submissions, imports and compatible clients',
    sourceState: 'Open source',
    license: 'GPL-2.0',
    url: 'https://listenbrainz.org/',
    repository: 'https://github.com/metabrainz/listenbrainz-server',
    contribute: 'https://github.com/metabrainz/listenbrainz-server',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('listenbrainz-repository', 'ListenBrainz server repository', 'https://github.com/metabrainz/listenbrainz-server')]
  },
  {
    id: 'web-scrobbler',
    name: 'Web Scrobbler',
    summary: 'Browser extension that scrobbles music played on supported websites.',
    media: ['Music'],
    category: 'Client',
    capture: 'Browser playback',
    sourceState: 'Open source',
    license: 'MIT',
    url: 'https://github.com/web-scrobbler/web-scrobbler',
    repository: 'https://github.com/web-scrobbler/web-scrobbler',
    contribute: 'https://github.com/web-scrobbler/web-scrobbler/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('web-scrobbler-repository', 'Web Scrobbler repository', 'https://github.com/web-scrobbler/web-scrobbler')]
  },
  {
    id: 'multi-scrobbler',
    name: 'multi-scrobbler',
    summary: 'Self-hosted relay from multiple playback sources to multiple services.',
    media: ['Music'],
    category: 'Connector',
    capture: 'Playback integrations and relays',
    sourceState: 'Open source',
    license: 'MIT',
    url: 'https://github.com/FoxxMD/multi-scrobbler',
    repository: 'https://github.com/FoxxMD/multi-scrobbler',
    contribute: 'https://github.com/FoxxMD/multi-scrobbler/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('multi-scrobbler-repository', 'multi-scrobbler repository', 'https://github.com/FoxxMD/multi-scrobbler')]
  },
  {
    id: 'pano-scrobbler',
    name: 'Pano Scrobbler',
    summary: 'Windows, Linux and Android client for several scrobbling services.',
    media: ['Music'],
    category: 'Client',
    capture: 'Device playback',
    sourceState: 'Open source',
    license: 'GPL-3.0',
    url: 'https://github.com/kawaiiDango/pano-scrobbler',
    repository: 'https://github.com/kawaiiDango/pano-scrobbler',
    contribute: 'https://github.com/kawaiiDango/pano-scrobbler/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('pano-scrobbler-repository', 'Pano Scrobbler repository', 'https://github.com/kawaiiDango/pano-scrobbler')]
  },
  {
    id: 'maloja',
    name: 'Maloja',
    summary: 'Self-hosted scrobble database with personal listening statistics.',
    media: ['Music'],
    category: 'Tracker',
    capture: 'Compatible clients and API submissions',
    sourceState: 'Open source',
    license: 'GPL-3.0',
    url: 'https://github.com/krateng/maloja',
    repository: 'https://github.com/krateng/maloja',
    contribute: 'https://github.com/krateng/maloja/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('maloja-repository', 'Maloja repository', 'https://github.com/krateng/maloja')]
  },
  {
    id: 'mal-sync',
    name: 'MAL-Sync',
    summary: 'Browser extension that updates anime and manga lists across supported services.',
    media: ['Anime', 'Manga'],
    category: 'Connector',
    capture: 'Streaming and reading websites',
    sourceState: 'Open source',
    license: 'GPL-3.0',
    url: 'https://github.com/MALSync/MALSync',
    repository: 'https://github.com/MALSync/MALSync',
    contribute: 'https://github.com/MALSync/MALSync/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('mal-sync-repository', 'MAL-Sync repository', 'https://github.com/MALSync/MALSync')]
  },
  {
    id: 'trackma',
    name: 'Trackma',
    summary: 'Multi-service anime and manga list manager for Unix-like systems.',
    media: ['Anime', 'Manga'],
    category: 'Client',
    capture: 'Desktop playback and manual updates',
    sourceState: 'Open source',
    license: 'GPL-3.0',
    url: 'https://github.com/z411/trackma',
    repository: 'https://github.com/z411/trackma',
    contribute: 'https://github.com/z411/trackma/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('trackma-repository', 'Trackma repository', 'https://github.com/z411/trackma')]
  },
  {
    id: 'taiga',
    name: 'Taiga',
    summary: 'Windows anime tracker with automatic episode recognition.',
    media: ['Anime'],
    category: 'Client',
    capture: 'Desktop playback recognition',
    sourceState: 'Open source',
    license: 'GPL-3.0',
    url: 'https://github.com/erengy/taiga',
    repository: 'https://github.com/erengy/taiga',
    contribute: 'https://github.com/erengy/taiga/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('taiga-repository', 'Taiga repository', 'https://github.com/erengy/taiga')]
  },
  {
    id: 'movary',
    name: 'Movary',
    summary: 'Self-hosted web application for recording and rating watched films.',
    media: ['Film'],
    category: 'Tracker',
    capture: 'Manual entry and integrations',
    sourceState: 'Open source',
    license: 'MIT',
    url: 'https://github.com/leepeuker/movary',
    repository: 'https://github.com/leepeuker/movary',
    contribute: 'https://github.com/leepeuker/movary/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('movary-repository', 'Movary repository', 'https://github.com/leepeuker/movary')]
  },
  {
    id: 'movary-kodi-addon',
    name: 'Movary Kodi add-on',
    summary: 'Kodi add-on that sends completed film plays to Movary.',
    media: ['Film'],
    category: 'Connector',
    capture: 'Kodi playback',
    sourceState: 'Open source',
    license: 'MIT',
    url: 'https://github.com/leepeuker/movary-kodi-addon',
    repository: 'https://github.com/leepeuker/movary-kodi-addon',
    contribute: 'https://github.com/leepeuker/movary-kodi-addon/issues',
    lifecycle: 'unknown',
    checkedAt: CATALOGUE_CHECKED_AT,
    sources: [source('movary-kodi-repository', 'Movary Kodi add-on repository', 'https://github.com/leepeuker/movary-kodi-addon')]
  }
];

export const CATEGORIES = [...new Set(PROJECTS.map((project) => project.category))].sort();
export const SOURCE_STATES = [...new Set(PROJECTS.map((project) => project.sourceState))].sort();
export const LICENSE_STATES = ['Published licence', 'No licence verified'];

export function filterProjects(projects, { query = '', media = 'All', category = 'All', sourceState = 'All', license = 'All' } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase('en');
  return projects.filter((project) => {
    const haystack = `${project.name} ${project.summary} ${project.media.join(' ')} ${project.category} ${project.capture}`.toLocaleLowerCase('en');
    return (!normalizedQuery || haystack.includes(normalizedQuery))
      && (media === 'All' || project.media.includes(media))
      && (category === 'All' || project.category === category)
      && (sourceState === 'All' || project.sourceState === sourceState)
      && (license === 'All' || (license === 'Published licence' ? Boolean(project.license) : !project.license));
  });
}

export function sortProjects(projects, key = 'name', direction = 'asc') {
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  const value = (project) => key === 'media' ? project.media.join(', ') : project[key] ?? '';
  return [...projects].sort((left, right) => collator.compare(value(left), value(right)) * (direction === 'desc' ? -1 : 1));
}
