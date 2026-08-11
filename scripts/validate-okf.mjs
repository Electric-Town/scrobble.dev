#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = resolve(dirname(scriptPath), '..');
const configPath = resolve(repositoryRoot, 'config/okf-v0.2.json');

export const OKF_CONFIG = JSON.parse(await readFile(configPath, 'utf8'));

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const ACTOR = /^(?:human:[^\s]+|process:[^\s]+|[^\s/]+\/[^\s/]+)$/;
const INDEX_ENTRY = /^\s*[*+-]\s+\[[^\]]+\]\([^)]+\)(?:\s+-\s+\S.*)?$/m;

const isMapping = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

function isDate(value) {
  if (!isNonEmptyString(value) || !DATE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isDateTime(value) {
  return isNonEmptyString(value) && DATETIME.test(value) && !Number.isNaN(Date.parse(value));
}

function extractFrontmatter(content) {
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) return null;
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { errors: ['frontmatter is not closed with --- on its own line'] };

  const document = parseDocument(match[1], { prettyErrors: false, uniqueKeys: true });
  if (document.errors.length) {
    return { errors: document.errors.map((error) => `invalid YAML frontmatter: ${error.message}`) };
  }

  const data = document.toJS();
  if (!isMapping(data)) return { errors: ['frontmatter must be a YAML mapping'] };
  return { data, body: content.slice(match[0].length), errors: [] };
}

function markdownOutsideFences(body) {
  const kept = [];
  let fence;
  for (const line of body.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = undefined;
      continue;
    }
    if (!fence) kept.push(line);
  }
  return kept.join('\n');
}

function validateUsageWindow(value, label, errors) {
  if (!isMapping(value) || !isDate(value.from) || !isDate(value.to)) {
    errors.push(`${label} must contain valid YYYY-MM-DD from and to dates`);
    return;
  }
  if (value.from > value.to) errors.push(`${label}.from must not be after ${label}.to`);
}

function validateActor(value, label, errors) {
  if (!isNonEmptyString(value) || !ACTOR.test(value)) {
    errors.push(`${label} must use human:<id>, process:<id>, or <producer>/<version>`);
  }
}

function validateOptionalFamilies(frontmatter, body, errors) {
  if ('tags' in frontmatter && (!Array.isArray(frontmatter.tags) || frontmatter.tags.some((tag) => !isNonEmptyString(tag)))) {
    errors.push('tags must be a YAML list of non-empty strings');
  }

  if ('status' in frontmatter && !['draft', 'stable', 'deprecated'].includes(frontmatter.status)) {
    errors.push('status must be draft, stable, or deprecated');
  }

  if ('stale_after' in frontmatter && !isDate(frontmatter.stale_after)) {
    errors.push('stale_after must be a valid YYYY-MM-DD date');
  }

  if ('generated' in frontmatter) {
    if (!isMapping(frontmatter.generated)) errors.push('generated must be a mapping');
    else {
      validateActor(frontmatter.generated.by, 'generated.by', errors);
      if ('at' in frontmatter.generated && !isDateTime(frontmatter.generated.at)) {
        errors.push('generated.at must be an ISO 8601 datetime');
      }
    }
  }

  if ('verified' in frontmatter) {
    const verifications = Array.isArray(frontmatter.verified) ? frontmatter.verified : [frontmatter.verified];
    if (verifications.length === 0) errors.push('verified must not be an empty list');
    for (const [index, verification] of verifications.entries()) {
      if (!isMapping(verification)) {
        errors.push(`verified[${index}] must be a mapping`);
        continue;
      }
      validateActor(verification.by, `verified[${index}].by`, errors);
      if (!isDateTime(verification.at)) errors.push(`verified[${index}].at must be an ISO 8601 datetime`);
    }
  }

  if ('usage_window' in frontmatter) validateUsageWindow(frontmatter.usage_window, 'usage_window', errors);

  const sourceIds = new Set();
  if ('sources' in frontmatter) {
    if (!Array.isArray(frontmatter.sources) || frontmatter.sources.length === 0) {
      errors.push('sources must be a non-empty list');
    } else {
      for (const [index, source] of frontmatter.sources.entries()) {
        const label = `sources[${index}]`;
        if (!isMapping(source)) {
          errors.push(`${label} must be a mapping`);
          continue;
        }
        if (!isNonEmptyString(source.resource)) errors.push(`${label}.resource is required`);
        if ('id' in source) {
          if (!isNonEmptyString(source.id)) errors.push(`${label}.id must be a non-empty string`);
          else if (sourceIds.has(source.id)) errors.push(`${label}.id duplicates ${source.id}`);
          else sourceIds.add(source.id);
        }
        for (const key of ['title', 'author']) {
          if (key in source && !isNonEmptyString(source[key])) errors.push(`${label}.${key} must be a non-empty string`);
        }
        if ('last_modified' in source && !isDate(source.last_modified)) {
          errors.push(`${label}.last_modified must be a valid YYYY-MM-DD date`);
        }
        if ('usage_window' in source) validateUsageWindow(source.usage_window, `${label}.usage_window`, errors);
        if ('usage_count' in source) {
          if (!Number.isInteger(source.usage_count) || source.usage_count < 0) {
            errors.push(`${label}.usage_count must be a non-negative integer`);
          }
          if (!('usage_window' in source) && !('usage_window' in frontmatter)) {
            errors.push(`${label}.usage_count requires a source or document usage_window`);
          }
        }
      }
    }
  }

  const markdown = markdownOutsideFences(body);
  const definitions = new Set([...markdown.matchAll(/^\[\^([^\]\s]+)\]:/gm)].map((match) => match[1]));
  const references = new Set();
  for (const line of markdown.split('\n')) {
    if (/^\[\^[^\]]+\]:/.test(line)) continue;
    for (const match of line.matchAll(/\[\^([^\]\s]+)\]/g)) references.add(match[1]);
  }
  for (const id of new Set([...definitions, ...references])) {
    if (!sourceIds.has(id)) errors.push(`footnote ${id} must match a sources[].id`);
  }
  for (const id of references) {
    if (!definitions.has(id)) errors.push(`footnote ${id} is referenced without a definition`);
  }
}

function computationSection(body) {
  const heading = body.match(/^# Computation\s*$/m);
  if (!heading) return '';
  const remainder = body.slice(heading.index + heading[0].length);
  const nextHeading = remainder.search(/^#\s+\S/m);
  return nextHeading === -1 ? remainder : remainder.slice(0, nextHeading);
}

function validateAttestedComputation(frontmatter, body, errors) {
  if (frontmatter.type !== 'Attested Computation') return;
  if (!isNonEmptyString(frontmatter.runtime)) errors.push('Attested Computation runtime is required');

  if ('parameters' in frontmatter) {
    if (!Array.isArray(frontmatter.parameters)) errors.push('parameters must be a list');
    else {
      const names = new Set();
      for (const [index, parameter] of frontmatter.parameters.entries()) {
        const label = `parameters[${index}]`;
        if (!isMapping(parameter)) {
          errors.push(`${label} must be a mapping`);
          continue;
        }
        if (!isNonEmptyString(parameter.name)) errors.push(`${label}.name is required`);
        else if (names.has(parameter.name)) errors.push(`${label}.name duplicates ${parameter.name}`);
        else names.add(parameter.name);
        if (!isNonEmptyString(parameter.type)) errors.push(`${label}.type is required`);
        if (typeof parameter.required !== 'boolean') errors.push(`${label}.required must be boolean`);
      }
    }
  }

  const section = computationSection(body);
  const hasInlineComputation = /(^|\n)(?:\s{4}\S|\s*(`{3,}|~{3,}))/m.test(section);
  if ('computation' in frontmatter) {
    if (!isNonEmptyString(frontmatter.computation)) errors.push('computation must be a non-empty path');
    if (hasInlineComputation) errors.push('Attested Computation must use either computation or an inline computation, not both');
  } else if (!hasInlineComputation) {
    errors.push('Attested Computation needs an inline # Computation code block or computation path');
  }

  if ('executor' in frontmatter) {
    const executor = frontmatter.executor;
    if (!isMapping(executor)) errors.push('executor must be a mapping');
    else {
      if (!isNonEmptyString(executor.resource)) errors.push('executor.resource is required');
      if ('receipt' in executor && (!Array.isArray(executor.receipt) || executor.receipt.length === 0 || executor.receipt.some((field) => !isNonEmptyString(field)))) {
        errors.push('executor.receipt must be a non-empty list of strings');
      }
    }
  }

  if ('attester' in frontmatter) {
    if (!isMapping(frontmatter.attester)) errors.push('attester must be a mapping');
    else if (!isNonEmptyString(frontmatter.attester.resource)) errors.push('attester.resource is required');
  }
}

function validateConcept(content, errors) {
  const parsed = extractFrontmatter(content);
  if (!parsed) {
    errors.push('concept is missing YAML frontmatter');
    return;
  }
  if (parsed.errors.length) {
    errors.push(...parsed.errors);
    return;
  }
  if (!isNonEmptyString(parsed.data.type)) errors.push('concept type must be a non-empty string');
  validateOptionalFamilies(parsed.data, parsed.body, errors);
  validateAttestedComputation(parsed.data, parsed.body, errors);
}

function validateIndex(content, isRoot, version, errors) {
  const parsed = extractFrontmatter(content);
  let body = content;
  if (parsed) {
    if (!isRoot) {
      errors.push('only the bundle-root index.md may contain frontmatter');
      return;
    }
    if (parsed.errors.length) {
      errors.push(...parsed.errors);
      return;
    }
    const keys = Object.keys(parsed.data);
    if (keys.some((key) => key !== 'okf_version')) errors.push('root index.md frontmatter may contain only okf_version');
    if ('okf_version' in parsed.data && parsed.data.okf_version !== version) {
      errors.push(`root index.md okf_version must be ${version}`);
    }
    body = parsed.body;
  }
  if (!/^#(?!#)\s+\S/m.test(body)) errors.push('index.md needs at least one section heading');
  if (!INDEX_ENTRY.test(body)) errors.push('index.md needs at least one linked list entry');
}

function validateLog(content, errors) {
  if (extractFrontmatter(content)) errors.push('log.md must not contain frontmatter');
  if (!/^#(?!#)\s+\S/m.test(content)) errors.push('log.md needs a title heading');
  const headings = [...content.matchAll(/^##\s+(.+)\s*$/gm)].map((match) => match[1].trim());
  if (headings.length === 0) {
    errors.push('log.md needs at least one YYYY-MM-DD section');
    return;
  }
  for (const heading of headings) {
    if (!isDate(heading)) errors.push(`log.md date heading must be YYYY-MM-DD: ${heading}`);
  }
  const valid = headings.filter(isDate);
  for (let index = 1; index < valid.length; index += 1) {
    if (valid[index - 1] < valid[index]) errors.push('log.md date sections must be newest first');
  }
  const sections = content.split(/^##\s+.+\s*$/gm).slice(1);
  for (const [index, section] of sections.entries()) {
    if (!/^\s*[*+-]\s+\S/m.test(section)) errors.push(`log.md section ${index + 1} needs a list entry`);
  }
}

async function markdownFiles(root) {
  const files = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
    }
  }
  await visit(root);
  return files.sort();
}

export async function validateOkfBundle(bundlePath, config = OKF_CONFIG) {
  const root = resolve(bundlePath instanceof URL ? fileURLToPath(bundlePath) : bundlePath);
  const files = await markdownFiles(root);
  const errors = [];
  const decoder = new TextDecoder('utf-8', { fatal: true });

  for (const file of files) {
    const name = relative(root, file).split(sep).join('/');
    const fileErrors = [];
    let content;
    try {
      content = decoder.decode(await readFile(file));
    } catch (error) {
      fileErrors.push(`not valid UTF-8: ${error.message}`);
    }
    if (content !== undefined) {
      const basename = name.split('/').at(-1);
      if (basename === 'index.md') validateIndex(content, name === 'index.md', config.version, fileErrors);
      else if (basename === 'log.md') validateLog(content, fileErrors);
      else validateConcept(content, fileErrors);
    }
    errors.push(...fileErrors.map((error) => `${name}: ${error}`));
  }

  return { errors, files: files.length };
}

if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  const bundle = resolve(repositoryRoot, process.argv[2] ?? OKF_CONFIG.bundle);
  const result = await validateOkfBundle(bundle);
  if (result.errors.length) {
    console.error(`OKF v${OKF_CONFIG.version} validation failed:`);
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`OKF v${OKF_CONFIG.version} validated ${result.files} Markdown files against ${OKF_CONFIG.upstream_revision}.`);
  }
}
