import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { env } from "@/lib/env";

// Required by static export: generate the file at build time.
export const dynamic = "force-static";

// "/" only redirects, so the sitemap lists the language pages.
// hreflang alternates come in backlog item 18.
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}/${lang}`,
    lastModified: new Date(),
  }));
}
