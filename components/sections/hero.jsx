import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, RotateCw } from "lucide-react";
import { siteConfig, heroStats, heroTrace } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { Tilt } from "@/components/motion/tilt";
import { cn } from "@/lib/utils";

const TONES = {
  default: "bg-hue-1",
  retry: "bg-hue-1",
  success: "bg-hue-3",
  failed: "bg-hue-2",
};

/* The trace "replays" at ~2× real time once the hero has settled. */
const REPLAY_START = 450;
const REPLAY_SPEED = 2;
const replayAt = (ms) => REPLAY_START + ms * REPLAY_SPEED;

/** One bar segment on the shared time axis, grown in at its start time. */
function Bar({ start, duration, total, className }) {
  return (
    <span
      className={cn("absolute inset-y-0 origin-left animate-span-grow rounded-full", className)}
      style={{
        left: `${(start / total) * 100}%`,
        width: `${(duration / total) * 100}%`,
        animationDelay: `${replayAt(start)}ms`,
        animationDuration: `${Math.max(duration * REPLAY_SPEED, 280)}ms`,
      }}
    />
  );
}

function SpanRow({ span, total }) {
  const tone = TONES[span.tone] ?? TONES.default;
  const hasRetry = span.attempts?.some((a) => a.failed);

  return (
    <li
      className="animate-rise-in [--rise-y:4px] [animation-duration:400ms]"
      style={{ animationDelay: `${replayAt(span.start)}ms` }}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-[13px] font-medium">
          {hasRetry ? <RotateCw className="h-3 w-3 shrink-0 text-hue-2" /> : null}
          <span className="truncate">{span.label}</span>
          <span className="hidden shrink-0 rounded border border-border px-1.5 py-px font-mono text-[10px] font-normal text-muted-foreground sm:inline">
            {span.service}
          </span>
        </span>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
          {span.duration}ms
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted">
        {span.attempts ? (
          span.attempts.map((attempt) => (
            <Bar
              key={attempt.start}
              start={attempt.start}
              duration={attempt.duration}
              total={total}
              className={attempt.failed ? TONES.failed : tone}
            />
          ))
        ) : (
          <Bar start={span.start} duration={span.duration} total={total} className={tone} />
        )}
      </div>
      {span.note ? <p className="mt-1.5 font-mono text-[11px] text-hue-2">{span.note}</p> : null}
    </li>
  );
}

/**
 * A request trace, the way an observability tool draws one: each span is a
 * bar on a shared time axis. It follows one checkout in the order a payments
 * stack really runs it — the card authorization times out and is retried
 * with the same idempotency key (one charge, not two), the ledger entries and
 * an outbox event commit together, the API responds, and only then does the
 * merchant webhook go out, asynchronously.
 *
 * The card sits in a <Tilt>, so it leans toward the cursor and drifts on scroll.
 */
function TraceCard() {
  const { id, amount, spans, result, resultDetail, footnote } = heroTrace;
  const total = Math.max(...spans.map((s) => s.start + s.duration));
  const request = spans.filter((s) => !s.async);
  const background = spans.filter((s) => s.async);
  const firstAsync = background.length ? Math.min(...background.map((s) => s.start)) : total;

  return (
    <figure
      aria-label={`Illustration: a ${amount} checkout traced through the stack. The card authorization times out and is retried with the same idempotency key, so the customer is charged once. The ledger write balances, the API responds, and the merchant webhook is sent asynchronously after commit.`}
      className="relative animate-rise-in [animation-delay:200ms]"
    >
      <Tilt className="rounded-2xl">
        {/* Gradient hairline border. */}
        <div className="rounded-2xl bg-linear-to-br from-hue-1/50 via-border to-hue-3/50 p-px shadow-[var(--shadow-lg)]">
          <div aria-hidden="true" className="rounded-[calc(1rem-1px)] bg-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hue-3 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-hue-3" />
                </span>
                <span className="text-sm font-semibold">Trace</span>
                <span className="truncate font-mono text-xs text-muted-foreground">{id}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {amount}
              </span>
            </div>

            {/* Time axis */}
            <div className="flex justify-between px-5 pt-4 font-mono text-[10px] text-muted-foreground/80 tabular-nums">
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <span key={t}>{Math.round(total * t)}ms</span>
              ))}
            </div>

            <ol className="space-y-3.5 px-5 pt-3 pb-5">
              {request.map((span) => (
                <SpanRow key={span.label} span={span} total={total} />
              ))}

              {background.length ? (
                <li
                  className="flex animate-rise-in items-center gap-2.5 pt-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase [--rise-y:4px] [animation-duration:400ms]"
                  style={{ animationDelay: `${replayAt(firstAsync)}ms` }}
                >
                  <span className="h-px flex-1 border-t border-dashed border-border" />
                  after commit · async
                  <span className="h-px flex-1 border-t border-dashed border-border" />
                </li>
              ) : null}

              {background.map((span) => (
                <SpanRow key={span.label} span={span} total={total} />
              ))}
            </ol>

            {/* Result: the invariant every ledger write must satisfy. */}
            <div
              className="animate-rise-in border-t border-border px-5 py-3.5 [--rise-y:4px] [animation-duration:400ms]"
              style={{ animationDelay: `${replayAt(total)}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hue-3 text-white dark:text-background">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {result}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{resultDetail}</span>
              </div>
              {footnote ? (
                <p className="mt-1.5 pl-7 text-[11px] text-muted-foreground">{footnote}</p>
              ) : null}
            </div>
          </div>
        </div>
      </Tilt>
    </figure>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-4 sm:pt-40 sm:pb-12 lg:flex lg:min-h-svh lg:items-center lg:pb-24"
    >
      <div aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
        {/* ── Copy ── */}
        <div>
          {/* Byline: who, what, and whether they're free. */}
          <div className="animate-rise-in flex items-center gap-4">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-accent-subtle shadow-[var(--shadow-md)] ring-2 ring-card outline outline-border">
              <Image
                src={siteConfig.heroPortrait}
                alt=""
                fill
                priority
                sizes="64px"
                className="object-cover object-top"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-semibold leading-tight">{siteConfig.name}</span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                {siteConfig.title}
                {siteConfig.availability ? (
                  <>
                    <span aria-hidden="true" className="hidden sm:inline">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-hue-3" aria-hidden="true" />
                      {siteConfig.availability}
                    </span>
                  </>
                ) : null}
              </span>
            </span>
          </div>

          <h1
            className="animate-rise-in [animation-delay:80ms] mt-9 text-[clamp(2.6rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance"
          >
            {siteConfig.headline.lead}{" "}
            <span className="text-accent">{siteConfig.headline.accent}</span>
          </h1>

          <p
            className="animate-rise-in [animation-delay:160ms] mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
          >
            {siteConfig.tagline}
          </p>

          <div className="animate-rise-in [animation-delay:240ms] mt-9 flex flex-wrap items-center gap-3">
            <Link href="/#projects" className={cn(buttonVariants({ size: "lg" }), "group")}>
              See Case Studies
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/#contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Get in touch
            </Link>
          </div>

          {/* ── Credibility rail ── */}
          <div
            className="animate-rise-in [animation-delay:320ms] mt-14 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <dl className="grid grid-cols-3 gap-6 sm:gap-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs whitespace-nowrap text-muted-foreground sm:text-sm">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <SocialLinks className="-ml-2.5 sm:ml-0" />
          </div>
        </div>

        <TraceCard />
      </div>
    </section>
  );
}
