import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaSquareThreads } from "react-icons/fa6";

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

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center gap-8">
        <Image
          src="/assets/self.jpg"
          alt="Dillon Laird"
          className="ml-8 w-24 h-24 md:w-80 md:h-80 rounded-full object-cover border-4 border-paper/70 shadow-md"
          width={512}
          height={512}
        />
        <div className="flex flex-col p-4">
          <h1
            className="font-display text-5xl md:text-8xl tracking-tight leading-tight md:pr-8 text-paper"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            Dillon Laird
          </h1>
          <p
            className="font-display text-lg md:text-2xl text-paper/80 mt-2"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
          >
            vision &amp; multimodal research
          </p>
          <div className="flex gap-4 mt-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-paper/60 hover:text-paper transition-colors"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
