import { ButtonLink } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { LINKS, NEW_TAB } from "@/data/links";
import type { Dictionary } from "@/i18n/en";

/**
 * The inverted contact card. Mobile: full-width buttons in a column, and the
 * email button says "Email me". Desktop: buttons in a row, and the email
 * button shows the address, as in the design.
 */
export function Contact({ t }: { t: Dictionary }) {
  const address = LINKS.email.replace("mailto:", "");

  return (
    <section id="contact" aria-labelledby="contact-title">
      <Reveal>
        <Container className="pt-14 md:pt-[72px]">
          <Card variant="inverse" className="flex flex-col gap-[18px] md:gap-6">
            <h2
              id="contact-title"
              className="max-w-[720px] text-[32px] leading-[1.1] md:text-[clamp(30px,5vw,52px)] md:tracking-[-0.01em]"
            >
              {t.contact.title}
            </h2>
            <p className="max-w-[560px] text-[15px] text-muted md:text-[17px]">
              {t.contact.text}
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              {/* Only one label is displayed, so the link's name is that one. */}
              <ButtonLink href={LINKS.email} variant="inverted" size="lg">
                <span className="md:hidden">{t.contact.email}</span>
                <span className="hidden md:inline">{address}</span>
              </ButtonLink>
              <ButtonLink
                href={LINKS.linkedin}
                {...NEW_TAB}
                variant="outline"
                size="lg"
              >
                LinkedIn
              </ButtonLink>
              <ButtonLink
                href={LINKS.github}
                {...NEW_TAB}
                variant="outline"
                size="lg"
              >
                GitHub
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Reveal>
    </section>
  );
}
