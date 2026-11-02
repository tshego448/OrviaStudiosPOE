# Release Readiness — Local Review

**Reviewed:** 7 October 2026  
**Deployment status:** No deployment or live-site change was made. The owner explicitly requested that the site not be deployed.

## Technical preparation completed

Netlify is configured to run `node scripts/build-site.mjs` and publish `dist/` rather than the project root. The dependency-free build script copies an explicit allowlist of public HTML pages and configuration, approved web asset types, and `_headers`. It excludes internal `docs/`, Markdown files, Netlify configuration, and build scripts. `dist/` is ignored by Git. The script copies `_headers` into the publish directory, which Netlify requires for file-based response headers.

The local build produced 26 files. Validation confirmed all 114 local HTML references and CSS URLs resolve, the map/font are included, the manifest and sitemap parse, the SVG parses, `_headers` is copied, and internal documentation/configuration is absent from `dist/`. JavaScript syntax checks passed. These are static checks, not browser-rendering tests.

## Read-only check of the current public domain

On 6 October 2026, `https://orviastudios.co.za/` and `/contact.html` returned HTTP 200 from Netlify. The domain resolved, TLS 1.3 validated, and the certificate was valid at check time. HSTS with `max-age=31536000` was observed; the response did **not** include a Content-Security-Policy header. The origin of the observed HSTS header was not determined.

The new `/assets/maps/south-africa-service-area.svg` returned HTTP 404, confirming the current live site does not contain the local map from this workspace. The tested `/README.md`, `/CHANGELOG.md`, `/docs/*`, asset README, `/netlify.toml`, and `/_headers` paths returned HTTP 404 on the current site. No upload or deploy was performed. Netlify CLI is not installed/on PATH in this environment, and the `manus-config` command is unavailable here, so account-level configuration was not inspected.

## Remaining company and account confirmations

These facts cannot be safely inferred from the repository or public site:

- The responsible party’s exact legal entity name and the business/postal address the company chooses to publish.
- The Information Officer’s name and contact details, whether registration is complete, and any Deputy Information Officer details. No official registration was submitted.
- Netlify account settings relevant to the site: hosting/log-retention details, data-region information available to the account owner, and who administers deployment.
- The Gmail account owner, authorised mailbox users, MFA/recovery status, provider terms, and applicable data-location information. Do not send passwords, recovery codes, API keys, or identity documents in chat.
- Approval of the proposed 12-month review/deletion schedule and the named mailbox owner responsible for carrying it out.
- The actual operator/processor register, relevant agreements, and safeguards for any cross-border processing.
- Final business/legal review of the public notice and internal policy against the company’s actual entity and processing practices.

## Release decision

The local project is prepared for a safer future Netlify build, but **production readiness is not confirmed**. The live domain is serving an older build without the new map and without an observed CSP. Browser/device rendering and post-deploy response headers remain untested. Complete the company/account items above first; if a deployment is later authorized, use a staging preview and verify the effective CSP, TLS, headers, routes, map, forms, and responsive behavior before any production release.