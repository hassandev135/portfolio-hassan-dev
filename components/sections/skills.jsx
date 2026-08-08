import { skillGroups } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TechIcon } from "@/lib/tech-icons";

/* Each column gets its own hue so the three areas read apart at a glance
   without introducing three competing interactive colours. */
const hues = ["bg-hue-1", "bg-hue-2", "bg-hue-3"];

export function Skills() {
  return (
    <Section id="skills" className="border-t border-border bg-muted/30">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title={
          <>
            Tools I <span className="serif-accent">actually</span> reach for
          </>
        }
        description="A pragmatic toolkit across the stack — chosen for reliability and developer experience, not novelty."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.title}
            delay={gi * 0.08}
            className="bg-background p-7 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`h-1.5 w-8 rounded-full ${hues[gi % hues.length]}`}
              />
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {group.title}
              </h3>
              <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground/70">
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </div>

            <RevealGroup as="ul" stagger={0.05} className="-mx-2">
              {group.skills.map((skill) => (
                <RevealItem
                  as="li"
                  key={skill}
                  y={10}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-200 hover:bg-muted"
                >
                  <TechIcon
                    name={skill}
                    className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-[0.95rem] font-medium tracking-tight">
                    {skill}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
