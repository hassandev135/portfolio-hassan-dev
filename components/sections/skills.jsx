import { skillGroups } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I work with"
        description="A pragmatic toolkit I reach for across the stack — chosen for reliability and developer experience."
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <RevealItem
            key={group.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
