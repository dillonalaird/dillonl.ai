"use client";

import { useState } from "react";
import cn from "classnames";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  title: string;
  excerpt?: string;
  contentHtml: string;
};

export default function BookSection({ title, excerpt, contentHtml }: Props) {
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
          <span
            aria-hidden
            className={cn(
              "shrink-0 mt-1 font-display text-4xl font-light leading-none text-umber transition-transform duration-500 ease-out",
              { "rotate-45": open },
            )}
          >
            +
          </span>
        </div>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`pb-10 ${markdownStyles.markdown}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
