import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/data/project";
import siteConfig from "@/config/site";

const Projects = () => {
  return (
    <div id="projects" className="w-full max-w-2xl mx-auto py-6 scroll-mt-8">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
          # Featured Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Project.map((p, i) => {
          return (
            <ProjectCard
              key={i}
              name={p.name}
              description={p.description}
              isActive={p.isActive}
              type={p.type}
              projectImage={p.projectImage}
              stack={p.stack}
              link={p.link || siteConfig.socials.github}
              slug={p.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
