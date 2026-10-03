"use client";

import { useEffect, useRef } from "react";
import { light } from "./store";
import LightPanel from "./light-panel";

/**
 * Split editorial layout: a sticky painting on the left (a top band on
 * phones) and the page's sections on the right. Each `[data-light-section]`
 * the reader scrolls into moves the light one painting further through the
 * day; scrolling back walks it back.
 */
export default function LightSplit({
  children,
}: {
  children: React.ReactNode;
}) {
  const col = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    light.init();
    const sections = () =>
      Array.from(
        col.current?.querySelectorAll<HTMLElement>("[data-light-section]") ??
          [],
      );
    const activeIndex = () => {
      const vh = window.innerHeight;
      // On phones the band covers the top of the screen; read the middle of
      // what's left below it.
      const b = band.current?.getBoundingClientRect();
      const top = b && b.width < window.innerWidth * 0.9 ? 0 : (b?.bottom ?? 0);
      const line = top + (vh - top) * 0.5;
      let idx = 0;
      sections().forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) idx = i;
      });
      return idx;
    };

    let current = activeIndex();
    let raf = 0;
    const update = () => {
      raf = 0;
      const idx = activeIndex();
      if (idx !== current) {
        light.step(idx - current);
        current = idx;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative md:grid md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
      <div
        ref={band}
        className="sticky top-[68px] z-20 h-[calc(32vh+80px)] bg-paper px-5 pb-3 pt-0 shadow-[0_1px_0_rgba(43,42,38,0.08)] md:top-0 md:h-screen md:self-start md:px-0 md:pb-8 md:pl-12 md:pr-4 md:pt-24 md:shadow-none"
      >
        <LightPanel />
      </div>
      <div ref={col} className="min-w-0">
        {children}
      </div>
    </section>
  );
}
