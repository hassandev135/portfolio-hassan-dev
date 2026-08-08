"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { GithubIcon } from "@/components/icons";
import { TechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

/**
 * Selected work as an index, not a card grid.
 *
 * Adapted from the 21st.dev "Project Showcase": hovering a row floats a
 * preview of that project beside the cursor. The original smoothed the
 * position by lerping inside a rAF loop that called setState every frame;
 * this version drives two motion springs instead, so the preview tracks the
 * pointer without re-rendering the list.
 */

const PREVIEW_W = 300;
const PREVIEW_H = 190;

function useCursorPreview(index) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 320, damping: 34, mass: 0.6 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const primed = useRef(false);

  /* Called by the list on pointer move. The first sample jumps rather than
     springs, so the preview never flies in from the top-left corner. */
  const track = (event) => {
    x.set(event.clientX);
    y.set(event.clientY);
    if (!primed.current) {
      smoothX.jump(event.clientX);
      smoothY.jump(event.clientY);
      primed.current = true;
    }
  };

  const node = (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          aria-hidden="true"
          style={{ x: smoothX, y: smoothY }}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: PREVIEW_W, height: PREVIEW_H }}
            className="relative -translate-x-1/2 -translate-y-[125%] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lg)]"
          >
            {projects.map((project, i) => (
              <Image
                key={project.slug}
                src={project.thumbnail}
                alt=""
                fill
                sizes="300px"
                className={cn(
                  "object-cover transition-all duration-500 ease-out",
                  i === index
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-110 opacity-0 blur-md",
                )}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return { track, node };
}

function ProjectRow({ project, index, isActive, isDimmed, onEnter, onLeave }) {
  return (
    <li
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "group relative border-b border-border transition-opacity duration-300",
        isDimmed && "lg:opacity-40",
      )}
    >
      <div className="relative flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8">
        {/* Thumbnail — inline on small screens, where there is no cursor. */}
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-44 lg:hidden">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(min-width: 640px) 176px, 100vw"
            className="object-cover"
          />
        </div>

        <span className="hidden shrink-0 pt-2 font-mono text-xs tabular-nums text-muted-foreground lg:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="flex items-start gap-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {/* Stretched link — the whole row navigates to the case study. */}
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm transition-colors after:absolute after:inset-0 group-hover:text-accent"
            >
              {project.title}
            </Link>
            <ArrowUpRight
              className={cn(
                "mt-1.5 h-5 w-5 shrink-0 text-accent transition-all duration-300",
                isActive
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "-translate-x-2 translate-y-2 opacity-0",
              )}
              aria-hidden="true"
            />
          </h3>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-1.5 text-xs font-medium tracking-tight text-muted-foreground"
              >
                <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* External links sit above the stretched link. */}
        <div className="relative z-10 flex shrink-0 items-center gap-4 sm:pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function Projects() {
  const [hovered, setHovered] = useState(null);
  const reduce = useReducedMotion();
  const preview = useCursorPreview(reduce ? null : hovered);

  return (
    <Section id="projects" className="border-t border-border">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="Selected work"
        description="A few projects I'm proud of. Each links to a short case study covering the problem, the approach, and the result."
      />

      {preview.node}

      <ul onMouseMove={preview.track} className="border-t border-border">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            isActive={hovered === i}
            isDimmed={hovered !== null && hovered !== i}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>
    </Section>
  );
}
