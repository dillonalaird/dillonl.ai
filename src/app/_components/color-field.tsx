/**
 * A Rothko-inspired color-field panel built natively from the site palette —
 * two stacked fields of umber and ink with softly feathered edges on a warm
 * ground, with tonal variation inside each field.
 */
type Props = {
  height?: string;
  children?: React.ReactNode;
};

export default function ColorField({ height = "70vh", children }: Props) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#c3ab87]"
      style={{ height }}
    >
      <div
        className="absolute left-[5%] right-[5%] top-[7%] h-[40%] rounded-lg opacity-95"
        style={{
          background:
            "radial-gradient(120% 110% at 50% 35%, #95724d 0%, #8a6a48 55%, #785c3e 100%)",
          filter: "blur(9px)",
        }}
      />
      <div
        className="absolute left-[5%] right-[5%] top-[52%] h-[41%] rounded-lg opacity-95"
        style={{
          background:
            "radial-gradient(120% 110% at 50% 40%, #36342e 0%, #2b2a26 60%, #222120 100%)",
          filter: "blur(9px)",
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
