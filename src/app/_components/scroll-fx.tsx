"use client";

import { useEffect, useRef } from "react";
import cn from "classnames";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type ParallaxProps = {
  children: React.ReactNode;
  /** max translation in px as the element crosses the viewport */
  amount?: number;
  axis?: "x" | "y";
  className?: string;
  innerClassName?: string;
};

/**
 * Translates its child slowly along an axis as the element moves through
 * the viewport, giving depth against the normal scroll speed.
 */
export function Parallax({
  children,
  amount = 60,
  axis = "y",
  className,
  innerClassName,
}: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = outer.current;
      const tgt = inner.current;
      if (!el || !tgt) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (vh - r.top) / (vh + r.height); // 0 → 1 across viewport
      const t = (progress - 0.5) * 2 * amount;
      tgt.style.transform =
        axis === "y"
          ? `translate3d(0, ${t.toFixed(1)}px, 0)`
          : `translate3d(${t.toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount, axis]);

  return (
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <div ref={inner} className={cn("will-change-transform", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

type HeroFxProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Fades and gently lifts the hero foreground as the user scrolls away from
 * the top of the page.
 */
export function HeroFx({ children, className }: HeroFxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      el.style.opacity = String(1 - progress);
      el.style.transform = `translate3d(0, ${(progress * -48).toFixed(1)}px, 0) scale(${(1 - progress * 0.04).toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
