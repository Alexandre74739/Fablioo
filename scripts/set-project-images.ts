import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const [, , slug, coverUrl, ...galleryUrls] = process.argv;

if (!slug || !coverUrl) {
  console.error(
    "Usage: npx tsx scripts/set-project-images.ts <slug> <cover-url> [gallery-url...]",
  );
  process.exit(1);
}

const illustrations = galleryUrls;

async function updateImages(databaseUrl: string) {
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  const project = await prisma.project.update({
    where: { slug },
    data: { image: coverUrl },
  });

  await prisma.specifiqueProject.update({
    where: { projectId: project.id },
    data: { illustrations },
  });

  await prisma.$disconnect();
}

async function main() {
  await updateImages(process.env.DATABASE_URL!);
  console.log("Base locale mise à jour.");

  const prodUrl = process.env.PROD_DATABASE_URL;
  if (prodUrl) {
    await updateImages(prodUrl);
    console.log("Base de prod (Neon) mise à jour.");
  } else {
    console.log(
      "PROD_DATABASE_URL non défini : base de prod non mise à jour. Relance avec PROD_DATABASE_URL=... si besoin.",
    );
  }
}

main();
