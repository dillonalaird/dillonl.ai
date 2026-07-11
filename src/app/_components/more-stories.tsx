import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import Reveal from "./reveal";

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
      <div className="flex flex-col mb-16 max-w-5xl">
        {posts.map((post, i) => (
          <Reveal
            key={post.slug}
            delay={Math.min(i, 3) * 100}
            className="border-t border-ink/10 first:border-t-0"
          >
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
