import type { UpcomingProject } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/** "Coming soon": a dashed, transparent card for a project in progress. */
export function UpcomingCard({
  project,
  locale,
  t,
}: {
  project: UpcomingProject;
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <article className="flex flex-col justify-center gap-2.5 rounded-[20px] border-[1.5px] border-dashed border-dash p-6 md:min-h-80 md:gap-3 md:p-8">
      <p className="font-mono text-xs text-muted md:text-[13px]">
        {t.projects.soon}
      </p>
      <h3 className="text-[22px] md:text-2xl">{project.title[locale]}</h3>
      <p className="text-[15px] text-muted md:text-base">
        {project.text[locale]}
      </p>
    </article>
  );
}
