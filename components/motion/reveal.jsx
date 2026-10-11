"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered fade + slide-in, driven by one IntersectionObserver and a
 * CSS keyframe (see `.reveal` in globals.css) — no animation library.
 * Reduced-motion users get the content immediately; with JS disabled a
 * <noscript> rule in the layout un-hides everything.
 */
function useReveal(onShow) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    onShow?.(el);

    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "shown";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Props:
 *  - as: tag name to render (default "div") — pass "li"/"article" etc. so the
 *        wrapper stays valid inside lists and other structured markup
 *  - delay: seconds before the animation starts
 *  - y: initial vertical offset in px (default 16)
 */
export function Reveal({ children, className, delay = 0, y = 16, as: Tag = "div", style, ...props }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Container that staggers the reveal of its <RevealItem> children.
 */
export function RevealGroup({ children, className, stagger = 0.08, as: Tag = "div", ...props }) {
  const ref = useReveal((el) => {
    [...el.children].forEach((child, i) => {
      child.style.setProperty("--reveal-delay", `${i * stagger}s`);
    });
  });
  return (
    <Tag ref={ref} data-reveal="" className={cn("reveal-group", className)} {...props}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, y = 16, as: Tag = "div", style, ...props }) {
  return (
    <Tag
      className={cn("reveal-item", className)}
      style={{ "--reveal-y": `${y}px`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
