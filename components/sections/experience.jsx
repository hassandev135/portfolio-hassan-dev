import { experience } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-border bg-muted/30">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="Where I've worked"
        description="A short history of the teams I've built with and the problems I've helped solve."
      />

      <RevealGroup as="ol" className="border-t border-border">
        {experience.map((job) => (
          <RevealItem
            as="li"
            key={`${job.company}-${job.start}`}
            className="group relative border-b border-border"
          >
            {/* Accent rule that grows in on hover. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full"
            />

            <div className="grid gap-4 py-9 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
              <p className="font-mono text-xs uppercase tracking-[0.14em] tabular-nums text-muted-foreground md:pt-2">
                {job.start} — {job.end}
              </p>

              <div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1.5 text-base font-medium text-accent">
                  {job.company}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
