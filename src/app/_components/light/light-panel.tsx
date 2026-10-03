"use client";

import { useEffect, useRef, useState } from "react";
import { DAY, PAINTINGS, caption, type PaintingId } from "@/lib/light";
import { applyAccent, currentPainting, useLight } from "./store";
import HourScrubber from "./hour-scrubber";

const STACK: PaintingId[] = [...DAY.map((d) => d.id), "charing"];

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The sticky painting. Paintings are stacked; a new one is raised to the top
 * and revealed with a hard-edged wipe that rises (or falls, scrolling back)
 * across the frame. Images are only requested once needed, plus the next
 * ones in the day so the wipe never waits on the network.
 */
export default function LightPanel() {
  const s = useLight();
  const painting = currentPainting(s);
  const id = painting.id as PaintingId;

  const [wanted, setWanted] = useState<Set<PaintingId>>(() => new Set());
  const imgs = useRef<Partial<Record<PaintingId, HTMLImageElement | null>>>(
    {},
  );
  const shown = useRef<PaintingId | null>(null);
  const z = useRef(1);
  const token = useRef(0);

  // Request the current painting and its neighbours in the day.
  useEffect(() => {
    if (!s.ready) return;
    const i = DAY.findIndex((d) => d.id === id);
    const need: PaintingId[] = [id];
    if (i >= 0) {
      need.push(DAY[(i + 1) % DAY.length].id);
      need.push(DAY[(i + DAY.length - 1) % DAY.length].id);
    }
    setWanted((w) => {
      if (need.every((n) => w.has(n))) return w;
      const next = new Set(w);
      need.forEach((n) => next.add(n));
      return next;
    });
  }, [id, s.ready]);

  // Warm the rest of the stack once the page is idle.
  useEffect(() => {
    if (!s.ready) return;
    const t = window.setTimeout(() => setWanted(new Set(STACK)), 2500);
    return () => window.clearTimeout(t);
  }, [s.ready]);

  // Raise and reveal the current painting.
  useEffect(() => {
    if (!s.ready) return;
    applyAccent(painting);
    const img = imgs.current[id];
    if (!img || !img.getAttribute("src") || shown.current === id) return;
    const mine = ++token.current;
    const first = shown.current === null;
    const dir = s.dir;
    const reveal = () => {
      if (mine !== token.current) return;
      img.style.zIndex = String(++z.current);
      img.style.visibility = "visible";
      shown.current = id;
      if (first || reducedMotion()) return;
      img.animate(
        [
          {
            clipPath: dir > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            transform: "scale(1.1)",
          },
          { clipPath: "inset(0 0 0 0)", transform: "scale(1.03)" },
        ],
        { duration: 1150, easing: "cubic-bezier(0.76, 0, 0.18, 1)" },
      );
    };
    img.decode().then(reveal, reveal);
    // `painting` is derived from id; s.dir is read at reveal time on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, s.ready, wanted]);

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden bg-shade transition-colors duration-1000">
        {STACK.map((pid) => {
          const p = PAINTINGS[pid];
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={pid}
              ref={(el) => {
                imgs.current[pid] = el;
              }}
              src={wanted.has(pid) ? p.src : undefined}
              alt={caption(p)}
              aria-hidden={pid !== id}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover will-change-[clip-path,transform]"
              style={{
                objectPosition: p.focus,
                transformOrigin: p.focus,
                // trims the scanned canvas edge
                transform: "scale(1.03)",
                visibility: "hidden",
              }}
            />
          );
        })}
      </div>
      <div className="pt-3 md:pt-4">
        <div className="h-[2.6em] md:h-[2.8em] overflow-hidden text-[10px] md:text-[11px] uppercase leading-[1.3] tracking-[0.22em] md:tracking-[0.25em] text-ink/70">
          <p key={id} className="light-caption" aria-live="polite">
            {s.ready ? caption(painting) : " "}
          </p>
        </div>
        <HourScrubber />
      </div>
    </div>
  );
}
