import Link from "next/link";

const Header = () => {
  return (
    <h2 className="font-display text-2xl md:text-4xl tracking-tight leading-tight mb-20 mt-8 flex items-baseline gap-3">
      <span className="font-display italic text-base text-umber/80">←</span>
      <Link href="/" className="hover:underline decoration-umber/60 underline-offset-4">
        Home
      </Link>
    </h2>
  );
};

export default Header;
