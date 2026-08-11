import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { SITE } from '../src/data/site.mjs';

const requiredPrimaryNavigation = [
  ['Learn', '/learn/'],
  ['Build', '/build/'],
  ['Draft profiles', '/standard/'],
  ['Projects', '/projects/'],
  ['Contribute', '/contribute/']
];

const requiredFooterLinks = [
  ['Scrobble.dev source', 'https://github.com/Electric-Town/scrobble.dev'],
  ['Floppy', 'https://github.com/dannyvfilms/Floppy'],
  ['FloppyDesktop', 'https://github.com/Electric-Town/FloppyDesktop'],
  ['Improve this field guide', 'https://github.com/Electric-Town/scrobble.dev/issues/new'],
  ['Work on Floppy', 'https://github.com/dannyvfilms/Floppy/issues'],
  ['Sponsor Danny', 'https://github.com/sponsors/dannyvfilms'],
  ['Sponsor Ryan', 'https://github.com/sponsors/ryan-winkler'],
  ['Open Knowledge Format project', 'https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf'],
  ['OKF v0.2 specification', 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/374e0bc4c644310ff56cdf9c0fe81eccdec862b0/okf/SPEC.md']
];

test('keeps primary navigation compact and task-oriented', () => {
  assert.equal(SITE.primaryNavigation.length, 5);
  assert.deepEqual(SITE.primaryNavigation.map(({ label, href }) => [label, href]), requiredPrimaryNavigation);
});

test('centralizes every required footer reference', () => {
  const configuredLinks = [
    ...SITE.footerSections.flatMap(({ links }) => links),
    ...SITE.footerActions
  ].map(({ label, href }) => [label, href]);

  for (const [label, href] of requiredFooterLinks) {
    assert.ok(configuredLinks.some(([configuredLabel, configuredHref]) => configuredLabel === label && configuredHref === href));
  }
});

test('keeps Danny with Floppy and Ryan with Scrobble.dev maintenance', () => {
  const projects = SITE.footerSections.find(({ label }) => label === 'Projects');
  const support = SITE.footerSections.find(({ label }) => label === 'Support the maintainer');

  assert.deepEqual(
    projects?.links.filter(({ label }) => ['Floppy', 'Work on Floppy', 'Sponsor Danny'].includes(label)).map(({ label }) => label),
    ['Floppy', 'Work on Floppy', 'Sponsor Danny']
  );
  assert.deepEqual(support?.links.map(({ label }) => label), ['Sponsor Ryan']);
  assert.deepEqual(SITE.footerActions.map(({ label }) => label), ['Improve this field guide']);
});

test('keeps page status and modification dates opt-in', async () => {
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(layout, /dateModified:\s*['"]/);
  assert.match(layout, /modified \? \{ dateModified: modified \}/);
  assert.match(layout, /\(status \|\| modified\)/);
});

test('renders desktop and native small-screen navigation landmarks', async () => {
  const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const desktop = home.match(/<nav class="shell nav desktop-nav" aria-label="Primary navigation">([\s\S]*?)<\/nav>/)?.[1];
  const mobile = home.match(/<nav class="shell mobile-nav" aria-label="Primary navigation, small screens">([\s\S]*?)<\/nav>/)?.[1];

  assert.ok(desktop, 'desktop primary navigation should render');
  assert.ok(mobile, 'small-screen primary navigation should render');
  assert.match(home, /<details class="site-menu">\s*<summary class="shell">Menu<\/summary>/);
  assert.equal((desktop.match(/<a /g) ?? []).length, 5);
  assert.equal((mobile.match(/<a /g) ?? []).length, 5);
  for (const [label, href] of requiredPrimaryNavigation) {
    assert.match(desktop, new RegExp(`href="${href}"[^>]*>${label}<`));
    assert.match(mobile, new RegExp(`href="${href}"[^>]*>${label}<`));
  }
});

test('builds every primary navigation destination', async () => {
  for (const { label, href } of SITE.primaryNavigation) {
    await assert.doesNotReject(
      access(new URL(`../dist${href}index.html`, import.meta.url)),
      `${label} should resolve to a generated page at ${href}`
    );
  }
});

test('renders the required footer references without promoting contribution links to buttons', async () => {
  const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const projects = home.match(/<nav aria-label="Projects">([\s\S]*?)<\/nav>/)?.[1];
  const support = home.match(/<nav aria-label="Support the maintainer">([\s\S]*?)<\/nav>/)?.[1];

  for (const [label, href] of requiredFooterLinks) {
    assert.match(home, new RegExp(`href="${href}"[^>]*>${label}<`));
  }
  assert.match(projects ?? '', /Floppy[\s\S]*Work on Floppy[\s\S]*Sponsor Danny/);
  assert.match(support ?? '', /Sponsor Ryan/);
  assert.doesNotMatch(support ?? '', /Sponsor Danny/);
  assert.match(home, /<nav class="footer-actions" aria-label="Contribution links">/);
  assert.doesNotMatch(home, /class="[^"]*button[^"]*"[^>]*>Improve this field guide/);
  assert.doesNotMatch(home, /Last revised 11 August 2026/);
});
