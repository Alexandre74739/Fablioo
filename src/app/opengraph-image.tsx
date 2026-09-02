// ImageResponse (Satori) ne gère que <img> — next/image n'y est pas disponible.
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Fablioo — création de sites web et de design sur mesure à Grenoble";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f7f1e6";
const PRUNE = "#5a3550";
const ENCRE = "#241d1a";
const ROSEWOOD = "#9e5252";

async function readAsset(path: string) {
  const data = await readFile(join(process.cwd(), path));
  return data.toString("base64");
}

async function loadGoogleFont(family: string, text: string, italic = false) {
  const axis = italic ? "ital,wght@1,400" : "wght@400";
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:${axis}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  )?.[1];
  if (!src) throw new Error(`Impossible de charger la police ${family}`);
  return (await fetch(src)).arrayBuffer();
}

export default async function Image() {
  const headline = "Des sites web qui racontent votre histoire";
  const eyebrow = "Il était deux fois";
  const body =
    "Studio de design et de développement web à Grenoble. Identité visuelle, site vitrine et outils sur mesure, pensés comme un récit.";
  const places = "Grenoble · Saint-Martin-d’Hères";
  const domain = "fablioo.com";

  const [logoText, logoIcon, blob1, blob2, blob3, blob4] = await Promise.all([
    readAsset("public/logo/logo-ecrit.svg"),
    readAsset("public/logo/logo-icone.svg"),
    readAsset("public/shapes/blob-1.svg"),
    readAsset("public/shapes/blob-2.svg"),
    readAsset("public/shapes/blob-3.svg"),
    readAsset("public/shapes/blob-4.svg"),
  ]);

  const fontText = `${headline}${eyebrow}${body}${places}${domain}Fablioo`;
  const fonts: {
    name: string;
    data: ArrayBuffer;
    style: "normal" | "italic";
    weight: 400;
  }[] = [];
  const loaded = await Promise.allSettled([
    loadGoogleFont("Archivo Black", fontText),
    loadGoogleFont("Inter", fontText),
    loadGoogleFont("Source Serif 4", eyebrow, true),
  ]);
  if (loaded[0].status === "fulfilled")
    fonts.push({
      name: "Archivo Black",
      data: loaded[0].value,
      style: "normal",
      weight: 400,
    });
  if (loaded[1].status === "fulfilled")
    fonts.push({
      name: "Inter",
      data: loaded[1].value,
      style: "normal",
      weight: 400,
    });
  if (loaded[2].status === "fulfilled")
    fonts.push({
      name: "Source Serif 4",
      data: loaded[2].value,
      style: "italic",
      weight: 400,
    });

  const display = fonts.some((f) => f.name === "Archivo Black")
    ? "Archivo Black"
    : "sans-serif";
  const sans = fonts.some((f) => f.name === "Inter") ? "Inter" : "sans-serif";
  const serif = fonts.some((f) => f.name === "Source Serif 4")
    ? "Source Serif 4"
    : "serif";

  const svg = (b64: string) => `data:image/svg+xml;base64,${b64}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "60px 88px",
          fontFamily: sans,
          color: ENCRE,
          overflow: "hidden",
        }}
      >
        <img
          src={svg(blob1)}
          alt=""
          width={520}
          height={347}
          style={{ position: "absolute", top: -170, left: -160 }}
        />
        <img
          src={svg(blob2)}
          alt=""
          width={400}
          height={640}
          style={{ position: "absolute", top: -80, right: -240 }}
        />
        
        
        <img
          src={svg(blob2)}
          alt=""
          width={360}
          height={576}
          style={{
            position: "absolute",
            bottom: -320,
            left: -120,
            transform: "rotate(28deg)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <img
            src={svg(logoText)}
            alt="Fablioo"
            width={275}
            height={72}
          />
          <img
            src={svg(logoIcon)}
            alt=""
            width={110}
            height={90}
            style={{ marginTop: 18 }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 32,
              color: ROSEWOOD,
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </span>
          <div
            style={{
              display: "flex",
              fontFamily: display,
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: ENCRE,
              maxWidth: 860,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              lineHeight: 1.5,
              color: "rgba(36, 29, 26, 0.78)",
              maxWidth: 880,
              marginTop: 22,
            }}
          >
            {body}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `2px solid rgba(90, 53, 80, 0.25)`,
              paddingTop: 18,
            }}
          >
            <span style={{ display: "flex", fontSize: 24, color: ENCRE }}>
              {places}
            </span>
            <span
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 600,
                color: PRUNE,
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
