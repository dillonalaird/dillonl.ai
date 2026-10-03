"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { formatHour, caption } from "@/lib/light";
import { currentPainting, light, useLight } from "./store";

const TICKS = Array.from({ length: 25 }, (_, h) => h);

/**
 * A thin 24-hour timeline. The marker is the hour of the light; drag it (or
 * use the arrow keys) to change the light by hand. A faint dot marks the
 * visitor's own hour.
 */
export default function HourScrubber() {
  const s = useLight();
  const track = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d.getHours() + d.getMinutes() / 60);
  }, []);

  const hourAt = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return Math.min(23.75, Math.round(t * 24 * 4) / 4);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    light.setPreview(null);
    light.setHour(hourAt(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) light.setHour(hourAt(e.clientX));
  };
  const end = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? 0.5
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? -0.5
          : e.key === "PageUp"
            ? 3
            : e.key === "PageDown"
              ? -3
              : 0;
    if (!step) return;
    e.preventDefault();
    light.setHour(s.hour + step);
  };

  const pct = (h: number) => `${(h / 24) * 100}%`;
  const previewing = s.preview !== null;

  return (
    <div className="mt-2 md:mt-3 flex select-none items-start gap-4">
      <div className="w-12 shrink-0 pt-[7px] text-[11px] tabular-nums tracking-[0.12em] text-umber transition-colors duration-700">
        {s.ready ? formatHour(s.hour) : "\u00a0"}
      </div>
      <div className="flex-1">
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label="Time of day for the light"
        aria-valuemin={0}
        aria-valuemax={24}
        aria-valuenow={Math.round(s.hour * 100) / 100}
        aria-valuetext={`${formatHour(s.hour)}, ${caption(currentPainting(s))}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        onKeyDown={onKeyDown}
        className={cn(
          "group relative h-7 touch-none outline-none",
          dragging ? "cursor-grabbing" : "cursor-pointer",
        )}
      >
        {/* baseline */}
        <div className="absolute inset-x-0 top-[14px] h-px bg-ink/20" />
        {/* hour ticks */}
        {TICKS.map((h) => (
          <div
            key={h}
            className={cn(
              "absolute w-px bg-ink/25",
              h % 6 === 0 ? "top-[9px] h-[6px]" : "top-[12px] h-[3px]",
            )}
            style={{ left: pct(h) }}
          />
        ))}
        {/* the visitor's hour */}
        {now !== null ? (
          <div
            title={`Your time, ${formatHour(now)}`}
            className="absolute top-[18px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ink/40"
            style={{ left: pct(now) }}
          />
        ) : null}
        {/* marker */}
        <div
          className={cn(
            "absolute top-[3px] h-[18px] w-[2px] -translate-x-1/2 bg-umber group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-2 group-focus-visible:outline-umber",
            !dragging && "transition-[left,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            previewing && "opacity-30",
          )}
          style={{ left: s.ready ? pct(s.hour) : "50%" }}
        />
      </div>
      <div className="relative h-4 text-[10px] tabular-nums tracking-[0.15em] text-ink/40">
        {[0, 6, 12, 18, 24].map((h) => (
          <span
            key={h}
            className={cn(
              "absolute top-0",
              h === 0 ? "" : h === 24 ? "-translate-x-full" : "-translate-x-1/2",
            )}
            style={{ left: pct(h) }}
          >
            {String(h).padStart(2, "0")}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}
