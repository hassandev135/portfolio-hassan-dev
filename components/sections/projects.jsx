import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

function ProjectCard({ project }) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/50">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start justify-between gap-3 text-lg font-semibold tracking-tight">
          {/* Stretched link makes the whole card navigate to the case study. */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>

        {/* External links sit above the stretched link (z-10). */}
        <div className="relative z-10 mt-5 flex items-center gap-4 pt-1">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              aria-label={`${project.title} live site`}
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              aria-label={`${project.title} source code on GitHub`}
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="bg-muted/30">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="A few projects I'm proud of. Each links to a short case study covering the problem, approach, and result."
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <RevealItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
