import type { Metadata } from "next";

// Copy from docs/content.md (hero.label, hero.intro). Per-language titles and
// descriptions, and hreflang alternates, come in backlog item 18.
export const SITE_NAME = "Zulma Rocio Martinez";
const TITLE = `${SITE_NAME} · Frontend Developer`;
const DESCRIPTION =
  "Frontend developer with 4+ years of production experience, now open to remote frontend and full-stack roles.";

// A plain file in public/, not the opengraph-image file convention: the
// convention only reaches routes under the same root layout, and "/" has its
// own. One stable URL serves both layouts.
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Zulma Rocio Martinez, Frontend Developer: React, TypeScript, Next.js.",
};

/**
 * Shared metadata for every page. Both root layouts use it, so the redirect
 * page at "/" has the same title, description and preview image as /en and
 * /es: social crawlers do not run its redirect script.
 */
export function siteMetadata({
  siteUrl,
  path,
}: {
  siteUrl: string;
  /** Path of the page, for og:url and the canonical link. */
  path: string;
}): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: { default: TITLE, template: `%s | ${SITE_NAME}` },
    description: DESCRIPTION,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: TITLE,
      description: DESCRIPTION,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE] },
    alternates: { canonical: path },
  };
}
