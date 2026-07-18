import BookSection from "@/app/_components/book-section";
import PageHero from "@/app/_components/page-hero";
import Reveal from "@/app/_components/reveal";
import SiteFooter from "@/app/_components/site-footer";
import { getAllBookSections } from "@/lib/books";
import markdownToHtml from "@/lib/markdownToHtml";

const favorites = [
  {
    title: "A Brief History of Intelligence",
    author: "Max Bennett",
    year: "2023",
    note: "How evolution built our brains in five breakthroughs.",
  },
  {
    title: "Quantum",
    author: "Manjit Kumar",
    year: "2008",
    note: "Einstein, Bohr, and the great debate about reality.",
  },
  {
    title: "The Information",
    author: "James Gleick",
    year: "2011",
    note: "How information theory shaped the world.",
  },
  {
    title: "Behave",
    author: "Robert Sapolsky",
    year: "2017",
    note: "The biology of humans at our best and worst.",
  },
];

export default async function Books() {
  const sections = getAllBookSections();
  const sectionsWithHtml = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      content: await markdownToHtml(section.content),
    })),
  );

  return (
    <main>
      <PageHero
        src="/assets/art/monet-sunset-lavacourt.jpg"
        title="Books"
        caption="Claude Monet — Sunset on the Seine at Lavacourt, Winter Effect, 1880, oil on canvas"
      />
      <div className="relative z-10 bg-paper">
        <section className="px-6 md:px-12 pt-16 md:pt-24">
          <div className="text-xs uppercase tracking-[0.25em] text-umber mb-8">
            Favorite picks
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15 mb-16 md:mb-24">
            {favorites.map((book, i) => (
              <Reveal key={book.title} delay={i * 80} className="bg-paper">
                <div className="flex h-full flex-col justify-between gap-10 p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-umber">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                      {book.title}
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.25em] text-black/50">
                      {book.author} · {book.year}
                    </div>
                    <p className="mt-3 text-sm text-black/60 leading-relaxed">
                      {book.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-5xl">
          <div className="flex flex-col border-b border-ink/15">
            {sectionsWithHtml.map((section, i) => (
              <Reveal
                key={section.slug}
                delay={Math.min(i, 4) * 80}
                className="border-t border-ink/15"
              >
                <BookSection
                  title={section.title}
                  excerpt={section.excerpt}
                  contentHtml={section.content}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
