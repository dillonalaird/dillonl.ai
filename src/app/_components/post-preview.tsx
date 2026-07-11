import Link from "next/link";
import Image from "next/image";
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
    <Link
      href={`/posts/${slug}`}
      className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center py-10"
    >
      <div className="overflow-hidden rounded-sm">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          width={1024}
          height={1024}
          className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-umber mb-3">
          <DateFormatter dateString={date} />
        </div>
        <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-black/70 leading-relaxed">{excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-umber">
          Read
          <span
            aria-hidden
            className="transition-transform duration-500 ease-out group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
