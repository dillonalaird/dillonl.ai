import cn from "classnames";
import { Parallax } from "@/app/_components/scroll-fx";

type Props = {
  src: string;
  title: string;
  epigraph?: string; // short lowercase koan under the title
  caption: string; // museum style: Artist — Title, year, medium
  tone?: "light" | "dark";
};

export default function PageHero({
  src,
  title,
  epigraph,
  caption,
  tone = "dark",
}: Props) {
  return (
    <section className="relative h-[68vh] min-h-[440px] overflow-hidden">
      <Parallax
        amount={80}
        className="absolute inset-0"
        innerClassName="absolute -inset-y-[12%] inset-x-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        />
      </Parallax>
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-10">
        <h1 className="font-display text-[16vw] md:text-[9vw] leading-none tracking-tight text-white mix-blend-difference">
          {title}
        </h1>
        {epigraph ? (
          <p className="mt-3 font-display text-lg md:text-2xl text-white/80 mix-blend-difference">
            {epigraph}
          </p>
        ) : null}
      </div>
      <figcaption
        className={cn(
          "absolute top-20 right-6 md:right-12 text-[11px] uppercase tracking-[0.25em]",
          tone === "dark" ? "text-paper/70" : "text-ink/60",
        )}
      >
        {caption}
      </figcaption>
    </section>
  );
}
