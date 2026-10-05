# BizMeUp website

Astro static site with Tailwind CSS. The build brief is in `CLAUDE.md`; the locked homepage design is `homepage-design-reference.html`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local site at http://localhost:4321 |
| `npm run build` | Type check, then build to `dist/` |
| `npm run preview` | Serve the built site |

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `PUBLIC_FORM_ENDPOINT`: Google Apps Script web app URL for the audit form. See `integrations/google-apps-script/README.md`.
- `PUBLIC_GA4_ID`: GA4 measurement ID (`G-...`).
- `PUBLIC_META_PIXEL_ID`: Meta Pixel ID.

Analytics only load when an ID is set.

## Editing content

- **Case studies:** each case is a folder in `src/content/case-studies/` with an `index.md` (copy an existing one), a `hero.webp` (shown in the laptop mockup) and a `full.webp` (opened in the full-page viewer). `featured: true` shows it on the homepage, `order` sets the position.
- **Case study screenshots:** put the original PNGs in `Websites Case Study/` (not deployed), add the case to the list in `scripts/optimise-case-images.mjs`, then run `node scripts/optimise-case-images.mjs`. It trims, resizes and converts them to light WebP files in the case folder; the build then serves AVIF/WebP sized for each screen. The full-page image only downloads when a visitor opens the viewer.
- **Services:** `src/content/services/`. Poster colours and rotations are in `src/config/posters.ts`.
- **Blog posts:** add a Markdown file to `src/content/blog/`.
- **Contact details and WhatsApp number:** `src/config/site.ts`.

Link preview images for every page are generated automatically at build time.
