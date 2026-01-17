import { useProjects } from '@/app/context/useProjects';
import type { Project } from '../model/types';
import { MilestoneNode } from '@/entities/milestone/ui/MilestoneNode';
import { calculateProjectProgress } from '@/shared/lib/utils/progress';
import { shouldExpandNode } from '@/shared/lib/utils/search';
import { ArrowButton } from '@/shared/ui';
import './ProjectNode.scss';

interface ProjectNodeProps {
  project: Project;
}

export function ProjectNode({ project }: ProjectNodeProps) {
  const { toggleNode, isNodeExpanded, projects, searchQuery } = useProjects();
  const isExpanded = isNodeExpanded(project.id);
  const progress = calculateProjectProgress(project);
  const hasMatch = shouldExpandNode(project.id, null, projects, searchQuery);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNode(project.id);
    }
  };

  const visibleMilestones = project.milestones.filter((milestone) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    if (project.name.toLowerCase().includes(query)) {
      return true;
    }
    return (
      milestone.name.toLowerCase().includes(query) ||
      milestone.tasks.some(
        (task) =>
          task.title.toLowerCase().includes(query) || task.summary.toLowerCase().includes(query),
      )
    );
  });

  return (
    <div className="project-node">
      <div
        className="project-header"
        onClick={() => toggleNode(project.id)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <ArrowButton isExpanded={isExpanded} />
        <span className="project-name">{project.name}</span>
        <div className="project-progress">
          <div className="project-progress-bar">
            <div className="project-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="project-progress-text">{progress}%</span>
        </div>
      </div>

      {isExpanded && (
        <div className="project-content">
          {visibleMilestones.length > 0 ? (
            visibleMilestones.map((milestone) => (
              <MilestoneNode key={milestone.id} milestone={milestone} projectId={project.id} />
            ))
          ) : hasMatch ? (
            <div className="no-matches">No matching milestones in this project</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
