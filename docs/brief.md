# Project brief — Personal portfolio

**Client:** Zulma Rocio Martinez (frontend developer)
**Version:** v1 · October 2026

## Goal

Get interviews for remote frontend and full-stack roles, and give freelance clients a place to see my work.

## Audience

1. **Recruiters** — spend under a minute; need role, experience, stack and a resume download.
2. **Engineers and hiring managers** — look at the projects and the code behind this site.
3. **Freelance clients (Spanish-speaking)** — want to see that I can deliver a polished site.

## What success looks like

- A recruiter understands who I am and can download the resume without scrolling.
- The site itself is a code sample: clean repo, tests, CI, good Lighthouse scores.
- The link is on my resume, LinkedIn and GitHub profile.

## Scope (v1)

- One page: header, hero, stack, experience, projects, about, contact.
- English and Spanish at `/en` and `/es`, with a language switch.
- Light and dark theme, with a theme switch.
- Responsive from 390px up.
- Purposeful motion: a staggered hero entrance and sections that reveal on scroll, built with Motion; nothing moves when the visitor prefers reduced motion.
- Deployed on Cloudflare Pages with preview URLs per pull request.

## Out of scope (v1)

Blog, per-project case-study pages, contact form, CMS, decorative or long animations beyond the hero entrance and section reveals.

## Constraints

- Previous employer's products are described without names or links.
- No phone number on the public site.
- All copy lives in `docs/content.md`; do not invent experience, numbers or claims.

## Stack

Next.js (App Router, static export) · React · TypeScript · Tailwind CSS · Motion · Vitest · Cypress (one smoke test) · GitHub Actions · Cloudflare Pages. Created from my own Next.js template.

## Timeline

Three one-week sprints. See `docs/backlog.md`.

## Design

Approved design: four artboards (desktop and mobile, EN and ES) with light and dark themes. Tokens are in `CLAUDE.md`.
