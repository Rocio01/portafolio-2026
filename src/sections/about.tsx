import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/i18n/en";

/** "03 — About": heading on the left, two paragraphs on the right (desktop). */
export function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" aria-labelledby="about-title">
      <Reveal>
        <Container className="flex flex-col gap-4 pt-14 pb-6 md:grid md:grid-cols-2 md:gap-10 md:pt-[72px] md:pb-10">
          <SectionHeading
            id="about-title"
            label={t.about.label}
            title={t.about.title}
          />
          <div className="flex flex-col gap-4 text-text2 md:text-[17px]">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
