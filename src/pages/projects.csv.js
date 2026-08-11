import { PROJECTS } from '../data/projects.mjs';

export const prerender = true;

const quote = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export function GET() {
  const rows = PROJECTS.map((project) => [
    project.id, project.name, project.summary, project.media.join('|'), project.category, project.capture,
    project.sourceState, project.license, project.lifecycle, project.checkedAt,
    project.url, project.repository, project.contribute, project.sources[0].url
  ].map(quote).join(','));
  return new Response(['id,name,summary,media,category,capture,source_state,license,lifecycle,checked_at,url,repository,contribute,primary_source', ...rows].join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' }
  });
}
