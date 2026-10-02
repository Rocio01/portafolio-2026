import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Experience } from "@/sections/experience";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { Projects } from "@/sections/projects";
import { StackStrip } from "@/sections/stack-strip";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header locale={lang} t={t} />
      <main className="flex-1">
        <Hero t={t} />
        <StackStrip t={t} />
        {/* The hero and the strip are in the first screen, so they do not
            wait for a scroll reveal; the hero has its own CSS entrance. */}
        <Reveal>
          <Experience locale={lang} t={t} />
        </Reveal>
        <Reveal>
          <Projects locale={lang} t={t} />
        </Reveal>
        <Reveal>
          <About t={t} />
        </Reveal>
        <Reveal>
          <Contact t={t} />
        </Reveal>
      </main>
      <Footer t={t} />
    </>
  );
}
