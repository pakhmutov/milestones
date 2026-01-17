import { useProjects } from '@/app/context/useProjects';
import { ProjectNode } from '@/entities/project/ui/ProjectNode';
import { matchesSearch } from '@/shared/lib/utils/search';
import './ProjectTree.scss';

export function ProjectTree() {
  const { projects, searchQuery } = useProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="project-tree--empty">
        <p>No projects available</p>
      </div>
    );
  }

  const visibleProjects = projects.filter((project) => {
    if (!searchQuery.trim()) return true;
    return matchesSearch(project, searchQuery);
  });

  if (visibleProjects.length === 0 && searchQuery.trim()) {
    return (
      <div className="project-tree--empty">
        <p>No projects found matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="project-tree">
      {visibleProjects.map((project) => (
        <ProjectNode key={project.id} project={project} />
      ))}
    </div>
  );
}
