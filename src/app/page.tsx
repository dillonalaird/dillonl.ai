import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaSquareThreads } from "react-icons/fa6";
import { HeroFx } from "@/app/_components/scroll-fx";
import Image from "next/image";
import DateFormatter from "@/app/_components/date-formatter";
import LightSplit from "@/app/_components/light/light-split";
import { SectionIndex } from "@/app/_components/light/light-links";
import Reveal from "@/app/_components/reveal";
import SiteFooter from "@/app/_components/site-footer";
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 text-xs uppercase tracking-[0.25em] text-umber transition-colors duration-700">
      {children}
    </div>
  );
}

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

      {/* Content sheet sliding over the hero: a sticky painting whose light
          follows the hour, beside the sections it changes with */}
      <div className="relative z-10 bg-paper shadow-[0_-24px_80px_rgba(0,0,0,0.35)]">
        <LightSplit>
          <section
            data-light-section
            className="flex flex-col justify-center px-5 md:px-12 lg:px-16 pt-16 pb-24 md:min-h-screen md:py-32"
          >
            <Label>Now</Label>
            <Reveal>
              <p className="font-display text-3xl md:text-5xl leading-[1.12] tracking-tight">
                I&apos;m a researcher at Anthropic, working on vision and
                multimodal models.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-ink/60">
                Before that, nine years at LandingAI: building the ML team for
                LandingLens, co-creating Data-Centric AI with Andrew Ng, and
                leading VisionAgent.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em]">
                {socials.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="light-link text-ink/60 underline underline-offset-[6px]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>
          </section>

          <section
            data-light-section
            className="flex flex-col justify-center px-5 md:px-12 lg:px-16 py-20 md:min-h-screen md:py-32"
          >
            <Label>Index</Label>
            <SectionIndex />
          </section>

          <section
            data-light-section
            className="flex flex-col justify-center px-5 md:px-12 lg:px-16 py-20 md:min-h-screen md:py-32"
          >
            <div className="flex items-baseline justify-between">
              <Label>Recent writing</Label>
              <Link
                href="/posts"
                className="mb-8 text-xs uppercase tracking-[0.25em] text-ink/50 hover:text-umber transition-colors"
              >
                All posts →
              </Link>
            </div>
            <div className="light-rule flex flex-col border-t">
              {recentPosts.map((post, i) => (
                <Reveal
                  key={post.slug}
                  delay={Math.min(i, 3) * 100}
                  className="light-rule border-b"
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group grid grid-cols-[1fr_5.5rem] md:grid-cols-[1fr_8rem] gap-5 md:gap-8 items-center py-7"
                  >
                    <div>
                      <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-umber">
                        <DateFormatter dateString={post.date} />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 hidden md:block text-sm leading-relaxed text-ink/60 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt=""
                        width={256}
                        height={256}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

        </LightSplit>

        <SiteFooter />
      </div>
    </main>
  );
}
