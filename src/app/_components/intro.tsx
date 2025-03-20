import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaSquareThreads } from "react-icons/fa6";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center gap-8">
        <Image
          src="/assets/self.jpg"
          alt="Dillon Laird"
          className="ml-8 w-24 h-24 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-200"
          width={512}
          height={512}
        />
        <div className="flex flex-col p-4 rounded-lg bg-black/10 backdrop-blur-sm">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-gray-200">
            Dillon Laird
          </h1>
          <p className="text-lg md:text-xl mt-2 text-white">
            I currently work at LandingAI as a Machine Learning Engineer <br/>
            focusing on visual reasoning and agentic frameworks.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://linkedin.com/in/dillon-laird-5530305b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/dillonalaird"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.threads.net/@dillonlaird"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <FaSquareThreads size={24} />
            </a>
            <a
              href="https://twitter.com/DillonLaird"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
