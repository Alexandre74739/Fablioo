@AGENTS.md

# Contexte

Site vitrine Next.js 16 (App Router) + Prisma 7/PostgreSQL. Voir [README.md](README.md) pour l'installation, les scripts et la structure détaillée.

## Points clés

- **Data layer** : tout accès au portfolio passe par [src/lib/projects.ts](src/lib/projects.ts) (via `prisma` exporté depuis [src/lib/prisma.ts](src/lib/prisma.ts)). Ne pas instancier un second `PrismaClient`.
- **Client Prisma généré** : `src/generated/prisma/` est généré par `prisma generate` (hook `postinstall`) — ne jamais l'éditer à la main, régénérer après un changement de `prisma/schema.prisma`.
- **Formulaire de contact** : [src/app/contact/actions.ts](src/app/contact/actions.ts) est une Server Action avec honeypot anti-bot, délai minimum de soumission, et sanitisation des champs contre l'injection d'en-têtes e-mail (Resend). Conserver ces protections lors de toute modification.
- **Images** : uniquement via Vercel Blob (`*.public.blob.vercel-storage.com`, configuré dans `next.config.ts`). Toute nouvelle source d'images distante doit être ajoutée à `images.remotePatterns`.
- **Alias d'import** : `@/*` pointe vers `src/*` (voir `tsconfig.json`). Utiliser cet alias pour tout ce qui est partagé (`@/_components/...`, `@/lib/...`, `@/hooks/...`) ; utiliser des imports relatifs (`./`) uniquement entre fichiers d'une même route (ex. `page.tsx` → `./_sections/Hero`).
- **Contenu du portfolio (seed)** : [prisma/seed.ts](prisma/seed.ts) est la source de vérité versionnée des projets/études de cas. `npm run db:seed` n'applique les données qu'à la base ciblée par `DATABASE_URL` (locale en dev). **Ne jamais mettre à jour la base de production depuis un poste local** : la prod n'est seedée qu'au build Vercel (`npm run build` → `prisma migrate deploy && prisma db seed`), donc uniquement lors d'un déploiement déclenché par un push GitHub.

## Composants : réutilisation avant création

Avant d'écrire un nouveau composant, chercher s'il existe déjà dans `src/_components/` (composants génériques, transverses à tout le site) :

- `_components/ui/` : briques d'interface génériques et non liées à une page — `Button`, `Input`, `Pagination`, `AccordionItem`, `NavButton`, `ArianeFil`, `ChapterNav`, `Pill`, `SkillsCarousel`, `SkillsCascade`.
- `_components/ui/cards/` : familles de cartes réutilisables — `Card`, `ProjectCard`, `PricingCard`, `SkillCard`, `BeforeAfterCard`, `CardMap`.
- `_components/ui/modals/` : modales génériques (`CardMap`, `Skill`).
- `_components/animations/` : primitives de motion/décor réutilisées sur plusieurs pages — `Reveal`, `FloatingBlob`, `ChromaKeyVideo`, `PawTrail`, `ShaderWaves`.
- `_components/layout/` : `Header` et `Footer`, montés une seule fois dans `src/app/layout.tsx`.
- `_components/legal/` : `LegalLayout`, partagé par les pages `confidentialite`, `cookies`, `mentions-legales`.
- `_components/icons/` : icônes custom (`LinkedinIcon`, `GithubIcon`) au lieu de dupliquer du SVG inline.
- `src/hooks/` : hooks partagés (ex. `useHeroParallax`), même logique — ne pas réécrire un hook déjà présent.

**Règle** : un composant générique (carte, bouton, animation…) vit dans `_components/`, et la page qui l'utilise se contente de le composer avec ses propres données/props. Ex. `ProjectBeforeAfter` (route `_components`) importe et met en page `BeforeAfterCard` (`_components/ui/cards`) plutôt que de réimplémenter une carte avant/après. N'écrire un composant local à une route que s'il n'a aucune vocation à être réutilisé ailleurs (ex. `ContactForm`, sections d'accueil).

### Conventions de dossiers (préfixe `_`, non routable par Next.js)

- **`_sections/`** : découpage d'une page en blocs verticaux assemblés dans son `page.tsx` (ex. `src/app/portfolio/_sections/{Hero,Skills,ClientProjects,ProjectsGrid}.tsx` importés tels quels dans `src/app/portfolio/page.tsx`). C'est le niveau par défaut pour toute page simple.
- **`_components/`** : utilisé à la place de (ou en complément de) `_sections` quand une route a besoin d'une décomposition plus fine que de simples blocs de page — typiquement les routes dynamiques. Sous-organisation observée sur `src/app/portfolio/[slug]/_components/` :
  - `views/` : composants de présentation (ce qui s'affiche — `ProjectHero`, `ProjectMeta`, `ProjectGallery`, `ProjectBeforeAfter`, `StoryPartSection`).
  - `logic/` : composants porteurs de comportement/état (`ProjectStory`, `StoryPath`).
- Ne jamais placer un composant propre à une seule route dans `src/_components/` (racine), et ne jamais dupliquer dans une route un composant qui existe déjà globalement.

## Style

- Le contenu et les messages utilisateur (formulaires, pages légales) sont en français ; garder cette langue dans tout texte visible par l'utilisateur.
- Pas de commentaires explicatifs sauf pour documenter un choix non évident (ex. les commentaires anti-abus dans `actions.ts`).
