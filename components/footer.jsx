import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/logo";

export function Footer() {
  const year = 2026; // Static build year; update or derive as you prefer.

  return (
    <footer className="grain relative overflow-hidden border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-lg leading-snug tracking-tight text-balance text-muted-foreground">
              <span className="serif-accent text-foreground">
                {siteConfig.title}
              </span>{" "}
              based in {siteConfig.location}.
            </p>
            <div className="mt-6">
              <SocialLinks className="-ml-2.5" />
            </div>
          </div>

          <nav aria-label="Footer" className="md:justify-self-end">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Index
            </h2>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="link-sweep text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="link-sweep text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-5 border-t border-border pt-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                Next.js
              </a>
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
