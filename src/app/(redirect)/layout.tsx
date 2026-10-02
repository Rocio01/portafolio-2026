import type { Metadata } from "next";

import { defaultLocale } from "@/i18n/config";
import { env } from "@/lib/env";
import { siteMetadata } from "@/lib/site-metadata";

import "../globals.css";

// Root layout for "/" only. The site lives at /en and /es (app/[lang]); this
// page just sends the visitor to one of them. Two root layouts are needed
// because the language root layout sets <html lang> from the route.
//
// Full site metadata, not just noindex: "/" is the URL in the README and the
// one people share, and social crawlers (LinkedIn, WhatsApp) read this HTML
// without running the redirect script.
export const metadata: Metadata = {
  ...siteMetadata({
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    path: "/",
    locale: defaultLocale,
  }),
  robots: { index: false },
};

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      {/* See app/[lang]/layout.tsx: extensions add attributes to <body>. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
