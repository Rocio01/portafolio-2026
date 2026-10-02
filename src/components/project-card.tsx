import Image from "next/image";

import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

// Mobile: two equal tinted buttons. Desktop: text links with an arrow.
const linkClasses =
  "flex min-h-12 flex-1 items-center justify-center rounded-xl bg-tag-bg font-medium text-link no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link md:min-h-11 md:flex-none md:rounded-none md:bg-transparent md:underline";

/** Screenshot on top, then title, text, stack and the demo and code links. */
export function ProjectCard({
  project,
  locale,
  t,
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
}) {
  const links = [
    { href: project.demo, label: t.projects.demo },
    { href: project.code, label: t.projects.code },
  ].filter((link): link is { href: string; label: string } =>
    Boolean(link.href),
  );

  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-surface">
      <Image
        src={project.image.src}
        width={project.image.width}
        height={project.image.height}
        alt={project.image.alt[locale]}
        className="h-[200px] w-full object-cover object-top md:h-60"
      />
      <div className="flex grow flex-col gap-3 p-6 md:gap-3.5 md:p-8">
        <h3 className="text-[22px] md:text-2xl">{project.title[locale]}</h3>
        <p className="text-[15px] text-text2 md:text-base">
          {project.text[locale]}
        </p>
        <p className="font-mono text-xs text-muted md:text-[13px]">
          {project.stack.join(" · ")}
        </p>
        {links.length > 0 && (
          <div className="flex gap-3 pt-1 md:mt-auto md:flex-wrap md:gap-4 md:pt-1.5">
            {links.map((link) => (
              <a key={link.label} href={link.href} className={linkClasses}>
                {link.label}
                <span aria-hidden="true" className="hidden md:inline">
                  &nbsp;→
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
