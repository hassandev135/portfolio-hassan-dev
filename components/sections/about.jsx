import Image from "next/image";
import { MapPin } from "lucide-react";
import { about, siteConfig } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function About() {
  // Typographic hierarchy without editing the copy:
  //  - first line → the lead statement, set large
  //  - last line  → the closing line, set as a pull quote
  //  - the middle → body copy in two columns
  const [lead, ...rest] = about.paragraphs;
  const closing = rest.length > 0 ? rest[rest.length - 1] : null;
  const body = rest.slice(0, Math.max(0, rest.length - 1));

  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" title="A bit about me" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
        {/* ── Prose column ── */}
        <div>
          <Reveal>
            <p className="text-3xl leading-[1.15] tracking-tight text-balance sm:text-4xl">
              {lead}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 max-w-prose space-y-5 text-base leading-[1.8] text-muted-foreground">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {closing ? (
            <Reveal delay={0.12}>
              <blockquote className="mt-10 border-l-2 border-accent pl-6">
                <p className="serif-accent text-2xl leading-snug text-foreground sm:text-3xl">
                  “{closing}”
                </p>
              </blockquote>
            </Reveal>
          ) : null}
        </div>

        {/* ── Portrait rail ── */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <figure className="group relative mx-auto w-full max-w-80">
            {/* Offset rule frame — paper, not glow. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-lg border-2 border-accent/70 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={about.photo}
                alt={`${siteConfig.name}, ${siteConfig.title}`}
                fill
                sizes="(min-width: 1024px) 320px, 80vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </figure>

          <dl className="mx-auto mt-8 w-full max-w-80 divide-y divide-border border-y border-border text-sm">
            {siteConfig.availability ? (
              <div className="flex items-center gap-3 py-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hue-3 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-hue-3" />
                </span>
                <dt className="sr-only">Availability</dt>
                <dd className="font-medium">{siteConfig.availability}</dd>
              </div>
            ) : null}
            {siteConfig.location ? (
              <div className="flex items-center gap-3 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd className="text-muted-foreground">{siteConfig.location}</dd>
              </div>
            ) : null}
          </dl>
        </Reveal>
      </div>

      {/* ── How I build ── */}
      <div className="mt-24">
        <Reveal className="mb-8 flex items-center gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            How I build
          </h3>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </Reveal>

        <RevealGroup
          as="ol"
          className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
        >
          {about.whatIDo.map((entry, i) => {
            // Copy is written as "Headline — supporting detail".
            const dash = entry.indexOf("—");
            const head = dash >= 0 ? entry.slice(0, dash).trim() : entry;
            const tail = dash >= 0 ? entry.slice(dash + 1).trim() : "";
            return (
              <RevealItem
                as="li"
                key={entry}
                className="group h-full bg-background p-7 transition-colors duration-300 hover:bg-muted/60"
              >
                <span className="font-mono text-xs font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                  {head}
                </p>
                {tail ? (
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {tail}
                  </p>
                ) : null}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
