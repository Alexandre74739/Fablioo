import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectHero from "./_components/views/ProjectHero";
import ProjectBeforeAfter from "./_components/views/ProjectBeforeAfter";
import ProjectStory from "./_components/logic/ProjectStory";
import ProjectGallery from "./_components/logic/ProjectGallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Projet client Fablioo`,
    description: project.description,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <main>
        <ProjectHero
          breadcrumb={[
            { label: "Agence", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
          tag={project.tag}
          title={project.title}
          description={project.description}
          image={project.image}
        />

        <ProjectStory details={project.details} caseStudy={project.caseStudy} />

        <ProjectBeforeAfter
          before={project.caseStudy?.avant ?? []}
          after={project.caseStudy?.apres ?? []}
        />

        <ProjectGallery
          images={project.caseStudy?.illustrations ?? []}
          alt={project.title}
          tech={project.tech}
          siteUrl={project.siteUrl}
        />
      </main>
    </div>
  );
}
