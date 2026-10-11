import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[80svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[clamp(6rem,22vw,14rem)] font-bold leading-none tracking-[-0.05em]">
        <span className="text-accent">404</span>
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
        The page you&apos;re looking for may have moved, or never existed.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "group mt-10")}>
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back home
      </Link>
    </div>
  );
}
