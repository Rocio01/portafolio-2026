import Link from "next/link";

import { localeRedirectScript } from "@/i18n/config";

// "/" redirects by browser language: Spanish if it starts with "es",
// otherwise English. Without JavaScript, the links below still work.
export default function RedirectPage() {
  return (
    <main className="p-6">
      <script dangerouslySetInnerHTML={{ __html: localeRedirectScript }} />
      <p>
        <Link href="/en" hrefLang="en" lang="en">
          English
        </Link>
        {" · "}
        <Link href="/es" hrefLang="es" lang="es">
          Español
        </Link>
      </p>
    </main>
  );
}
