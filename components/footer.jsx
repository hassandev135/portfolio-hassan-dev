import { siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/logo";

export function Footer() {
  const year = 2026; // Static build year; update or derive as you prefer.

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <SocialLinks />

        <p className="text-sm text-muted-foreground">
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
      </div>
    </footer>
  );
}
