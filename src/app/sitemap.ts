import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { env } from "@/lib/env";
import { languageAlternates } from "@/lib/site-metadata";

// Required by static export: generate the file at build time.
export const dynamic = "force-static";

// "/" only redirects, so the sitemap lists the language pages, each with
// its hreflang alternates (the same ones as the pages' <link> tags).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates(env.NEXT_PUBLIC_SITE_URL);
  return locales.map((lang) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}/${lang}`,
    lastModified: new Date(),
    alternates: { languages },
  }));
}
