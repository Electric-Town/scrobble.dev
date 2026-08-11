import { PROJECTS } from '../data/projects.mjs';

export const prerender = true;

const quote = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export function GET() {
  const rows = PROJECTS.map((project) => [project.name, project.media.join('|'), project.role, project.capture, project.source, project.license, project.url, project.repository, project.contribute].map(quote).join(','));
  return new Response(['name,media,role,capture,source,license,url,repository,contribute', ...rows].join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' }
  });
}
