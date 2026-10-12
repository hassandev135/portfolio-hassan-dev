"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Makes its content behave like a physical card:
 *  - Pointer: tilts in 3D to face the cursor anywhere on screen, with a soft
 *    glare that follows the cursor while it is over the card.
 *  - Scroll: drifts and leans slightly as it moves through the viewport, so
 *    touch devices (no cursor) get motion too.
 *
 * Values are eased toward their targets in one requestAnimationFrame loop and
 * written as CSS variables — no React re-renders, no animation library. The
 * loop stops when everything has settled. Off entirely under reduced motion.
 *
 * Props:
 *  - max: maximum tilt in degrees (default 8)
 *  - drift: maximum scroll drift in px (default 24)
 */
export function Tilt({ children, className, max = 8, drift = 24 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

    const target = { rx: 0, ry: 0, sx: 0, ty: 0, gx: 50, gy: 50, glare: 0 };
    const current = { ...target };
    let frame = 0;

    const write = () => {
      el.style.setProperty("--rx", `${current.rx + current.sx}deg`);
      el.style.setProperty("--ry", `${current.ry}deg`);
      el.style.setProperty("--ty", `${current.ty}px`);
      el.style.setProperty("--gx", `${current.gx}%`);
      el.style.setProperty("--gy", `${current.gy}%`);
      el.style.setProperty("--glare", current.glare);
    };

    const tick = () => {
      let moving = false;
      for (const key in target) {
        const delta = target[key] - current[key];
        if (Math.abs(delta) > 0.01) {
          current[key] += delta * 0.1;
          moving = true;
        } else {
          current[key] = target[key];
        }
      }
      write();
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const clamp = (v) => Math.max(-1, Math.min(1, v));

    const onPointerMove = (e) => {
      const r = el.getBoundingClientRect();
      // Lean toward the cursor, measured from the card's centre against the
      // viewport, so the card reacts wherever the cursor is on screen.
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth / 2));
      const dy = clamp((e.clientY - (r.top + r.height / 2)) / (innerHeight / 2));
      target.ry = dx * max;
      target.rx = -dy * max;

      const over =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      target.gx = ((e.clientX - r.left) / r.width) * 100;
      target.gy = ((e.clientY - r.top) / r.height) * 100;
      target.glare = over ? 1 : 0;
      kick();
    };

    const onPointerLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.glare = 0;
      kick();
    };

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      // -1 when the card is above the viewport centre, +1 below it.
      const offset = clamp((r.top + r.height / 2 - innerHeight / 2) / innerHeight);
      target.ty = -offset * drift;
      target.sx = offset * (max / 2);
      kick();
    };

    onScroll();
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [max, drift]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative will-change-transform [transform:perspective(1100px)_translate3d(0,var(--ty,0px),0)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        className,
      )}
    >
      {children}
      {/* Glare: a soft accent spotlight under the cursor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),color-mix(in_srgb,var(--hue-1)_16%,transparent),transparent_55%)] opacity-(--glare,0)"
      />
    </div>
  );
}
