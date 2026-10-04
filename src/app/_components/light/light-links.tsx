"use client";

import Link from "next/link";
import cn from "classnames";
import { type PaintingId } from "@/lib/light";
import { light, useLight } from "./store";

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
