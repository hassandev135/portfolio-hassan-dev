import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button styles. Exported as `buttonVariants` too so anchors/links can be
 * styled as buttons without an extra Slot dependency:
 *   <Link className={buttonVariants({ variant: "outline" })}>…</Link>
 *
 * Editorial system: fully-rounded pills, hairline borders, no gradients on
 * interactive chrome — colour is reserved for content, not controls.
 */
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background shadow-[var(--shadow-md)] hover:bg-accent hover:text-accent-foreground",
        accent:
          "bg-accent text-accent-foreground shadow-[var(--shadow-md)] hover:opacity-90",
        outline:
          "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef(function Button(
  { className, variant, size, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

export { Button, buttonVariants };
