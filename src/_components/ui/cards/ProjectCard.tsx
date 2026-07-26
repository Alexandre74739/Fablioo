import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  image: string;
  tag: string;
  title: string;
  description: string;
}

export default function ProjectCard({
  slug,
  image,
  tag,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper text-encre shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-sand/30">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-sand/40 px-3 py-1 text-xs font-heading text-prune">
          {tag}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="line-clamp-3 leading-relaxed text-encre/80">
          {description}
        </p>

        <span className="mt-auto inline-block cursor-pointer pt-2 font-heading text-rosewood transition-ease duration-300 group-hover:text-prune">
          <span className="link-underline inline-flex items-center gap-1.5">
            <span>Découvrir le projet</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </span>
      </div>
    </Link>
  );
}
