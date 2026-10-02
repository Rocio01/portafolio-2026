import { Container } from "@/components/container";
import { JobCard } from "@/components/job-card";
import { SectionHeading } from "@/components/section-heading";
import { EXPERIENCE } from "@/data/experience";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/** "01 — Experience": one card per job in src/data/experience.ts. */
export function Experience({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="work" aria-labelledby="work-title">
      <Container className="flex flex-col gap-6 pt-[72px] pb-6 md:gap-9 md:pt-[104px] md:pb-10">
        <SectionHeading
          id="work-title"
          label={t.work.label}
          title={t.work.title}
        />
        {EXPERIENCE.map((job) => (
          <JobCard key={job.id} job={job} locale={locale} />
        ))}
      </Container>
    </section>
  );
}
