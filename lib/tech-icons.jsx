import {
  Accessibility,
  Boxes,
  Cable,
  ChartColumn,
  Drama,
  Webhook,
  Zap,
} from "lucide-react";
import { brandIcons } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

/* Marks whose brand colour is black / near-black. Using `currentColor` keeps
   them legible in both themes instead of vanishing into the background. */
const INK = "currentColor";

/* name (lowercased) → { brand | Icon, color, darkColor? }
   `brand` is a key of `brandIcons`; `Icon` is a lucide component used for
   concepts that have no brand mark. */
const MAP = {
  /* ── Languages & markup ─────────────────────────────────────────── */
  javascript: { brand: "javascript", color: "#F7DF1E" },
  typescript: { brand: "typescript", color: "#3178C6", darkColor: "#6EA8E8" },
  html: { brand: "html5", color: "#E34F26" },
  css: { brand: "css", color: "#663399", darkColor: "#A78BFA" },
  sass: { brand: "sass", color: "#CC6699" },
  python: { brand: "python", color: "#3776AB", darkColor: "#6FA8DC" },

  /* ── Frontend ───────────────────────────────────────────────────── */
  react: { brand: "react", color: "#61DAFB" },
  "next.js": { brand: "next", color: INK },
  "tailwind css": { brand: "tailwindcss", color: "#06B6D4" },
  tailwind: { brand: "tailwindcss", color: "#06B6D4" },
  "framer motion": { brand: "framer", color: "#0055FF", darkColor: "#7AA0FF" },
  redux: { brand: "redux", color: "#764ABC", darkColor: "#A98BFF" },
  vite: { brand: "vite", color: "#646CFF", darkColor: "#9AA0FF" },
  figma: { brand: "figma", color: "#F24E1E" },

  /* ── Backend & APIs ─────────────────────────────────────────────── */
  "node.js": { brand: "node", color: "#5FA04E" },
  "nest.js": { brand: "nestjs", color: "#E0234E", darkColor: "#FF5C7A" },
  express: { brand: "express", color: INK },
  graphql: { brand: "graphql", color: "#E10098", darkColor: "#F45FC0" },
  "rest apis": { Icon: Webhook, color: "#0EA5E9", darkColor: "#67C7F5" },
  websockets: { Icon: Cable, color: "#0EA5E9", darkColor: "#67C7F5" },
  "auth / oauth": { brand: "auth0", color: "#EB5424", darkColor: "#F58B6C" },

  /* ── Data ───────────────────────────────────────────────────────── */
  postgresql: { brand: "postgresql", color: "#4169E1", darkColor: "#7AA0F2" },
  mysql: { brand: "mysql", color: "#4479A1", darkColor: "#7FB0D6" },
  mongodb: { brand: "mongodb", color: "#47A248" },
  prisma: { brand: "prisma", color: INK },
  redis: { brand: "redis", color: "#FF4438" },
  clickhouse: { brand: "clickhouse", color: "#FFCC01" },
  supabase: { brand: "supabase", color: "#3FCF8E" },
  firebase: { brand: "firebase", color: "#FFCA28" },

  /* ── Cloud, infra & DevOps ──────────────────────────────────────── */
  docker: { brand: "docker", color: "#2496ED" },
  kubernetes: { brand: "kubernetes", color: "#326CE5", darkColor: "#7FA6F0" },
  nginx: { brand: "nginx", color: "#009639" },
  linux: { brand: "linux", color: INK },
  aws: { brand: "aws", color: "#FF9900" },
  vercel: { brand: "vercel", color: INK },
  "edge functions": { Icon: Zap, color: "#F59E0B", darkColor: "#FBBF24" },

  /* ── Source control & collaboration ─────────────────────────────── */
  git: { brand: "git", color: "#F05032" },
  github: { brand: "github", color: INK },
  "github actions": { brand: "githubactions", color: "#2088FF", darkColor: "#6EB0FF" },
  bitbucket: { brand: "bitbucket", color: "#0052CC", darkColor: "#6699EE" },
  jira: { brand: "jira", color: "#0052CC", darkColor: "#6699EE" },

  /* ── Tooling & testing ──────────────────────────────────────────── */
  jest: { brand: "jest", color: "#C21325", darkColor: "#F0607A" },
  playwright: { Icon: Drama, color: "#2EAD33" },
  postman: { brand: "postman", color: "#FF6C37" },
  termius: { brand: "termius", color: INK },

  /* ── Services & platforms ───────────────────────────────────────── */
  stripe: { brand: "stripe", color: "#635BFF", darkColor: "#9A94FF" },
  algolia: { brand: "algolia", color: "#003DFF", darkColor: "#7A94FF" },
  recharts: { Icon: ChartColumn, color: "#22B5BF" },

  /* ── Concepts (no brand mark exists) ────────────────────────────── */
  "accessibility (a11y)": { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
};

const FALLBACK = { Icon: Boxes, color: INK };

/* Warn once per unknown name so a missing mark surfaces in development
   instead of quietly rendering the generic box. */
const warned = new Set();

/** Look up a tech's icon descriptor by display name (case-insensitive). */
export function getTechIcon(name) {
  const key = String(name).toLowerCase().trim();
  const hit = MAP[key];

  if (!hit && process.env.NODE_ENV !== "production" && !warned.has(key)) {
    warned.add(key);
    console.warn(
      `[tech-icons] No icon mapped for "${name}" — add it to MAP in lib/tech-icons.jsx.`,
    );
  }

  return hit || FALLBACK;
}

/** True when `name` has a real brand/concept mark rather than the fallback. */
export function hasTechIcon(name) {
  return Boolean(MAP[String(name).toLowerCase().trim()]);
}

function BrandSvg({ brand, className, style }) {
  const { d, viewBox = "0 0 24 24" } = brandIcons[brand];
  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * Render a tech icon. Vivid brand hexes read on both light and dark surfaces;
 * near-black brands (Next.js, Vercel, Prisma…) use `currentColor` so they
 * invert with the theme, and `darkColor` overrides the hex on dark surfaces.
 */
export function TechIcon({ name, className }) {
  const { brand, Icon, color, darkColor } = getTechIcon(name);
  const ink = color === INK;

  /* The light and dark hexes are handed to CSS as custom properties and the
     `.tech-icon` rule picks between them, so the right colour is painted on
     first render — no JS theme lookup, no hydration flash. */
  const props = {
    className: cn(!ink && "tech-icon", className),
    style: ink
      ? undefined
      : { "--icon-light": color, "--icon-dark": darkColor || color },
  };

  return brand ? (
    <BrandSvg brand={brand} {...props} />
  ) : (
    <Icon {...props} aria-hidden="true" />
  );
}
