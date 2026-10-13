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
  /**
   * Short role label. Keep this to the job title alone — it is reused in the
   * page <title>, OG tags, image alt text and the footer ("… based in X"),
   * where a full sentence would read broken.
   */
  title: "Full-Stack Engineer",
  /** Hero headline. `accent` is set in the accent colour after `lead`. */
  headline: {
    lead: "I build the systems",
    accent: "money moves through.",
  },
  /** Short lead line directly under the headline. */
  subheadline: "Building software that holds up in production.",
  /** Supporting paragraph under the lead line. */
  tagline:
    "Full-stack engineer shipping web products and mobile applications end to end interfaces people enjoy using, backed by APIs, data and integrations that don’t break when it matters.",

  /** Longer sentence used in metadata descriptions. */
  description:
    "Portfolio of Hassan Nawaz, a full-stack engineer building the systems behind the experience — from interface to infrastructure.",

  /* ---- Contact & socials ---------------------------------------------- */
  email: "ranhassannawaz@gmail.com",
  location: "Pakistan",

  socials: {
    github: "https://github.com/hassandev135",
    linkedin: "https://www.linkedin.com/in/hassan-nawaz-36a5a7292/",
    // WhatsApp: international format, no leading 0 (PK +92).
    whatsapp: "https://wa.me/923218583001",
  },

  /** Résumé lives in /public. Replace resume.pdf with your own file. */
  resumeUrl: "/resume.pdf",

  /** Status pill shown at the top of the hero. Set to "" to hide it. */
  availability: "Available for new projects",

  /** Portrait used in the hero (card on desktop, avatar on mobile). */
  heroPortrait: "/images/portrait.png",
};

/**
 * Credibility stats shown under the hero CTAs.
 * [PLACEHOLDER] — update these numbers to your real ones.
 * @type {{ value: string, label: string }[]}
 */
export const heroStats = [
  { value: "3+", label: "Years building" },
  { value: "15+", label: "Projects shipped" },
  { value: "20+", label: "Technologies" },
];

/**
 * The request trace drawn in the hero: one checkout, in the order a real
 * payments stack runs it. Times are in ms on a shared axis.
 *
 *  - `attempts`: draw a span as several tries (e.g. a timed-out call that was
 *    retried). A `failed` attempt is drawn in the warning colour.
 *  - `async: true`: the span runs after the request has returned (e.g. a
 *    webhook sent from the outbox once the ledger write commits). These are
 *    listed under an "after commit" divider.
 *  - `tone`: "default" | "retry" | "success".
 */
export const heroTrace = {
  id: "pay_7Hq2xK",
  amount: "USD 49.00",
  spans: [
    { label: "POST /checkout", service: "api", start: 0, duration: 352 },
    { label: "Check idempotency key", service: "api", start: 4, duration: 16 },
    {
      label: "Authorize card",
      service: "payments",
      start: 24,
      duration: 262,
      tone: "retry",
      attempts: [
        { start: 24, duration: 150, failed: true },
        { start: 178, duration: 108 },
      ],
      note: "provider timeout → retried with same key, no double charge",
    },
    { label: "Write ledger + outbox", service: "postgres", start: 290, duration: 46 },
    { label: "Respond 200 OK", service: "api", start: 338, duration: 14 },
    {
      label: "Webhook to merchant",
      service: "outbox",
      start: 380,
      duration: 72,
      async: true,
      tone: "success",
    },
  ],
  /** Footer: the per-write invariant, and where reconciliation really lives. */
  result: "Entries balanced",
  resultDetail: "debit = credit",
  footnote: "Reconciled against provider settlement nightly",
};

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
    "Payments need to reconcile. Trading rules need to trigger correctly. APIs need to behave when things go wrong not just when everything goes right.\n That's the kind of engineering I enjoy.",
    "I work across the whole stack, turning complicated business logic into products that feel simple to use. My work ranges from fintech platforms to AI-powered tools and automation that take repetitive work off people’s hands. I care about the parts users never see: clean APIs, well-structured data, and integrations that keep working when something upstream doesn’t. Whether it’s a dashboard, a backend service or an AI workflow, I build it to be fast, maintainable and ready for production from day one.",
    "It's software you can trust."
  ],
  /** Short "who I help / what I do" bullets. */
  whatIDo: [
    "Think beyond the happy path — edge cases matter.",
    "Make complexity feel simple — whatever runs underneath.",
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
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Accessibility (a11y)",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Nest.js",
      "Express",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Auth / OAuth",
    ],
  },
  {
    title: "Tools / DevOps",
    skills: [
      "Git",
      "GitHub Actions",
      "Bitbucket",
      "Docker",
      "Termius",
      "AWS",
      "Vercel",
      "Postman",
      "Playwright",
    ],
  },
];

/**
 * Projects (cards). Case-study body lives in /content/projects/<slug>.mdx.
 * @type {Project[]}
 */
export const projects = [
  {
    slug: "prop-capitals",
    title: "Prop Capitals — Funded Trading Platform",
    description:
      "A prop-trading firm platform where traders buy evaluation challenges, trade on a live-priced web terminal, and are judged by an automated rules engine. I owned the payment stack and core parts of the trading engine.",
    tech: [
      "Nest.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "WebSockets",
      "Tailwind",
      "Vite",
      "GitHub Actions",
      "Termius",
      "Vercel",
    ],
    thumbnail: "/images/projects/prop-capitals.jpg",
    liveUrl: "https://prop-capitals.com",
    featured: true,
  },
  {
    slug: "chart-sdk",
    title: "Chart SDK — MT5-Style Trading Terminal for React",
    description:
      "An npm package that turns Lightweight Charts into a full trading terminal: live candles, market and pending orders, positions, account equity and drawing tools. It powers the web trader on Prop Capitals.",
    tech: ["React", "JavaScript", "WebSockets", "Vite", "npm"],
    thumbnail: "/images/projects/chart-sdk.jpg",
    liveUrl: "https://www.npmjs.com/package/@nabeeltahirdeveloper/chart-sdk",
    featured: true,
  },
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
