import { notFound } from "next/navigation";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

// Placeholder until the header and hero sections land (backlog items 8, 9).
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <div className="flex items-center justify-end gap-2">
        <ThemeToggle labels={t.theme} />
        <LanguageToggle locale={lang} switchToLabel={t.language.switchTo} />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Zulma Rocio Martinez
      </h1>
      <p className="font-mono text-sm text-accent-text">{t.hero.label}</p>
    </main>
  );
}
