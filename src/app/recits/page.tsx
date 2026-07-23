import type { Metadata } from "next";
import Image from "next/image";
import HeroZoom from "@/app/recits/_sections/HeroZoom/HeroZoomSection";
import Prologue from "@/app/recits/_sections/Prologue";
import Chapter from "@/app/recits/_sections/Chapter";
import ChapterNav from "@/_components/ui/ChapterNav";
import ChaptersScroller, {
  CHAPTERS_SCROLLER_ID,
} from "@/app/recits/_sections/ChaptersScroller";

export const metadata: Metadata = {
  title: "Le récit derrière l'histoire de Fablioo",
  description:
    "De l'idée de départ à la mise en ligne : découvrez, chapitre après chapitre, les coulisses de Fablioo et la manière dont chaque projet est accompagné.",
  alternates: {
    canonical: "/recits",
  },
};

const recitsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le récit derrière l'histoire de Fablioo",
  description:
    "Derrière chaque interface se cache un récit qu'on ne lit pas, mais qu'on ressent : inspirations, coulisses et étapes clés de Fablioo.",
  publisher: {
    "@type": "Organization",
    "@id": "https://fablioo.com",
    name: "Fablioo",
  },
  hasPart: [
    { "@type": "CreativeWork", position: 1, name: "Le point de départ" },
    { "@type": "CreativeWork", position: 2, name: "Il était deux fois" },
    {
      "@type": "CreativeWork",
      position: 3,
      name: "Pourquoi le corbeau et le renard ?",
    },
    { "@type": "CreativeWork", position: 4, name: "Un design à votre mesure" },
    {
      "@type": "CreativeWork",
      position: 5,
      name: "Un développement aussi beau qu'utile",
    },
  ],
};

const chapterNavItems = [
  { id: "chapitre-i", label: "I" },
  { id: "chapitre-ii", label: "II" },
  { id: "chapitre-iii", label: "III" },
  { id: "chapitre-iv", label: "IV" },
  { id: "chapitre-v", label: "V" },
];

export default function Recits() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recitsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ChapterNav items={chapterNavItems} scrollerId={CHAPTERS_SCROLLER_ID} />
      <main>
        <HeroZoom
          title="Le récit derrière l'histoire de "
          highlight="Fablioo"
          content="A la manière d'un récit, Fablioo se raconte : inspirations, coulisses et étapes clés, venez vite découvrir cette histoire."
          quote1="La morale nue apporte de l'ennui ; le conte fait passer le précepte avec lui"
          quote2="Il faut instruire et divertir pour faire passer le message"
        />

        <Prologue
          title="Qui se cache derrière Fablioo ?"
          content="Issu de l'animation, je transpose l'art de captiver et de structurer dans le développement web. Je conçois des outils où la technicité rencontre l'amusement. Mon équilibre : une architecture instructive au service d'une expérience divertissante."
        />

        <ChaptersScroller>
          <Chapter
            number="I"
            title="Le point de départ"
            paragraphs={[
              "Derrière la création d'un site internet ou une identité de marque, il y a une idée : la vôtre. Une idée singulière, portée par votre vision et votre ambition, qui a grandi jusqu'à devenir une évidence qui ne demande qu'à prendre vie.",
              "Vous n'êtes pas un client parmi d'autres. Dans ce récit, c'est vous le héros : je suis la personne qui vous accompagne, de la définition de votre idée jusqu'à sa concrétisation.",
            ]}
            illustration={
              <Image
                src="/logo/logo-icone.svg"
                alt=""
                width={200}
                height={200}
                className="h-40 w-40 md:h-48 md:w-48"
              />
            }
            illustrationPosition="right"
            button={{
              content: "Feuilleter le portfolio",
              href: "/portfolio",
            }}
          />

          <Chapter
            number="II"
            title="Il était deux fois"
            paragraphs={[
              "Les histoires commencent par « il était une fois ». Fablioo commence par « il était deux fois ». Deux fois, parce que deux vies tiennent dans ce nom : celle de l'animateur, qui a appris que rien ne se transmet sans plaisir, car une morale nue apporte l'ennui ; mais aussi celle du développeur, qui a appris que rien ne tient sans structure. Deux o comme deux fois, deux métiers, deux regards sur le même écran : l'humain d'abord, le code ensuite.",
              "Et quand ces deux cercles se rejoignent, ils forment le symbole de l'infini : la promesse qu'entre votre histoire et ceux qui la découvrent, la boucle ne se referme jamais vraiment, elle commence à chaque visite.",
            ]}
            illustration={
              <Image
                src="/logo/logo-ecrit.svg"
                alt="Fablioo"
                width={244}
                height={64}
                className="h-14 w-auto md:h-20"
              />
            }
            illustrationPosition="left"
          />

          <Chapter
            number="III"
            title="Pourquoi le corbeau et le renard ?"
            paragraphs={[
              "Fablioo vient du mot « fable », dont le corbeau de La Fontaine est l'emblème. C'est celui qui porte une voix, un message, et qui nous accompagne du logo jusqu'au moindre détail du site aaccompagné d'un renard n'étant jamais bien loin, glissé dans les illustrations et traces de pas, clin d'œil pour qui connaît la fable. Cette envie de bien raconter se retrouve aussi dans la palette : des teintes intemporelles plutôt qu'une tendance passagère, pensées pour durer comme chaque projet que j'accompagne.",
            ]}
            illustration={
              <div className="flex items-end justify-center gap-4">
                <Image
                  src="/illustrations/fox.svg"
                  alt=""
                  width={175}
                  height={220}
                  className="h-32 w-auto translate-y-8 md:h-44 md:translate-y-14"
                />
                <Image
                  src="/illustrations/raven.svg"
                  alt=""
                  width={215}
                  height={201}
                  className="h-36 w-auto -translate-y-8 md:h-52 md:-translate-y-14"
                />
              </div>
            }
            illustrationPosition="right"
          />

          <Chapter
            number="IV"
            title="Un design à votre mesure"
            paragraphs={[
              "Le design, c'est donner un visage à une marque avant même qu'on ne la découvre : un logo, une identité visuelle et une palette pensés pour rassurer et rester reconnaissables.",
              "Chaque identité visuelle que je crée est pensée pour révéler ce qui existe déjà chez vous, pas pour suivre une tendance passagère.",
            ]}
            illustration={
              <Image
                src="/illustrations/left-fox.png"
                alt=""
                width={219}
                height={275}
                className="h-56 w-auto md:h-72"
              />
            }
            illustrationPosition="left"
            button={{
              content: "Je veux un super design",
              href: "/services#design",
            }}
          />

          <Chapter
            number="V"
            title="Un développement aussi beau qu'utile"
            paragraphs={[
              "Le développement web, c'est ce qu'on ne voit pas mais qu'on ressent : une architecture claire, un code propre, une structure pensée pour durer. Si le design donne un visage à un projet, le développement lui donne une âme.",
              "Chaque site que je conçois reste rapide, accessible et pensé pour le référencement, du premier clic jusqu'à la conversion.",
            ]}
            illustration={
              <Image
                src="/illustrations/face-fox.png"
                alt=""
                width={316}
                height={271}
                className="h-56 w-auto"
              />
            }
            illustrationPosition="right"
            button={{
              content: "Je veux mon site web",
              href: "/services#site-web",
            }}
          />
        </ChaptersScroller>
      </main>
    </div>
  );
}
