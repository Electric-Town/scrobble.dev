import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { CATALOGUE_CHECKED_AT, PROJECTS } from '../src/data/projects.mjs';

const publicRoot = new URL('../public/', import.meta.url);

function yamlString(value) {
  return JSON.stringify(value);
}

function projectCatalogueMarkdown() {
  const sourceEntries = PROJECTS.flatMap((project) => project.sources.map((item) => ({ ...item, projectId: project.id })));
  const frontmatter = [
    '---',
    'type: Dataset',
    'title: Scrobbling project catalogue',
    'description: Source-linked descriptions of scrobbling services, trackers, clients and connectors.',
    'resource: https://scrobble.dev/projects/',
    'tags: [scrobbling, media-tracking, projects]',
    'status: stable',
    'stale_after: 2026-11-11',
    `generated: { by: process:scrobble-dev-generate, at: ${CATALOGUE_CHECKED_AT}T23:00:00Z }`,
    `verified: { by: process:project-source-review, at: ${CATALOGUE_CHECKED_AT}T23:00:00Z }`,
    'sources:',
    ...sourceEntries.map((item) => `  - { id: ${item.projectId}-${item.id}, resource: ${yamlString(item.url)}, title: ${yamlString(item.title)}, retrieved_at: ${item.checkedAt} }`),
    '---'
  ];

  const rows = PROJECTS.map((project) => {
    const sourceId = `${project.id}-${project.sources[0].id}`;
    const license = project.license ?? 'No licence verified';
    return `| ${project.name} | ${project.media.join(', ')} | ${project.category} | ${project.capture} | ${project.sourceState} | ${license} | ${project.lifecycle} | ${project.checkedAt} | [Source][^${sourceId}] · [Contribute](${project.contribute}) |`;
  });

  const footnotes = sourceEntries.map((item) => `[^${item.projectId}-${item.id}]: [${item.title}](${item.url}), checked ${item.checkedAt}.`);

  return `${frontmatter.join('\n')}

# Scrobbling project catalogue

This catalogue records what each project's own documentation or repository described when checked on ${CATALOGUE_CHECKED_AT}. Inclusion is not an endorsement. \`Unknown\` means the checked source did not establish a lifecycle state.

| Project | Media | Category | Capture | Source state | Licence | Lifecycle | Checked | Evidence and contribution |
|---|---|---|---|---|---|---|---|---|
${rows.join('\n')}

## Distributions

- [Human catalogue](https://scrobble.dev/projects/)
- [JSON](https://scrobble.dev/projects.json)
- [CSV](https://scrobble.dev/projects.csv)
- [Open Knowledge Format v0.2 project](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
- [Open Knowledge Format v0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/374e0bc4c644310ff56cdf9c0fe81eccdec862b0/okf/SPEC.md)

## Sources

${footnotes.join('\n')}
`;
}

export async function generatePublic() {
  const knowledge = new URL('knowledge/', publicRoot);
  await mkdir(knowledge, { recursive: true });
  await writeFile(new URL('projects.md', knowledge), projectCatalogueMarkdown());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await generatePublic();
