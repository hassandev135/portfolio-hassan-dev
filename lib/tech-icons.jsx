/**
 * Central registry: skill / tech name → real brand icon + brand color.
 *
 * `color` is the official brand hex used in light mode; `darkColor` (optional)
 * is a lighter variant so the mark stays legible on dark surfaces. Marks whose
 * brand color is black/near-black (Next.js, Vercel, Prisma, Express, Flask…)
 * use `currentColor` so they invert with the theme automatically.
 *
 * Adding a tech: put the lowercased display name in `MAP`, plus any aliases
 * people actually type ("postgres" as well as "postgresql"). Anything not
 * found falls back to a neutral glyph and, in development, warns in the
 * console so a missing mark is noticed rather than silently generic.
 */
import {
  // ── Languages & markup ──
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiSass,
  SiPython,
  SiPhp,
  SiGo,
  SiRust,
  SiKotlin,
  SiSwift,
  SiDart,
  SiCplusplus,
  SiSharp,
  SiMarkdown,
  SiMdx,
  // ── Frontend ──
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiSvelte,
  SiAngular,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiChakraui,
  SiRadixui,
  SiShadcnui,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
  SiRedux,
  SiReactquery,
  SiJquery,
  SiElectron,
  SiExpo,
  SiFlutter,
  // ── Backend & APIs ──
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiBun,
  SiDeno,
  SiGraphql,
  SiTrpc,
  SiSocketdotio,
  SiSwagger,
  SiJsonwebtokens,
  SiSpring,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiLaravel,
  SiRubyonrails,
  SiDotnet,
  // ── Data ──
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiSqlite,
  SiMongodb,
  SiMongoose,
  SiRedis,
  SiPrisma,
  SiDrizzle,
  SiSequelize,
  SiTypeorm,
  SiClickhouse,
  SiElasticsearch,
  SiApachecassandra,
  SiApachekafka,
  SiRabbitmq,
  SiSupabase,
  SiFirebase,
  SiPlanetscale,
  // ── Cloud, infra & DevOps ──
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiNginx,
  SiLinux,
  SiUbuntu,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiDigitalocean,
  SiGooglecloud,
  SiRender,
  SiRailway,
  SiGrafana,
  SiPrometheus,
  SiSentry,
  SiJenkins,
  SiVault,
  SiMinio,
  // ── Source control & collaboration ──
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiBitbucket,
  SiJira,
  SiNotion,
  SiFigma,
  // ── Tooling & testing ──
  SiVite,
  SiWebpack,
  SiEslint,
  SiPrettier,
  SiNpm,
  SiPnpm,
  SiYarn,
  SiJest,
  SiVitest,
  SiCypress,
  SiTestinglibrary,
  SiPuppeteer,
  SiSelenium,
  SiStorybook,
  SiPostman,
  SiInsomnia,
  SiTermius,
  SiApachemaven,
  SiGradle,
  // ── Services & platforms ──
  SiStripe,
  SiAlgolia,
  SiAuth0,
  SiClerk,
  SiKeycloak,
  SiResend,
  SiPusher,
  SiShopify,
  SiWordpress,
  SiContentful,
  SiSanity,
  SiStrapi,
  SiAnthropic,
  SiChartdotjs,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import {
  Accessibility,
  Blocks,
  Boxes,
  Cable,
  ChartColumn,
  Drama,
  Gauge,
  Globe,
  MessageSquare,
  Network,
  Phone,
  Server,
  Shield,
  Sparkles,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";

/* Marks whose brand colour is black / near-black. Using `currentColor` keeps
   them legible in both themes instead of vanishing into the background. */
const INK = "currentColor";

// name (lowercased) → { Icon, color, darkColor? }
const MAP = {
  /* ── Languages & markup ─────────────────────────────────────────── */
  javascript: { Icon: SiJavascript, color: "#F7DF1E", darkColor: "#F7DF1E" },
  js: { Icon: SiJavascript, color: "#F7DF1E", darkColor: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6", darkColor: "#6EA8E8" },
  ts: { Icon: SiTypescript, color: "#3178C6", darkColor: "#6EA8E8" },
  html: { Icon: SiHtml5, color: "#E34F26" },
  html5: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#663399", darkColor: "#A78BFA" },
  css3: { Icon: SiCss, color: "#663399", darkColor: "#A78BFA" },
  "html / css": { Icon: SiHtml5, color: "#E34F26" },
  sass: { Icon: SiSass, color: "#CC6699" },
  scss: { Icon: SiSass, color: "#CC6699" },
  python: { Icon: SiPython, color: "#3776AB", darkColor: "#6FA8DC" },
  java: { Icon: FaJava, color: "#E76F00" },
  php: { Icon: SiPhp, color: "#777BB4", darkColor: "#A5A8D6" },
  go: { Icon: SiGo, color: "#00ADD8" },
  golang: { Icon: SiGo, color: "#00ADD8" },
  rust: { Icon: SiRust, color: INK },
  kotlin: { Icon: SiKotlin, color: "#7F52FF", darkColor: "#A98BFF" },
  swift: { Icon: SiSwift, color: "#F05138" },
  dart: { Icon: SiDart, color: "#0175C2", darkColor: "#4FA3DB" },
  "c++": { Icon: SiCplusplus, color: "#00599C", darkColor: "#5B9BD5" },
  "c#": { Icon: SiSharp, color: "#512BD4", darkColor: "#9A7BFF" },
  markdown: { Icon: SiMarkdown, color: INK },
  mdx: { Icon: SiMdx, color: INK },

  /* ── Frontend ───────────────────────────────────────────────────── */
  react: { Icon: SiReact, color: "#61DAFB" },
  "react.js": { Icon: SiReact, color: "#61DAFB" },
  reactjs: { Icon: SiReact, color: "#61DAFB" },
  "react native": { Icon: SiReact, color: "#61DAFB" },
  "next.js": { Icon: SiNextdotjs, color: INK },
  nextjs: { Icon: SiNextdotjs, color: INK },
  next: { Icon: SiNextdotjs, color: INK },
  "vue.js": { Icon: SiVuedotjs, color: "#4FC08D" },
  vue: { Icon: SiVuedotjs, color: "#4FC08D" },
  "nuxt.js": { Icon: SiNuxt, color: "#00DC82" },
  nuxt: { Icon: SiNuxt, color: "#00DC82" },
  svelte: { Icon: SiSvelte, color: "#FF3E00" },
  angular: { Icon: SiAngular, color: "#DD0031", darkColor: "#FF4E6A" },
  "tailwind css": { Icon: SiTailwindcss, color: "#06B6D4" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  bootstrap: { Icon: SiBootstrap, color: "#7952B3", darkColor: "#A78BFA" },
  "material ui": { Icon: SiMui, color: "#007FFF", darkColor: "#5AA9FF" },
  mui: { Icon: SiMui, color: "#007FFF", darkColor: "#5AA9FF" },
  "chakra ui": { Icon: SiChakraui, color: "#319795" },
  "radix ui": { Icon: SiRadixui, color: INK },
  "shadcn/ui": { Icon: SiShadcnui, color: INK },
  shadcn: { Icon: SiShadcnui, color: INK },
  "framer motion": { Icon: SiFramer, color: "#0055FF", darkColor: "#7AA0FF" },
  framer: { Icon: SiFramer, color: "#0055FF", darkColor: "#7AA0FF" },
  gsap: { Icon: SiGreensock, color: "#88CE02" },
  "three.js": { Icon: SiThreedotjs, color: INK },
  redux: { Icon: SiRedux, color: "#764ABC", darkColor: "#A98BFF" },
  "react query": { Icon: SiReactquery, color: "#FF4154" },
  "tanstack query": { Icon: SiReactquery, color: "#FF4154" },
  jquery: { Icon: SiJquery, color: "#0769AD", darkColor: "#4FA3DB" },
  electron: { Icon: SiElectron, color: "#47848F", darkColor: "#7FBFCC" },
  expo: { Icon: SiExpo, color: INK },
  flutter: { Icon: SiFlutter, color: "#02569B", darkColor: "#5AA9FF" },

  /* ── Backend & APIs ─────────────────────────────────────────────── */
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  "nest.js": { Icon: SiNestjs, color: "#E0234E", darkColor: "#FF5C7A" },
  nestjs: { Icon: SiNestjs, color: "#E0234E", darkColor: "#FF5C7A" },
  nest: { Icon: SiNestjs, color: "#E0234E", darkColor: "#FF5C7A" },
  "express.js": { Icon: SiExpress, color: INK },
  express: { Icon: SiExpress, color: INK },
  bun: { Icon: SiBun, color: "#FBF0DF", darkColor: "#FBF0DF" },
  deno: { Icon: SiDeno, color: INK },
  graphql: { Icon: SiGraphql, color: "#E10098", darkColor: "#F45FC0" },
  "rest & graphql": { Icon: SiGraphql, color: "#E10098", darkColor: "#F45FC0" },
  "rest apis": { Icon: Webhook, color: "#0EA5E9", darkColor: "#67C7F5" },
  rest: { Icon: Webhook, color: "#0EA5E9", darkColor: "#67C7F5" },
  trpc: { Icon: SiTrpc, color: "#2596BE", darkColor: "#5FBEDD" },
  "socket.io": { Icon: SiSocketdotio, color: INK },
  websockets: { Icon: Cable, color: "#0EA5E9", darkColor: "#67C7F5" },
  websocket: { Icon: Cable, color: "#0EA5E9", darkColor: "#67C7F5" },
  swagger: { Icon: SiSwagger, color: "#85EA2D" },
  openapi: { Icon: SiSwagger, color: "#85EA2D" },
  jwt: { Icon: SiJsonwebtokens, color: INK },
  microservices: { Icon: Network, color: "#8B5CF6", darkColor: "#A98BFF" },
  spring: { Icon: SiSpring, color: "#6DB33F" },
  "spring boot": { Icon: SiSpring, color: "#6DB33F" },
  django: { Icon: SiDjango, color: "#092E20", darkColor: "#44B78B" },
  flask: { Icon: SiFlask, color: INK },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  laravel: { Icon: SiLaravel, color: "#FF2D20" },
  "ruby on rails": { Icon: SiRubyonrails, color: "#D30001", darkColor: "#FF5A57" },
  ".net": { Icon: SiDotnet, color: "#512BD4", darkColor: "#9A7BFF" },

  /* ── Data ───────────────────────────────────────────────────────── */
  postgresql: { Icon: SiPostgresql, color: "#4169E1", darkColor: "#7AA0F2" },
  postgres: { Icon: SiPostgresql, color: "#4169E1", darkColor: "#7AA0F2" },
  mysql: { Icon: SiMysql, color: "#4479A1", darkColor: "#7FB0D6" },
  mariadb: { Icon: SiMariadb, color: "#003545", darkColor: "#8FC7D8" },
  sqlite: { Icon: SiSqlite, color: "#003B57", darkColor: "#8FC7D8" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  mongoose: { Icon: SiMongoose, color: "#880000", darkColor: "#E06A6A" },
  redis: { Icon: SiRedis, color: "#FF4438" },
  prisma: { Icon: SiPrisma, color: INK },
  drizzle: { Icon: SiDrizzle, color: "#C5F74F", darkColor: "#C5F74F" },
  sequelize: { Icon: SiSequelize, color: "#52B0E7" },
  typeorm: { Icon: SiTypeorm, color: "#FE0803", darkColor: "#FF6B69" },
  clickhouse: { Icon: SiClickhouse, color: "#FFCC01", darkColor: "#FFCC01" },
  elasticsearch: { Icon: SiElasticsearch, color: "#005571", darkColor: "#7FC3DB" },
  cassandra: { Icon: SiApachecassandra, color: "#1287B1", darkColor: "#5FB6D6" },
  kafka: { Icon: SiApachekafka, color: INK },
  rabbitmq: { Icon: SiRabbitmq, color: "#FF6600" },
  supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  firebase: { Icon: SiFirebase, color: "#FFCA28", darkColor: "#FFCA28" },
  planetscale: { Icon: SiPlanetscale, color: INK },
  sql: { Icon: SiPostgresql, color: "#4169E1", darkColor: "#7AA0F2" },
  "data modeling": { Icon: Server, color: "#8B5CF6", darkColor: "#A98BFF" },

  /* ── Cloud, infra & DevOps ──────────────────────────────────────── */
  docker: { Icon: SiDocker, color: "#2496ED" },
  kubernetes: { Icon: SiKubernetes, color: "#326CE5", darkColor: "#7FA6F0" },
  k8s: { Icon: SiKubernetes, color: "#326CE5", darkColor: "#7FA6F0" },
  terraform: { Icon: SiTerraform, color: "#7B42BC", darkColor: "#A98BFF" },
  ansible: { Icon: SiAnsible, color: INK },
  nginx: { Icon: SiNginx, color: "#009639" },
  linux: { Icon: SiLinux, color: INK },
  ubuntu: { Icon: SiUbuntu, color: "#E95420" },
  aws: { Icon: FaAws, color: "#FF9900" },
  azure: { Icon: VscAzure, color: "#0078D4", darkColor: "#5AA9FF" },
  gcp: { Icon: SiGooglecloud, color: "#4285F4", darkColor: "#8AB4F8" },
  "google cloud": { Icon: SiGooglecloud, color: "#4285F4", darkColor: "#8AB4F8" },
  vercel: { Icon: SiVercel, color: INK },
  netlify: { Icon: SiNetlify, color: "#00C7B7" },
  cloudflare: { Icon: SiCloudflare, color: "#F38020" },
  digitalocean: { Icon: SiDigitalocean, color: "#0080FF", darkColor: "#5AA9FF" },
  render: { Icon: SiRender, color: INK },
  railway: { Icon: SiRailway, color: INK },
  grafana: { Icon: SiGrafana, color: "#F46800" },
  prometheus: { Icon: SiPrometheus, color: "#E6522C" },
  sentry: { Icon: SiSentry, color: "#362D59", darkColor: "#A99BE0" },
  jenkins: { Icon: SiJenkins, color: "#D24939" },
  vault: { Icon: SiVault, color: INK },
  minio: { Icon: SiMinio, color: "#C72E49", darkColor: "#F2718B" },
  "ci/cd": { Icon: Workflow, color: "#8B5CF6", darkColor: "#A98BFF" },
  "edge functions": { Icon: Zap, color: "#F59E0B", darkColor: "#FBBF24" },
  serverless: { Icon: Zap, color: "#F59E0B", darkColor: "#FBBF24" },

  /* ── Source control & collaboration ─────────────────────────────── */
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: INK },
  "github actions": { Icon: SiGithubactions, color: "#2088FF", darkColor: "#6EB0FF" },
  gitlab: { Icon: SiGitlab, color: "#FC6D26" },
  bitbucket: { Icon: SiBitbucket, color: "#0052CC", darkColor: "#6699EE" },
  jira: { Icon: SiJira, color: "#0052CC", darkColor: "#6699EE" },
  notion: { Icon: SiNotion, color: INK },
  slack: { Icon: MessageSquare, color: "#4A154B", darkColor: "#C89BC9" },
  figma: { Icon: SiFigma, color: "#F24E1E" },

  /* ── Tooling & testing ──────────────────────────────────────────── */
  vite: { Icon: SiVite, color: "#646CFF", darkColor: "#9AA0FF" },
  webpack: { Icon: SiWebpack, color: "#8DD6F9", darkColor: "#8DD6F9" },
  eslint: { Icon: SiEslint, color: "#4B32C3", darkColor: "#9A8BEF" },
  prettier: { Icon: SiPrettier, color: "#F7B93E", darkColor: "#F7B93E" },
  npm: { Icon: SiNpm, color: "#CB3837", darkColor: "#F2716F" },
  pnpm: { Icon: SiPnpm, color: "#F69220" },
  yarn: { Icon: SiYarn, color: "#2C8EBB", darkColor: "#6BB6DA" },
  jest: { Icon: SiJest, color: "#C21325", darkColor: "#F0607A" },
  vitest: { Icon: SiVitest, color: "#6E9F18", darkColor: "#A6D14A" },
  cypress: { Icon: SiCypress, color: INK },
  "testing library": { Icon: SiTestinglibrary, color: "#E33332", darkColor: "#F5726F" },
  puppeteer: { Icon: SiPuppeteer, color: "#40B5A4" },
  selenium: { Icon: SiSelenium, color: "#43B02A" },
  playwright: { Icon: Drama, color: "#2EAD33" },
  storybook: { Icon: SiStorybook, color: "#FF4785" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  insomnia: { Icon: SiInsomnia, color: "#4000BF", darkColor: "#9A7BFF" },
  termius: { Icon: SiTermius, color: "#000000", darkColor: "#FFFFFF" },
  maven: { Icon: SiApachemaven, color: "#C71A36", darkColor: "#F2718B" },
  gradle: { Icon: SiGradle, color: "#02303A", darkColor: "#8FC7D8" },

  /* ── Services & platforms ───────────────────────────────────────── */
  stripe: { Icon: SiStripe, color: "#635BFF", darkColor: "#9A94FF" },
  algolia: { Icon: SiAlgolia, color: "#003DFF", darkColor: "#7A94FF" },
  "auth / oauth": { Icon: SiAuth0, color: "#EB5424", darkColor: "#F58B6C" },
  oauth: { Icon: SiAuth0, color: "#EB5424", darkColor: "#F58B6C" },
  auth0: { Icon: SiAuth0, color: "#EB5424", darkColor: "#F58B6C" },
  clerk: { Icon: SiClerk, color: "#6C47FF", darkColor: "#A98BFF" },
  keycloak: { Icon: SiKeycloak, color: "#4D4D4D", darkColor: "#B8B8B8" },
  nextauth: { Icon: Shield, color: "#8B5CF6", darkColor: "#A98BFF" },
  resend: { Icon: SiResend, color: INK },
  pusher: { Icon: SiPusher, color: "#300D4F", darkColor: "#B99BD6" },
  twilio: { Icon: Phone, color: "#F22F46" },
  shopify: { Icon: SiShopify, color: "#7AB55C" },
  wordpress: { Icon: SiWordpress, color: "#21759B", darkColor: "#6BA9C7" },
  contentful: { Icon: SiContentful, color: "#2478CC", darkColor: "#6BA9E0" },
  sanity: { Icon: SiSanity, color: "#F03E2F" },
  strapi: { Icon: SiStrapi, color: "#4945FF", darkColor: "#9A97FF" },
  openai: { Icon: Sparkles, color: "#10A37F" },
  anthropic: { Icon: SiAnthropic, color: "#D97757" },
  recharts: { Icon: ChartColumn, color: "#22B5BF" },
  "chart.js": { Icon: SiChartdotjs, color: "#FF6384" },

  /* ── Concepts (no brand mark exists) ────────────────────────────── */
  "accessibility (a11y)": { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
  a11y: { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
  accessibility: { Icon: Accessibility, color: "#0A84FF", darkColor: "#66B2FF" },
  performance: { Icon: Gauge, color: "#F59E0B", darkColor: "#FBBF24" },
  seo: { Icon: Globe, color: "#0EA5E9", darkColor: "#67C7F5" },
  "design systems": { Icon: Blocks, color: "#8B5CF6", darkColor: "#A98BFF" },
  security: { Icon: Shield, color: "#10B981", darkColor: "#4ADE9E" },
};

const FALLBACK = { Icon: Boxes, color: INK };

/* Warn once per unknown name so a missing brand mark surfaces in development
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

/**
 * Render a brand icon. Vivid brand hexes read on both light and dark surfaces;
 * near-black brands (Next.js, Vercel, Prisma, Rust…) use `currentColor` so they
 * invert with the theme, and `darkColor` overrides the hex on dark surfaces.
 */
export function TechIcon({ name, className }) {
  const { Icon, color, darkColor } = getTechIcon(name);

  // Near-black marks inherit the text colour so they invert with the theme.
  if (color === INK) {
    return <Icon className={className} aria-hidden="true" />;
  }

  /* The light and dark hexes are handed to CSS as custom properties and the
     `.tech-icon` rule picks between them, so the right colour is painted on
     first render — no `useTheme`, no hydration flash, one DOM node. */
  return (
    <Icon
      className={cn("tech-icon", className)}
      style={{ "--icon-light": color, "--icon-dark": darkColor || color }}
      aria-hidden="true"
    />
  );
}
