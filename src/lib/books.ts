import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export type BookSection = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

/**
 * A section's body, split where it links another section: a line holding
 * only `asimov.md` places that section, as a collapsible series, at that
 * point in the list.
 */
export type BookPart =
  | { kind: "text"; markdown: string }
  | { kind: "series"; section: BookSection };

const booksDirectory = join(process.cwd(), "_books");
const SERIES_LINE = /^[ \t]*([\w-]+)\.md[ \t]*$/gm;

export function getBookSlugs() {
  return fs.readdirSync(booksDirectory);
}

export function getBookSectionBySlug(slug: string): BookSection {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(booksDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const title = data.title ?? realSlug;
  const excerpt = data.excerpt ?? data.exerpt ?? "";

  return { slug: realSlug, title, excerpt, content };
}

export function getAllBookSections(): BookSection[] {
  const slugs = getBookSlugs();
  return slugs.map((slug) => getBookSectionBySlug(slug));
}

export function splitBookParts(
  content: string,
  bySlug: Map<string, BookSection>,
): BookPart[] {
  const parts: BookPart[] = [];
  let last = 0;
  for (const m of content.matchAll(SERIES_LINE)) {
    const section = bySlug.get(m[1]);
    if (!section) continue; // not a section: leave the line as text
    parts.push({ kind: "text", markdown: content.slice(last, m.index) });
    parts.push({ kind: "series", section });
    last = m.index + m[0].length;
  }
  parts.push({ kind: "text", markdown: content.slice(last) });
  return parts.filter((p) => p.kind === "series" || p.markdown.trim());
}

/**
 * Top-level sections with their linked series resolved. A section linked
 * from another one appears only inside it, not again on its own.
 */
export function getBookShelf() {
  const sections = getAllBookSections();
  const bySlug = new Map(sections.map((s) => [s.slug, s]));
  const shelf = sections.map((s) => ({
    ...s,
    parts: splitBookParts(s.content, bySlug),
  }));
  const nested = new Set(
    shelf.flatMap((s) =>
      s.parts.flatMap((p) => (p.kind === "series" ? [p.section.slug] : [])),
    ),
  );
  return shelf.filter((s) => !nested.has(s.slug));
}
