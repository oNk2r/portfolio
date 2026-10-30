import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Project } from "@/lib/data/project";
import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ProjectVideoPlayer from "@/components/Project/ProjectVideoPlayer";
import Footer from "@/components/Footer/Footer";
import siteConfig from "@/config/site";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Project.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = Project.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | ${siteConfig.name}`,
    description: project.description,
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const project = Project.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mt-2">
      <div className="w-full relative border-b border-t font-mono tracking-tight border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto gap-1 flex flex-col max-w-2xl border-x border-neutral-200 dark:border-neutral-800 relative">
          <div className="p-2 items-center flex gap-2 mt-2">
            <Link href={"/"}>
              <div className="text-neutral-700 dark:text-neutral-300 w-fit p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <HugeiconsIcon icon={ChevronLeft} />
              </div>
            </Link>
            <p className="text-lg font-sans font-semibold text-neutral-900 dark:text-neutral-100">
              {project.name}
            </p>
          </div>

          {/* Video Block */}
          {project.video && (
            <div className="h-70 m-2 rounded-lg p-2 border border-neutral-200 dark:border-neutral-800">
              <ProjectVideoPlayer src={project.video} />
            </div>
          )}

          {/* Links Block */}
          <div className="grid mx-2 my-2 grid-cols-2 divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden text-sm bg-neutral-50/50 dark:bg-neutral-900/40">
            <Link
              href={project.github || siteConfig.socials.github}
              target="_blank"
              className="flex items-center justify-center gap-1.5 py-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Github
            </Link>

            {project.isActive && project.link ? (
              <Link
                href={project.link}
                target="_blank"
                className="flex items-center justify-center gap-1.5 py-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 cursor-pointer transition-colors"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                Live Demo
              </Link>
            ) : (
              <span className="flex items-center justify-center gap-1.5 py-2.5 text-neutral-400 dark:text-neutral-600 cursor-not-allowed select-none">
                In Progress
              </span>
            )}
          </div>

          <div className="flex items-start mx-5 justify-center flex-col">
            <div className="flex items-center w-full justify-between">
              <h3 className="text-xl font-sans font-semibold text-neutral-900 dark:text-neutral-100">
                {project.name}
              </h3>
              <span
                className={`text-[11px] flex items-center gap-1 justify-center rounded-full ${
                  project.isActive
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-orange-500 dark:text-orange-400"
                }`}
              >
                <div className="w-3 h-3 relative">
                  <div
                    className={`w-3 h-3 animate-ping rounded-full ${
                      project.isActive
                        ? "bg-green-300 dark:bg-green-500/40"
                        : "bg-orange-200 dark:bg-orange-500/40"
                    }`}
                  />
                  <div
                    className={`absolute w-2 h-2 -translate-y-1/2 left-1/2 top-1/2 ${
                      project.isActive ? "bg-green-500" : "bg-orange-400"
                    } rounded-full -translate-x-1/2`}
                  />
                </div>
                {project.isActive ? "Live" : "Building.."}
              </span>
            </div>
            <div>
              <p className="text-wrap text-neutral-700 dark:text-neutral-300 py-3">
                {project.description}
              </p>
            </div>
          </div>

          <div className="px-5 py-3">
            <p className="text-lg font-sans font-semibold text-neutral-900 dark:text-neutral-100 mb-2.5 tracking-wide">
              Stack used
            </p>
            <div className="flex flex-wrap gap-2 pb-2">
              {project.stack.map((item, i) => (
                <Badge key={i} name={item.label} icon={item.icon} />
              ))}
            </div>
          </div>

          <div className="p-4 mb-8 -mt-1 font-sans border-t border-neutral-200 dark:border-neutral-800 items-center justify-center flex">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              For more cool projects, visit my{" "}
              <Link
                href={siteConfig.socials.github}
                target={"_blank"}
                className="text-neutral-900 dark:text-neutral-100 hover:underline font-semibold"
              >
                Github.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

const Badge = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-sm font-medium transition-colors cursor-default select-none whitespace-nowrap">
    <span className="text-xs leading-none">{icon}</span>
    {name}
  </div>
);
