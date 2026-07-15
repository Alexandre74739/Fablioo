"use client";

import { useState } from "react";
import FloatingBlob from "@/components/animations/FloatingBlob";
import Reveal from "@/components/animations/Reveal";
import AccordionItem from "@/components/ui/AccordionItem";

const faqs: { id: string; question: string; answer: string }[] = [
  {
    id: "delai",
    question: "Combien de temps faut-il pour donner vie à mon site ?",
    answer:
      "Comptez en moyenne quatre à huit semaines selon l'ampleur du projet, de la première rencontre à la mise en ligne. Chaque étape du parcours vous est présentée à l'avance pour que vous sachiez toujours où vous en êtes dans le récit.",
  },
  {
    id: "propriete",
    question: "Suis-je propriétaire de mon site une fois livré ?",
    answer:
      "Oui, entièrement. Le code source, les maquettes et l'identité graphique créés pour vous vous appartiennent pleinement une fois le projet livré. Aucun abonnement obligatoire, aucune dépendance à une plateforme tierce : votre histoire reste la vôtre de A à Z.",
  },
  {
    id: "identite",
    question:
      "Je n'ai pas encore de logo ni d'identité visuelle, est-ce un problème ?",
    answer:
      "Pas du tout, c'est même un excellent point de départ. La création de votre identité graphique fait partie de l'accompagnement proposé, pour que votre site et votre image de marque racontent la même histoire dès le premier jour.",
  },
  {
    id: "apres",
    question: "Que se passe-t-il après la mise en ligne de mon site ?",
    answer:
      "L'histoire continue : suivi technique, mises à jour de sécurité et petites évolutions restent possibles grâce à un accompagnement pensé pour durer, bien au-delà du lancement.",
  },
  {
    id: "autonomie",
    question: "Pourrai-je modifier mon site moi-même une fois livré ?",
    answer:
      "Oui, selon vos besoins, un espace simple d'administration peut être mis en place pour que vous puissiez ajuster textes et images sans dépendre de connaissances techniques.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-paper">
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-left-24 top-8 h-52 w-52 md:h-72 md:w-72"
        duration={9}
        yRange={18}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-right-20 top-1/3 h-56 w-72 md:h-72 md:w-96"
        duration={7.5}
        delay={0.6}
        yRange={-16}
        rotateRange={-6}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="hidden sm:block -left-24 bottom-10 h-56 w-56 md:h-72 md:w-72"
        duration={8.5}
        delay={1.2}
        yRange={14}
        rotateRange={5}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-12 max-w-2xl">
            <Reveal>
              <h2 className="text-4xl font-bold text-encre md:text-5xl">
                Page par page, les réponses à vos questions
              </h2>
              <p className="mt-4 text-lg text-encre/80 md:text-xl">
                Avant de tourner la page, voici les questions qu’on nous pose le
                plus souvent : délais, budget, design et accompagnement après la
                mise en ligne. De quoi avancer sereinement, avec des réponses
                claires.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-12">
            {faqs.map((faq, i) => (
              <Reveal key={faq.id} delay={i * 0.1}>
                <AccordionItem
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openId === faq.id}
                  onToggle={() =>
                    setOpenId((current) => (current === faq.id ? null : faq.id))
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
