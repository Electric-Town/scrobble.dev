export const SITE = {
  name: 'Scrobble.dev',
  description: 'Scrobbling explained: how media activity becomes a history you can keep and move.',
  primaryNavigation: [
    { label: 'Learn', href: '/learn/', match: ['/learn/', '/faq/'] },
    { label: 'Build', href: '/build/', match: ['/build/'] },
    { label: 'Draft profiles', href: '/standard/', match: ['/standard/'] },
    { label: 'Projects', href: '/projects/', match: ['/projects/'] },
    { label: 'Contribute', href: '/contribute/', match: ['/contribute/'] }
  ],
  footerSections: [
    {
      label: 'Projects',
      links: [
        { label: 'Floppy', href: 'https://github.com/dannyvfilms/Floppy' },
        { label: 'Work on Floppy', href: 'https://github.com/dannyvfilms/Floppy/issues' },
        { label: 'Sponsor Danny', href: 'https://github.com/sponsors/dannyvfilms' },
        { label: 'FloppyDesktop', href: 'https://github.com/Electric-Town/FloppyDesktop' }
      ]
    },
    {
      label: 'Field guide',
      links: [
        { label: 'About and evidence method', href: '/about/' },
        { label: 'Scrobble.dev source', href: 'https://github.com/Electric-Town/scrobble.dev' },
        { label: 'Knowledge bundle', href: '/knowledge/index.md' },
        { label: 'Open Knowledge Format project', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf' },
        { label: 'OKF v0.2 specification', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/374e0bc4c644310ff56cdf9c0fe81eccdec862b0/okf/SPEC.md' }
      ]
    },
    {
      label: 'Support the maintainer',
      links: [
        { label: 'Sponsor Ryan', href: 'https://github.com/sponsors/ryan-winkler' }
      ]
    }
  ],
  footerActions: [
    { label: 'Improve this field guide', href: 'https://github.com/Electric-Town/scrobble.dev/issues/new' }
  ]
};
