import Image from "next/image";

/**
 * Global MDX component overrides. These apply to every `.mdx` file in the app.
 * Case-study styling largely comes from the `prose` wrapper in the
 * `/projects/[slug]` layout, so here we only override elements that benefit
 * from Next.js primitives (e.g. optimized images).
 */
export function useMDXComponents(components) {
  return {
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg border border-border"
        {...props}
      />
    ),
    ...components,
  };
}
