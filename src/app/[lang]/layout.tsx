import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/i18n/config";
import { env } from "@/lib/env";
import { siteMetadata } from "@/lib/site-metadata";
import { fontVariables } from "@/theme/fonts";
import { themeInitScript } from "@/theme/theme";

import "../globals.css";

// Build /en and /es at build time; any other first segment is a 404.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return siteMetadata({ siteUrl: env.NEXT_PUBLIC_SITE_URL, path: `/${lang}` });
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    // suppressHydrationWarning: the inline script may add data-theme to <html>
    // before React hydrates; React keeps the attribute instead of erroring.
    <html
      lang={lang}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Runs while the HTML is parsed, before any content is painted.
            First in <body> rather than in <head>: Cypress (and some browser
            extensions) inject nodes into <head>, and React failed to hydrate it. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
