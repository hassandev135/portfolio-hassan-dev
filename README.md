# Personal Portfolio

A clean, content-first personal portfolio built with **Next.js 16 (App Router)**,
**JavaScript (JSX)**, **Tailwind CSS v4**, and subtle **Framer Motion** animations.
Single-page scroll layout with anchor navigation, plus dynamic MDX case-study pages.

## Features

- **Single-page layout** — Hero, About, Skills, Projects, Experience, Contact.
- **Dynamic case studies** — each project links to `/projects/[slug]`, rendered
  from MDX (`Problem → Approach → Result`).
- **Dark / light mode** — toggle via `next-themes`, persisted across visits.
- **Responsive & accessible** — mobile-first, semantic HTML, keyboard navigation,
  skip link, visible focus rings, `aria` labels, reduced-motion support.
- **SEO** — Metadata API, Open Graph tags, an auto-generated OG image,
  `sitemap.xml`, and `robots.txt`.
- **Performance** — `next/image`, `next/font` (Inter), no layout shift.
- **Contact form** — client-side validated, posts to `/api/contact` (logs the
  payload for now).
- **Vercel Analytics** — included and ready.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Project structure

```
app/
  layout.jsx              Root layout: fonts, metadata, theme provider, nav/footer
  page.jsx                Home page — composes the sections
  globals.css             Tailwind import + design tokens (colors, dark mode)
  opengraph-image.js      Auto-generated social share image
  sitemap.js              sitemap.xml
  robots.js               robots.txt
  not-found.jsx           404 page
  api/contact/route.js    POST endpoint for the contact form
  projects/[slug]/page.jsx  Dynamic case-study page (renders MDX)
components/
  navbar.jsx, footer.jsx, section.jsx, social-links.jsx, icons.jsx
  theme-provider.jsx, theme-toggle.jsx
  motion/reveal.jsx       Scroll-triggered fade/slide helpers
  sections/               hero, about, skills, projects, experience, contact
  ui/                     button, card, badge, input, textarea, label
content/projects/         MDX case-study bodies (one file per project slug)
lib/
  site-config.js          ← ALL your content lives here
  utils.js                cn() class-merge helper
public/
  resume.pdf              Placeholder résumé (replace with your own)
  images/                 Profile + project thumbnail placeholders
```

## Customizing content

Almost everything is driven from a single file: **`lib/site-config.js`**.
Anything marked `[PLACEHOLDER]` is dummy content to replace.

### 1. Your identity & links

Edit `siteConfig` in `lib/site-config.js`:

```js
export const siteUrl = "https://your-domain.com"; // used for SEO / sitemap

export const siteConfig = {
  name: "Your Name",
  title: "Full-Stack Engineer",
  tagline: "…your one-line value proposition…",
  description: "…used in page metadata…",
  email: "you@example.com",
  location: "Remote / Your City",
  socials: {
    github: "https://github.com/ranahassan135",
    linkedin: "https://www.linkedin.com/in/hassan-nawaz-36a5a7292/",
    whatsapp: "https://wa.me/923396602525", // international format, no leading 0
  },
  resumeUrl: "/resume.pdf",
};
```

To change which social icons appear (order/labels), edit
`components/social-links.jsx`.

### 2. Bio, photos & logo

Edit the `about` object (paragraphs + bullet list) in the same file.

**Photos** (in `public/images/`, rendered via `next/image`):

- **Hero portrait** — `img2.jpeg` (referenced in `components/sections/hero.jsx`).
- **About photo** — set by `about.photo` in `lib/site-config.js` (currently
  `img4.png`). Point it at any image in `public/images/`.
- Spare shots `im3.jpeg` (headshot) and `img1.jpeg` (candid) are unused — handy
  for a future gallery, case-study hero, or social profile.

**Logo** — theme-aware, in the navbar and footer via `components/logo.jsx`:

- `hn-logo-light.png` shows in light mode, `hn-logo-dark.png` in dark mode
  (swapped by the `.dark` CSS class — no flash).
- These are transparent cutouts. To change the logo, replace those two files
  (transparent PNG/SVG); the dark one should have light-colored marks so it
  reads on the dark navbar.

### 3. Skills

Edit `skillGroups` — each group has a `title` and a `skills` array (rendered as
badges). Add, remove, or rename groups freely.

### 4. Projects & case studies

Two parts per project:

1. **Card data** — add an entry to the `projects` array (`slug`, `title`,
   `description`, `tech`, `thumbnail`, optional `liveUrl` / `githubUrl`).
2. **Case-study body** — create `content/projects/<slug>.mdx` matching the
   `slug`. It's plain MDX; the page supplies the title, tech badges, hero image,
   and links, so the MDX only needs the `Problem / Approach / Result` narrative.

Thumbnails live in `public/images/projects/`. Replace the `.svg` placeholders
with your own images (any format `next/image` supports).

> Case-study slugs are pre-rendered from `generateStaticParams`, and
> `dynamicParams = false` means an unknown `/projects/...` URL returns 404.
> After adding a project, restart `npm run dev`.

### 5. Experience / timeline

Edit the `experience` array (`role`, `company`, `start`, `end`, `description`).

### 6. Résumé

Replace `public/resume.pdf` with your real PDF (keep the filename, or update
`siteConfig.resumeUrl`).

### 7. Accent color & theme

The single accent color and all neutral tokens are CSS variables in
`app/globals.css`, defined once for light (`:root`) and once for dark (`.dark`).
Change the emerald values to rebrand — e.g. set `--accent` / `--ring` to your hex.

The site **defaults to light mode** (set in `app/layout.jsx` via
`defaultTheme="light"`); the toggle switches to dark and the choice is persisted.
Light mode leans colorful — a multi-hue hero gradient, a gradient name, and
gradient section labels (`.text-gradient-accent`) — while colors cross-fade
smoothly when you toggle the theme. Edit those gradients in
`components/sections/hero.jsx` and the `.text-gradient-accent` rule in
`app/globals.css`.

## The contact form

`components/sections/contact.jsx` validates on the client and POSTs JSON to
`app/api/contact/route.js`, which re-validates and currently just `console.log`s
the message. To actually receive mail, replace that log with an email provider
(e.g. Resend, Postmark) or a database write.

## Notes on the stack

- **Tailwind v4** is configured via `@import "tailwindcss"` in `app/globals.css`
  (no `tailwind.config.js`). Dark mode uses a `.dark` class through a
  `@custom-variant` rule, driven by `next-themes`.
- **MDX** is wired through `@next/mdx` in `next.config.mjs`, with a root
  `mdx-components.js` mapping (e.g. images → `next/image`).
- The project is JavaScript/JSX. `tsconfig.json` is kept only so the `@/*`
  import alias resolves — no source file is TypeScript.

## Deploy

Deploy on [Vercel](https://vercel.com/new). Set `siteUrl` in
`lib/site-config.js` to your production domain so SEO tags, the sitemap, and the
OG image use absolute URLs. Vercel Analytics works automatically once deployed.
