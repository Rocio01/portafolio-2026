# Backlog — Portfolio v1

Sprints are one week. Estimates are story points (1 = under an hour, 2 = a couple of hours, 3 = half a day or more).
Each item below is one GitHub issue. Labels are in brackets. One issue = one branch = one PR.

Board columns: **Backlog → To do (this sprint) → In progress → In review → Done**

---

## Sprint 1 — "It's live"

**Sprint goal:** a public URL showing the header and hero, with working language and theme switches.
**Points:** 19

### 1. Create the repo from the template `[setup]` · 1 pt

- [ ] Repo created with "Use this template"; package name, README title and metadata updated
- [ ] `CLAUDE.portfolio.md` merged into the template's `CLAUDE.md`, `docs/` added
- [ ] `dev`, `build`, `lint`, `typecheck` and `test` all pass
- [ ] Folders added: `src/sections`, `src/i18n`, `src/theme`, `src/data`

### 2. Deploy to Cloudflare Pages `[setup]` `[infra]` · 2 pts

- [ ] `main` deploys to production automatically
- [ ] Every pull request gets its own preview URL
- [ ] Production URL added to the repo description

### 3. Protect `main` `[setup]` `[infra]` · 1 pt

CI already comes with the template.

- [ ] CI runs on a test pull request
- [ ] Branch protection: a failing check blocks the merge

### 4. Design tokens and fonts `[foundation]` · 3 pts

- [ ] Template's `tokens.css` replaced with the portfolio values for light and dark (in `CLAUDE.md`)
- [ ] Fonts loaded with `next/font`: Space Grotesk, IBM Plex Sans, JetBrains Mono
- [ ] Tailwind theme reads the variables, no hard-coded hex values in components

### 5. Theme switch `[foundation]` `[feature]` · 2 pts

- [ ] First visit follows the system preference
- [ ] The toggle switches light/dark and the choice is remembered
- [ ] No flash of the wrong theme on load
- [ ] The button has an accessible label in the current language

### 6. Language switch (EN / ES) `[foundation]` `[feature]` · 3 pts

- [ ] Routes `/en` and `/es`, statically generated with `generateStaticParams`
- [ ] Typed dictionaries `en.ts` and `es.ts` with the same keys (copy in `docs/content.md`); a missing key is a TypeScript error
- [ ] `<html lang>` comes from the route
- [ ] `/` redirects by browser language, falling back to English
- [ ] The toggle links to the same page in the other language

### 7. Base components `[foundation]` · 3 pts

`Container`, `Button` (primary, outline, inverted), `Tag`, `Card`, `SectionHeading`.

- [ ] Each one works in light and dark
- [ ] Buttons and links are at least 44px tall and show a visible focus ring

### 8. Header and navigation `[section]` · 3 pts

- [ ] Desktop: name, section links, theme toggle, language toggle, Contact button
- [ ] Mobile (under 768px): menu button that opens and closes the links
- [ ] The menu closes after choosing a link and with the Escape key

### 9. Hero `[section]` · 2 pts

- [ ] Label, headline, intro line and three buttons (resume, GitHub, LinkedIn)
- [ ] Headline scales between mobile and desktop without overflowing

---

## Sprint 2 — "All the content"

**Sprint goal:** every section from the design is built with real content, in both languages, on mobile and desktop.
**Points:** 14

### 10. Tech stack strip `[section]` · 1 pt

- [ ] List comes from a single array; wraps cleanly on mobile

### 11. Experience section `[section]` · 3 pts

- [ ] Two work cards: healthcare platform (with four highlights) and visual-artists platform
- [ ] Content comes from data, not hard-coded in the component
- [ ] Two columns on desktop, stacked on mobile

### 12. Projects section `[section]` · 3 pts

- [ ] Project card: image, title, description, stack, demo and code links
- [ ] "Coming soon" card style
- [ ] Adding a project means adding one object to a data file

### 13. About section `[section]` · 1 pt

### 14. Contact and footer `[section]` · 2 pts

- [ ] Email, LinkedIn and GitHub buttons; card inverts correctly in dark mode

### 15. Real content `[content]` · 2 pts

- [ ] Resume PDF in `public/` and linked from the hero
- [ ] Attention game: screenshot, live link, repo link
- [ ] No placeholder text left in either language

### 16. Responsive pass `[qa]` · 2 pts

- [ ] Checked at 390, 768 and 1280px: no horizontal scroll, no clipped text

---

## Sprint 3 — "Ready to share"

**Sprint goal:** the site is tested, fast, accessible and documented, and the link goes on the resume and LinkedIn.
**Points:** 13

### 17. Accessibility pass `[qa]` `[a11y]` · 2 pts

- [ ] Whole page usable with the keyboard only
- [ ] Text contrast at least 4.5:1 in both themes
- [ ] Landmarks and one `h1`; headings in order

### 18. SEO and sharing `[launch]` · 2 pts

- [ ] Title and description per language with the Next metadata API; favicon
- [ ] `hreflang` alternates between `/en` and `/es`; sitemap lists both
- [ ] Open Graph image so the link previews well on LinkedIn and WhatsApp

### 19. Tests `[qa]` · 3 pts

- [ ] Unit tests for the language and theme logic (Vitest)
- [ ] One end-to-end smoke test: page loads, switch language, switch theme
- [ ] Tests run in CI

### 20. Performance `[qa]` · 2 pts

- [ ] Lighthouse 90+ for performance, accessibility, best practices and SEO on mobile

### 21. README `[docs]` · 2 pts

- [ ] Screenshot (light and dark), live link, stack
- [ ] Short "decisions" section: why this stack, how i18n and theming work
- [ ] How to run it locally

### 22. Custom domain and analytics `[launch]` · 2 pts · optional

- [ ] Domain connected in Cloudflare
- [ ] Privacy-friendly analytics (Cloudflare Web Analytics)

---

## After v1 (not in scope now)

- Case-study page per project
- Blog
- Contact form
- Microfrontend demo project (separate repo, listed in Projects)

---

## Sprint ritual (solo)

| When      | What                                                                              | Time   |
| --------- | --------------------------------------------------------------------------------- | ------ |
| Monday    | **Planning:** move this sprint's issues to "To do", confirm the sprint goal       | 15 min |
| Every day | **Check-in:** what did I finish, what's next, what's blocking me                  | 2 min  |
| Friday    | **Review:** open the live site, tick the sprint goal, move unfinished issues back | 10 min |
| Friday    | **Retro:** one thing that went well, one thing to change next sprint              | 5 min  |

**Definition of done** for every issue: acceptance criteria ticked, works in both languages and both themes, CI green, PR merged, preview checked on a phone.
