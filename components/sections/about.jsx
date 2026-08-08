import Image from "next/image";
import { about, siteConfig } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  // Typographic hierarchy without editing the copy:
  //  - first line  → large lead statement
  //  - last line   → accented closing statement
  //  - the middle  → body paragraphs
  const [lead, ...rest] = about.paragraphs;
  const closing = rest.length > 0 ? rest[rest.length - 1] : null;
  const body = rest.slice(0, Math.max(0, rest.length - 1));

  return (
    <Section id="about" className="bg-muted/30">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-14 lg:gap-20">
        {/* Portrait */}
        <Reveal className="md:sticky md:top-24 md:self-start">
          <div className="group relative mx-auto w-full max-w-75">
            {/* soft accent glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-gradient-to-tr from-emerald-400/25 via-teal-400/15 to-sky-400/25 opacity-70 blur-2xl dark:from-emerald-500/20 dark:via-teal-500/12 dark:to-sky-500/20"
            />
            {/* offset accent frame */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-accent/60 transition-transform duration-300 ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src={about.photo}
                alt={`${siteConfig.name}, ${siteConfig.title}`}
                fill
                sizes="300px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Reveal>

        {/* Prose */}
        <Reveal delay={0.1}>
          <p className="text-pretty text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            {lead}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {closing ? (
            <p className="mt-8 border-l-2 border-accent pl-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {closing}
            </p>
          ) : null}
        </Reveal>
      </div>

      {/* How I build */}
      <Reveal delay={0.15} className="mt-16">
        <div className="mb-6 flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            How I build
          </h3>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <ol className="grid gap-4 sm:grid-cols-3">
          {about.whatIDo.map((item, i) => {
            const dash = item.indexOf("—");
            const head = dash >= 0 ? item.slice(0, dash).trim() : item;
            const tail = dash >= 0 ? item.slice(dash) : "";
            return (
              <li
                key={item}
                className="group rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/40"
              >
                <span className="font-mono text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-foreground">{head}</span>
                  {tail ? (
                    <span className="text-muted-foreground"> {tail}</span>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
