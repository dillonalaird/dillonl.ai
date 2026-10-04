"use client";

import { useState } from "react";
import cn from "classnames";
import markdownStyles from "./markdown-styles.module.css";

export type BookSectionPart =
  | { kind: "text"; html: string }
  | {
      kind: "series";
      title: string;
      excerpt: string;
      entries: number;
      html: string;
    };

type Props = {
  title: string;
  excerpt?: string;
  parts: BookSectionPart[];
};

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden" inert={!open}>
        {children}
      </div>
    </div>
  );
}

function Toggle({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 font-display font-light leading-none text-umber transition-transform duration-500 ease-out",
        { "rotate-45": open },
        className,
      )}
    >
      +
    </span>
  );
}

/** A series linked from a section's list, e.g. Asimov inside Sci-Fi. */
function Series({ part }: { part: Extract<BookSectionPart, { kind: "series" }> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="light-rule my-6 border">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "group flex w-full items-start justify-between gap-6 px-5 py-5 text-left transition-colors duration-500 md:px-6",
          open ? "bg-ink/[0.03]" : "hover:bg-ink/[0.03]",
        )}
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-umber">
            Series · {part.entries} {part.entries === 1 ? "entry" : "entries"}
          </div>
          <div className="mt-2 font-display text-2xl md:text-3xl tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1">
            {part.title}
          </div>
          {part.excerpt ? (
            <p className="mt-2 text-base text-black/60">{part.excerpt}</p>
          ) : null}
        </div>
        <Toggle open={open} className="mt-1 text-3xl" />
      </button>
      <Collapse open={open}>
        <div
          className={`light-rule border-t px-5 md:px-6 ${markdownStyles.markdown}`}
          dangerouslySetInnerHTML={{ __html: part.html }}
        />
      </Collapse>
    </div>
  );
}

export default function BookSection({ title, excerpt, parts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group w-full text-left py-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
              {title}
            </h2>
            {excerpt ? (
              <p className="mt-3 text-black/60 max-w-xl">{excerpt}</p>
            ) : null}
          </div>
          <Toggle open={open} className="mt-1 text-4xl" />
        </div>
      </button>
      <Collapse open={open}>
        <div className="pb-10">
          {parts.map((part, i) =>
            part.kind === "text" ? (
              <div
                key={i}
                className={markdownStyles.markdown}
                dangerouslySetInnerHTML={{ __html: part.html }}
              />
            ) : (
              <Series key={i} part={part} />
            ),
          )}
        </div>
      </Collapse>
    </div>
  );
}
