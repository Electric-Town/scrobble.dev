import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { OKF_CONFIG, validateOkfBundle } from '../scripts/validate-okf.mjs';

async function withBundle(files, run) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'scrobble-okf-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      const target = path.join(root, name);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, content);
    }
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

const concept = `---
type: Reference
title: Retry behavior
status: stable
stale_after: 2026-12-01
generated: { by: process:test, at: 2026-08-11T12:00:00Z }
verified: { by: human:reviewer, at: 2026-08-11T13:00:00Z }
usage_window: { from: 2026-08-01, to: 2026-08-11 }
sources:
  - id: protocol
    resource: https://example.test/protocol
    usage_count: 3
---
# Retry behavior

Retries preserve logical event identity.[^protocol]

[^protocol]: Protocol documentation
`;

test('pins the upstream OKF v0.2 specification and section URLs', () => {
  assert.equal(OKF_CONFIG.upstream_revision, '374e0bc4c644310ff56cdf9c0fe81eccdec862b0');
  assert.match(OKF_CONFIG.specification, new RegExp(OKF_CONFIG.upstream_revision));
  assert.deepEqual(Object.keys(OKF_CONFIG.sections), ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  for (const url of Object.values(OKF_CONFIG.sections)) {
    assert.match(url, new RegExp(`/${OKF_CONFIG.upstream_revision}/`));
    assert.match(url, /#L\d+-L\d+$/);
  }
});

test('validates the repository knowledge bundle', async () => {
  const result = await validateOkfBundle(new URL('../public/knowledge/', import.meta.url));
  assert.deepEqual(result.errors, []);
  assert.ok(result.files >= 7);
});

test('accepts minimal concepts, unknown fields, broken links and valid reserved files', async () => {
  await withBundle({
    'index.md': `---\nokf_version: "0.2"\n---\n# Concepts\n\n* [Retry](retry.md)\n`,
    'retry.md': concept,
    'minimal.md': `---\ntype: Future Type\nproducer_extension: true\n---\nSee [a future concept](missing.md).\n`,
    'history/log.md': `# Update log\n\n## 2026-08-11\n* Added retry guidance.\n\n## 2026-08-10\n* Initialized the bundle.\n`
  }, async (root) => {
    assert.deepEqual((await validateOkfBundle(root)).errors, []);
  });
});

test('rejects invalid required and reserved structures', async () => {
  const cases = [
    ['missing frontmatter', { 'bad.md': '# No metadata\n' }, 'missing YAML frontmatter'],
    ['invalid YAML', { 'bad.md': '---\ntype: [\n---\n# Bad\n' }, 'invalid YAML frontmatter'],
    ['empty type', { 'bad.md': '---\ntype: ""\n---\n# Bad\n' }, 'type must be a non-empty string'],
    ['nested index frontmatter', { 'nested/index.md': '---\nokf_version: "0.2"\n---\n# Bad\n* [Bad](bad.md)\n' }, 'only the bundle-root'],
    ['root index extension', { 'index.md': '---\nokf_version: "0.2"\nextra: true\n---\n# Bad\n* [Bad](bad.md)\n' }, 'may contain only okf_version'],
    ['wrong version', { 'index.md': '---\nokf_version: "0.1"\n---\n# Bad\n* [Bad](bad.md)\n' }, 'okf_version must be 0.2'],
    ['index without entries', { 'index.md': '# Empty\n' }, 'linked list entry'],
    ['log frontmatter', { 'log.md': '---\ntype: Log\n---\n# Log\n## 2026-08-11\n* Changed.\n' }, 'must not contain frontmatter'],
    ['log date format', { 'log.md': '# Log\n## August 11\n* Changed.\n' }, 'date heading must be YYYY-MM-DD'],
    ['log order', { 'log.md': '# Log\n## 2026-08-10\n* Older.\n## 2026-08-11\n* Newer.\n' }, 'newest first']
  ];

  for (const [label, files, expected] of cases) {
    await withBundle(files, async (root) => {
      const result = await validateOkfBundle(root);
      assert.ok(result.errors.some((error) => error.includes(expected)), `${label}: ${result.errors.join('; ')}`);
    });
  }
});

test('rejects malformed optional provenance, trust and lifecycle families', async () => {
  const cases = [
    ['tags', 'tags: scrobbling', 'tags must be a YAML list'],
    ['status', 'status: current', 'status must be draft, stable, or deprecated'],
    ['staleness', 'stale_after: 2026-02-30', 'stale_after must be a valid'],
    ['generated actor', 'generated: { by: editor, at: 2026-08-11T12:00:00Z }', 'generated.by must use'],
    ['generated time', 'generated: { by: process:test, at: yesterday }', 'generated.at must be'],
    ['verified', 'verified: [{ by: human:reviewer }]', 'verified[0].at must be'],
    ['source shape', 'sources: [{ id: source }]', 'sources[0].resource is required'],
    ['source id', 'sources: [{ id: source, resource: one }, { id: source, resource: two }]', 'duplicates source'],
    ['usage count', 'sources: [{ resource: source, usage_count: 1 }]', 'requires a source or document usage_window']
  ];

  for (const [label, field, expected] of cases) {
    await withBundle({ 'bad.md': `---\ntype: Reference\n${field}\n---\n# Bad\n` }, async (root) => {
      const result = await validateOkfBundle(root);
      assert.ok(result.errors.some((error) => error.includes(expected)), `${label}: ${result.errors.join('; ')}`);
    });
  }
});

test('joins per-claim footnotes to source IDs', async () => {
  await withBundle({
    'bad.md': `---\ntype: Reference\nsources: [{ id: documented, resource: https://example.test }]\n---\nA claim.[^missing]\n\n[^missing]: Missing source\n`
  }, async (root) => {
    const result = await validateOkfBundle(root);
    assert.ok(result.errors.some((error) => error.includes('footnote missing must match a sources[].id')));
  });

  await withBundle({
    'bad.md': `---\ntype: Reference\nsources: [{ id: documented, resource: https://example.test }]\n---\nA claim.[^documented]\n`
  }, async (root) => {
    const result = await validateOkfBundle(root);
    assert.ok(result.errors.some((error) => error.includes('referenced without a definition')));
  });
});

test('validates Attested Computation contract shapes', async () => {
  const valid = `---
type: Attested Computation
runtime: python
parameters:
  - { name: account, type: string, required: true }
executor:
  resource: references/run.md
  receipt: [result]
attester:
  resource: references/check.py
---
# Computation

\`\`\`python
print(account)
\`\`\`
`;
  await withBundle({ 'valid.md': valid }, async (root) => {
    assert.deepEqual((await validateOkfBundle(root)).errors, []);
  });
  await withBundle({
    'valid.md': valid.replace(/# Computation[\s\S]*/, '# Definition\nStored separately.\n').replace('parameters:', 'computation: references/check.py\nparameters:')
  }, async (root) => {
    assert.deepEqual((await validateOkfBundle(root)).errors, []);
  });

  const cases = [
    ['runtime', valid.replace('runtime: python\n', ''), 'runtime is required'],
    ['computation', valid.replace(/# Computation[\s\S]*/, '# Definition\nNo executable form.\n'), 'needs an inline # Computation'],
    ['parameter', valid.replace('required: true', 'required: yes'), 'required must be boolean'],
    ['executor', valid.replace('resource: references/run.md', 'resource: ""'), 'executor.resource is required'],
    ['attester', valid.replace('resource: references/check.py', 'resource: ""'), 'attester.resource is required'],
    ['two computation forms', valid.replace('parameters:', 'computation: references/check.py\nparameters:'), 'not both']
  ];
  for (const [label, content, expected] of cases) {
    await withBundle({ 'bad.md': content }, async (root) => {
      const result = await validateOkfBundle(root);
      assert.ok(result.errors.some((error) => error.includes(expected)), `${label}: ${result.errors.join('; ')}`);
    });
  }
});
