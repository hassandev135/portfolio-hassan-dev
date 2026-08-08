"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig, heroStats, heroChips } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

/** Small glass chip that gently floats beside the portrait. */
function FloatingChip({ label, className, delay = 0, floatDelay = 0, reduce }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={reduce ? {} : { opacity: 1, scale: 1, y: [0, -9, 0] }}
      transition={
        reduce
          ? {}
          : {
              opacity: { duration: 0.4, delay: 0.5 + delay },
              scale: { duration: 0.4, delay: 0.5 + delay },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              },
            }
      }
      className={cn(
        "absolute z-20 select-none rounded-full border border-border/70 bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md",
        className,
      )}
    >
      {label}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };
  const portraitVariant = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 24 },
        show: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:pt-24 lg:pb-0"
    >
      {/* ---------- Background layers ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Mesh gradient blobs */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/35 via-teal-300/30 to-sky-400/35 blur-[110px] dark:from-emerald-500/20 dark:via-teal-500/12 dark:to-sky-500/20" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-cyan-400/25 to-emerald-400/25 blur-[100px] dark:from-cyan-500/12 dark:to-emerald-500/12" />
        <div className="absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-lime-300/25 to-emerald-400/30 blur-[100px] dark:from-lime-500/10 dark:to-emerald-500/14" />

        {/* Subtle grid, faded out toward the edges */}
        <div
          className="absolute inset-0 opacity-[0.55] dark:opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        {/* Fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show">
          {siteConfig.availability ? (
            <motion.div variants={item} className="mb-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-600/25 bg-emerald-500/10 py-1.5 pl-2.5 pr-4 text-xs font-medium text-emerald-800 backdrop-blur-sm dark:border-emerald-400/25 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {siteConfig.availability}
              </span>
            </motion.div>
          ) : null}

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl dark:from-emerald-300 dark:via-teal-300 dark:to-sky-300"
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group shadow-lg shadow-emerald-600/20",
              )}
            >
              View Work
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "bg-background/60 backdrop-blur-sm",
              )}
            >
              Let&apos;s talk
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={item}
            className="mt-12 flex max-w-lg items-center gap-8 border-t border-border pt-7 sm:gap-12"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-bold tracking-tight sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={item} className="mt-8">
            <SocialLinks className="-ml-2.5" />
          </motion.div>
        </motion.div>

        {/* Portrait column */}
        <motion.div
          variants={portraitVariant}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-85 sm:max-w-95 lg:max-w-105"
        >
          {/* Glow + ring behind the cut-out */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-4 -z-10 aspect-square w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/45 via-teal-400/35 to-sky-400/45 blur-3xl dark:from-emerald-500/25 dark:via-teal-500/20 dark:to-sky-500/25"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-8 -z-10 aspect-square w-[104%] -translate-x-1/2 rounded-full border border-emerald-600/20 dark:border-emerald-400/20"
          />

          {/* Grounding pedestal so the cut-out doesn't float in space */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-2 -z-10 h-32 rounded-[50%] bg-gradient-to-t from-emerald-500/30 to-transparent blur-2xl dark:from-emerald-400/18"
          />

          {/* Fade the cropped bottom of the cut-out into the page */}
          <Image
            src={siteConfig.heroPortrait}
            alt={`${siteConfig.name}, ${siteConfig.title}`}
            width={816}
            height={1132}
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 340px"
            className="relative z-10 mx-auto h-auto w-full drop-shadow-2xl"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 72%, transparent 99%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 72%, transparent 99%)",
            }}
          />

          {/* Floating tech chips — hugging the silhouette */}
          <FloatingChip
            label={heroChips[0]}
            reduce={reduce}
            delay={0}
            floatDelay={0}
            className="-left-4 top-24 sm:-left-8"
          />
          <FloatingChip
            label={heroChips[1]}
            reduce={reduce}
            delay={0.12}
            floatDelay={1.2}
            className="-right-2 top-10 sm:-right-6"
          />
          <FloatingChip
            label={heroChips[2]}
            reduce={reduce}
            delay={0.24}
            floatDelay={2.4}
            className="-right-4 bottom-32 sm:-right-8"
          />
          <FloatingChip
            label={heroChips[3]}
            reduce={reduce}
            delay={0.36}
            floatDelay={3.6}
            className="-left-2 bottom-20 sm:-left-6"
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? {} : { opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-accent lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDown
          className="h-4 w-4 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        />
      </motion.a>
    </section>
  );
}
