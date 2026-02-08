import { Posts } from "@/app/_components/more-stories";
import SectionShell from "@/app/_components/section-shell";
import { getAllPosts } from "@/lib/api";

export default function PostsIndex() {
  const allPosts = getAllPosts();

  return (
    <SectionShell active="posts">
      {allPosts.length > 0 && <Posts posts={allPosts} showTitle={false} />}
    </SectionShell>
  );
}
