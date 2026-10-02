import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { UpcomingCard } from "@/components/upcoming-card";
import { PROJECTS, UPCOMING } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * "02 — Projects": built projects, then "coming soon" cards. One column on
 * mobile, two from 768px, as in the design. Fixed columns keep a lone card
 * at half width instead of stretching its screenshot across the page.
 */
export function Projects({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <Container className="flex flex-col gap-6 pt-14 pb-6 md:gap-9 md:pt-[72px] md:pb-10">
        <SectionHeading
          id="projects-title"
          label={t.projects.label}
          title={t.projects.title}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              t={t}
            />
          ))}
          {UPCOMING.map((project) => (
            <UpcomingCard
              key={project.id}
              project={project}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
