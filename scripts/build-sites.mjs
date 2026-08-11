import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(path));
    else files.push(path);
  }
  return files;
}

function routesFor(file) {
  const name = file.replaceAll('\\', '/');
  if (name === 'index.html') return ['/'];
  if (name.endsWith('/index.html')) {
    const route = `/${name.slice(0, -'index.html'.length)}`;
    return [route, route.slice(0, -1)];
  }
  return [`/${name}`];
}

const files = (await filesBelow(root))
  .map((file) => relative(root, file))
  .filter((file) => file !== 'server/index.js')
  .sort();
const routes = {};

for (const file of files) {
  const body = (await readFile(resolve(root, file))).toString('base64');
  const record = { body, type: contentTypes[extname(file)] || 'application/octet-stream' };
  for (const route of routesFor(file)) routes[route] = record;
}

const worker = `const FILES=${JSON.stringify(routes)};
const securityHeaders={
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'X-Content-Type-Options':'nosniff',
  'X-Frame-Options':'DENY'
};
export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD', ...securityHeaders } });
    }
    const path = new URL(request.url).pathname;
    const file = FILES[path];
    if (!file) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store', ...securityHeaders } });
    const headers = { 'Content-Type': file.type, ...securityHeaders };
    headers['Cache-Control'] = path.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=300';
    if (request.method === 'HEAD') return new Response(null, { headers });
    const bytes = Uint8Array.from(atob(file.body), character => character.charCodeAt(0));
    return new Response(bytes, { headers });
  }
};
`;

await mkdir(resolve(root, 'server'), { recursive: true });
await writeFile(resolve(root, 'server/index.js'), worker);
console.log(`Sites bundle contains ${files.length} files across ${Object.keys(routes).length} routes.`);
