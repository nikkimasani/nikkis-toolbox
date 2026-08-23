import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'cloudflare-dist');
const excluded = new Set([
  '.git', '.github', '.gitignore', '.vercel', '.vercelignore',
  'api', 'functions', 'scripts', 'cloudflare-dist',
  'wrangler.jsonc', 'vercel.json', 'package-lock.json', 'node_modules',
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (excluded.has(entry.name) || entry.name.startsWith('.env')) continue;
  await cp(join(root, entry.name), join(out, entry.name), { recursive: true });
}

console.log('Cloudflare static bundle created in cloudflare-dist');
