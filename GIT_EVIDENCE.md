# Git Improvement Evidence

## Change summary

This cleanup improves the repository's navigability and reduces fragile resource references:

| Area | Change | Evidence to inspect |
|---|---|---|
| Source layout | Moved shared styles and JavaScript into `css/` and `js/`. | `css/styles.css`, `js/app.js` |
| Static assets | Grouped brand marks, gallery artwork, icons, fonts, and map assets under `assets/`. | `assets/brand/`, `assets/gallery/`, `assets/icons/`, `assets/fonts/`, `assets/maps/` |
| Resource references | Updated page, CSS, manifest, metadata, and host-header paths. | Five public HTML pages, `site.webmanifest`, `_headers` |
| Redundant files | Removed verified duplicate exports and unused icon-size variants. | Current tree; duplicate hashes were checked before removal. |
| Project guidance | Added a navigation-focused README, development notes, and a dated changelog. | `README.md`, `docs/DEVELOPMENT.md`, `CHANGELOG.md` |
| Deployment boundary | Netlify builds to `dist/` from an explicit public-file allowlist; internal docs and source config are excluded. | `netlify.toml`, `scripts/build-site.mjs`, `.gitignore` |
| Privacy notice and forms | Added a public notice, per-form disclosure, acknowledgement wording, and internal retention/incident procedures. | `privacy.html`, `contact.html`, `enquiry.html`, `docs/DATA_HANDLING_POLICY.md` |
| Third-party requests | No external map loads; the regional map is a self-hosted SVG made from public-domain boundary data. | `contact.html`, `assets/maps/south-africa-service-area.svg`, `css/styles.css` |
| Browser security | The whitelist build copies `_headers` into the Netlify publish directory for the host to apply. | `scripts/build-site.mjs`, `_headers`, `netlify.toml` |
| Typography | Restored Satoshi as the site font using the official locally hosted variable WOFF2 (weights 300–900). | `assets/fonts/Satoshi-Variable.woff2`, `css/styles.css`, `assets/fonts/README.md` |

## Verification evidence

- `node --check js/app.js` passed.
- `site.webmanifest` parsed as JSON; `netlify.toml` and `sitemap.xml` parsed successfully.
- Static audit across five public pages verified 114 local HTML references, fragments, CSS URLs, and manifest icons; no local references were missing.
- `node --check scripts/build-site.mjs` and the whitelist build passed; the generated `dist/` contained 26 public files, all local HTML/CSS paths resolved, `_headers` was copied, and internal docs/config/build files were absent.
- The local South Africa map SVG parses as XML, contains no external map resources, and is permitted by the same-origin image CSP; the contact page has no map iframe or external map link.
- The official Fontshare Satoshi variable font passed WOFF2 signature/size checks; CSS resolves the local file with a 300–900 variable weight range and `font-display: swap`.
- No remote executable scripts or stylesheets remain; no form endpoint is configured. Same-origin CSP and HSTS/security headers are present in `_headers`.
- Read-only live check on 2026-10-06: Netlify served the existing root and contact page over valid TLS 1.3 and returned HSTS, but no CSP; the new map URL returned 404. README and `docs/` paths tested returned 404 on the current live site. No deployment was performed.
- Browser rendering was not verified; local loopback connections were denied in this device environment. Mailbox MFA, provider settings, hosting/log details, retention approval, and legal/entity facts still require account-owner confirmation.

## Git history and status

The `.git` directory is retained. The Git command-line executable was unavailable in the editing environment, so the current branch, commit hashes, staged/unstaged state, and working-tree cleanliness could not be independently verified. No commit or remote operation was performed as part of this cleanup. To capture repository-state evidence on a machine with Git installed, run:

```sh
git status --short
git log -5 --oneline
```

This document records verifiable file-level improvements; it does not claim that they were committed.
