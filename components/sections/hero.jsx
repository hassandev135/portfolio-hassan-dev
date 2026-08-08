"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig, heroStats } from "@/lib/site-config";
import { BlurText } from "@/components/motion/blur-text";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

/* The name is split so the portrait can sit between the two lines, the way a
   magazine cover locks a subject into its masthead. */
const [firstName, ...lastNameParts] = siteConfig.name.split(" ");
const lastName = lastNameParts.join(" ");

/** Column rules — the editorial grid, drawn rather than implied. */
function ColumnRules() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-6xl px-6"
    >
      <div className="grid h-full grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "border-l border-border/60",
              i > 3 && "hidden md:block",
              i === 5 && "border-r",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-14"
    >
      {/* ── Background: paper, one warm wash, one cool wash, drawn columns ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-hue-1/12 blur-[130px] dark:bg-hue-1/20" />
        <div className="absolute -right-1/5 bottom-1/4 h-[460px] w-[460px] rounded-full bg-hue-2/10 blur-[130px] dark:bg-hue-2/14" />
      </div>
      <ColumnRules />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Availability */}
        {siteConfig.availability ? (
          <motion.div {...rise(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-2.5 pr-4 text-xs font-medium tracking-tight backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hue-3 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hue-3" />
              </span>
              {siteConfig.availability}
            </span>
          </motion.div>
        ) : null}

        {/* ── Masthead: name + portrait lock-up ── */}
        <h1 className="relative mt-8 text-center sm:mt-10">
          <span className="sr-only">
            {siteConfig.name} — {siteConfig.title}
          </span>

          {/* Portrait. On phones the name is too small to survive an overlap,
              so it sits above the masthead; from `sm` up it locks into the
              optical centre the way a cover subject overlaps its title. */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 0.86, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mb-7 block w-28 sm:absolute sm:left-1/2 sm:top-1/2 sm:mb-0 sm:w-[clamp(96px,11vw,140px)] sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            <span className="group relative block aspect-square overflow-hidden rounded-full bg-gradient-to-b from-accent-subtle to-muted shadow-[var(--shadow-lg)] ring-1 ring-border sm:aspect-3/5">
              <Image
                src={siteConfig.heroPortrait}
                alt=""
                fill
                priority
                sizes="160px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </span>
          </motion.span>

          <BlurText
            text={firstName}
            by="letters"
            aria-hidden="true"
            stagger={0.055}
            className="block font-display text-[clamp(3.25rem,18vw,13rem)] font-bold uppercase leading-[0.82] tracking-[-0.04em]"
          />

          <BlurText
            text={lastName}
            by="letters"
            aria-hidden="true"
            delay={0.18}
            stagger={0.055}
            className="hero-outline block font-display text-[clamp(3.25rem,18vw,13rem)] font-bold uppercase leading-[0.82] tracking-[-0.04em]"
          />

        </h1>

        {/* ── Role + tagline ── */}
        <motion.p
          {...rise(0.5)}
          className="mx-auto mt-10 max-w-3xl text-center text-xl leading-snug tracking-tight text-balance sm:text-2xl"
        >
          <span className="font-semibold">{siteConfig.title}</span>
          <span className="text-muted-foreground"> — </span>
          <span className="serif-accent text-muted-foreground">
            {siteConfig.tagline}
          </span>
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          {...rise(0.6)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/#projects"
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            View selected work
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/#contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Let&apos;s talk
          </Link>
        </motion.div>
      </div>

      {/* ── Footer rail: stats + socials ── */}
      <motion.div
        {...rise(0.75)}
        className="mx-auto mt-16 w-full max-w-6xl px-6 sm:mt-20"
      >
        <div className="flex flex-col items-center gap-8 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <dl className="flex items-stretch gap-8 sm:gap-12">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-4">
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent lg:inline-flex"
            >
              Scroll
              <ArrowDown
                className="h-3.5 w-3.5 animate-bounce motion-reduce:animate-none"
                aria-hidden="true"
              />
            </a>
            <SocialLinks />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
