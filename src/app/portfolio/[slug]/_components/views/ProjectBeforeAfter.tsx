import Reveal from "@/_components/animations/Reveal";
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
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
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
