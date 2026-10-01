import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { env } from "@/lib/env";

import "./globals.css";

// Downloaded at build time and self-hosted: no runtime request to Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Copy from docs/content.md (hero.label, hero.intro). Per-language titles and
// descriptions come with the i18n routes (backlog issue 18).
const siteName = "Zulma Rocio Martinez";
const description =
  "Frontend developer with 4+ years of production experience, now open to remote frontend and full-stack roles.";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${siteName} · Frontend Developer`,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} · Frontend Developer`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
