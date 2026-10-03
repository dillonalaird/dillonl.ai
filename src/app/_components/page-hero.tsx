import { Parallax } from "@/app/_components/scroll-fx";
import { PageLight } from "@/app/_components/light/store";
import { PAINTINGS, caption as museumCaption, type PaintingId } from "@/lib/light";

type Props = {
  painting: PaintingId; // the page's light is sampled from this painting
  title: string;
  epigraph?: string; // short lowercase koan under the title
};

export default function PageHero({ painting, title, epigraph }: Props) {
  const p = PAINTINGS[painting];
  const src = p.src;
  const caption = museumCaption(p);
  return (
    <section className="relative h-[68vh] min-h-[440px] overflow-hidden bg-shade">
      <PageLight id={painting} />
      <Parallax
        amount={80}
        className="absolute inset-0"
        innerClassName="absolute -inset-y-[12%] inset-x-0"
      >
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${src})`, backgroundPosition: p.focus }}
        />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/45 to-transparent"
      />
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
      <figcaption className="absolute top-20 right-6 md:right-12 text-[11px] uppercase tracking-[0.25em] text-paper/75">
        {caption}
      </figcaption>
    </section>
  );
}
