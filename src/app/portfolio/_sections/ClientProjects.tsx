import Reveal from "@/_components/animations/Reveal";
import Pagination from "@/_components/ui/Pagination";
import {
  getProjects,
  getProjectsCount,
  PROJECTS_PAGE_SIZE,
} from "@/lib/projects";
import ProjectsGrid from "./ProjectsGrid";

interface ClientProjectsProps {
  page: number;
}

export default async function ClientProjects({ page }: ClientProjectsProps) {
  const totalCount = await getProjectsCount();
  const totalPages = Math.max(1, Math.ceil(totalCount / PROJECTS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const projects = await getProjects(currentPage - 1);

  return (
    <section
      id="projets-clients"
      // scroll-mt-28 pour compensé le header lors du scroll
      className="relative scroll-mt-28 bg-paper py-16 md:py-24"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <Reveal delay={0.2}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold md:text-5xl">
              Des projets digitaux  qui prennent vie
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Une sélection de projets imaginés pour mes clients, du
              premier échange à la mise en production.
            </p>
          </div>
        </Reveal>

        <ProjectsGrid projects={projects} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/portfolio"
          scrollTargetId="projets-clients"
        />
      </div>
    </section>
  );
}
