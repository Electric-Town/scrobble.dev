import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { filterProjects, PROJECTS, sortProjects } from '../src/data/projects.mjs';

const dist = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('builds the knowledge-first field guide and catalogue', async () => {
  const [home, learn, lifecycle, build, projects, faq, draft, about, llms, catalogue, json, csv] = await Promise.all([
    dist('index.html'),
    dist('learn/index.html'),
    dist('learn/lifecycle/index.html'),
    dist('build/index.html'),
    dist('projects/index.html'),
    dist('faq/index.html'),
    dist('standard/index.html'),
    dist('about/index.html'),
    dist('llms.txt'),
    dist('knowledge/projects.md'),
    dist('projects.json'),
    dist('projects.csv')
  ]);

  assert.match(home, /A scrobble is a durable record/);
  assert.match(home, /I use trackers/);
  assert.match(home, /I build trackers/);
  assert.match(learn, /Start with the record\. Then choose the tool/);
  assert.match(lifecycle, /When does media activity become history/);
  assert.match(build, /Record enough context to retry, correct and export/);
  assert.match(projects, /Search projects/);
  assert.match(projects, /More filters/);
  assert.match(projects, /Reset all/);
  assert.match(projects, /pinned v0\.2 specification/);
  assert.match(faq, /Why is anime a separate catalogue facet/);
  assert.match(draft, /not an adopted industry standard/);
  assert.match(about, /A maintained reference for scrobbling and media activity/);
  assert.match(llms, /Open Knowledge Format project/);
  assert.match(llms, /Pinned OKF v0\.2 specification/);
  assert.match(catalogue, /Movary Kodi add-on/);

  const parsed = JSON.parse(json);
  assert.equal(parsed.projects.length, PROJECTS.length);
  assert.equal(new Set(parsed.projects.map(({ id }) => id)).size, PROJECTS.length);
  assert.equal(csv.trim().split('\n').length, PROJECTS.length + 1);

  for (const html of [home, learn, lifecycle, build, projects, faq, draft, about]) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert.ok(blocks.length >= 2);
  }
});

test('filters and sorts the evidence registry without changing its source', () => {
  assert.deepEqual(
    filterProjects(PROJECTS, { media: 'Film', category: 'Connector', sourceState: 'Open source' }).map(({ name }) => name),
    ['Movary Kodi add-on']
  );
  assert.equal(filterProjects(PROJECTS, { media: 'Books' }).length, 2);
  assert.equal(filterProjects(PROJECTS, { sourceState: 'No public source repository verified' }).length, 4);
  assert.deepEqual(filterProjects(PROJECTS, { query: 'self-hosted' }).map(({ name }) => name), ['Floppy', 'FloppyDesktop', 'multi-scrobbler', 'Maloja', 'Movary']);
  assert.deepEqual(sortProjects(PROJECTS, 'name').slice(0, 3).map(({ name }) => name), ['Floppy', 'FloppyDesktop', 'Last.fm']);
  assert.deepEqual(sortProjects(PROJECTS, 'name', 'desc').slice(0, 2).map(({ name }) => name), ['WeTrakr', 'Web Scrobbler']);
  assert.deepEqual(PROJECTS.map(({ id }) => id), [...PROJECTS].map(({ id }) => id));
});

test('keeps catalogue distributions and visible structured data in parity', async () => {
  const [projectsHtml, catalogue, json, csv] = await Promise.all([
    dist('projects/index.html'),
    dist('knowledge/projects.md'),
    dist('projects.json'),
    dist('projects.csv')
  ]);
  const parsed = JSON.parse(json);
  const csvIds = csv.trim().split('\n').slice(1).map((line) => line.match(/^"([^"]+)"/)?.[1]);

  assert.deepEqual(parsed.projects.map(({ id }) => id), PROJECTS.map(({ id }) => id));
  assert.deepEqual(csvIds, PROJECTS.map(({ id }) => id));
  for (const project of PROJECTS) {
    assert.match(projectsHtml, new RegExp(`data-id="${project.id}"`));
    assert.match(catalogue, new RegExp(`\\| ${project.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|`));
  }

  const blocks = [...projectsHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const itemList = blocks.find((block) => block['@type'] === 'ItemList');
  const dataset = blocks.find((block) => block['@type'] === 'Dataset');
  assert.equal(itemList.numberOfItems, PROJECTS.length);
  assert.equal(dataset.version, '0.3');
  assert.equal(dataset.dateModified, parsed.checkedAt);
});
