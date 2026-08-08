import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Page section wrapper: anchor id, vertical rhythm, editorial max-width.
 * Sections are separated by a hairline rather than alternating fills, which
 * keeps the page reading as one continuous sheet of paper.
 */
export function Section({ id, className, children, bleed = false }) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      <div className={cn("mx-auto w-full px-6", bleed ? "max-w-7xl" : "max-w-6xl")}>
        {children}
      </div>
    </section>
  );
}

/**
 * Numbered editorial section heading.
 *
 *   ( 02 ) — PROJECTS
 *   Selected work
 *   ─────────────────────────────────────
 *   Optional description…
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  return (
    <Reveal
      className={cn(
        "mb-14",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        {index ? (
          <span className="font-mono text-xs font-semibold tabular-nums text-accent">
            {index}
          </span>
        ) : null}
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className={cn("h-px flex-1 bg-border", align === "center" && "max-w-16")}
        />
      </div>

      <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
