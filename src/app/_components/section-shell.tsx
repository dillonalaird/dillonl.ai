import Link from "next/link";
import cn from "classnames";
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import { Intro } from "@/app/_components/intro";

type Section = "about" | "books" | "posts";

type Props = {
  active: Section;
  children: React.ReactNode;
};

const navItems: { key: Section; label: string; href: string }[] = [
  { key: "about", label: "About", href: "/about" },
  { key: "books", label: "Books", href: "/books" },
  { key: "posts", label: "Posts", href: "/posts" },
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
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <nav className="md:w-1/3">
            <div className="md:sticky md:top-12 flex flex-col gap-3 pb-4">
              {navItems.map((item) => (
                <h2
                  key={item.key}
                  className="font-display text-5xl md:text-6xl tracking-tight leading-[1.1]"
                >
                  <Link
                    href={item.href}
                    aria-current={item.key === active ? "page" : undefined}
                    className={cn(
                      "inline-block transition-all duration-500 ease-out",
                      {
                        "text-ink italic": item.key === active,
                        "text-ink/30 hover:text-ink/70 hover:translate-x-2":
                          item.key !== active,
                      },
                    )}
                  >
                    {item.label}
                  </Link>
                </h2>
              ))}
            </div>
          </nav>
          <div className="md:w-2/3 min-h-[40vh]">{children}</div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
