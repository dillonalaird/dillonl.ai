import SectionShell from "@/app/_components/section-shell";
import BookSection from "@/app/_components/book-section";
import Reveal from "@/app/_components/reveal";
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
    <SectionShell active="books">
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
    </SectionShell>
  );
}
