import { Container } from "@/components/container";
import { STACK } from "@/data/stack";
import type { Dictionary } from "@/i18n/en";

/**
 * Full-width band under the hero with the tools, in mono. A <ul>, so screen
 * readers announce how many items there are; it wraps on narrow screens.
 */
export function StackStrip({ t }: { t: Dictionary }) {
  return (
    <section
      aria-label={t.stack.label}
      className="border-y border-border bg-surface"
    >
      <Container>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 py-[18px] font-mono text-[13px] text-text2 md:gap-x-7 md:gap-y-2.5 md:py-[22px] md:text-sm">
          {STACK.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
