import type { Skill } from "@/_components/ui/cards/SkillCard";

export const SKILLS: Skill[] = [
  {
    id: "tailwind",
    label: "Tailwind CSS",
    description: "Un design cousu main, cohérent à l'écran près.",
    details: [
      "Tailwind me permet de construire des interfaces sur-mesure sans jamais sacrifier la cohérence : espacements, couleurs et typographies restent alignés du premier écran au dernier, même quand le projet grandit.",
      "Pourquoi c'est important selon moi : un design cohérent inspire confiance dès la première visite. C'est souvent ce qui distingue un site artisanal d'un site qui a l'air fait à la va-vite.",
    ],
  },
  {
    id: "java",
    label: "Java",
    description: "Une rigueur héritée de la programmation orientée objet.",
    details: [
      "Mes bases en Java m'ont appris à structurer un projet avant d'écrire la moindre ligne : penser en objets, anticiper les cas limites et garder un code lisible, même sur des logiques complexes.",
      "Pourquoi c'est important selon moi : cette rigueur se retrouve dans tout ce que je construis aujourd'hui, même sur des projets plus légers. Un socle solide évite bien des mauvaises surprises plus tard.",
    ],
  },
  {
    id: "linux",
    label: "Linux",
    description: "Un environnement fiable, du serveur au déploiement.",
    details: [
      "Je suis à l'aise en ligne de commande et sur serveur Linux, du déploiement au monitoring. De quoi garder la main sur l'hébergement de votre site plutôt que de dépendre d'une boîte noire.",
      "Pourquoi c'est important selon moi : comprendre ce qui se passe sous le capot me permet de réagir vite en cas de problème, et de vous expliquer clairement ce qui se passe, sans jargon inutile.",
    ],
  },
  {
    id: "framer",
    label: "Framer Motion",
    description: "Des animations qui donnent vie à votre histoire.",
    details: [
      "Framer Motion habille vos pages d'animations et de transitions fluides. Rien de gratuit : chaque mouvement guide le regard et donne envie de continuer à faire défiler la page.",
      "Pourquoi c'est important selon moi : une belle animation n'est jamais décorative pour moi, elle raconte quelque chose. C'est ce qui transforme un site qu'on visite en une histoire qu'on vit.",
    ],
  },
  {
    id: "github",
    label: "GitHub",
    description: "Un historique clair, des retours en arrière possibles.",
    details: [
      "Chaque évolution de votre site est versionnée et documentée sur GitHub. En cas de pépin, on peut toujours revenir en arrière : rien n'est jamais perdu.",
      "Pourquoi c'est important selon moi : je préfère un filet de sécurité qu'on n'utilise jamais plutôt qu'aucun filet du tout le jour où on en a besoin.",
    ],
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "Des pages rapides, optimisées pour le référencement.",
    details: [
      "Next.js s'est mon petit bébé. C'est avec lui que je pose la plupart des bases de mes sites : rendu rapide, SEO soigné et de bonnes performances par défaut, pour que votre site se charge vite et se fasse trouver sur Google.",
      "Pourquoi c'est important selon moi : un site magnifique que personne ne trouve ou qui met dix secondes à charger ne sert à rien. La technique doit rester invisible, au service de l'histoire.",
    ],
  },
  {
    id: "react",
    label: "React",
    description: "Des interfaces vivantes qui réagissent à chaque geste.",
    details: [
      "React permet de construire des interfaces découpées en composants réutilisables, réactives et faciles à faire évoluer au fil de vos nouvelles envies.",
      "Pourquoi c'est important selon moi : votre site n'est jamais vraiment 'fini'. Cette souplesse me permet d'ajouter un nouveau chapitre à votre histoire sans devoir tout réécrire. Pas mal non ?",
    ],
  },
  {
    id: "typescript",
    label: "TypeScript",
    description: "Un code fiable, sans mauvaise surprise.",
    details: [
      "TypeScript vérifie mon code avant même qu'il ne s'exécute. Moins d'erreurs qui passent inaperçues, un développement plus serein et un site plus stable pour vous.",
      "Pourquoi c'est important selon moi : je préfère passer un peu plus de temps à bien poser les fondations que de découvrir un bug en production, devant vous.",
    ],
  },
  {
    id: "supabase",
    label: "Supabase",
    description: "Une base de données prête à grandir avec vous.",
    details: [
      "Supabase gère base de données, authentification et stockage sans complexité inutile. Idéal pour des projets qui ont besoin de comptes utilisateurs ou de contenu dynamique.",
      "Pourquoi c'est important selon moi : votre projet doit pouvoir grandir sans qu'on soit obligé de tout reconstruire dès que vos besoins évoluent.",
    ],
  },
  {
    id: "sass",
    label: "Sass",
    description: "Des styles organisés, faciles à maintenir dans le temps.",
    details: [
      "Sur les projets qui le demandent, Sass structure les feuilles de style en composants clairs et réutilisables, pour un site plus simple à faire évoluer dans la durée.",
      "Pourquoi c'est important selon moi : un code de style organisé aujourd'hui, c'est un site qu'on peut faire évoluer sereinement dans deux ans, sans tout casser.",
    ],
  },
  {
    id: "wordpress",
    label: "WordPress",
    description: "Un site que vous pouvez faire vivre vous-même.",
    details: [
      "Quand l'autonomie de contenu prime sur le sur-mesure, WordPress vous laisse la main : vous mettez à jour vos textes, vos images et vos articles sans avoir besoin de moi à chaque fois.",
      "Pourquoi c'est important selon moi : je ne crois pas au sur-mesure à tout prix. Parfois, la meilleure solution est celle qui vous rend le plus autonome.",
    ],
  },
  {
    id: "prisma",
    label: "Prisma",
    description: "Une base de données modélisée sans friction.",
    details: [
      "Prisma modélise clairement la base de données de votre projet et sécurise chaque échange entre le code et vos données, pour éviter les erreurs les plus courantes.",
      "Pourquoi c'est important selon moi : vos données sont souvent ce que vous avez de plus précieux dans votre activité. Elles méritent d'être traitées avec autant de soin que le design.",
    ],
  },
  {
    id: "godot",
    label: "Godot",
    description: "Des expériences interactives, pensées comme un jeu.",
    details: [
      "Avec Godot, j'explore des expériences interactives plus ludiques : mini-jeux, animations pilotées par un moteur, ou touches d'interaction inattendues sur un site classique.",
      "Pourquoi c'est important selon moi : un site qui surprend agréablement se raconte. C'est souvent ce petit supplément d'âme qu'on garde en mémoire longtemps après la visite.",
    ],
  },
];
