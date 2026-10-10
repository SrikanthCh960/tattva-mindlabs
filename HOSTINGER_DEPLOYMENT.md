# Tattva Mindlabs on Hostinger

Use Hostinger's Node.js Web App GitHub integration with the repository `SrikanthCh960/tattva-mindlabs`.

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Framework | Next.js |
| Root directory | Repository root (`./`) |
| Node.js | 24.x; compatible with Hostinger's 24.6.0 runtime |
| Package manager | npm |
| Build command | `npm run build` |
| Start command | `npm start` |
| Output directory, when requested | `.next/standalone` |
| Entry file, relative to the output directory | `server.js` |
| Application port | 3000 by default; the server also honors `PORT` |
| Environment variables | No application secrets or `.env` file are required |

The build prepares a standalone Next.js server and copies `public/` and `.next/static/` into it so the website's photos, logos, fonts, CSS and JavaScript are included.

Production builds explicitly use Webpack, enable its memory optimizations and limit page generation to two workers. These settings reduce build resource use on managed hosting. The test environment is pinned to `jsdom` 29.1.1, and the lockfile supports Node 24.6.0. Changing the `engines` declaration alone does not change dependency requirements.

Install build dependencies as well as runtime dependencies. Tailwind's PostCSS plugin and TypeScript are needed during the build. A clean local check is:

```sh
npm ci
npm run build
npm start
```

The root start command runs `node .next/standalone/server.js`. If a host starts directly inside the standalone output directory, its equivalent entry command is `node server.js`.

For a host that serves static files, use `npm run build:static` and output directory `out` instead. This mode cannot be started with `next start`.

Node engine warnings from the old dependency install are not enough to identify a failed build. If a deployment fails, the final Next.js error or stack trace in the full build log is needed. A successful local build is not proof that a Hostinger deployment has succeeded.
