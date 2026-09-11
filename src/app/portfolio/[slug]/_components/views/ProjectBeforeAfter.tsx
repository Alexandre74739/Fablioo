import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import BeforeAfterCard from "@/_components/ui/cards/BeforeAfterCard";

interface ProjectBeforeAfterProps {
  before: string[];
  after: string[];
}

export default function ProjectBeforeAfter({
  before = [],
  after = [],
}: ProjectBeforeAfterProps) {
  if (before.length === 0 && after.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="hidden sm:block -left-20 top-1/4 h-48 w-48 md:h-64 md:w-64"
        duration={8.5}
        delay={0.3}
        yRange={16}
        rotateRange={-5}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-right-24 bottom-0 h-56 w-56 md:h-72 md:w-72"
        duration={9}
        delay={0.7}
        yRange={-14}
        rotateRange={5}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-4xl font-bold text-encre md:text-5xl">
            Ce qui a changé
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-encre/80 md:text-xl">
            Deux clichés d'un même projet : le point de départ, et ce
            qu'il est devenu une fois la vision cliente concrétisée.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <BeforeAfterCard variant="before" items={before} />
          <BeforeAfterCard variant="after" items={after} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
