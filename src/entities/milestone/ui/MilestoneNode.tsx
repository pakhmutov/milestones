import { useProjects } from '@/app/context/useProjects';
import type { Milestone } from '../model/types';
import { TaskNode } from '@/entities/task/ui/TaskNode';
import { shouldExpandNode } from '@/shared/lib/utils/search';
import { ArrowButton } from '@/shared/ui';
import './MilestoneNode.scss';

interface MilestoneNodeProps {
  milestone: Milestone;
  projectId: string;
}

export function MilestoneNode({ milestone, projectId }: MilestoneNodeProps) {
  const { toggleNode, isNodeExpanded, projects, searchQuery } = useProjects();
  const nodeId = `${projectId}-${milestone.id}`;
  const isExpanded = isNodeExpanded(nodeId);
  const hasMatch = shouldExpandNode(projectId, milestone.id, projects, searchQuery);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNode(nodeId);
    }
  };

  const visibleTasks = milestone.tasks.filter((task) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      milestone.name.toLowerCase().includes(query) ||
      task.title.toLowerCase().includes(query) ||
      task.summary.toLowerCase().includes(query)
    );
  });

  return (
    <div className="milestone-node">
      <div
        className="milestone-header"
        onClick={() => toggleNode(nodeId)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <ArrowButton isExpanded={isExpanded} />
        <span className="milestone-name">{milestone.name}</span>
        <span className="milestone-date">{formatDate(milestone.targetDate)}</span>
      </div>

      {isExpanded && (
        <div className="milestone-content">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => (
              <TaskNode
                key={task.id}
                task={task}
                projectId={projectId}
                milestoneId={milestone.id}
              />
            ))
          ) : hasMatch ? (
            <div className="no-matches">No matching tasks in this milestone</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
