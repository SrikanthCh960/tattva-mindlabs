# Tattva Mindlabs: local setup and Git

This repository contains the complete website, including the updated About Tattva homepage section, all pages, images, fonts, animations, forms and tests.

## 1. Run on your computer

Install Node.js 24.6.0 or newer in the 24.x series, with npm. The included `.nvmrc` pins 24.6.0, and the lockfile's test dependencies support that version. Clone the repository or extract the project, open a terminal in the `tattva-mindlabs` folder, and run:

```sh
npm ci
npm run dev
```

Open http://localhost:4173 in your browser. Stop the development server with Ctrl+C.

The application uses local images and fonts. No API key or environment file is required for the current website. Interview playback uses YouTube, and contact forms prepare WhatsApp/email messages for the visitor to review and send.

## 2. Build the website

```sh
npm run build
```

The default production build creates a standalone Node.js server in `.next/standalone/`. It includes the local images, fonts, JavaScript and CSS. Start it with `npm start`. For Hostinger GitHub deployment, see [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md).

To generate a static site instead, run `npm run build:static`. This writes the production files to `out/`; serve that directory directly. The static export does not use `npm start`.

If Python 3 is installed, you can preview the included static site with:

```sh
python3 -m http.server 4173 --directory out
```

Then open http://localhost:4173. Upload the contents of `out/` to a static web host when deploying elsewhere.

## 3. Push to your Git repository

Install Git and create an empty repository with your Git provider. In the extracted `tattva-mindlabs` folder, run:

```sh
git init
git add .
git commit -m "Initial Tattva Mindlabs website"
git branch -M main
```

Replace `YOUR_REPOSITORY_URL` with the actual repository URL before running:

```sh
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Authenticate with your Git provider when prompted. The included `.gitignore` excludes dependencies, generated build output, environment files and temporary files from Git. This ZIP starts a new repository; the existing hosted repository's Git metadata and credentials are not included.

For future updates:

```sh
git add .
git commit -m "Update website"
git push
```

## 4. Files you will edit most often

| File or folder | Purpose |
| --- | --- |
| `app/` | Page content, metadata and shared styles |
| `components/` | Header, footer, banners, forms and reusable sections |
| `components/home-tattva-feature.tsx` | The latest About Tattva homepage introduction |
| `lib/content.ts` | Brand contact details and service content |
| `lib/navigation.ts` | Navigation content |
| `public/media/` | All website photos, banners, logos and service images |
| `public/fonts/` | Local fonts |
| `next.config.ts` | Standalone server and optional static export configuration |

The original `README.md` contains project notes, content context and verification boundaries. `EXPORT_INFO.json` records the source revision used for this download. The existing private-review indexing settings remain in `app/layout.tsx`; update the domain and indexing policy when preparing an approved public launch.
