# Orvia Studio Group Website

A static, multi-page website built with HTML, CSS, and vanilla JavaScript. It has no package dependencies; Netlify uses a small Node.js script to prepare a public-only deploy directory.

## Project layout

```text
.
├── index.html, about.html, contact.html, enquiry.html, privacy.html
├── assets/
│   ├── brand/        # Orvia marks
│   ├── gallery/      # About-page artwork
│   ├── icons/         # Favicons and PWA icons
│   ├── fonts/         # Self-hosted Satoshi variable web font
│   └── maps/          # Self-hosted service-area map
├── css/styles.css    # Shared styles
├── js/app.js         # Shared browser interactions and form validation
├── scripts/build-site.mjs # Netlify public-file build
├── docs/             # Development, data-handling, and release-readiness notes
├── robots.txt, sitemap.xml, site.webmanifest
├── netlify.toml, _headers, .nojekyll, .gitignore
└── README.md, CHANGELOG.md
```

`google01d1639d92260f82.html` remains at the root for Google Search Console verification. Keep page entry points and static-host configuration at the root.

## Pages and behavior

- `index.html` — studio overview, services, process, notes, and FAQs.
- `about.html` — studio background and visual direction.
- `enquiry.html` — service, product, volunteer, and sponsorship enquiries.
- `contact.html` — contact options, project brief, and a locally served regional service-area map.
- `privacy.html` — public privacy notice describing current collection and email-draft behavior.

The shared script supports responsive navigation, theme preference, searchable, topic-filtered and sortable studio notes, tabs, dialogs, gallery interaction, interactive reference-city markers on the locally hosted service-area map, and client-side form validation. The selected theme is stored in local storage on the visitor's device. The original Satoshi typeface is self-hosted as a variable WOFF2 font, so no external font request is needed. The site does not automatically load third-party map resources.

## Coursework Part 3 implementation notes

- **Dynamic content:** homepage studio notes are rendered from local JavaScript data and support full-text search, topic filtering, and sorting by date or title.
- **Forms:** `enquiry.html` handles services, products, volunteering, and sponsorship; `contact.html` handles general messages and project briefs. Both use labelled HTML controls, browser constraints, JavaScript validation, inline error/status feedback, and a `mailto:` action. The script also supports asynchronous `fetch` submission when an approved `data-endpoint` is configured.
- **Current form-delivery limitation:** no submission endpoint or database is configured. The current safe fallback opens a reviewable email draft; it does not send data automatically. Configure AJAX only after selecting a provider and reviewing its server-side validation, privacy, retention, access, terms, and CSP requirements.
- **SEO and security:** public pages include page-specific titles, descriptions, canonicals, social metadata, structured data, semantic headings, descriptive image alt text, and internal links. `robots.txt`, `sitemap.xml`, responsive layouts, deferred JavaScript, lazy-loaded non-critical images, same-origin CSP, and related security headers are included.
- **External promotion and release:** backlinks and social promotion require real off-site activity. The site has not been deployed as part of these local changes; test the target host's response headers and forms after an authorized deployment.

### Why these features matter

Searchable, topic-filtered and sortable notes help visitors narrow a growing set of content without leaving the page. Clear form labels, instructions and validation feedback help people understand fields and correct errors, including people using assistive technology. Browser-side validation gives immediate feedback, but it is not a security boundary: a real submission endpoint must validate the data on the server as well (World Wide Web Consortium Web Accessibility Initiative, 2026; MDN Contributors, 2026b).

Unique page titles, useful descriptions, descriptive links and a sitemap help search engines discover and interpret pages and help searchers decide which result to open. They improve discoverability but do not guarantee rankings (Google Search Central, 2025b). Responsive layouts let content reflow to different screen sizes without forcing users to zoom or scroll horizontally. Loading speed, interactivity and visual stability are also measurable parts of real-world page experience (LePage and Andrew, 2019; Google Search Central, 2025a).

The Content Security Policy (CSP) restricts which sources the browser may load and can provide a layer of defence against injected scripts. It complements—not replaces—safe handling of user input and other security controls (MDN Contributors, 2026a). These are reasons for including the features, not claims that this site has passed a full accessibility, security or real-user performance audit.

### References

References and in-text citations below follow the IIE-adapted Harvard Anglia guide for online sources (The Independent Institute of Education, 2026).

Google Search Central, 2025a. *Understanding Core Web Vitals and Google Search results*. [online] Available at: <https://developers.google.com/search/docs/appearance/core-web-vitals> [Accessed 30 October 2026].

Google Search Central, 2025b. *Search Engine Optimization (SEO) Starter Guide*. [online] Available at: <https://developers.google.com/search/docs/fundamentals/seo-starter-guide> [Accessed 30 October 2026].

LePage, P. and Andrew, R., 2019. *Responsive web design basics*. [online] web.dev. Available at: <https://web.dev/articles/responsive-web-design-basics> [Accessed 30 October 2026].

MDN Contributors, 2026a. *Content Security Policy (CSP)*. [online] MDN Web Docs. Available at: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP> [Accessed 30 October 2026].

MDN Contributors, 2026b. *Using HTML form validation and the Constraint Validation API*. [online] MDN Web Docs. Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation> [Accessed 30 October 2026].

The Independent Institute of Education, 2026. *Harvard - Anglia Style Reference Guide – Adapted for The IIE*. [online] Available at: <https://irp.cdn-website.com/271d35b6/files/uploaded/The+IIE+Harvard+Anglia+Style+Reference+Guide+-+Adapted+for+The+IIE+2026.pdf> [Accessed 30 October 2026].

World Wide Web Consortium Web Accessibility Initiative, 2026. *Forms Tutorial*. [online] Available at: <https://www.w3.org/WAI/tutorials/forms/> [Accessed 30 October 2026].

## Forms and data handling

The contact and enquiry forms validate in the browser. No submission endpoint or site database is configured. Submitting prepares a `mailto:` draft addressed to `orviacreatives@gmail.com`; the visitor must review and send it. The email application/provider may sync or store the draft before it is sent. Phone, budget, and preferred start date remain optional. Do not add an endpoint until its provider, server-side validation, access controls, retention, operator terms, and privacy notice have been reviewed.

See [the public Privacy Notice](privacy.html), [the internal Data-Handling Policy](docs/DATA_HANDLING_POLICY.md), and [Development Notes](docs/DEVELOPMENT.md).

## Local development and validation

From the project root, run `python -m http.server 8000` and open `http://localhost:8000/`. To inspect deployment output, run `node scripts/build-site.mjs` and serve `dist/` with `python -m http.server 8000 --directory dist`. Validate JavaScript with `node --check js/app.js`; also parse `site.webmanifest` and audit local HTML/CSS/manifest paths. Static checks do not replace browser testing on the actual deployment host.

## Deployment and security

`netlify.toml` runs `scripts/build-site.mjs` and publishes only the generated `dist/` directory. The script copies an explicit list of public pages and configuration, approved web-asset types, and `_headers`; it excludes repository docs, Markdown notes, build scripts, and Netlify configuration. `_headers` contains a same-origin Content Security Policy, HSTS, and related security/cache headers, and is copied into `dist/` so Netlify can apply it. Confirm effective response headers after deployment. GitHub Pages can serve the root files but does not apply Netlify `_headers`; configure equivalent headers at the chosen host where supported.

Before launch, complete the owner/provider items in [the data-handling policy](docs/DATA_HANDLING_POLICY.md), especially the responsible party's legal name and postal address, Information Officer registration, hosting and email-provider details, mailbox MFA, and operational retention review.
