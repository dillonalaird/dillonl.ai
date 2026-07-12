import cn from "classnames";
import { Parallax } from "@/app/_components/scroll-fx";

type Props = {
  src: string;
  caption: string; // museum style: Artist — Title, year, medium
  tone?: "light" | "dark"; // tone of the artwork, controls caption contrast
  height?: string;
};

export default function ArtBand({
  src,
  caption,
  tone = "dark",
  height = "72vh",
}: Props) {
  return (
    <figure className="relative w-full overflow-hidden" style={{ height }}>
      <Parallax
        amount={90}
        className="absolute inset-0"
        innerClassName="absolute -inset-y-[12%] inset-x-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        />
      </Parallax>
      <figcaption
        className={cn(
          "absolute bottom-5 left-6 md:left-12 text-[11px] uppercase tracking-[0.25em]",
          tone === "dark" ? "text-paper/80" : "text-ink/70",
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
