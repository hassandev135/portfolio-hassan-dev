"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle scroll-triggered fade + slide-in. Animates once when the element
 * enters the viewport. Honors `prefers-reduced-motion` by rendering static.
 *
 * Props:
 *  - as: element/component to render (default motion.div)
 *  - delay: seconds before the animation starts
 *  - y: initial vertical offset in px (default 16)
 */
export function Reveal({ children, className, delay = 0, y = 16, ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers the reveal of its children. Pair with
 * <RevealItem> for list/grid entrances.
 */
export function RevealGroup({ children, className, stagger = 0.08, ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
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
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 16, ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
