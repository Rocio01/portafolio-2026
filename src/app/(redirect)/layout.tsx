import type { Metadata } from "next";

import { env } from "@/lib/env";

import "../globals.css";

// Root layout for "/" only. The site lives at /en and /es (app/[lang]); this
// page just sends the visitor to one of them. Two root layouts are needed
// because the language root layout sets <html lang> from the route.
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  robots: { index: false },
};

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
