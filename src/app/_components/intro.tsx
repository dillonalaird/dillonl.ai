import Image from "next/image";

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
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-gray-200">
            Dillon Laird
          </h1>
          <p className="text-lg md:text-xl mt-2 text-gray-300">
            I currently work at LandingAI as a Machine Learning Engineer <br/>
            focusing on visual reasoning and agentic frameworks.
          </p>
        </div>
      </div>
    </section>
  );
}
