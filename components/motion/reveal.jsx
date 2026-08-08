"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle scroll-triggered fade + slide-in. Animates once when the element
 * enters the viewport. Honors `prefers-reduced-motion` by rendering static.
 *
 * Props:
 *  - as: tag name to render (default "div") — pass "li"/"article" etc. so the
 *        wrapper stays valid inside lists and other structured markup
 *  - delay: seconds before the animation starts
 *  - y: initial vertical offset in px (default 16)
 */
export function Reveal({ children, className, delay = 0, y = 16, as = "div", ...props }) {
  const reduce = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container that staggers the reveal of its children. Pair with
 * <RevealItem> for list/grid entrances.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
  ...props
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className, y = 16, as = "div", ...props }) {
  const reduce = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
