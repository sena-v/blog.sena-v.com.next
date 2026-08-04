# sena-v.com

[sena-v.com](https://sena-v.com/) is sena-v's personal blog and technical writing archive. The repository keeps the original blog history and documents its 2026 reboot instead of replacing it with a new, history-free project.

## What this project demonstrates

- A staged migration to Next.js 16, React 19, and Node.js 24
- Static article and tag routes built from Markdown and YAML
- One searchable timeline for local posts and external publications
- Honest publication metadata: original dates and archive import dates are separate
- SEO foundations: canonical URLs, Open Graph, JSON-LD, sitemap, robots, and RSS
- Maintenance controls: CI, Renovate, security headers, dependency audits, E2E tests, and link validation
- Responsive, keyboard-friendly design built primarily with Server Components and plain CSS

The design and migration decisions are described in the public [2026 blog reboot article](https://sena-v.com/articles/blog-reboot-2026).

## Stack

- Next.js App Router / React / TypeScript
- Markdown content with YAML frontmatter
- Playwright
- GitHub Actions / Renovate
- Vercel

## Local development

Use the Node.js version in `.nvmrc`.

```bash
nvm use
npm ci
npm run dev
```

The development server is available at `http://localhost:3000`.

## Verification

```bash
# lint, typecheck, content/link validation, and production build
npm run ci

# run after a production build
npm run e2e:playwright

# optionally verify that referenced external URLs are still reachable
npm run check:links:external

# check known dependency vulnerabilities
npm audit
```

Pull requests run the quality and E2E suites on Node.js 24. A smoke test runs against the production domain after changes reach `main`.

## Content model

Local articles live at `posts/YYYY-MM-DD/index.md`. The directory date is the default publication date; an explicit `publishedAt` may be used when needed.

```yaml
---
title: "Article title"
slug: "stable-url-slug"
summary: "A short description for cards and metadata."
tags: ["TypeScript", "Next.js"]
coverImage: "posts-image/example.png"
publishedAt: "2026-08-02"
updatedAt: "2026-08-10" # only after a meaningful content update
featured: false
---
```

External publications live at `content/external/*.md`. They are link records, not copied articles. `publishedAt` and `updatedAt` describe the original publication, while `importedAt` records when the link was added to this archive.

```yaml
---
title: "External article title"
slug: "platform-stable-slug"
summary: "What the original article covers."
publishedAt: "2020-02-21T17:14:06+09:00"
updatedAt: "2020-02-21T17:14:06+09:00"
importedAt: "2026-08-02"
tags: ["TypeScript"]
externalUrl: "https://example.com/article"
platform: "Example"
featured: false
---
```

Do not change an old `publishedAt` to make the archive look active. Add `updatedAt` and a dated note when an old article is materially revised.

## Maintenance rhythm

- Weekly: review Renovate PRs and failed CI runs.
- Monthly: run the external link check and review dependency audit results.
- For analytics, design, writing tone, and performance work: follow [`docs/blog-improvement-roadmap.md`](docs/blog-improvement-roadmap.md).
- Before changing GA4 or Google Cloud settings: follow [`docs/ga4-operations.md`](docs/ga4-operations.md).
- Before portfolio use: follow [`docs/portfolio-release-checklist.md`](docs/portfolio-release-checklist.md).
- When adding an article: run `npm run ci`, then check the article at desktop and mobile widths.

## Deployment

Vercel builds the `main` branch. Creating a branch or pull request is safe; merging to `main` is a production release action and should happen only after CI and a visual review pass.

Environment variables are documented in `.env.example`. Secrets and real analytics IDs must not be committed.
