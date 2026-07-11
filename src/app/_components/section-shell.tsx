import Link from "next/link";
import cn from "classnames";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

type Section = "about" | "books" | "posts";

type Props = {
  active: Section;
  children: React.ReactNode;
};

const navItems: { key: Section; label: string; href: string; ordinal: string }[] = [
  { key: "about", label: "About", href: "/about", ordinal: "i" },
  { key: "books", label: "Books", href: "/books", ordinal: "ii" },
  { key: "posts", label: "Posts", href: "/posts", ordinal: "iii" },
];

export default function SectionShell({ active, children }: Props) {
  const heroFade =
    "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)";

  return (
    <main>
      <section
        className="flex-col md:flex-row flex items-center md:justify-between mb-10 md:mb-6 relative"
        style={{
          backgroundImage: "url(/assets/art.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
          width: "100%",
          WebkitMaskImage: heroFade,
          maskImage: heroFade,
        }}
      >
        <Intro />
      </section>
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          <nav className="md:w-1/3">
            <div className="text-xs uppercase tracking-[0.35em] text-umber mb-6">
              — Index
            </div>
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <h2
                  key={item.key}
                  className="font-display text-5xl md:text-6xl tracking-tight leading-tight flex items-baseline gap-4"
                >
                  <span className="font-display italic text-base text-umber/80 w-6 shrink-0">
                    {item.ordinal}.
                  </span>
                  <Link
                    href={item.href}
                    aria-current={item.key === active ? "page" : undefined}
                    className={cn("transition-colors duration-300", {
                      "text-ink italic ink-underline": item.key === active,
                      "text-ink/35 hover:text-ink/70": item.key !== active,
                    })}
                  >
                    {item.label}
                  </Link>
                </h2>
              ))}
            </div>
          </nav>
          <div className="md:w-2/3">{children}</div>
        </div>
      </Container>
    </main>
  );
}
