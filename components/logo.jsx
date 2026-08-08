import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Theme-aware brand logo. Renders both variants and swaps them with the
 * `dark:` variant (CSS, driven by the `.dark` class) so there's no hydration
 * flash — the correct one is chosen before paint.
 */
export function Logo({ className }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/hn-logo-light.png"
        alt="Hassan Nawaz — Full-Stack Engineer"
        width={1408}
        height={646}
        priority
        className="block h-8 w-auto dark:hidden sm:h-9"
      />
      <Image
        src="/images/hn-logo-dark.png"
        alt=""
        aria-hidden="true"
        width={1408}
        height={646}
        priority
        className="hidden h-8 w-auto dark:block sm:h-9"
      />
    </span>
  );
}
