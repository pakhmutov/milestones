import type { Project } from "@/entities/project";
import { ProjectNode } from "@/entities/project/ui/ProjectNode";

export function ProjectTree({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project) => (
        <ProjectNode key={project.id} project={project} />
      ))}
    </div>
  );
}
