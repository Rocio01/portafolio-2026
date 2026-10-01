@AGENTS.md

# Working rules

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

## Constraints

- The site is a static export (`output: "export"`). Do not add API routes,
  middleware, server actions, ISR, cookies, headers or other features that need
  a server at runtime. Metadata routes (`sitemap.ts`, `robots.ts`) need
  `export const dynamic = "force-static"`.
- Environment variables are read at build time. Add each new variable to
  `.env.example` and to the schema in `src/lib/env.ts`. Reference it as
  `process.env.NEXT_PUBLIC_X` by full name; do not destructure `process.env`.
- Keep the template minimal: no i18n, auth, database or UI library. Do not add
  a dependency without a clear reason that you state in the PR.

## Conventions

- `src/app`: routes, layouts and metadata files only.
- `src/components`: reusable UI. One component per file, kebab-case file
  names, named exports.
- `src/lib`: logic without UI.
- Import with the `@/` alias, not long relative paths.
- Colors and radii come from `src/app/tokens.css` through Tailwind utilities
  (`bg-bg`, `text-fg`, `bg-accent`, ...). Do not hard-code hex values in
  components. Check every UI change in light and dark mode.
- Put a test next to the file it tests (`button.tsx` and `button.test.tsx`).
  Query by role and accessible name, not by class or test ID.
- Make small commits with Conventional Commit messages (`feat:`, `fix:`,
  `chore:`, `docs:`, `test:`, `refactor:`).
