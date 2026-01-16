import { useProjects } from '@/app/context/useProjects';
import { ProjectNode } from '@/entities/project/ui/ProjectNode';
import './ProjectTree.scss';

export function ProjectTree() {
  const { projects } = useProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="project-tree--empty">
        <p>No projects available</p>
      </div>
    );
  }

  return (
    <div className="project-tree">
      {projects.map((project) => (
        <ProjectNode key={project.id} project={project} />
      ))}
    </div>
  );
}
