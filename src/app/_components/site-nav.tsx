"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

const items = [
  { label: "About", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Posts", href: "/posts" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
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
                    ? "border-white"
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
