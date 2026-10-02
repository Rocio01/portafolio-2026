import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const SITE_NAME = "Zulma Rocio Martinez";

// Open Graph locales (language_TERRITORY): English for an international
// audience, Colombian Spanish for the author's own variant.
const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_CO" };

// A plain file in public/, not the opengraph-image file convention: the
// convention only reaches routes under the same root layout, and "/" has its
// own. One stable URL serves both layouts. It shows only the name and the
// stack, so the same image works for both languages; its alt text does not.
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630 };

/**
 * Metadata for every page, in the page's language. Both root layouts use
 * it, so the redirect page at "/" (in English) has the same title,
 * description and preview image as /en: social crawlers do not run its
 * redirect script.
 *
 * - Title and description come from the dictionaries (docs/content.md):
 *   "name · role", and hero.intro as the description.
 * - hreflang alternates link /en and /es to each other, with "/" as the
 *   x-default because it picks the visitor's language.
 */
export function siteMetadata({
  siteUrl,
  path,
  locale,
}: {
  siteUrl: string;
  /** Path of the page, for og:url and the canonical link. */
  path: string;
  locale: Locale;
}): Metadata {
  const { meta, hero } = getDictionary(locale);
  const description = hero.intro;
  const title = `${SITE_NAME} · ${meta.role}`;
  const image = { ...OG_IMAGE, alt: meta.ogImageAlt };

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: OG_LOCALES[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => OG_LOCALES[other]),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
    alternates: { canonical: path, languages: languageAlternates() },
  };
}

/** hreflang links: each language page, plus "/" as the default. */
export function languageAlternates(base = "") {
  return {
    ...Object.fromEntries(locales.map((lang) => [lang, `${base}/${lang}`])),
    "x-default": `${base}/`,
  };
}
