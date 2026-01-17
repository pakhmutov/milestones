import { ArrowButton } from '@/shared/ui';
import type { Task, TaskStatus } from '../model/types';
import { useProjects } from '@/app/context/useProjects';
import Tag from '@/shared/assets/icons/tag.svg';
import './TaskNode.scss';

interface TaskNodeProps {
  task: Task;
  projectId: string;
  milestoneId: string;
}

const statuses: TaskStatus[] = ['Todo', 'Doing', 'In Review', 'Done'];

export function TaskNode({ task, projectId, milestoneId }: TaskNodeProps) {
  const { toggleNode, isNodeExpanded, updateTask, projects, removeTask } = useProjects();
  const nodeId = `${projectId}-${milestoneId}-${task.id}`;
  const isExpanded = isNodeExpanded(nodeId);

  const assignees: string[] = [];
  projects.forEach((project) => {
    project.milestones.forEach((milestone) => {
      milestone.tasks.forEach((task) => {
        if (task.assignee && !assignees.includes(task.assignee)) {
          assignees.push(task.assignee);
        }
      });
    });
  });

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

  const getStatusColor = (status: Task['status']): string => {
    switch (status) {
      case 'Done':
        return 'var(--color-base-success)';
      case 'In Review':
        return 'var(--color-base-notice)';
      case 'Doing':
        return 'var(--color-base-info)';
      case 'Todo':
        return 'var(--color-base-default)';
      default:
        return 'var(--color-base-default)';
    }
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(projectId, milestoneId, task.id, { assignee: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(projectId, milestoneId, task.id, { status: e.target.value });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      removeTask(projectId, milestoneId, task.id);
    }
  };

  return (
    <div className="task-node">
      <div
        className="task-node__header"
        onClick={() => toggleNode(nodeId)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={isExpanded}
      >
        <ArrowButton isExpanded={isExpanded} />
        <span className="task-node__title">{task.title}</span>
        <span
          className="task-node__status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
        <span className="task-node__due-date">{formatDate(task.dueDate)}</span>
      </div>

      {isExpanded && (
        <div className="task-accordion">
          <div className="task-field">
            <label className="task-label">Summary</label>
            <div className="task-summary">{task.summary}</div>
          </div>

          <div className="task-field">
            <label className="task-label" htmlFor={`assignee-${task.id}`}>
              Assignee
            </label>
            <select
              id={`assignee-${task.id}`}
              className="task-select"
              value={task.assignee || ''}
              onChange={handleAssigneeChange}
            >
              <option value="">Unassigned</option>
              {(() => {
                const options: React.ReactElement[] = [];
                assignees.forEach((assignee) => {
                  options.push(
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>,
                  );
                });
                return options;
              })()}
            </select>
          </div>

          <div className="task-field">
            <label className="task-label" htmlFor={`status-${task.id}`}>
              Status
            </label>
            <select
              id={`status-${task.id}`}
              className="task-select"
              value={task.status}
              onChange={handleStatusChange}
            >
              {(() => {
                const options: React.ReactElement[] = [];
                statuses.forEach((status) => {
                  options.push(
                    <option key={status} value={status}>
                      {status}
                    </option>,
                  );
                });
                return options;
              })()}
            </select>
          </div>

          <div className="task-field">
            <label className="task-label">Due Date</label>
            <div className="task-due-date-value">{formatDate(task.dueDate)}</div>
          </div>

          <div className="task-field">
            <label className="task-label">Tags</label>
            <div className="task-tags">
              {task.tags.length > 0 ? (
                task.tags.map((tag, index) => (
                  <span key={index} className="task-tag">
                    <Tag />
                    {tag}
                  </span>
                ))
              ) : (
                <span className="task-no-tags">No tags</span>
              )}
            </div>
          </div>

          <div className="task-field">
            <button
              type="button"
              className="task-delete-button"
              onClick={handleDelete}
              aria-label={`Delete task ${task.title}`}
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
