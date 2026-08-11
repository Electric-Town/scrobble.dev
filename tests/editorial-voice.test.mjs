import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const dist = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const machineTells = /\b(?:delve|tapestry|pivotal|leverage|foster|unleash|harness|seamless(?:ly)?)\b|unlock the power|in today's digital world|navigate the complexities/iu;

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('keeps the editorial narrator concrete, varied and aligned across public surfaces', async () => {
  const [home, learn, build, faq, contribute, llms, expanded, concept] = await Promise.all([
    dist('index.html'),
    dist('learn/index.html'),
    dist('build/index.html'),
    dist('faq/index.html'),
    dist('contribute/index.html'),
    dist('llms.txt'),
    dist('llms-full.txt'),
    dist('knowledge/concepts/scrobbling.md')
  ]);

  assert.match(home, /Your media history should outlast the app that recorded it/);
  assert.match(home, /A scrobble is a durable record of what you watched, read, heard or played, and when/);
  assert.match(home, /The playhead moves every second\. History has to make sense tomorrow/);
  assert.match(home, /A page is not a second/);
  assert.match(learn, /Project names can wait/);
  assert.match(build, /did the system preserve the event, or invent a second one/);
  assert.match(faq, /Start with the practical difference/);
  assert.match(contribute, /Bring evidence to the guide/);

  const publicCopy = [visibleText(home), visibleText(learn), visibleText(build), visibleText(faq), visibleText(contribute), llms, expanded, concept].join('\n');
  assert.doesNotMatch(publicCopy, machineTells);
  assert.doesNotMatch(publicCopy, /\bit(?:'s| is) not [^.]{1,80}, it(?:'s| is) [^.]{1,80}/iu);

  const sentenceLengths = visibleText(home)
    .split(/[.!?]+\s+/)
    .map((sentence) => sentence.trim().split(/\s+/).filter(Boolean).length)
    .filter(Boolean);
  assert.ok(sentenceLengths.some((length) => length <= 6), 'homepage needs short sentences for cadence');
  assert.ok(sentenceLengths.some((length) => length >= 18), 'homepage needs longer sentences for cadence');
});
