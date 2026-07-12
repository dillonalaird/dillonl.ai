import Image from "next/image";
import AboutContent from "@/app/_components/about-content";
import PageHero from "@/app/_components/page-hero";
import Reveal from "@/app/_components/reveal";
import SiteFooter from "@/app/_components/site-footer";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        src="/assets/art/monet-charing-cross.jpg"
        title="About"
        caption="Claude Monet — Charing Cross Bridge, c. 1900, oil on canvas"
        tone="light"
      />
      <div className="relative z-10 bg-paper">
        <div className="px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-16">
          <Reveal className="shrink-0">
            <Image
              src="/assets/self.jpg"
              alt="Dillon Laird"
              width={512}
              height={512}
              className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover border-4 border-paper/70 shadow-md"
            />
          </Reveal>
          <AboutContent />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
