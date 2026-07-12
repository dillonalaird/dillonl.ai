import PageHero from "@/app/_components/page-hero";
import SiteFooter from "@/app/_components/site-footer";
import { Posts } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function PostsIndex() {
  const allPosts = getAllPosts();

  return (
    <main>
      <PageHero
        src="/assets/art/monet-parliament-fog.jpg"
        title="Posts"
        caption="Claude Monet — The Houses of Parliament (Effect of Fog), 1903, oil on canvas"
        tone="dark"
      />
      <div className="relative z-10 bg-paper">
        <div className="px-6 md:px-12 py-16 md:py-24 max-w-6xl">
          {allPosts.length > 0 && <Posts posts={allPosts} showTitle={false} />}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
