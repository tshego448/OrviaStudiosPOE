# Changelog

## 2026-10-30

- Added keyboard-accessible city selectors and live location notes to the locally hosted South Africa service-area map; the map remains private-by-default and makes no third-party requests.
- Added a topic filter to the dynamically rendered studio notes, alongside the existing text search and date/title sorting.
- Completed page-specific Open Graph and Twitter share-preview metadata for the enquiry page and privacy-page metadata; tightened the homepage title to the recommended search-result length.
- Expanded the README with Part 3 evidence for forms, dynamic content, SEO/security, deployment scope, and the endpoint-dependent AJAX limitation.
- Added researched explanations of accessibility, validation, SEO, mobile usability, performance and CSP importance, cited in IIE Harvard Anglia author-date style with a matching reference list.
- Reused the existing vanilla JavaScript interactions, HTML constraint validation, gallery lightbox, animations, and SEO foundations rather than adding dependencies or duplicating features.

## 2026-10-06

- Added shared JavaScript for theme preference, responsive navigation, reveal effects, FAQ behavior, accessible tabs and dialogs, gallery lightbox, searchable studio notes, forms, and map initialization.
- Added separate service-enquiry and general-contact workflows with browser validation, accessible feedback, optional endpoint delivery, and a `mailto:` draft fallback.
- Added page-specific metadata, structured data, sitemap and crawler directives.
- Added Netlify static-host configuration, security/cache headers, and GitHub Pages compatibility.
- Repaired local brand asset references, theme storage handling, form-delivery messaging, and the map fallback.
- Removed the unused platform-specific route manifest and Netlify catch-all rewrite so missing URLs return normal not-found responses.
- Organized source into `css/`, `js/`, `assets/brand/`, `assets/gallery/`, `assets/icons/`, and `docs/`; updated HTML, CSS, manifest, and hosting-header resource paths.
- Added consistent favicon and touch-icon links, removed confirmed duplicate and unused image/text files, and retained the Google verification file and deployment essentials.
- Added development and Git improvement evidence documentation.
- Added a public privacy notice describing current form, email-draft, browser-storage, hosting, and external-link data flows; linked it from the forms and site footers.
- Added an internal data-handling policy covering access, mailbox safeguards, retention review, provider review, data-subject requests, and incident response.
- Removed automatic Leaflet/OpenStreetMap map requests and replaced the outbound map link with a locally served SVG based on public-domain Natural Earth boundaries.
- Restored the original Satoshi typography with Fontshare's official self-hosted variable WOFF2 font for weights 300–900; remote font requests remain disabled.
- Added a same-origin Content Security Policy, HSTS, and related security headers in the Netlify-style `_headers` file; verify host support and HTTPS before deployment.

## 2026-10-07

- Added a dependency-free Netlify build that publishes only allowlisted public pages and web assets to `dist/`, copies `_headers`, and excludes internal project documentation and build configuration.
