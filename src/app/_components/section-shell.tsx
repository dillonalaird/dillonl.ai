import Link from "next/link";
import cn from "classnames";
import Container from "@/app/_components/container";
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
  return (
    <main>
      <section
        className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12 relative"
        style={{
          backgroundImage: "url(/assets/art.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
          width: "100%",
        }}
      >
        <Intro />
      </section>
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          <nav className="md:w-1/3">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <h2
                  key={item.key}
                  className={cn(
                    "text-5xl md:text-7xl font-bold tracking-tighter leading-tight",
                    {
                      "text-black/50": item.key !== active,
                    },
                  )}
                >
                  <Link
                    href={item.href}
                    className="hover:underline"
                    aria-current={item.key === active ? "page" : undefined}
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
