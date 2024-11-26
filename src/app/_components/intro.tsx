import Image from "next/image";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center gap-8">
        <Image
          src="/assets/self.png"
          alt="Dillon Laird"
          className="ml-8 w-24 h-24 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-200"
          width={512}
          height={512}
        />
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-gray-200">
          Dillon Laird
        </h1>
      </div>
    </section>
  );
}
