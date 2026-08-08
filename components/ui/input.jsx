import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Underline-style field: no box, just a baseline rule that lights up on
 * focus. Reads as editorial stationery rather than a web form.
 */
const Input = forwardRef(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "peer h-11 w-full border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground transition-colors outline-none",
        "placeholder:text-muted-foreground/60",
        "focus-visible:border-accent focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-hue-2",
        className,
      )}
      {...props}
    />
  );
});

export { Input };
