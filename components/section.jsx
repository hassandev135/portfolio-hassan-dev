import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Consistent page section wrapper: anchor id, vertical rhythm, max-width.
 */
export function Section({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-6">{children}</div>
    </section>
  );
}

/**
 * Section heading with an eyebrow label and optional description.
 */
export function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-gradient-accent mb-2 text-sm font-semibold uppercase tracking-widest">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
