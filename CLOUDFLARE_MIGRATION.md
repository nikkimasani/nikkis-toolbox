# Cloudflare copy deployment

This branch is a Cloudflare staging copy. Do not merge it into `main`; the existing Vercel deployment remains live.

## Cloudflare Pages settings
- Build command: `node scripts/build-cloudflare.mjs`
- Build output directory: `cloudflare-dist`

The build script copies only deployable launcher assets and excludes Vercel serverless source, environment files, repository tooling and Cloudflare staging files.

## Migration behavior
The initial Cloudflare Toolbox copy should continue pointing at the existing Vercel app URLs. Individual card URLs should be changed to Cloudflare only after each corresponding Cloudflare app has been deployed and verified.

This gives every app an independent rollback path and prevents a failed migration from taking the entire Toolbox offline.

## Verification
1. Launcher loads on mobile and desktop.
2. Search/filter/recent-app controls work.
3. Existing app cards still open the Vercel deployments.
4. Tab behavior works for apps intended to open inside the Toolbox.
5. PWA manifest, icons and service worker load.
6. No `/api` source files are present in the published output.
7. Replace app URLs one at a time only after the new Cloudflare destination passes verification.

Keep the Vercel Toolbox deployment alive after the Cloudflare copy is published.
