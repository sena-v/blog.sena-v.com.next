# Portfolio release checklist

Use this checklist one to two weeks before submitting sena-v.com for a job application or 転職ドラフト.

## Positioning

- [ ] Update the About page if the target role or current technical focus changed.
- [ ] Put the two or three most relevant articles or case studies near the top of the home page.
- [ ] Confirm that public descriptions do not disclose employer-confidential information.
- [ ] Be ready to explain the repository decision: preserving history demonstrates maintenance and migration work.
- [ ] Be ready to explain one tradeoff from the blog reboot article in concrete terms.

## Content

- [ ] Publish at least one recent, substantial article based on a problem actually investigated or solved.
- [ ] Review the opening paragraph and summary of featured articles.
- [ ] Add dated notices to older instructions that are now materially outdated; do not silently rewrite their history.
- [ ] Import any missing external publications with their original date, canonical URL, platform, and `importedAt`.
- [ ] Check spelling, confidential names, personal data, and broken code samples.

## Quality

- [ ] Use the Node version from `.nvmrc` and run `npm ci`.
- [ ] Run `npm run ci`.
- [ ] Run `npm audit` and resolve or document any finding.
- [ ] Run `npm run check:links:external`.
- [ ] Confirm the CodeQL check is successful and review any code-scanning alert.
- [ ] Run `npm run e2e:playwright` after a production build.
- [ ] Inspect the home page, Writings, About, the blog reboot article, and a long article at desktop and 390px mobile widths.
- [ ] Verify keyboard navigation, visible focus, heading order, and color contrast.
- [ ] Check the production `sitemap.xml`, `robots.txt`, and `rss.xml`.
- [ ] Confirm public images contain no location metadata and Open Graph dimensions match the actual file.

## Release and application

- [ ] In Vercel Domains, set `sena-v.com` as the Primary Domain and confirm `www.sena-v.com` redirects to the apex host.
- [ ] In GA4 Enhanced Measurement, disable page views based on browser history and confirm manual pathname-only page views are not duplicated.
- [ ] Review the final diff and CI results before merging to `main`.
- [ ] Confirm the production deployment and its smoke test.
- [ ] Open the site in a private browser session to catch authentication or cache mistakes.
- [ ] Use a direct case-study or article URL in the application when it better matches the role than the home page.
- [ ] Prepare a short explanation: initial state, decisions, measured result, and what remains to improve.

## Sustainable backlog

Prefer a small number of evidence-rich updates over filler posts.

1. A technical decision record from a recent project, generalized to remove confidential details.
2. A before/after maintenance article with build, security, accessibility, or performance evidence.
3. A retrospective on an older article: what still holds, what changed, and why.
4. A small open-source tool or reproducible example that supports one article.
