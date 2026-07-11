import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaSquareThreads } from "react-icons/fa6";
import Container from "@/app/_components/container";

const topics = [
  "Vision",
  "Multimodal",
  "Agents",
  "Machine Learning",
  "Research",
  "Books",
  "Writing",
];

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

export default function Footer() {
  return (
    <footer className="mt-28">
      <div className="ink-band h-44 md:h-64 w-full" />
      <div className="marquee border-b border-ink/10 py-5">
        <div className="marquee-track font-display italic text-2xl md:text-3xl text-ink/50">
          {[...topics, ...topics].map((topic, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8">{topic}</span>
              <span className="text-umber/70">·</span>
            </span>
          ))}
        </div>
      </div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 py-16">
          <div>
            <div className="font-display text-5xl md:text-7xl tracking-tight">
              Dillon Laird
            </div>
            <div className="mt-3 font-display italic text-lg text-black/50">
              vision &amp; multimodal research
            </div>
          </div>
          <div className="flex gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink/40 hover:text-ink transition-colors duration-300"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between pb-10 text-xs uppercase tracking-[0.25em] text-black/40">
          <span>© 2026 Dillon Laird</span>
          <a
            href="https://theawakenedeye.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Painting by my mother
          </a>
          <a href="/feed.xml" className="hover:text-ink transition-colors">
            RSS
          </a>
        </div>
      </Container>
    </footer>
  );
}
