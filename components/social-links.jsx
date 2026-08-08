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
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
