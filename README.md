## Fablioo

Site vitrine de Fablioo (Next.js 16 / App Router) : présentation des services, portfolio de projets clients, récits, et formulaire de contact. Le contenu du portfolio est servi depuis PostgreSQL via Prisma.

### Stack

- **Next.js 16** (App Router, Server Actions) + React 19
- **Prisma 7** avec l'adapter `@prisma/adapter-pg` (PostgreSQL)
- **Tailwind CSS 4**
- **Resend** pour l'envoi des e-mails du formulaire de contact
- **Vercel Blob** pour le stockage des images (`*.public.blob.vercel-storage.com`)

### Prérequis

- Node.js 20+
- Une base PostgreSQL (locale ou hébergée)

### Installation

```bash
npm install
```

Créer un fichier `.env` à la racine avec :

```bash
DATABASE_URL=postgresql://...
RESEND_API_KEY=...
RESEND_FROM_EMAIL="Fablioo <contact@exemple.com>"   # optionnel
RESEND_TO_EMAIL=destinataire@exemple.com             # optionnel
```

Puis appliquer le schéma et générer le client Prisma :

```bash
npm run db:push
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Script            | Description                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement                                            |
| `npm run build`   | Applique les migrations Prisma (`prisma migrate deploy`), seed (`prisma db seed`) puis build Next.js |
| `npm run start`   | Démarre le serveur en mode production                                       |
| `npm run lint`    | Lint ESLint                                                                   |
| `npm run db:push` | Pousse le schéma `prisma/schema.prisma` vers la base sans migration          |
| `npm run db:seed` | Exécute `prisma/seed.ts` contre `DATABASE_URL`                               |

`prisma/seed.ts` est la source de vérité du contenu portfolio (projets + études de cas). Il n'applique les données qu'à la base ciblée par `DATABASE_URL` : en local, `npm run db:seed` ne touche que la base locale. La base de production n'est mise à jour qu'au build Vercel (`npm run build`, qui inclut `prisma db seed`), donc **uniquement lors d'un déploiement déclenché par un push GitHub** — jamais depuis un poste local.

### Structure du projet

```
src/
  app/                  routes (App Router)
    page.tsx            page d'accueil
    services/            offres (web, design, maintenance)
    portfolio/            liste + fiche projet ([slug])
    recits/              contenu éditorial
    contact/              formulaire (Server Action dans actions.ts)
    confidentialite/, cookies/, mentions-legales/   pages légales
    sitemap.ts, robots.ts   SEO
  _components/          composants partagés (ui, layout, animations, legal, icons)
  lib/                   accès données (prisma.ts, projects.ts)
  generated/prisma/      client Prisma généré (ne pas éditer)
  hooks/

prisma/
  schema.prisma          modèles Project / SpecifiqueProject
  seed.ts                 script de seed
  migrations/
```

### Modèle de données

- `Project` : un projet du portfolio (slug, titre, description, techs, image, `siteUrl`).
- `SpecifiqueProject` : étude de cas détaillée liée 1-1 à un `Project` (contexte, objectifs, cibles, contraintes, résultats, avant/après, illustrations).

### Déploiement

Optimisé pour Vercel (Blob Storage pour les images, `build` applique les migrations Prisma et le seed automatiquement contre la base de production configurée dans les Environment Variables Vercel). La base de prod n'est donc mise à jour qu'au moment du déploiement déclenché par un push GitHub, jamais avant. Voir [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

### Notes pour les contributeurs

Ce projet utilise une version de Next.js dont les conventions peuvent différer de la doc habituelle — voir [AGENTS.md](AGENTS.md) avant de modifier du code lié au framework.
