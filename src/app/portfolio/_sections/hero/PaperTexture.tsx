import { PAPER_LAYERS } from "./constants";

// Texture papier plein cadre : grain + fibre + variation de ton + vignette.
export default function PaperTexture() {
  return (
    <>
      {PAPER_LAYERS.map(({ id, freq, opacity }) => (
        <svg
          key={id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
          style={{ opacity }}
        >
          <filter id={`ph-${id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={freq}
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#ph-${id})`} />
        </svg>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(36,29,26,0.06))",
        }}
      />
    </>
  );
}
