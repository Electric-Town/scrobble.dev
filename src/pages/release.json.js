const commit = process.env.SCROBBLE_RELEASE_SHA || process.env.GITHUB_SHA || 'development';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify({ commit, repository: 'https://github.com/Electric-Town/scrobble.dev' }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
