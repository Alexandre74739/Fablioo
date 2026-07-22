import Reveal from "@/_components/animations/Reveal";
import ShaderWaves from "@/_components/animations/ShaderWaves";

interface HeroProps {
  title: string;
  highlight: string;
  content: string;
}

export default function Hero({ title, highlight, content }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-paper">
      <ShaderWaves className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <Reveal delay={0}>
          <h1 className="max-w-4xl sm:max-w-lg md:max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {title}{" "}
            <span className="font-quote font-semibold italic text-rosewood">
              {highlight}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="max-w-xl text-base leading-relaxed font-medium text-encre/80 md:text-lg lg:text-xl">
            {content}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
