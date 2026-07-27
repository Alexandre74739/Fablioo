import type { ReactNode } from "react";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export default function LegalLayout({
  title,
  updatedAt,
  children,
}: LegalLayoutProps) {
  return (
    <section className="relative overflow-hidden bg-paper px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-24 top-0 h-48 w-48 md:h-64 md:w-64"
        duration={9}
        yRange={16}
        rotateRange={5}
      />
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-right-20 bottom-0 h-56 w-56 md:h-72 md:w-72"
        duration={8}
        delay={0.5}
        yRange={-14}
        rotateRange={-4}
      />

      <div className="container relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <h1 className="text-4xl font-bold text-encre md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-quote text-sm text-rosewood italic">
            Dernière mise à jour : {updatedAt}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="legal-prose mt-10">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
