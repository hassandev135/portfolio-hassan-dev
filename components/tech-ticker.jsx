import { skillGroups } from "@/lib/site-config";
import { TechIcon } from "@/lib/tech-icons";

/* One flat list of everything in the toolkit, de-duplicated. */
const items = [...new Set(skillGroups.flatMap((group) => group.skills))];

/**
 * Full-bleed ticker between the hero and the page body. Pure decoration —
 * the same information is presented statically in the Skills section, so it
 * is hidden from assistive tech rather than announced twice.
 *
 * The track holds two identical copies with matching trailing padding, so
 * translating exactly -50% lands copy 2 where copy 1 began: no seam.
 */
export function TechTicker() {
  return (
    <div
      aria-hidden="true"
      className="marquee-mask relative overflow-hidden border-y border-border bg-muted/40 py-4"
    >
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": "50s" }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex shrink-0 items-center gap-2.5 pr-10 text-sm font-medium tracking-tight whitespace-nowrap text-muted-foreground"
              >
                <TechIcon name={item} className="h-4.5 w-4.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
