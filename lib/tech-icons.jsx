/**
 * Central map: skill / tech name → real brand icon + brand color.
 *
 * `color` is the official brand hex used in light mode; `darkColor` (optional)
 * is a lighter variant so the mark stays legible on dark surfaces. Marks whose
 * brand color is black/near-black (Next.js, Vercel, Prisma, GraphQL, Express…)
 * use `currentColor` so they invert with the theme automatically.
 */
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFramer,
  SiDocker,
  SiGit,
  SiRedis,
  SiPrisma,
  SiGraphql,
  SiVercel,
  SiGithubactions,
  SiAuth0,
  SiThreedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Accessibility, Boxes, Drama } from "lucide-react";

// name (lowercased) → { Icon, color, darkColor? }
const MAP = {
  "react": { Icon: SiReact, color: "#61DAFB" },
  "next.js": { Icon: SiNextdotjs, color: "currentColor" },
  "nextjs": { Icon: SiNextdotjs, color: "currentColor" },
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "nodejs": { Icon: SiNodedotjs, color: "#5FA04E" },
  "node": { Icon: SiNodedotjs, color: "#5FA04E" },
  "postgresql": { Icon: SiPostgresql, color: "#4169E1", darkColor: "#7AA0F2" },
  "postgres": { Icon: SiPostgresql, color: "#4169E1", darkColor: "#7AA0F2" },
  "tailwind css": { Icon: SiTailwindcss, color: "#06B6D4" },
  "tailwind": { Icon: SiTailwindcss, color: "#06B6D4" },
  "javascript": { Icon: SiJavascript, color: "#F7DF1E", darkColor: "#F7DF1E" },
  "typescript": { Icon: SiTypescript, color: "#3178C6", darkColor: "#6EA8E8" },
  "framer motion": { Icon: SiFramer, color: "#0055FF", darkColor: "#7AA0FF" },
  "framer": { Icon: SiFramer, color: "#0055FF", darkColor: "#7AA0FF" },
  "docker": { Icon: SiDocker, color: "#2496ED" },
  "git": { Icon: SiGit, color: "#F05032" },
  "redis": { Icon: SiRedis, color: "#FF4438" },
  "prisma": { Icon: SiPrisma, color: "currentColor" },
  "rest & graphql": { Icon: SiGraphql, color: "#E10098", darkColor: "#F45FC0" },
  "graphql": { Icon: SiGraphql, color: "#E10098", darkColor: "#F45FC0" },
  "vercel": { Icon: SiVercel, color: "currentColor" },
  "github actions": { Icon: SiGithubactions, color: "#2088FF", darkColor: "#6EB0FF" },
  "aws": { Icon: FaAws, color: "#FF9900" },
  "auth / oauth": { Icon: SiAuth0, color: "#EB5424", darkColor: "#F58B6C" },
  "three.js": { Icon: SiThreedotjs, color: "currentColor" },
  "playwright": { Icon: Drama, color: "#2EAD33" },
  "accessibility (a11y)": { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
  "a11y": { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
};

const FALLBACK = { Icon: Boxes, color: "currentColor" };

/** Look up a tech's icon descriptor by display name (case-insensitive). */
export function getTechIcon(name) {
  return MAP[String(name).toLowerCase().trim()] || FALLBACK;
}

/**
 * Render a brand icon. Vivid brand hexes read on both light and dark surfaces;
 * near-black brands (Next.js, Vercel, Prisma, Three.js) use `currentColor` so
 * they invert with the theme automatically.
 */
export function TechIcon({ name, className }) {
  const { Icon, color } = getTechIcon(name);
  return (
    <Icon
      className={className}
      style={color === "currentColor" ? undefined : { color }}
      aria-hidden="true"
    />
  );
}
