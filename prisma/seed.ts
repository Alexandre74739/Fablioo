import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";

const projects: Prisma.ProjectUncheckedCreateInput[] = [
  {
    id: 1,
    slug: "recolteo",
    title: "Récoltéo",
    tag: "Application web de dons",
    description:
      "Récoltéo est une plateforme web qui connecte commerçants et associations pour transformer le gaspillage en solidarité pour une gestion simple, légale et durable des invendus.",
    details:
      "Récoltéo est né d'une idée simple : faciliter la rencontre entre celles et ceux qui ont besoin de dons, et celles et ceux qui veulent optimisé leur invendus. Développée durant une mission au sein de l'agence Phoenix pour Lucie Curtatone et ses associés, cette plateforme devait avant tout inspirer confiance grâce à un design aussi propre que sécurisé. Le travail a couvert l'ensemble du parcours : un système de paiement fiable avec Stripe, une base de données solide avec Supabase, et un accompagnement de bout en bout, en binôme avec un développeur junior, jusqu'à la remise des clés aux associés afin qu'ils puissent gérer et faire évoluer le projet.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
    image: "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/recolteo/cover.png",
    siteUrl: "https://recolteo.vercel.app/",
    createdAt: new Date("2026-06-14T22:00:00.000Z"),
  },
  {
    id: 2,
    slug: "echiquier-martinerois",
    title: "Échiquier Martinerois",
    tag: "Site vitrine club sportif",
    description:
      "Le site d'un club d'échecs qui ne se contente pas de se présenter : il permet à chacun de rejouer et comprendre ses parties, comme avec un vrai coach, gratuitement et sans rien installer.",
    details:
      "Échiquier Martinerois est le nouveau site du club d'échecs de Saint-Martin-d'Hères. Le site devait avant tout donner envie de pousser la porte du club : présenter les cours, les tournois, la communauté... bref, donner envie. Mais il fallait aussi un vrai élément distinctif : la possibilité d'analyser ses parties en ligne, comme le ferait un moteur d'échecs, sans que le club n'ait à payer le moindre serveur pour ça. Le site s'appuie sur un CMS Sanity pour que le club garde la main sur son contenu, et embarque directement dans le navigateur des visiteurs un vrai moteur d'analyse (Stockfish).",
    tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Stockfish", "Framer Motion"],
    image:
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/echiquier-martinerois/cover.png",
    siteUrl: "https://echiquier-martinerois.com/",
    createdAt: new Date("2026-07-14T22:00:00.000Z"),
  },
];

const specifiqueProjects: Prisma.SpecifiqueProjectUncheckedCreateInput[] = [
  {
    id: 1,
    projectId: 1,
    contexte:
      "Les 4 associés avaient une idée de départ forte, mais pas encore de direction claire pour la concrétiser : ils savaient qu'ils voulaient créer une plateforme pour relier les commerçants et associations en générant des Cerfas, mais ne savaient pas par où commencer ni quelle forme lui donner. C'est en partant de cette intuition que Récoltéo a pris vie, durant une mission réalisée au sein de l'agence Phoenix. Mon rôle a été de transformer cette idée encore floue en une plateforme concrète, fiable et sécurisée, en les accompagnant à chaque étape jusqu'à une solution qu'ils peuvent gérer en autonomie.",
    objectifs:
      "Au-delà du code, l'enjeu était humain : donner confiance à un commerçant qui s'apprête à faire un geste qu'il n'a pas l'habitude de faire, pour des associations qu'il ne connaît peut-être pas encore. La mission s'est donc construite autour de quatre objectifs clairs, définis dès la note de cadrage : digitaliser le don d'invendus pour qu'un commerçant puisse le déclarer en quelques clics ; automatiser toute la valorisation fiscale, c'est-à-dire le calcul de la réduction d'impôt et la génération des documents officiels (Cerfa et reçu fiscal), sans aucune saisie manuelle ; coordonner les collectes en temps réel entre commerçants et associations en intégrant au passage Stripe pour les paiements ; et donner aux admin un véritable outil de pilotage de la plateforme. ",
    cibles:
      "Des particuliers qui ont envie de donner, et des porteurs de projets qui cherchent un coup de pouce pour avancer — mis en relation simplement, sans barrière technique entre les deux.",
    contraintes:
      "Manipuler de l'argent réel ne pardonne pas l'à-peu-près : chaque paiement devait être irréprochable, tout comme la génération des documents. Il fallait aussi transmettre un projet vivant à une équipe qui allait continuer de leur coté, et donc ne pas seulement livrer du code, mais m'assurer qu'il soit compris, documenté, et que les clients repartent avec les clés en main pour pouvoir le faire évoluer rapidement et sans souci.",
    resultats:
      "Récoltéo est fonctionnel et prêt à tourner : les dons passent, la base de données tient la route, et la génération des documents fiscaux fait le travail. Le projet n'est pas encore ouvert au public : il reste à l'équipe cliente à renseigner ses informations Stripe, et la liaison avec le nom de domaine reste à finaliser. Mais l'essentiel est là : un code solide et une passation pensée pour que chaque associé puisse reprendre la main en autonomie. C'est cette transmission, plus que les lignes de code, dont je suis le plus fier.",
    avant: [
      "Une belle idée, mais aucun outil pour la concrétiser.",
      "Aucun moyen sécurisé de récolter un don en ligne.",
      "Pas de mémoire technique des dons et des projets soutenus.",
    ],
    apres: [
      "Une plateforme vivante qui relie les commerçants et associations facilement.",
      "Des paiements fiables et sécurisés, grâce à Stripe.",
      "Une base de données Supabase solide, prête à grandir avec l'activité.",
      "Une équipe totalement ravie, en plus d'être autonome.",
    ],
    illustrations: [
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/recolteo/illustration1.png",
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/recolteo/illustration4.png",
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/recolteo/illustration3.png",
    ],
  },
  {
    id: 2,
    projectId: 2,
    contexte:
      "Le club d'échecs Échiquier Martinerois, à Saint-Martin-d'Hères, réunit des joueurs de tous âges et de tous niveaux, de Grenoble et de ses environs. Il ne lui manquait plus qu'une vitrine à la hauteur de cette communauté, pour remplacer l'ancien site conçu sur Blogspot, devenu inutile, peu référencé et au design vieillot. Le site devait aussi pouvoir être géré facilement par le président et le trésorier du club, sans compétences techniques particulières. Un projet qui me tenait particulièrement à cœur, puisque je joue moi aussi des échecs.",
    objectifs:
      "Le projet reposait sur quatre objectifs. D'abord, un meilleur référencement (SEO), pour que le club soit vraiment visible sur les moteurs de recherche, contrairement à l'ancien site, resté quasiment invisible. Ensuite, une direction artistique avec un design moderne qui donne réellement envie de pousser la porte (inspirée de la série Le Jeu de la Dame). Il fallait aussi offrir au président et au trésorier un moyen simple de modifier eux-mêmes les informations du site, sans dépendre d'un développeur pour la moindre mise à jour. Enfin, une partie blog et ateliers pensée pour être vraiment utile et convaincante.",
    cibles:
      "Les membres du club, qu'ils soient enfants, adolescents ou adultes, ainsi que toute personne à la recherche d'un club d'échecs sérieux et accueillant à Saint-Martin-d'Hères ou à Grenoble.",
    contraintes:
      "Faire tourner un moteur d'échecs professionnel dans le navigateur, sans aucun serveur, n'est pas simple. Il faut activer des réglages de sécurité avancés pour que le moteur calcule plus vite. Peu de sites vitrines osent mettre en place une configuration aussi pointue.",
    resultats:
      "Le club dispose désormais d'un site qu'il peut faire vivre seul, et d'un outil d'analyse de parties que beaucoup de clubs bien plus grands n'ont pas. Une vitrine à la hauteur de sa communauté, à Saint-Martin-d'Hères comme à Grenoble, portée par un meilleur référencement. Cerise sur le gâteau : le site attire aujourd'hui davantage de nouveaux visiteurs.",
    avant: [
      "Un ancien site sur Blogspot, peu référencé et au design vieillot.",
      "Un site sans réelle utilité et impossible à faire évoluer.",
      "Aucun moyen d'analyser ses parties d'échecs sans installer un logiciel dédié.",
      "Une communication limitée aux réseaux sociaux, sans espace propre au club pour les articles et les ateliers.",
    ],
    apres: [
      "Un site moderne et bien référencé, à la direction artistique soignée, inspirée du Jeu de la Dame.",
      "Un CMS Sanity qui permet au président et au trésorier de gérer le contenu seuls, sans compétences techniques.",
      "Un moteur d'analyse professionnel (Stockfish)  gartuit directement dans le navigateur.",
      "Une partie blog et ateliers pensée pour être vraiment utile aux membres du club.",
    ],
    illustrations: [
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/echiquier-martinerois/illustration1.png",
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/echiquier-martinerois/illustration2.png",
      "https://pdwdmf7lgeoiai9c.public.blob.vercel-storage.com/echiquier-martinerois/illustration3.png",
    ],
  },
];

async function seed(databaseUrl: string) {
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }

  for (const specifique of specifiqueProjects) {
    await prisma.specifiqueProject.upsert({
      where: { id: specifique.id },
      update: specifique,
      create: specifique,
    });
  }

  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Projects"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "Projects"))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SpecifiqueProject"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "SpecifiqueProject"))`;

  await prisma.$disconnect();
}

async function main() {
  await seed(process.env.DATABASE_URL!);
  console.log("Base mise à jour.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
