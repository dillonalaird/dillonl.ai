import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export type BookSection = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

const booksDirectory = join(process.cwd(), "_books");

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
