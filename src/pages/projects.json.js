import { PROJECTS } from '../data/projects.mjs';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify({ name: 'Scrobbling project catalogue', version: '0.2', license: 'CC0-1.0', modified: '2026-08-11', projects: PROJECTS }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
