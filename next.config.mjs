import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import createMDX from "@next/mdx";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Treat MDX (and Markdown) files as first-class pages/imports alongside JS/JSX.
  pageExtensions: ["js", "jsx", "md", "mdx"],
  // Pin the workspace root so Next doesn't pick up an unrelated parent lockfile.
  turbopack: { root: projectRoot },
  images: {
    // Allow our own SVG placeholder thumbnails through next/image. Safe here
    // because we only serve first-party SVGs; the CSP + sandbox neutralize any
    // scripts, and downloads are forced rather than rendered inline.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withMDX = createMDX({
  // Pass remark/rehype plugins as strings so they also work under Turbopack.
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
