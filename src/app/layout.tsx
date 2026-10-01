import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { env } from "@/lib/env";

import "./globals.css";

// Downloaded at build time and self-hosted: no runtime request to Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteName = "Next.js Template";
const description = "A minimal, static Next.js starter.";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: siteName, template: `%s | ${siteName}` },
  description,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
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
