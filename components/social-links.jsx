import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: "WhatsApp",
    href: siteConfig.socials.whatsapp,
    Icon: WhatsappIcon,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
  },
];

export function SocialLinks({ className }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map(({ label, href, Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-subtle hover:text-accent"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
