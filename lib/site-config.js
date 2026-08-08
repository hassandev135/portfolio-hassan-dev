/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth for all content on the site.
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit the values below to make the portfolio your own. Anything marked
 *  `[PLACEHOLDER]` is dummy content you should replace.
 *
 *  - Identity / links ............ `siteConfig`
 *  - Bio / "what I do" ........... `about`
 *  - Skills ...................... `skillGroups`
 *  - Projects (cards) ............ `projects`  (case-study body lives in
 *                                   /content/projects/<slug>.mdx)
 *  - Experience timeline ......... `experience`
 *  ─────────────────────────────────────────────────────────────────────────
 *
 *  @typedef {{ label: string, href: string }} NavItem
 *  @typedef {{ slug: string, title: string, description: string, tech: string[],
 *              thumbnail: string, liveUrl?: string, githubUrl?: string,
 *              featured?: boolean }} Project
 *  @typedef {{ title: string, skills: string[] }} SkillGroup
 *  @typedef {{ role: string, company: string, start: string, end: string,
 *              description: string }} ExperienceEntry
 */

/** Deployed origin — used for canonical URLs, OG tags, sitemap and robots. */
export const siteUrl = "https://your-domain.com"; // [PLACEHOLDER]

export const siteConfig = {
  /* ---- Identity ------------------------------------------------------- */
  name: "Hassan Nawaz",
  /** Short role/title shown under the name. */
  title: "Full-Stack Engineer",
  /** One-line value proposition for the hero. */
  tagline:
    "I help startups and growing teams turn ideas into fast, scalable web applications — thoughtfully designed, accessible to everyone, and built to last.",
  /** Longer sentence used in metadata descriptions. */
  description:
    "Portfolio of Hassan Nawaz, a full-stack engineer building fast, accessible, and thoughtfully designed web applications.",

  /* ---- Contact & socials ---------------------------------------------- */
  email: "ranhassannawaz@gmail.com",
  location: "Pakistan",

  socials: {
    github: "https://github.com/ranahassan135",
    linkedin: "https://www.linkedin.com/in/hassan-nawaz-36a5a7292/",
    // WhatsApp: international format, no leading 0 (PK +92).
    whatsapp: "https://wa.me/923396602525",
  },

  /** Résumé lives in /public. Replace resume.pdf with your own file. */
  resumeUrl: "/resume.pdf",

  /** Status pill shown at the top of the hero. Set to "" to hide it. */
  availability: "Available for new projects",

  /** Cut-out portrait (transparent PNG) used in the hero. */
  heroPortrait: "/images/portrait.png",
};

/**
 * Credibility stats shown under the hero CTAs.
 * [PLACEHOLDER] — update these numbers to your real ones.
 * @type {{ value: string, label: string }[]}
 */
export const heroStats = [
  { value: "3+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "15+", label: "Technologies" },
];

/** Tech chips that float around the hero portrait. */
export const heroChips = ["Next.js", "React", "Node.js", "PostgreSQL"];

/**
 * Anchor navigation for the single-page layout.
 * @type {NavItem[]}
 */
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ---- About [PLACEHOLDER copy] ----------------------------------------- */
export const about = {
  /** Photo shown in the About section. Swap for any image in /public/images. */
  photo: "/images/im3.jpeg",
  paragraphs: [
    "I like building software where “almost working” is not good enough.",
    "Payments need to reconcile. Trading rules need to trigger correctly. APIs need to behave when things go wrong — not just when everything goes right.",
    "Thats the kind of engineering I enjoy.",
    "I work across the stack, turning complicated business logic into products that feel simple on the surface. My experience spans payment infrastructure, merchant platforms, and prop-trading systems, from the interfaces people interact with to the services, APIs, and data flows running underneath.",
    "For me, good software is not just code that works.",
    "its software you can trust"
  ],
  /** Short "who I help / what I do" bullets. */
  whatIDo: [
    "Think beyond the happy path — edge cases matter.",
    "Make complexity feel simple — especially in financial products.",
    "Build for production — reliability before cleverness.",
  ],
};

/**
 * Skills grouped by area.
 * @type {SkillGroup[]}
 */
export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Accessibility (a11y)",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "REST & GraphQL",
      "Redis",
      "Auth / OAuth",
    ],
  },
  {
    title: "Tools / DevOps",
    skills: ["Git", "Docker", "Vercel", "GitHub Actions", "AWS", "Playwright"],
  },
];

/**
 * Projects (cards). Case-study body lives in /content/projects/<slug>.mdx.
 * @type {Project[]}
 */
export const projects = [
  {
    slug: "taskflow",
    title: "TaskFlow — Team Task Manager",
    description:
      "A real-time task manager with boards, drag-and-drop, and presence, built for small teams that outgrew spreadsheets.",
    tech: ["Next.js", "JavaScript", "PostgreSQL", "WebSockets", "Tailwind"],
    thumbnail: "/images/projects/taskflow.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/taskflow",
    featured: true,
  },
  {
    slug: "atlas-analytics",
    title: "Atlas — Privacy-First Analytics",
    description:
      "A lightweight, cookieless analytics dashboard that gives site owners the metrics that matter without tracking users.",
    tech: ["Next.js", "ClickHouse", "Recharts", "Edge Functions"],
    thumbnail: "/images/projects/atlas.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/atlas",
    featured: true,
  },
  {
    slug: "verdant-store",
    title: "Verdant — Headless Storefront",
    description:
      "A performant headless e-commerce storefront with instant search, optimistic cart updates, and a 100 Lighthouse score.",
    tech: ["Next.js", "Stripe", "Algolia", "Tailwind", "Vercel"],
    thumbnail: "/images/projects/verdant.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/verdant",
  },
];

/**
 * Experience / timeline [PLACEHOLDER].
 * @type {ExperienceEntry[]}
 */
export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    start: "2023",
    end: "Present",
    description:
      "Lead front-end architecture for the flagship product, mentored engineers, and cut page load times by 40% through rendering and bundling improvements.",
  },
  {
    role: "Full-Stack Engineer",
    company: "Nimbus Labs",
    start: "2021",
    end: "2023",
    description:
      "Built and shipped features across a Next.js + Node stack, introduced an end-to-end testing suite, and owned the design-system migration.",
  },
  {
    role: "Frontend Developer",
    company: "Bright Studio",
    start: "2019",
    end: "2021",
    description:
      "Delivered marketing sites and web apps for a range of clients, focusing on performance, accessibility, and pixel-accurate implementation.",
  },
];

/** @param {string} slug */
export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
