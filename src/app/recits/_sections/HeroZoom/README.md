# HeroZoom

- `HeroZoomSection.tsx` — orchestrateur : calcule le scroll-progress et les transforms, compose les sous-composants
- `Background.tsx` — ShaderWaves + dégradé + marquees
- `Marquee.tsx` — le texte défilant en boucle
- `ZoomCard.tsx` — le wrapper qui scale la carte
- `HeroCard.tsx` — la carte interne (rounded/fade) contenant Hero
- `SignatureDraw.tsx` — le SVG de signature animé
- `ZoomLabel.tsx` — le label "Signé, Alexandre" en cascade
- `useSyncedMotionValue.ts` / `useIsMobile.ts` — hooks réutilisables
- `constants.ts` — couleurs, path SVG, texte du label
