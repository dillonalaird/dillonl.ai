import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaSquareThreads } from "react-icons/fa6";
import { HeroFx } from "@/app/_components/scroll-fx";
import ArtBand from "@/app/_components/art-band";
import Reveal from "@/app/_components/reveal";
import SiteFooter from "@/app/_components/site-footer";
import { PostPreview } from "@/app/_components/post-preview";
import { getAllPosts } from "@/lib/api";

const socials = [
  {
    href: "https://linkedin.com/in/dillon-laird-5530305b",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://github.com/dillonalaird",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://www.threads.net/@dillonlaird",
    label: "Threads",
    Icon: FaSquareThreads,
  },
  {
    href: "https://twitter.com/DillonLaird",
    label: "X",
    Icon: FaXTwitter,
  },
];

const sections = [
  { label: "About", href: "/about", note: "Work, publications, projects" },
  { label: "Books", href: "/books", note: "What I've been reading" },
  { label: "Posts", href: "/posts", note: "Writing on machine learning" },
];

export default function Index() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <main>
      {/* Full-viewport hero — the painting stays pinned while content slides over it */}
      <section
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/art.jpg)" }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/45 to-transparent"
        />
        <HeroFx className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-16">
          <h1
            className="font-display text-[15vw] md:text-[11vw] leading-none tracking-tight text-paper"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}
          >
            Dillon Laird
          </h1>
          <div className="mt-5 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <p
              className="font-display text-xl md:text-2xl text-paper/85"
              style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
            >
              vision &amp; multimodal research
            </p>
            <div className="flex gap-5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-paper/60 hover:text-paper transition-colors"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </HeroFx>
        <figcaption className="absolute top-20 right-6 md:right-12 text-[11px] uppercase tracking-[0.25em]">
          <a
            href="https://theawakenedeye.com/artisans/bev-byrnes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/75 hover:text-paper transition-colors"
          >
            Bev Byrnes — Pathless Path, ink and tea stain on Kumohadamashi
            paper
          </a>
        </figcaption>
        <div className="absolute bottom-6 right-6 md:right-12 text-paper/50 text-[11px] uppercase tracking-[0.3em]">
          Scroll
        </div>
      </section>

      {/* Content sheet sliding over the hero */}
      <div className="relative z-10 bg-paper shadow-[0_-24px_80px_rgba(0,0,0,0.35)]">
        <section className="px-6 md:px-12 pt-24 md:pt-32 pb-20 max-w-4xl">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl leading-tight tracking-tight">
              I&apos;m a researcher at Anthropic, working on vision and
              multimodal models.
            </p>
          </Reveal>
        </section>

        <nav className="border-t border-ink/10">
          {sections.map((s, i) => (
            <Reveal key={s.href} delay={i * 80}>
              <Link
                href={s.href}
                className="group flex items-baseline justify-between px-6 md:px-12 py-8 md:py-10 border-b border-ink/10"
              >
                <span className="font-display text-5xl md:text-7xl tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-3">
                  {s.label}
                </span>
                <span className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-umber">
                  {s.note}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-out group-hover:translate-x-2"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </nav>

        <ArtBand
          src="/assets/art/monet-parliament-fog.jpg"
          caption="Claude Monet — The Houses of Parliament (Effect of Fog), 1903, oil on canvas"
          tone="dark"
        />

        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Recent writing
            </h2>
            <Link
              href="/posts"
              className="text-xs uppercase tracking-[0.25em] text-umber hover:text-ink transition-colors"
            >
              All posts →
            </Link>
          </div>
          <div className="flex flex-col max-w-5xl">
            {recentPosts.map((post, i) => (
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

        <SiteFooter />
      </div>
    </main>
  );
}
