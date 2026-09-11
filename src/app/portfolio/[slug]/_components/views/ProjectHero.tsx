import Image from "next/image";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import ArianeFil, { type BreadcrumbItem } from "@/_components/ui/ArianeFil";
import ProjectMeta from "./ProjectMeta";

interface ProjectHeroProps {
  breadcrumb: BreadcrumbItem[];
  tag: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  siteUrl: string;
}

export default function ProjectHero({
  breadcrumb,
  tag,
  title,
  description,
  image,
  tech,
  siteUrl,
}: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 pb-16 md:pt-40 md:pb-20">
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-20 top-8 h-40 w-40 md:h-56 md:w-56"
        duration={8}
        yRange={14}
        rotateRange={5}
      />
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="hidden sm:block -right-16 bottom-0 h-48 w-48 md:h-64 md:w-64"
        duration={9}
        delay={0.5}
        yRange={-16}
        rotateRange={-5}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <Reveal>
          <ArianeFil items={breadcrumb} />
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
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
            sizes="(min-width: 1024px) 1152px, 100vw"
            quality={90}
            className="object-cover object-top"
            priority
          />
        </Reveal>

        <div className="mt-8 md:mt-12">
          <ProjectMeta tech={tech} siteUrl={siteUrl} />
        </div>
      </div>
    </section>
  );
}
