# Nikki's Toolbox — parallel Cloudflare edition

This branch builds a separate Cloudflare-hosted Toolbox. It must never replace or redirect the existing Vercel Toolbox.

## Parallel hosting contract

- Existing `main` branch -> existing Vercel Toolbox, unchanged.
- `cloudflare-pages-prep` -> source for the future separate `nikkis-toolbox-cloudflare` repository.
- Cloudflare project name: `nikkis-toolbox-cloudflare`.
- Intended Toolbox URL: `https://nikkis-toolbox-cloudflare.pages.dev`.
- Build command: `node scripts/build-cloudflare.mjs`.
- Output directory: `cloudflare-dist`.

## Card URL behavior

`cloudflare-apps.js` is injected only into the Cloudflare build output. It rewrites owned app cards to their Cloudflare deployments while leaving the Vercel source HTML untouched.

Pages projects use deterministic `https://<project>.pages.dev` URLs once those project names are created. Full-stack Next.js apps use Workers/OpenNext and their final `workers.dev` URL cannot be written until Cloudflare assigns the account subdomain. Those entries remain marked pending in the registry until deployment verification.

## Apps that intentionally do not move

- Open Design remains the local-network URL because it runs on the home PC.
- World Monitor remains its external public URL because it is not an owned deployment.

## Cutover rule

Do not replace any Vercel URL or delete any Vercel project. The Cloudflare Toolbox and every Cloudflare app run in parallel. Add a Cloudflare app URL to the registry only after that deployment passes its own verification checklist.
