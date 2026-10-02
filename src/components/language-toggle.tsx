import { otherLocale, type Locale } from "@/i18n/config";

/**
 * "EN / ES": the current language as text, the other one as a link to the
 * same page in that language. A plain <a>, not next/link: each language has
 * its own root layout, so switching is a full page load anyway.
 *
 * Under 360px the header has no room for the whole toggle, so the current
 * language and the slash are hidden and only the link to the other one stays.
 */
export function LanguageToggle({
  locale,
  switchToLabel,
}: {
  locale: Locale;
  /** Name of the other language, in that language ("Español", "English"). */
  switchToLabel: string;
}) {
  const other = otherLocale(locale);

  return (
    <div className="flex items-center font-mono text-[13px]">
      <span
        aria-current="true"
        className="px-2 font-medium text-ink max-[359px]:hidden"
      >
        {locale.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-dash max-[359px]:hidden">
        /
      </span>
      <a
        href={`/${other}`}
        hrefLang={other}
        lang={other}
        aria-label={switchToLabel}
        className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-muted no-underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
      >
        {other.toUpperCase()}
      </a>
    </div>
  );
}
