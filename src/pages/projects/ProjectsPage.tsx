import { ProjectTree } from "@/widgets/project-tree/ProjectTree";
import { mockProjects } from "@/shared/lib/mockData";

export function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectTree projects={mockProjects} />
    </div>
  );
}
