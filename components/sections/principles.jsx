import { about } from "@/lib/site-config";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * "How I build" — each principle gets a small live diagram instead of a
 * plain text box. Lines draw themselves when the section scrolls into view
 * (`animate-draw`, triggered by the parent RevealGroup), and dots keep
 * travelling along them like requests. Pure SVG: no images, no libraries.
 * Under reduced motion the lines appear drawn and the moving dots are hidden.
 */

const VIEWBOX = "0 0 300 130";

/** A path that draws itself once its RevealGroup is shown. */
function Draw({ d, delay = 0, duration, className }) {
  return (
    <path
      d={d}
      pathLength="1"
      data-draw=""
      fill="none"
      strokeLinecap="round"
      className={cn(
        "[stroke-dasharray:1] [stroke-dashoffset:1] group-data-[reveal=shown]/reveal:animate-draw",
        className,
      )}
      style={{ animationDelay: `${delay}ms`, animationDuration: duration }}
    />
  );
}

/** Fades its children in once the lines have drawn. */
function After({ delay, children }) {
  return (
    <g
      className="opacity-0 group-data-[reveal=shown]/reveal:animate-rise-in [--rise-y:0px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </g>
  );
}

/**
 * A dot travelling a route forever (SVG <animateMotion>). A negative `begin`
 * starts it mid-journey, so dots are spread out from the first frame.
 */
function Packet({ route, dur, begin = 0, r = 3, className }) {
  return (
    <circle r={r} className={cn("motion-reduce:hidden", className)}>
      <animateMotion dur={`${dur}s`} begin={`${-begin}s`} repeatCount="indefinite" path={route} />
    </circle>
  );
}

function Label({ x, y, children, className }) {
  return (
    <text x={x} y={y} textAnchor="middle" className={cn("fill-muted-foreground font-mono text-[9px]", className)}>
      {children}
    </text>
  );
}

/* ── 01 · Edge cases: side branches that still rejoin and arrive ─────── */
function EdgeCases() {
  const upper = "M80 65 C104 65 104 28 128 28 H172 C196 28 196 65 220 65";
  const lower = "M80 65 C104 65 104 102 128 102 H172 C196 102 196 65 220 65";
  const via = (branch) => `M24 65 H80 ${branch.slice(branch.indexOf("C"))} H276`;

  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" aria-hidden="true">
      <Draw d="M24 65 H276" className="stroke-foreground/25 [stroke-width:2]" />
      <Draw d={upper} delay={450} className="stroke-hue-2 [stroke-width:1.75]" />
      <Draw d={lower} delay={600} className="stroke-hue-2 [stroke-width:1.75]" />

      <After delay={900}>
        <Packet route="M24 65 H276" dur={2.6} className="fill-foreground/50" />
        <Packet route={via(upper)} dur={3.4} begin={1.1} className="fill-hue-2" />
        <Packet route={via(lower)} dur={3.4} begin={2.5} className="fill-hue-2" />

        <circle cx="24" cy="65" r="4" className="fill-foreground" />
        <circle cx="80" cy="65" r="3" className="fill-hue-2" />
        <circle cx="220" cy="65" r="3" className="fill-hue-2" />
        <circle cx="276" cy="65" r="5" className="fill-hue-3" />

        <Label x={150} y={58}>happy path</Label>
        <Label x={150} y={19} className="fill-hue-2">timeout → retry</Label>
        <Label x={150} y={120} className="fill-hue-2">failure → fallback</Label>
      </After>
    </svg>
  );
}

/* ── 02 · Complexity in, one simple action out ───────────────────────── */
const INPUTS = [
  { y: 17, label: "auth" },
  { y: 41, label: "APIs" },
  { y: 65, label: "data" },
  { y: 89, label: "rules" },
  { y: 113, label: "jobs" },
];

function Simplify() {
  // Each input bends toward its mirror image before converging, so the
  // lines cross — the tangle the user never sees.
  const strand = (y) => `M48 ${y} C100 ${130 - y} 118 65 168 65`;

  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" aria-hidden="true">
      {INPUTS.map(({ y }, i) => (
        <Draw key={y} d={strand(y)} delay={i * 90} className="stroke-hue-1/45 [stroke-width:1.5]" />
      ))}
      <Draw d="M174 65 H210" delay={850} className="stroke-hue-1 [stroke-width:2.5]" />

      <After delay={950}>
        {INPUTS.map(({ y }, i) => (
          <Packet key={y} route={`${strand(y)} H210`} dur={2.8} begin={i * 0.55} r={2.5} className="fill-hue-1" />
        ))}

        {INPUTS.map(({ y, label }) => (
          <Label key={label} x={40} y={y + 3} className="[text-anchor:end]">
            {label}
          </Label>
        ))}

        <circle cx="168" cy="65" r="11" className="fill-none stroke-hue-1/30" />
        <circle cx="168" cy="65" r="6" className="fill-hue-1" />

        <rect x="210" y="50" width="80" height="30" rx="15" className="fill-accent" />
        <text
          x="250"
          y="69"
          textAnchor="middle"
          className="fill-accent-foreground text-[11px] font-semibold"
        >
          One click
        </text>
      </After>
    </svg>
  );
}

/* ── 03 · Production pipeline: every stage checked before live ───────── */
const STAGES = [
  { x: 40, label: "build" },
  { x: 113, label: "test" },
  { x: 187, label: "canary" },
  { x: 260, label: "live" },
];

function Pipeline() {
  const line = "M40 58 H260";

  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" aria-hidden="true">
      <path d={line} fill="none" className="stroke-border [stroke-width:2]" />
      <Draw d={line} delay={150} duration="1.6s" className="stroke-hue-3 [stroke-width:2]" />

      <After delay={300}>
        <Packet route={line} dur={2.2} className="fill-hue-3" />
      </After>

      {STAGES.map(({ x, label }, i) => (
        <g key={label}>
          <circle cx={x} cy="58" r="11" className="fill-card stroke-border" />
          <After delay={350 + i * 380}>
            {label === "live" ? (
              <circle
                cx={x}
                cy="58"
                r="11"
                className="origin-center animate-ping fill-hue-3/40 [transform-box:fill-box]"
              />
            ) : null}
            <circle cx={x} cy="58" r="11" className="fill-hue-3" />
            <path
              d={`M${x - 4.5} 58 l3 3.2 l6 -6.5`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-card [stroke-width:2]"
            />
            <Label x={x} y={90} className={label === "live" ? "fill-hue-3 font-semibold" : undefined}>
              {label}
            </Label>
          </After>
        </g>
      ))}

      <After delay={1900}>
        <Label x={150} y={120}>tests · monitoring · rollback ready</Label>
      </After>
    </svg>
  );
}

/* Illustration and accent colour per principle, in the order of
   `about.whatIDo` in site-config. */
const CARDS = [
  { Visual: EdgeCases, accent: "bg-hue-2" },
  { Visual: Simplify, accent: "bg-hue-1" },
  { Visual: Pipeline, accent: "bg-hue-3" },
];

export function Principles() {
  return (
    <div className="mt-24">
      <Reveal className="mb-8 flex items-center gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          How I build
        </h3>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </Reveal>

      <RevealGroup as="ol" stagger={0.12} className="grid gap-5 md:grid-cols-3">
        {about.whatIDo.map((entry, i) => {
          // Copy is written as "Headline — supporting detail".
          const dash = entry.indexOf("—");
          const head = dash >= 0 ? entry.slice(0, dash).trim() : entry;
          const tail = dash >= 0 ? entry.slice(dash + 1).trim() : "";
          const { Visual, accent } = CARDS[i % CARDS.length];

          return (
            <RevealItem
              as="li"
              key={entry}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)] transition-[translate,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-6"
            >
              {/* Accent bar that runs the full width on hover. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 top-0 h-1 origin-left scale-x-15 transition-transform duration-500 ease-out-soft group-hover:scale-x-100",
                  accent,
                )}
              />

              <div className="h-36 rounded-xl border border-border bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[14px_14px] px-2">
                <Visual />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h4 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{head}</h4>
              {tail ? (
                <p className="mt-1.5 leading-relaxed text-muted-foreground first-letter:uppercase">
                  {tail}
                </p>
              ) : null}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
