"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Text that resolves out of a blur, one segment at a time.
 *
 * Adapted from the 21st.dev "Portfolio Hero" BlurText effect, rebuilt on
 * Framer Motion (already a dependency) so it shares the site's easing curve
 * and reduced-motion handling instead of hand-rolling an IntersectionObserver.
 *
 * Props:
 *  - text: the string to animate
 *  - by: "letters" | "words" — animation granularity
 *  - as: element to render (default "span")
 *  - delay: seconds before the first segment starts
 *  - stagger: seconds between segments
 *  - trigger: "mount" (hero) | "view" (scrolled-to content)
 */
export function BlurText({
  text,
  by = "words",
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  trigger = "mount",
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.span;

  // Non-breaking space keeps word spacing intact between inline-block spans.
  const segments = by === "letters" ? [...text] : text.split(" ");

  if (reduce) {
    return (
      <Tag className={className} {...props}>
        {text}
      </Tag>
    );
  }

  const animateProps =
    trigger === "view"
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -80px 0px" } }
      : { animate: "show" };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
      {...animateProps}
      {...props}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, filter: "blur(12px)", y: "0.35em" },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {segment}
          {by === "words" && i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
