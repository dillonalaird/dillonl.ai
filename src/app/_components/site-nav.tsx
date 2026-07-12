"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import cn from "classnames";

const items = [
  { label: "About", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Posts", href: "/posts" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "bg-paper/85 backdrop-blur-sm text-ink shadow-[0_1px_0_rgba(43,42,38,0.08)]"
          : "mix-blend-difference text-white",
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="font-display text-xl tracking-tight">
          Dillon Laird
        </Link>
        <nav className="flex gap-5 md:gap-8 text-xs uppercase tracking-[0.25em]">
          {items.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "pb-1 border-b transition-colors duration-300",
                  active
                    ? "border-current"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
