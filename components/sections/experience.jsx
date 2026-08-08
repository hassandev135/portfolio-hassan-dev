import { experience } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="A short history of the teams I've built with and the problems I've helped solve."
      />

      <RevealGroup className="relative">
        {/* Vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
        />

        <ol className="space-y-10">
          {experience.map((job) => (
            <RevealItem key={`${job.company}-${job.start}`}>
              <li className="relative pl-8 sm:pl-12">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background sm:h-[19px] sm:w-[19px]"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.role}
                    <span className="text-accent"> · {job.company}</span>
                  </h3>
                  <p className="shrink-0 text-sm font-medium text-muted-foreground">
                    {job.start} — {job.end}
                  </p>
                </div>
                <p className="mt-2 text-muted-foreground">{job.description}</p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  );
}
