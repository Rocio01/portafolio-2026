@AGENTS.md

# Portfolio: context for Claude Code

Personal portfolio site for Zulma Rocio Martinez, frontend developer. Read
`docs/brief.md` for goals and scope, `docs/backlog.md` for the issues and
sprints, and `docs/content.md` for all copy in English and Spanish.

## How we work

- One GitHub issue = one branch (`feat/12-projects-section`) = one pull
  request that closes it.
- Plan before coding. Keep PRs small; do not add work outside the issue.
- Definition of done: acceptance criteria met, both languages, both themes,
  CI green.
- Copy comes only from `docs/content.md`. Never invent experience, metrics or
  claims.
- Explain decisions briefly in the PR description; I want to understand and
  defend every line in an interview.

## Before you say a task is done

Run these commands and confirm that they pass:

```sh
npm run lint
npm run lint:secrets
npm run typecheck
npm test
npm run build
```

Run `npm run test:e2e` when a change affects pages or routing.

## Stack

Next.js (App Router, static export), React, TypeScript (strict), Tailwind CSS,
Vitest, Cypress, GitHub Actions, Cloudflare Pages. This repo was created from
my Next.js template; keep its tooling and conventions.

No UI library. No i18n library unless the typed-dictionary approach proves
insufficient. Do not add a dependency without a clear reason that you state
in the PR.

## Structure

```
src/
  app/
    page.tsx            redirects to /en or /es from the browser language
    [lang]/layout.tsx   sets <html lang>, fonts, metadata
    [lang]/page.tsx     the single page, built from sections
  components/   Button, Tag, Card, Container, SectionHeading, ThemeToggle, LanguageToggle
  sections/     Header, Hero, Stack, Experience, Projects, About, Contact
  i18n/         en.ts, es.ts, get-dictionary.ts
  theme/        ThemeProvider, tokens.css
  data/         experience.ts, projects.ts, stack.ts
  lib/          logic without UI (env validation, helpers)
```

- `src/app`: routes, layouts and metadata files only.
- Names above are component names. Files are kebab-case with named exports:
  `ThemeToggle` lives in `theme-toggle.tsx`. One component per file.
- Server components by default; add `"use client"` only where there is state
  or browser APIs (theme toggle, mobile menu).
- Import with the `@/` alias, not long relative paths.

## Design tokens

Fonts: **Space Grotesk** (headings, 600), **IBM Plex Sans** (body, 400/500),
**JetBrains Mono** (labels, small meta).

| Token                    | Light     | Dark      |
| ------------------------ | --------- | --------- |
| `--bg`                   | `#F3F4F1` | `#111215` |
| `--ink`                  | `#17181C` | `#ECEDEF` |
| `--text2`                | `#3A3D45` | `#B8BBC3` |
| `--muted`                | `#5A5E68` | `#9094A0` |
| `--border`               | `#D9DAD4` | `#2A2C33` |
| `--surface`              | `#FFFFFF` | `#1A1C21` |
| `--divider`              | `#ECECE7` | `#25272D` |
| `--tag-bg`               | `#EEF1FB` | `#1F2742` |
| `--tag-fg`               | `#1F3FBF` | `#A9B8FF` |
| `--link`                 | `#1F3FBF` | `#9DB0FF` |
| `--accent` (button fill) | `#2443C9` | `#2443C9` |
| `--accent-text` (labels) | `#2443C9` | `#92A1E4` |

Colors come from the tokens through Tailwind utilities. Do not hard-code hex
values in components.

Layout: content max-width 1120px, side padding 24px (20px on mobile). Cards:
20px radius, 1px border, 40px padding (24px on mobile). Buttons: pill shape,
48px tall. Section spacing: about 100px on desktop, 56–72px on mobile.

The contact card is inverted: background `--ink`, text `--bg`.

## Behaviour

- **Theme:** follow `prefers-color-scheme` on first visit; remember the choice
  in `localStorage`; set it before first paint to avoid a flash.
- **Language:** two statically generated routes, `/en` and `/es`
  (`generateStaticParams`). `/` redirects by browser language (Spanish if it
  starts with `es`, otherwise English). The toggle is a link to the same page
  in the other language. `<html lang>` comes from the route.
- **Mobile menu:** under 768px; closes on link click and on Escape.

## Accessibility

Real `<button>` and `<a>` elements, visible focus, 44px minimum touch targets,
4.5:1 text contrast in both themes, one `h1`.

## Constraints

- The site is a static export (`output: "export"`). Do not add API routes,
  middleware, server actions, ISR, cookies, headers or other features that need
  a server at runtime. Metadata routes (`sitemap.ts`, `robots.ts`) need
  `export const dynamic = "force-static"`.
- Environment variables are read at build time. Add each new variable to
  `.env.example` and to the schema in `src/lib/env.ts`. Reference it as
  `process.env.NEXT_PUBLIC_X` by full name; do not destructure `process.env`.

## Tests and commits

- Put a test next to the file it tests (`button.tsx` and `button.test.tsx`).
  Query by role and accessible name, not by class or test ID.
- Make small commits with Conventional Commit messages (`feat:`, `fix:`,
  `chore:`, `docs:`, `test:`, `refactor:`).
