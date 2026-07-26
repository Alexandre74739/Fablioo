import Image from "next/image";
import Reveal from "@/_components/animations/Reveal";

interface ProjectHeroProps {
  tag: string;
  title: string;
  description: string;
  image: string;
}

export default function ProjectHero({
  tag,
  title,
  description,
  image,
}: ProjectHeroProps) {
  return (
    <div>
      <Reveal>
        <span className="w-fit rounded-full bg-sand/40 px-3 py-1 text-xs font-heading text-prune">
          {tag}
        </span>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-encre/80 md:text-xl">
          {description}
        </p>
      </Reveal>

      <Reveal
        delay={0.2}
        className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl shadow-lg"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover object-top"
          priority
        />
      </Reveal>
    </div>
  );
}
