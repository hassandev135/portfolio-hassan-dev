import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        accent: "border-transparent bg-accent-subtle text-accent",
        outline: "border-border bg-transparent text-foreground",
        /* Live status — the ping dot is supplied by the caller. */
        status:
          "border-hue-3/30 bg-hue-3/10 text-hue-3 dark:border-hue-3/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
