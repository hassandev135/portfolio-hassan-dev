import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects, siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// Pre-render one page per known project; unknown slugs 404.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Case-study body lives in /content/projects/<slug>.mdx.
  const { default: CaseStudy } = await import(
    `@/content/projects/${slug}.mdx`
  );

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-28 pt-36">
      <Reveal>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to projects
        </Link>

        <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          {project.description}
        </p>

        {/* Tech stack */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t}>
              <Badge variant="accent">{t}</Badge>
            </li>
          ))}
        </ul>

        {/* External links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View live
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <GithubIcon className="h-4 w-4" />
              Source code
            </a>
          ) : null}
        </div>
      </Reveal>

      {/* Hero image */}
      <Reveal delay={0.1} className="mt-10">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={project.thumbnail}
            alt={`${project.title} hero image`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      {/* MDX case study: Problem → Approach → Result */}
      <Reveal
        delay={0.15}
        className="prose prose-zinc mt-14 max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent"
      >
        <CaseStudy />
      </Reveal>
    </article>
  );
}
