export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The other language, for the language switch. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/**
 * The locale for a visitor's browser languages, most preferred first:
 * Spanish if the first one starts with "es", otherwise English.
 */
export function detectLocale(languages: readonly string[]): Locale {
  const first = languages[0] ?? "";
  return first.toLowerCase().startsWith("es") ? "es" : "en";
}

/**
 * Runs on "/" in the browser: the site is a static export, so there is no
 * server to read Accept-Language. Same rule as detectLocale. Uses
 * location.replace so "/" does not stay in the back-button history.
 */
export const localeRedirectScript = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";location.replace(/^es/i.test(l)?"/es":"/en")})()`;
