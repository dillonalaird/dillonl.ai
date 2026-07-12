/**
 * A Rothko-inspired color-field panel built natively from the site palette —
 * soft-edged stacked fields of umber and ink on a warm ground.
 */
type Props = {
  height?: string;
  children?: React.ReactNode;
};

export default function ColorField({ height = "70vh", children }: Props) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#c8b190]"
      style={{ height }}
    >
      <div className="absolute left-[5%] right-[5%] top-[7%] h-[38%] rounded-[3rem] bg-[#8a6a48] opacity-90 blur-2xl" />
      <div className="absolute left-[5%] right-[5%] top-[50%] h-[42%] rounded-[3rem] bg-[#2b2a26] opacity-85 blur-2xl" />
      <div className="absolute left-[8%] right-[8%] top-[46%] h-[6%] rounded-full bg-[#f6f1e7] opacity-20 blur-3xl" />
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {children}
        </div>
      ) : null}
    </section>
  );
}
