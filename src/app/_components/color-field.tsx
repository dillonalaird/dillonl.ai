/**
 * A Rothko-inspired color-field panel in the site palette, modeled on the
 * proportions of Rothko's "Ochre and Red on Red" (1954): a luminous lighter
 * field above a deeper one, floating on a warm ground with thin margins.
 */
type Props = {
  height?: string;
  children?: React.ReactNode;
};

export default function ColorField({ height = "70vh", children }: Props) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#96754e]"
      style={{ height }}
    >
      <div
        className="absolute left-[4%] right-[4%] top-[5%] h-[42%] rounded-md opacity-95"
        style={{
          background:
            "radial-gradient(115% 115% at 50% 45%, #ead9b4 0%, #dfcaa0 55%, #cdb489 100%)",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute left-[4%] right-[4%] top-[51%] h-[44%] rounded-md opacity-95"
        style={{
          background:
            "radial-gradient(115% 115% at 50% 40%, #6b4f33 0%, #5c4329 60%, #4d3822 100%)",
          filter: "blur(8px)",
        }}
      />
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {children}
        </div>
      ) : null}
    </section>
  );
}
