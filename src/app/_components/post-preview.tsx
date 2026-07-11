import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) {
  return (
    <div className="flex gap-6 items-start pt-8 first:pt-0">
      <div className="flex-shrink-0 w-1/3">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>

      <div className="flex-grow flex gap-6">
        <div className="w-1/2">
          <h3 className="font-display text-3xl mb-3 leading-snug">
            <Link href={`/posts/${slug}`} className="hover:underline decoration-umber/60 underline-offset-4">
              {title}
            </Link>
          </h3>
          <div className="text-xs uppercase tracking-[0.25em] text-umber mb-4">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-lg leading-relaxed text-black/70">{excerpt}</p>
        </div>
      </div>
    </div>
  );
}
