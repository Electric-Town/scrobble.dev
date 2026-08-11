import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const worker = (await import(`../dist/server/index.js?test=${Date.now()}`)).default;

test('serves the validated static build through the Sites worker', async () => {
  const home = await worker.fetch(new Request('https://scrobble.dev/'));
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /^text\/html/);
  assert.match(await home.text(), /A scrobble is a durable record/);

  const release = await worker.fetch(new Request('https://scrobble.dev/release.json'));
  assert.deepEqual(await release.json(), JSON.parse(await readFile('dist/release.json', 'utf8')));

  const head = await worker.fetch(new Request('https://scrobble.dev/projects.json', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');

  assert.equal((await worker.fetch(new Request('https://scrobble.dev/not-a-route'))).status, 404);
  assert.equal((await worker.fetch(new Request('https://scrobble.dev/', { method: 'POST' }))).status, 405);
});
