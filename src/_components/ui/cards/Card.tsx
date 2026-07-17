import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  button: string;
  width: number;
  height: number;
  href: string;
}

export default function Card({
  imageSrc,
  title,
  description,
  button,
  width,
  height,
  href,
}: CardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-paper p-8 text-center text-encre shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:items-start sm:text-left"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={width}
        height={height}
        className="h-56 w-auto self-center object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <h3 className="text-xl font-bold md:max-w-64">{title}</h3>
      <p className="leading-relaxed text-encre/80 md:max-w-64">{description}</p>

      <span className="mt-auto inline-block cursor-pointer font-heading text-rosewood transition-ease duration-300 group-hover:text-prune">
        <span className="link-underline inline-flex items-center gap-1.5">
          <span>{button}</span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
