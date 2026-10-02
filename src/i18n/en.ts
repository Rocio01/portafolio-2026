// Copy from docs/content.md. es.ts must have exactly the same keys: its type
// is Dictionary, so a missing or extra key is a TypeScript error.
export const en = {
  nav: {
    label: "Main",
    work: "Work",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  theme: {
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
  },
  language: {
    // Accessible name of the link to the other language, in that language.
    switchTo: "Español",
  },
  hero: {
    label: "Frontend Developer · React · TypeScript · Next.js",
    title: "I build and ship production web apps, from architecture to deploy.",
    intro:
      "Frontend developer with 4+ years of production experience, now open to remote frontend and full-stack roles.",
    resume: "Download resume",
  },
  stack: {
    // Accessible name of the strip's <section>; not visible.
    label: "Tech stack",
  },
  work: {
    label: "01 — Experience",
    title: "Selected work",
  },
  projects: {
    label: "02 — Projects",
    title: "Things I've built",
    demo: "Live demo",
    code: "Code",
    soon: "Coming soon",
  },
  about: {
    label: "03 — About",
    title: "A different path into code",
    p1: "Before software, I trained as a veterinarian and worked in poultry production. I moved into development through Microverse's remote full-stack program, pair programming with developers around the world, and went straight into building a production platform.",
    p2: "I'm used to working on my own and owning decisions end to end. I'm now looking for a frontend or full-stack role on a remote team. Spanish native, advanced English.",
  },
  contact: {
    title: "Let's work together.",
    text: "Open to full-time remote roles and freelance projects.",
    email: "Email me",
  },
  footer: "© 2026 Zulma Rocio Martinez",
};

export type Dictionary = typeof en;
