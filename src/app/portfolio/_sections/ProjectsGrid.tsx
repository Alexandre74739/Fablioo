import Reveal from "@/_components/animations/Reveal";
import ProjectCard from "@/_components/ui/cards/ProjectCard";
import type { Project } from "@/generated/prisma/client";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="mt-12 text-center text-encre/70">
        De nouveaux projets clients arrivent bientôt.
      </p>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.id} delay={0.1 * (index % 2)}>
          <ProjectCard
            slug={project.slug}
            image={project.image}
            tag={project.tag}
            title={project.title}
            description={project.description}
          />
        </Reveal>
      ))}
    </div>
  );
}
