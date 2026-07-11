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
            className="group rounded-sm border border-ink/10 bg-white/40 p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <summary className="list-none cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                    {section.title}
                  </h2>
                  {section.excerpt ? (
                    <p className="mt-2 font-display italic text-black/60">
                      {section.excerpt}
                    </p>
                  ) : null}
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-umber group-open:hidden mt-2">
                  Open
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-umber hidden group-open:inline mt-2">
                  Close
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
