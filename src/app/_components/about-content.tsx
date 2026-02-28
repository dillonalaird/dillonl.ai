import Image from "next/image";

export default function AboutContent() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl pb-16">
      <p className="text-lg md:text-xl text-black/70">
        I currently work at LandingAI as a Machine Learning Engineer
        <br />
        focusing on visual reasoning and agentic frameworks.
      </p>
      <div className="relative flex flex-col gap-6">
        <span className="absolute left-[135px] top-[22px] bottom-0 w-[2px] bg-black/20" />
        <div className="grid grid-cols-[110px_20px_1fr] gap-4">
          <div className="text-sm uppercase tracking-widest text-black/50 text-right pt-1 mt-2 whitespace-nowrap">
            2017 –
          </div>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-black" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/landing_ai_logo.jpeg"
                alt="LandingAI logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain bg-white/80"
              />
              <div className="text-xl font-semibold">LandingAI</div>
            </div>
            <ul className="flex flex-col gap-2 list-disc list-outside pl-4 text-sm text-black/70">
              <li>
                Led development of{" "}
                <a
                  href="https://github.com/landing-ai/vision-agent"
                  className="underline underline-offset-4"
                >
                  VisionAgent
                </a>
                , an agentic framework for generating and executing visual AI
                pipelines (detection, segmentation, OCR, counting) from natural
                language prompts. A highly iterative PoC built in the early days
                of agents.
              </li>
              <li>
                Co-created{" "}
                <a
                  href="https://landing.ai/data-centric-ai"
                  className="underline underline-offset-4"
                >
                  Data-Centric AI methodology
                </a>{" "}
                with{" "}
                <a
                  href="https://www.andrewng.org/"
                  className="underline underline-offset-4"
                >
                  Andrew Ng
                </a>{" "}
                and{" "}
                <a
                  href="https://www.ivanzhou.me/"
                  className="underline underline-offset-4"
                >
                  Ivan Zhou
                </a>
                ; helped develop the core concepts and integrated them into our{" "}
                <a
                  href="https://landing.ai/landinglens"
                  className="underline underline-offset-4"
                >
                  LandingLens
                </a>{" "}
                platform where they were adopted by enterprise customers.
              </li>
              <li>
                Built and scaled the machine learning engineering team from
                day-one to 11 SWE/MLEs; owned hiring, technical direction, and
                core ML modeling and infrastructure for{" "}
                <a
                  href="https://landing.ai/landinglens"
                  className="underline underline-offset-4"
                >
                  LandingLens
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-[110px_20px_1fr] gap-4">
          <div className="text-sm uppercase tracking-widest text-black/50 text-right pt-1 mt-2 whitespace-nowrap">
            2016 – 2019
          </div>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-black" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/stanford_university_logo.jpeg"
              alt="Stanford logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain bg-white/80"
            />
            <div className="text-xl font-semibold">Stanford</div>
          </div>
        </div>
        <div className="grid grid-cols-[110px_20px_1fr] gap-4">
          <div className="text-sm uppercase tracking-widest text-black/50 text-right pt-1 mt-2 whitespace-nowrap">
            2015 – 2016
          </div>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-black" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/pitchbook_logo.jpeg"
              alt="PitchBook logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain bg-white/80"
            />
            <div className="text-xl font-semibold">PitchBook</div>
          </div>
        </div>
        <div className="grid grid-cols-[110px_20px_1fr] gap-4">
          <div className="text-sm uppercase tracking-widest text-black/50 text-right pt-1 mt-2 whitespace-nowrap">
            2014 – 2015
          </div>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-black" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/society_consulting_logo.jpeg"
              alt="Society Consulting logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain bg-white/80"
            />
            <div className="text-xl font-semibold">Society Consulting</div>
          </div>
        </div>
        <div className="grid grid-cols-[110px_20px_1fr] gap-4">
          <div className="text-sm uppercase tracking-widest text-black/50 text-right pt-1 mt-2 whitespace-nowrap">
            2010 – 2014
          </div>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-black" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/university_of_washington_logo.jpeg"
              alt="University of Washington logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain bg-white/80"
            />
            <div className="text-xl font-semibold">
              University of Washington
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Publications</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  MURA: Large Dataset for Abnormality Detection in
                  Musculoskeletal Radiographs
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  arXiv 2017
                </div>
              </div>
              <div className="text-sm text-black/70">
                P Rajpurkar, J Irvin, A Bagul, D Ding, T Duan, H Mehta, B Yang,
                K Zhu, <strong>D Laird</strong>, R. L. Ball, C Langlotz, K
                Shpanskaya, M. P. Lungren, A. Y. Ng
              </div>
              <div className="text-sm">
                <a
                  href="https://arxiv.org/abs/1712.06957"
                  className="underline underline-offset-4"
                >
                  Paper
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  Stochastic Variational Inference for Hidden Markov Models
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  NeurIPS 2014
                </div>
              </div>
              <div className="text-sm text-black/70">
                N. J. Foti, J Xu, <strong>D Laird</strong>, E. B. Fox
              </div>
              <div className="text-sm">
                <a
                  href="https://proceedings.neurips.cc/paper_files/paper/2014/file/63ed2c35352753435bf749c40b0ce171-Paper.pdf"
                  className="underline underline-offset-4"
                >
                  Paper
                </a>{" "}
                <span className="text-black/40">|</span>{" "}
                <a
                  href="https://github.com/dillonalaird/pysvihmm"
                  className="underline underline-offset-4"
                >
                  Code
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Selected Projects</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  Data-Centric AI Competition
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  August 2021
                </div>
              </div>
              <div className="text-sm text-black/70">
                A. Y. Ng, <strong>D Laird</strong>, L He
              </div>
              <div className="text-sm">
                <a
                  href="https://https-deeplearning-ai.github.io/data-centric-comp/"
                  className="underline underline-offset-4"
                >
                  Project
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  Deep Q-Learning with Recurrent Neural Networks
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  December 2016
                </div>
              </div>
              <div className="text-sm text-black/70">
                C Chen, V Ying, <strong>D Laird</strong>
              </div>
              <div className="text-sm">
                <a
                  href="https://cs229.stanford.edu/proj2016/report/ChenYingLaird-DeepQLearningWithRecurrentNeuralNetwords-report.pdf"
                  className="underline underline-offset-4"
                >
                  Paper
                </a>{" "}
                <span className="text-black/40">|</span>{" "}
                <a
                  href="https://github.com/dillonalaird/deep-rl-tensorflow"
                  className="underline underline-offset-4"
                >
                  Code
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  Using satellite imagery to predict health
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  June 2017
                </div>
              </div>
              <div className="text-sm text-black/70">
                J Irvin, <strong>D Laird</strong>, P Rajpurkar
              </div>
              <div className="text-sm">
                <a
                  href="https://cs231n.stanford.edu/reports/2017/pdfs/559.pdf"
                  className="underline underline-offset-4"
                >
                  Paper
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
                <div className="text-lg font-semibold">
                  Autoregressive Attention for Parallel Sequence Modeling
                </div>
                <div className="text-sm uppercase tracking-widest text-black/50 text-right">
                  March 2017
                </div>
              </div>
              <div className="text-sm text-black/70">
                <strong>D Laird</strong>, J Irvin
              </div>
              <div className="text-sm">
                <a
                  href="https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1174/reports/2755456.pdf"
                  className="underline underline-offset-4"
                >
                  Paper
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
