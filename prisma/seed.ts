import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const projects: Prisma.ProjectUncheckedCreateInput[] = [];

const specifiqueProjects: Prisma.SpecifiqueProjectUncheckedCreateInput[] = [];

async function main() {
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
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
