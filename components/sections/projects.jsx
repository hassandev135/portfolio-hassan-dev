import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GithubIcon } from "@/components/icons";
import { TechIcon } from "@/lib/tech-icons";

/**
 * Selected work as an index: thumbnail, title, summary, stack. The whole row
 * links to the case study; hover states are pure CSS.
 */

function ProjectRow({ project }) {
  return (
    <RevealItem as="li" className="group relative border-b border-border">
      <div className="relative flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-52">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(min-width: 640px) 208px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

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
              className="mt-1.5 h-5 w-5 shrink-0 -translate-x-1 translate-y-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
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
    </RevealItem>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="border-t border-border">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="Selected work"
        description="A few projects I'm proud of. Each links to a short case study covering the problem, the approach, and the result."
      />

      <RevealGroup as="ul" className="border-t border-border">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </RevealGroup>
    </Section>
  );
}
