"use client";

import Link from "next/link";
import cn from "classnames";
import { DAY, PAINTINGS, formatHour, type PaintingId } from "@/lib/light";
import { currentPainting, light, useLight } from "./store";

const sections: {
  label: string;
  href: string;
  note: string;
  painting: PaintingId;
}[] = [
  {
    label: "About",
    href: "/about",
    note: "Work, publications, projects",
    painting: "charing",
  },
  {
    label: "Books",
    href: "/books",
    note: "What I've been reading",
    painting: "lavacourt",
  },
  {
    label: "Posts",
    href: "/posts",
    note: "Writing on machine learning",
    painting: "fog",
  },
];

/** Hover (mouse only) or focus previews the light of the page's painting. */
function previewHandlers(id: PaintingId) {
  return {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") light.setPreview(id);
    },
    onPointerLeave: () => light.setPreview(null),
    onFocus: () => light.setPreview(id),
    onBlur: () => light.setPreview(null),
  };
}

export function SectionIndex() {
  const s = useLight();
  return (
    <nav className="light-rule border-t" aria-label="Sections">
      {sections.map((sec) => {
        const active = s.preview === sec.painting;
        return (
          <Link
            key={sec.href}
            href={sec.href}
            onClick={() => light.setPreview(null)}
            {...previewHandlers(sec.painting)}
            className="light-rule group flex items-baseline justify-between gap-6 border-b py-7 md:py-9"
          >
            <span
              className={cn(
                "font-display text-5xl md:text-7xl tracking-tight transition-[transform,color] duration-500 ease-out group-hover:translate-x-3",
                active && "text-umber",
              )}
            >
              {sec.label}
            </span>
            <span className="hidden lg:flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-umber">
              {sec.note}
              <span
                aria-hidden
                className="transition-transform duration-500 ease-out group-hover:translate-x-2"
              >
                →
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/** The day's paintings as a list; choosing one sets the light to its hour. */
export function PaintingIndex() {
  const s = useLight();
  const current = currentPainting(s).id;
  return (
    <ol className="light-rule border-t">
      {DAY.map((d) => {
        const p = PAINTINGS[d.id];
        const on = current === d.id;
        return (
          <li key={d.id} className="light-rule border-b">
            <button
              type="button"
              onClick={() => {
                light.setPreview(null);
                light.setHour(p.hour);
              }}
              {...previewHandlers(d.id)}
              aria-pressed={on}
              className="group grid w-full grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-4 py-4 text-left"
            >
              <span
                className={cn(
                  "text-xs tabular-nums tracking-[0.12em] transition-colors duration-500",
                  on ? "text-umber" : "text-ink/40",
                )}
              >
                {formatHour(p.hour)}
              </span>
              <span
                className={cn(
                  "font-display text-xl md:text-2xl tracking-tight transition-[transform,color] duration-500 ease-out group-hover:translate-x-2",
                  on ? "text-umber" : "text-ink",
                )}
              >
                {p.title}
              </span>
              <span className="col-start-2 md:col-start-3 text-[11px] uppercase tracking-[0.22em] text-ink/45">
                {p.year}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
