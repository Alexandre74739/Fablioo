import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";
import { extname } from "node:path";
import { put } from "@vercel/blob";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const [, , slug, filePath] = process.argv;

if (!slug || !filePath) {
  console.error(
    "Usage: npx tsx scripts/upload-project-image.ts <slug> <chemin-du-fichier-local>",
  );
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`Fichier introuvable : ${filePath}`);
  process.exit(1);
}

async function updateProjectImage(databaseUrl: string, imageUrl: string) {
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });
  await prisma.project.update({
    where: { slug },
    data: { image: imageUrl },
  });
  await prisma.$disconnect();
}

async function main() {
  const file = readFileSync(filePath);
  const ext = extname(filePath) || ".png";

  const blob = await put(`projects/${slug}${ext}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  console.log(`Uploadé sur Vercel Blob : ${blob.url}`);

  await updateProjectImage(process.env.DATABASE_URL!, blob.url);
  console.log("Base locale mise à jour.");

  const prodUrl = process.env.PROD_DATABASE_URL;
  if (prodUrl) {
    await updateProjectImage(prodUrl, blob.url);
    console.log("Base de prod (Neon) mise à jour.");
  } else {
    console.log(
      "PROD_DATABASE_URL non défini : base de prod non mise à jour. Relance avec PROD_DATABASE_URL=... si besoin.",
    );
  }
}

main();
