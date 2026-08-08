import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-30 w-full resize-y border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground transition-colors outline-none",
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

export { Textarea };
