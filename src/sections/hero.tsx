import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { LINKS, NEW_TAB } from "@/data/links";
import type { Dictionary } from "@/i18n/en";

/**
 * Label, headline, intro and the three links. The page's only <h1>.
 * Mobile: resume full width, GitHub and LinkedIn side by side below it.
 * Desktop (768px and up): the three in one row.
 */
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" aria-labelledby="hero-title">
      <Container className="flex flex-col gap-5 pt-14 pb-14 md:gap-7 md:pt-24 md:pb-[88px]">
        <p className="font-mono text-xs text-accent-text md:text-sm md:tracking-[0.02em]">
          {t.hero.label}
        </p>
        {/* 40px on a phone, growing with the viewport up to 76px. */}
        <h1
          id="hero-title"
          className="max-w-[960px] text-[40px] leading-[1.06] tracking-[-0.02em] md:text-[clamp(40px,7vw,76px)] md:leading-[1.04]"
        >
          {t.hero.title}
        </h1>
        <p className="max-w-[680px] text-[17px] text-text2 md:text-[19px]">
          {t.hero.intro}
        </p>
        <div className="flex flex-col gap-3 pt-2 md:flex-row md:flex-wrap">
          <ButtonLink
            href={LINKS.resume}
            download="Zulma_Rocio_Martinez_Resume.pdf"
            size="lg"
          >
            <DownloadIcon />
            {t.hero.resume}
          </ButtonLink>
          <div className="grid grid-cols-2 gap-3 md:flex">
            <ButtonLink
              href={LINKS.github}
              {...NEW_TAB}
              variant="outline"
              size="lg"
            >
              GitHub
            </ButtonLink>
            <ButtonLink
              href={LINKS.linkedin}
              {...NEW_TAB}
              variant="outline"
              size="lg"
            >
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
