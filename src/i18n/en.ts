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
};

export type Dictionary = typeof en;
