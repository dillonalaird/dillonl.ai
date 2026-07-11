import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
  showTitle?: boolean;
};

export function Posts({ posts, showTitle = true }: Props) {
  return (
    <section>
      {showTitle ? (
        <h2 className="mb-8 font-display text-5xl md:text-7xl tracking-tight leading-tight">
          Posts
        </h2>
      ) : null}
      <div className="flex flex-col divide-y divide-ink/10 space-y-8 mb-16 max-w-5xl">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
