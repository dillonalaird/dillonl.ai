import BookSection from "@/app/_components/book-section";
import PageHero from "@/app/_components/page-hero";
import Reveal from "@/app/_components/reveal";
import SiteFooter from "@/app/_components/site-footer";
import { getAllBookSections } from "@/lib/books";
import markdownToHtml from "@/lib/markdownToHtml";

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
        src="/assets/art/monet-graystacks.jpg"
        title="Books"
        caption="Claude Monet — Grainstack (Sunset), 1891, oil on canvas"
        tone="dark"
      />
      <div className="relative z-10 bg-paper">
        <div className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
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
