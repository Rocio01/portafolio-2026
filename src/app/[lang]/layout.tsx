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
  if (!isLocale(lang)) notFound();
  return siteMetadata({
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    path: `/${lang}`,
    locale: lang,
  });
}

const revealFallbackCss =
  "[data-reveal]{opacity:1!important;transform:none!important}";

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
      {/* suppressHydrationWarning: extensions such as Grammarly add
          attributes to <body> before React hydrates. It covers only this
          element's own attributes, not its children. */}
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        {/* Runs while the HTML is parsed, before any content is painted.
            First in <body> rather than in <head>: Cypress (and some browser
            extensions) inject nodes into <head>, and React failed to hydrate it. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JavaScript, scroll reveals never run: show their content. */}
        <noscript>
          <style>{revealFallbackCss}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
