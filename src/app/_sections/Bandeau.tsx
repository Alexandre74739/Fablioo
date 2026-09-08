import Image from "next/image";
import Button from "@/_components/ui/Button";
import Reveal from "@/_components/animations/Reveal";
import BranchesDivider from "@/_components/animations/BranchesDivider";
import BandeauDecor from "@/app/_sections/dynamic/BandeauDecor";

interface BandeauProps {
  title: string;
  description: string;
  label: string;
  href: string;
}

export default function Bandeau({
  title,
  description,
  label,
  href,
}: BandeauProps) {
  return (
    <section className="relative z-10">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-8 w-full text-prune sm:h-12 md:h-14"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,56 C480,36 960,36 1440,56 L1440,56 L0,56 Z"
        />
      </svg>

      <div className="relative overflow-hidden bg-prune px-6 pt-10 pb-8 md:px-8 md:pt-14 md:pb-10">
        <BandeauDecor />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Reveal delay={0}>
            <Image
              src="/logo/logo-icone.svg"
              alt=""
              width={103}
              height={84}
              className="h-16 w-auto md:h-20"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-4xl font-bold text-paper md:text-5xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="max-w-xl text-lg text-paper/80 leading-relaxed md:text-xl">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.6} className="mt-3">
            <Button content={label} href={href} style="secondary" />
          </Reveal>
        </div>
      </div>

      <BranchesDivider />
    </section>
  );
}
