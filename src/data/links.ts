// Links from docs/content.md. The hero and the contact card both use them.
export const LINKS = {
  email: "mailto:zrmartinezg@gmail.com",
  github: "https://github.com/Rocio01",
  linkedin: "https://www.linkedin.com/in/zulma-rocio-martinez/",
  // public/resume.pdf: the English resume, without the phone number.
  resume: "/resume.pdf",
} as const;

/**
 * Props for links to other sites (GitHub, LinkedIn, project demos): open in
 * a new tab, so the portfolio stays open. noopener keeps the new page from
 * reaching back to this one through window.opener.
 */
export const NEW_TAB = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
