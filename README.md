# Zulma Rocio Martinez · Portfolio

Personal portfolio of Zulma Rocio Martinez, frontend developer. A static
Next.js site in English and Spanish, with light and dark themes, deployed on
Cloudflare Pages.

**Live:** https://portafolio-2026.pages.dev

Built with Next.js (App Router, static export), TypeScript (strict), Tailwind
CSS, Vitest, Cypress and GitHub Actions. Created from my
[Next.js template](https://github.com/Rocio01/nextjs-template).

Project documents:

- [`docs/brief.md`](docs/brief.md): goals, audience and scope
- [`docs/backlog.md`](docs/backlog.md): sprints and issues
- [`docs/content.md`](docs/content.md): all copy in English and Spanish

## Requirements

- Node.js 24 (see `.nvmrc`; with nvm, run `nvm use`)
- npm

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable               | Required | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Public URL of the site, used for SEO and the sitemap |

`src/lib/env.ts` validates the variables with Zod. If a value is missing or
invalid, the build fails with a clear message. The values are inlined at build
time, so a change requires a new build.

## Scripts

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the dev server                               |
| `npm run build`        | Build the static site to `out/`                    |
| `npm start`            | Serve `out/` on port 3000 (run `build` first)      |
| `npm run lint`         | Run ESLint                                         |
| `npm run lint:secrets` | Scan files for leaked secrets with secretlint      |
| `npm run typecheck`    | Run the TypeScript compiler without output         |
| `npm test`             | Run unit tests with Vitest                         |
| `npm run test:watch`   | Run Vitest in watch mode                           |
| `npm run test:e2e`     | Build, serve `out/` and run the Cypress smoke test |
| `npm run format`       | Format all files with Prettier                     |

## Test

- **Unit and component tests:** Vitest and Testing Library. Put a test file
  next to the code it tests, named `*.test.ts(x)`. Run `npm test`.
- **End-to-end tests:** Cypress in `cypress/e2e/`. `npm run test:e2e` runs the
  tests against the production build, which is the same output that is
  deployed. To debug in the browser, run `npm run build && npm start`, and in a
  second terminal run `npx cypress open`.

A pre-commit hook (Husky and lint-staged) runs secretlint, ESLint and
Prettier on staged files. CI runs two parallel jobs on each pull request:
`verify` (lint, secret scan, typecheck, unit tests, build) and `e2e` (Cypress
against the static build).

## Project structure

```
src/
  app/          Routes, layout, metadata, tokens.css, icon, OG image, sitemap, robots
  components/   Reusable UI components and their tests
  sections/     Page sections (header, hero, experience, ...)
  i18n/         Typed dictionaries for English and Spanish
  theme/        Theme provider and tokens
  data/         Experience, projects and stack data
  lib/          Logic without UI (env validation, helpers)
cypress/e2e/    End-to-end tests
docs/           Brief, backlog and content
.github/        CI workflow, Dependabot, PR and issue templates
```

### Theming

`src/app/tokens.css` defines colors as CSS variables for light and dark mode.
Dark mode follows the operating system setting (`prefers-color-scheme`).
`globals.css` maps the variables to Tailwind utilities such as `bg-bg`,
`text-fg` and `bg-accent`. Use these utilities instead of hard-coded colors.

## Deploy

Production: https://portafolio-2026.pages.dev (Cloudflare Pages project
`portafolio-2026`, connected to this repository with the Git integration).

How a change reaches production:

1. Open a pull request. CI runs `verify` and `e2e`, and Cloudflare builds a
   preview and comments its URL on the pull request.
2. `main` is protected by a ruleset: changes arrive only through pull
   requests, and `verify` and `e2e` must pass before the merge button works.
   Force pushes and deleting `main` are blocked.
3. Merging to `main` deploys to production.

Cloudflare Pages settings:

| Setting                | Value                               |
| ---------------------- | ----------------------------------- |
| Production branch      | `main`                              |
| Framework preset       | None                                |
| Build command          | `npm run build`                     |
| Build output directory | `out`                               |
| `NEXT_PUBLIC_SITE_URL` | `https://portafolio-2026.pages.dev` |

Cloudflare reads the Node.js version from `.nvmrc`. `NEXT_PUBLIC_SITE_URL` is
read at build time: after changing it, retry the latest deployment. When a
custom domain is connected (backlog item 22), set the variable to that domain.

To create the project again: **Workers & Pages > Create application**, then
the **"Looking to deploy Pages? Get started"** link at the bottom (the main
flow creates a Worker), then **Import an existing Git repository**.

Notes:

- Do not use the `@cloudflare/next-on-pages` adapter. This site is plain
  static files and needs no adapter.
- Cloudflare serves `out/about.html` at `/about`, so routes work without
  `trailingSlash`.
- Features that need a server (API routes, middleware, server actions, ISR,
  default image optimization) do not work with a static export.

## Secrets

Never commit secrets. Put them in `.env.local`, which is gitignored.

- **secretlint** blocks a commit that contains a known secret format (API
  keys, tokens, private keys). CI runs the same scan on every pull request.
  It ignores `.env*` files except `.env.example`.
- **GitHub secret scanning and push protection** reject a push with a known
  secret. They are free for public repositories. Private repositories need
  GitHub Secret Protection (paid), so secretlint is the free layer that
  always runs.

If a secret reaches a commit, rotate it first (the old value is compromised),
then remove it from the history.
