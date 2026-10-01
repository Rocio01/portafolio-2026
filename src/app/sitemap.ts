import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

// Required by static export: generate the file at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${env.NEXT_PUBLIC_SITE_URL}/`, lastModified: new Date() }];
}
