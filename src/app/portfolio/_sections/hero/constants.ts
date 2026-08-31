export const STONE_TRAVEL = 200;

export const PAPER_LAYERS = [
  { id: "grain", freq: 0.9, opacity: 0.2 },
  { id: "fiber", freq: 0.3, opacity: 0.08 },
  { id: "tone", freq: 0.011, opacity: 0.05 },
];

// Fond : instances de « Portfolio » qui se chevauchent, ~1/3 pleines, ~2/3 vides
// Positions fixes (déterministe pour le SSR) ; `size` en vw, pondérée
export const BG_WORDS = [
  { top: "-9%", left: "-7%", size: 21, filled: false },
  { top: "1%", left: "33%", size: 16, filled: true },
  { top: "-5%", left: "63%", size: 23, filled: false },
  { top: "21%", left: "-13%", size: 18, filled: false },
  { top: "29%", left: "39%", size: 25, filled: false },
  { top: "25%", left: "73%", size: 15, filled: true },
  { top: "51%", left: "6%", size: 22, filled: false },
  { top: "59%", left: "47%", size: 17, filled: false },
  { top: "55%", left: "-5%", size: 14, filled: true },
  { top: "73%", left: "59%", size: 20, filled: false },
];
