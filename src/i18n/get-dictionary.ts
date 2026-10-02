import type { Locale } from "./config";
import { en, type Dictionary } from "./en";
import { es } from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

// Both dictionaries are small, so they are imported directly instead of
// loaded on demand. Only server components call this, so neither ships to
// the browser unless a client component receives its strings as props.
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
