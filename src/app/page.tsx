import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { Posts } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts;

  return (
    <main>
      <section 
        className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12 relative"
        style={{
          backgroundImage: 'url(/assets/art.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px', // You can adjust this value
          width: '100%'
        }}
      >
          <Intro />
      </section>
        <Container>
          {morePosts.length > 0 && <Posts posts={morePosts} />}
        </Container>
    </main>
  );
}
