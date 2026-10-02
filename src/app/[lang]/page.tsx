import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/sections/header";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header locale={lang} t={t} />
      {/* Placeholder until the hero lands (backlog item 9). */}
      <main id="top" className="flex-1">
        <Container className="flex flex-col gap-4 py-16 md:py-24">
          <p className="font-mono text-sm text-accent-text">{t.hero.label}</p>
          <h1 className="text-4xl tracking-tight">Zulma Rocio Martinez</h1>
        </Container>
      </main>
    </>
  );
}
