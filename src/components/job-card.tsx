import { Card } from "@/components/card";
import { Tag } from "@/components/tag";
import type { Job } from "@/data/experience";
import type { Locale } from "@/i18n/config";

/**
 * One work card. Mobile: everything stacked. Desktop (768px and up): two
 * columns, with the highlights on the right; a job without highlights moves
 * its summary to the right column instead, as in the design.
 *
 * The left column sits in four auto rows plus a 1fr row, so a taller right
 * column grows the last row instead of spreading out the left items.
 */
export function JobCard({ job, locale }: { job: Job; locale: Locale }) {
  const highlights = job.highlights ?? [];
  const summaryOnRight = highlights.length === 0;

  return (
    <Card
      as="article"
      className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_1fr] md:gap-x-10 md:gap-y-3.5"
    >
      <p className="font-mono text-xs text-muted md:col-start-1 md:text-[13px]">
        {job.meta[locale]}
      </p>
      <h3 className="text-[23px] leading-[1.25] md:col-start-1 md:text-[28px] md:leading-[1.2]">
        {job.title[locale]}
      </h3>
      <p
        className={
          summaryOnRight
            ? "text-[15px] text-text2 md:col-start-2 md:row-span-5 md:row-start-1 md:text-[17px]"
            : "text-[15px] text-text2 md:col-start-1 md:text-[17px]"
        }
      >
        {job.summary[locale]}
      </p>
      <ul className="flex flex-wrap gap-1.5 md:col-start-1 md:gap-2 md:pt-1.5">
        {job.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
      {highlights.length > 0 && (
        <ul className="mt-2 flex flex-col gap-3.5 md:col-start-2 md:row-span-5 md:row-start-1 md:mt-0 md:gap-[18px]">
          {highlights.map((item) => (
            <li
              key={item.title.en}
              className="flex flex-col gap-0.5 border-t border-divider pt-3.5 md:border-t-0 md:border-b md:pt-0 md:pb-[18px] md:last:border-b-0 md:last:pb-0"
            >
              <strong className="font-semibold">{item.title[locale]}</strong>
              <span className="text-[15px] text-text2 md:text-base">
                {item.text[locale]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
