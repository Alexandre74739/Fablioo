import { BookOpen } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";
import BranchesDivider from "@/_components/animations/BranchesDivider";
import Button from "@/_components/ui/Button";
import SkillsCarousel from "@/_components/ui/SkillsCarousel";
import SkillsDecor from "./dynamic/SkillsDecor";
import { SKILLS } from "./skills-data";

export default function Skills() {
  return (
    <section className="relative z-10">
      <div className="relative overflow-hidden bg-prune">
        <SkillsDecor />

        <BookOpen
          strokeWidth={1}
          className="pointer-events-none absolute -right-8 bottom-8 h-48 w-48 -rotate-12 text-rosewood/10 md:h-64 md:w-64"
          aria-hidden="true"
        />

        <Reveal className="relative z-10 mx-auto mt-8 max-w-2xl px-6 text-center md:mt-10">
          <h2 className="text-4xl font-bold text-paper md:text-5xl">
            Les compétences d'un dev à votre service
          </h2>
          <p className="mt-4 text-lg text-paper/80 md:text-xl">
            Du design à la création de site web sur mesure en passant par la
            maintenance, ces outils et technologies donnent vie à votre projet,
            du premier croquis à la mise en ligne.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="relative z-10 mt-10 md:mt-14">
          <SkillsCarousel skills={SKILLS} />
        </Reveal>

        <Reveal
          delay={0.2}
          className="relative z-10 -mt-8 mb-8 flex justify-center md:mb-10 md:-mt-10"
        >
          <Button
            content="Parlons de votre projet"
            href="/contact"
            style="secondary"
          />
        </Reveal>
      </div>

      <BranchesDivider />
    </section>
  );
}
