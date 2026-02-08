import SectionShell from "@/app/_components/section-shell";
import markdownStyles from "@/app/_components/markdown-styles.module.css";
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
      <div className="flex flex-col gap-6">
        {sectionsWithHtml.map((section) => (
          <details
            key={section.slug}
            className="group rounded-2xl p-6"
          >
            <summary className="list-none cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  {section.excerpt ? (
                    <p className="mt-2 text-black/60">{section.excerpt}</p>
                  ) : null}
                </div>
                <span className="text-sm text-black/50 group-open:hidden">
                  Expand
                </span>
                <span className="text-sm text-black/50 hidden group-open:inline">
                  Collapse
                </span>
              </div>
            </summary>
            <div
              className={`mt-6 ${markdownStyles.markdown}`}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
