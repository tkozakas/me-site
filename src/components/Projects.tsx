import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded border border-neutral-800 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <h3 className="font-medium">{project.name}</h3>
            <p className="mt-1 text-sm text-neutral-400">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs text-neutral-500">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
