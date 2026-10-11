"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  /* Section anchors only exist on the home route; elsewhere nothing is active. */
  const active = onHome ? activeSection : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section owns the upper third of the
  // viewport. Only runs on the single-page home route.
  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onHome]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ease-out",
          scrolled
            ? "frost shadow-[var(--shadow-md)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/#top"
          aria-label={`${siteConfig.name} — home`}
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo />
        </Link>

        {/* Desktop nav — the active section gets a muted pill. */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={siteConfig.resumeUrl}
            download
            className={cn(
              buttonVariants({ size: "sm" }),
              "group hidden md:inline-flex",
            )}
          >
            Résumé
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          className="animate-menu-in frost mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl shadow-[var(--shadow-lg)] md:hidden"
        >
          <ul className="flex flex-col p-3">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 rounded-2xl px-4 py-3.5 text-xl font-semibold tracking-tight transition-colors hover:bg-muted"
                >
                  <span className="font-mono text-xs text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-3">
            <a
              href={siteConfig.resumeUrl}
              download
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Download Résumé
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
