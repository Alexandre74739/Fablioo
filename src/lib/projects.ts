import { prisma } from "@/lib/prisma";

export const PROJECTS_PAGE_SIZE = 10;

export function getProjects(page: number) {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    skip: page * PROJECTS_PAGE_SIZE,
    take: PROJECTS_PAGE_SIZE,
  });
}

export function getProjectsCount() {
  return prisma.project.count();
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { caseStudy: true },
  });
}

export async function getAllProjectSlugs() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((project) => project.slug);
}
