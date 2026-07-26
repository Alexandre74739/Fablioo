import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import PawTrail from "@/_components/animations/PawTrail";
import ArianeFil from "@/_components/ui/ArianeFil";
import JsonLd from "@/_components/ui/JsonLd";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectHero from "./_components/ProjectHero";
import ProjectStory from "./_components/ProjectStory";
import ProjectBeforeAfter from "./_components/ProjectBeforeAfter";
import ProjectGallery from "./_components/ProjectGallery";
import ProjectMeta from "./_components/ProjectMeta";

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

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.siteUrl,
    creator: {
      "@type": "Person",
      name: "Alexandre-Philippe Perez",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Agence",
        item: "https://fablioo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://fablioo.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://fablioo.com/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <div>
      <JsonLd data={projectJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <section className="relative overflow-hidden bg-paper pt-32 pb-16 md:pt-40 md:pb-20">
          <FloatingBlob
            src="/shapes/blob-1.svg"
            className="-left-20 top-16 hidden h-44 w-64 opacity-60 md:block"
            duration={9}
            yRange={16}
            rotateRange={5}
          />
          <FloatingBlob
            src="/shapes/blob-2.svg"
            className="-right-14 bottom-0 hidden h-56 w-40 opacity-50 md:block"
            duration={8}
            delay={1}
            yRange={-16}
            rotateRange={-6}
          />

          <div className="container relative z-10 mx-auto max-w-4xl px-4">
            <Reveal>
              <ArianeFil
                items={[
                  { label: "Agence", href: "/" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: project.title },
                ]}
              />
            </Reveal>

            <div className="mt-6">
              <ProjectHero
                tag={project.tag}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-encre/10 bg-paper py-20 md:py-28">
          <FloatingBlob
            src="/shapes/blob-3.svg"
            className="-right-20 top-1/4 hidden h-52 w-52 opacity-50 md:block"
            duration={7}
            delay={0.5}
            yRange={14}
            rotateRange={5}
          />
          <div
            className="pointer-events-none absolute -left-8 bottom-0 hidden h-100 w-52 opacity-70 md:block"
            aria-hidden="true"
          >
            <PawTrail className="h-full w-full" rotate={-12} />
          </div>

          <div className="container relative z-10 mx-auto flex max-w-4xl flex-col gap-16 px-4">
            <ProjectStory
              details={project.details}
              caseStudy={project.caseStudy}
            />
            {project.caseStudy && (
              <ProjectBeforeAfter
                before={project.caseStudy.avant}
                after={project.caseStudy.apres}
              />
            )}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-encre/10 bg-paper py-20 md:py-28">
          <FloatingBlob
            src="/shapes/blob-4.svg"
            className="-right-16 -bottom-10 hidden h-60 w-60 opacity-50 md:block"
            duration={10}
            delay={1.5}
            yRange={-16}
            rotateRange={-6}
          />
          <div
            className="pointer-events-none absolute -right-8 top-10 hidden h-96 w-48 -rotate-12 opacity-60 md:block"
            aria-hidden="true"
          >
            <PawTrail className="h-full w-full" rotate={165} />
          </div>

          <div className="container relative z-10 mx-auto flex max-w-4xl flex-col gap-14 px-4">
            <ProjectGallery
              images={project.caseStudy?.illustrations ?? []}
              alt={project.title}
            />
            <ProjectMeta tech={project.tech} siteUrl={project.siteUrl} />
          </div>
        </section>
      </main>
    </div>
  );
}
