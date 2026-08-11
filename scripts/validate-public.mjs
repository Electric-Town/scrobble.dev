import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const config = JSON.parse(await readFile(new URL('config/public-scope.json', root), 'utf8'));
const extensions = new Set(['.html', '.json', '.csv', '.md', '.txt', '.xml']);

async function filesBelow(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await filesBelow(new URL(`${entry.name}/`, directory), relative));
    else if (extensions.has(entry.name.slice(entry.name.lastIndexOf('.')))) files.push(relative);
  }
  return files;
}

export function findScopeHits(content, rules = config.rules) {
  return rules.filter((rule) => new RegExp(rule.pattern, 'iu').test(content)).map((rule) => rule.id);
}

export async function validatePublic(directory = new URL('dist/', root)) {
  const failures = [];
  for (const name of await filesBelow(directory)) {
    const content = await readFile(new URL(name, directory), 'utf8');
    const hits = findScopeHits(content);
    if (hits.length) failures.push(`${name}: ${hits.join(', ')}`);
  }
  if (failures.length) throw new Error(`Public scope validation failed:\n${failures.join('\n')}`);
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await validatePublic();
  console.log('Public scope validation passed.');
}
