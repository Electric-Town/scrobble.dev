import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { filterProjects, PROJECTS, sortProjects } from '../src/data/projects.mjs';

test('builds the editorial field guide and project catalogue', async () => {
  const [home, projects, faq, llms, catalogue, json, csv] = await Promise.all([
    readFile(new URL('../dist/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../dist/projects/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../dist/faq/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../dist/llms.txt', import.meta.url), 'utf8'),
    readFile(new URL('../dist/knowledge/projects.md', import.meta.url), 'utf8'),
    readFile(new URL('../dist/projects.json', import.meta.url), 'utf8'),
    readFile(new URL('../dist/projects.csv', import.meta.url), 'utf8')
  ]);

  assert.match(home, /Scrobbling records what was played, watched or read\./);
  assert.match(home, /<title>Scrobble\.dev — a field guide to scrobbling<\/title>/);
  assert.match(home, /<link rel="canonical" href="https:\/\/scrobble\.dev\/">/);
  assert.match(home, /Eight rules for exchanging scrobbles/);
  assert.match(home, /Compare 17 scrobbling projects/);
  assert.match(projects, /Scrobbling projects, compared by what they record\./);
  assert.match(projects, /Filter project catalogue/);
  assert.match(projects, /Open Knowledge Format v0\.2/);
  assert.match(projects, /data-sort="name"/);
  assert.match(projects, /"@type":"Dataset"/);
  assert.match(projects, /"@type":"ItemList"/);
  assert.match(faq, /Why is anime its own media type\?/);
  assert.match(faq, /Nuvio Mobile is an application/);
  assert.doesNotMatch(projects, /SitesWiki|OpenWiki/);
  assert.match(llms, /Project catalogue in OKF v0\.2 Markdown/);
  assert.match(catalogue, /Movary Kodi add-on/);
  assert.equal(JSON.parse(json).projects.length, PROJECTS.length);
  assert.equal(csv.trim().split('\n').length, PROJECTS.length + 1);

  for (const html of [home, projects, faq]) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert.ok(blocks.length >= 3);
  }
});

test('filters by media, role and source availability', () => {
  assert.deepEqual(filterProjects(PROJECTS, { media: 'Film', role: 'Connector', source: 'Open source' }).map(({ name }) => name), ['Movary Kodi add-on']);
  assert.equal(filterProjects(PROJECTS, { media: 'Books' }).length, 2);
  assert.equal(filterProjects(PROJECTS, { source: 'Source not published' }).length, 4);
  assert.deepEqual(sortProjects(PROJECTS, 'name').slice(0, 3).map(({ name }) => name), ['Floppy', 'FloppyDesktop', 'Last.fm']);
  assert.deepEqual(sortProjects(PROJECTS, 'name', 'desc').slice(0, 2).map(({ name }) => name), ['WeTrakr', 'Web Scrobbler']);
});

test('ships an OKF v0.2 conformant knowledge bundle', async () => {
  const root = new URL('../dist/knowledge/', import.meta.url);
  const files = (await readdir(root, { recursive: true })).filter((name) => name.endsWith('.md'));
  for (const name of files) {
    const content = await readFile(new URL(name, root), 'utf8');
    assert.match(content, /^---\n[\s\S]*?\n---\n/, `${name} needs YAML frontmatter`);
    if (name === 'index.md') assert.match(content, /^---\nokf_version: "0\.2"\n---/);
    else assert.match(content.slice(4, content.indexOf('\n---\n', 4)), /(^|\n)type:\s*\S/, `${name} needs a non-empty type`);
  }
});
