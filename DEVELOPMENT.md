# Development Notes

## Architecture and layout

This is a static multi-page site. HTML entry pages and deployment/crawler configuration stay at the project root. Shared styling is in `css/styles.css`, interactions are in `js/app.js`, and visual resources are grouped under `assets/brand/`, `assets/gallery/`, `assets/icons/`, `assets/fonts/`, and `assets/maps/`. `scripts/build-site.mjs` assembles the Netlify public output in `dist/`; project notes live in `docs/` and are excluded from that output.

## Runtime behavior

The navigation, theme switch, content filters, tabs, and gallery run in the browser. Contact and enquiry forms validate client-side; no submission endpoint is configured, so they prepare an email draft and do not send messages automatically. `privacy.html` describes this flow; `docs/DATA_HANDLING_POLICY.md` defines internal handling and launch checks. The contact page displays a locally hosted SVG map; it does not call an external map or tile provider. Theme choice is stored in local storage on the visitor's device.

## Local verification

Run from the project root:

```sh
node --check js/app.js
node scripts/build-site.mjs
python -m http.server 8000 --directory dist
```

Also parse `site.webmanifest` as JSON and audit local references from every HTML page, the stylesheet, and the manifest. The build publishes only allowlisted public pages/configuration and web-safe asset types; it copies `_headers` into `dist/` and intentionally excludes `docs/`, Markdown, and build/configuration source files. When an asset moves, update all consumers, including social/structured-data image URLs and static-hosting rules in `_headers`. The current CSP permits same-origin connections only; if an approved form endpoint is added, allow only its origin in `connect-src` and update the privacy notice and operator review. Static checks do not replace testing on the target host and real devices.
