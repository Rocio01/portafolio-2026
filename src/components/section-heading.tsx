/**
 * "01 — Experience" over "Selected work". The label is decoration for the
 * eye; the <h2> is the heading screen readers navigate by.
 */
export function SectionHeading({
  label,
  title,
  id,
}: {
  label: string;
  title: string;
  /** Put on the <h2> so the section can be labelled with aria-labelledby. */
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[13px] text-accent-text md:text-sm">
        {label}
      </p>
      <h2
        id={id}
        className="text-[30px] tracking-[-0.01em] md:text-[clamp(30px,4vw,44px)]"
      >
        {title}
      </h2>
    </div>
  );
}
