# Deployment

**Current state (2026-11-16):** public repository https://github.com/samijturunen01/valolux-demo. Every push to `main` deploys the demo preview to https://samijturunen01.github.io/valolux-demo/ via `.github/workflows/pages.yml` (sub-path build, indexing OFF, demo notices and mock form adapter still active). No custom domain, DNS change or secret has been set up.

## What the build already does for static hosting

`npm run build` = type check → `vite build` → `scripts/postbuild.mjs`, which:

- writes `dist/<route>/index.html` for every route, each with its own title, description and Open Graph tags, so deep links return HTTP 200 with correct metadata;
- writes `dist/404.html`. GitHub Pages serves it for unknown URLs, and the app renders its own 404 view;
- writes `robots.txt` with **Disallow: /** and keeps `<meta name="robots" content="noindex, nofollow">` unless `ALLOW_INDEXING=true`;
- writes `sitemap.xml`, canonical links and `og:url` when `SITE_URL` is set;
- adds `.nojekyll`.

Build settings (environment variables, see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `BASE_PATH` | `/` for a custom domain; `/<repo>/` for a project site such as `user.github.io/valolux/` |
| `SITE_URL` | Absolute URL for canonical links, `og:url` and the sitemap |
| `ALLOW_INDEXING` | `true` only for the approved, official launch |

The sub-path build (`BASE_PATH=/valolux/`) was tested locally against a server that mimics GitHub Pages: trailing-slash redirects, deep links, hash links, 404 status and asset paths all worked.

Requires Node ≥ 22.18, because the build scripts import small `.ts` data modules directly.

## Demo preview on GitHub Pages (done)

1. Create a **private** repository and push the project (`dist/` and `node_modules/` are git-ignored).
2. Add a workflow that runs `npm ci && BASE_PATH=/<repo>/ npm run build` and publishes `dist/` with `actions/upload-pages-artifact` + `actions/deploy-pages`.
3. Keep `ALLOW_INDEXING` unset for previews. Note that a Pages site is public even when the repository is private. Use an unguessable repository name or a host with access control if the preview must stay private.

## Steps for the official launch (when the client approves)

1. Resolve the open questions in `docs/RESEARCH.md` and replace the traced logo with original artwork.
2. Implement Apps Script and reCAPTCHA (`docs/INTEGRATIONS.md`) and remove the demo notices.
3. Build with `BASE_PATH=/ SITE_URL=https://<domain> ALLOW_INDEXING=true`.
4. Configure the custom domain in GitHub Pages (`CNAME`), then update DNS at the registrar. **This is the step that makes the site official.** Do it only with the client.
5. Enforce HTTPS, then check with Lighthouse and Search Console.
