import { useState } from "react";
import { ArrowButton } from "@/shared/ui";
import type { Task } from "../model/types";
import "./TaskNode.scss";

interface TaskNodeProps {
  task: Task;
  projectId: string;
  milestoneId: string;
}

export function TaskNode({ task, projectId, milestoneId }: TaskNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: Task["status"]): string => {
    switch (status) {
      case "Done":
        return "var(--color-base-success)";
      case "In Review":
        return "var(--color-base-notice)";
      case "Doing":
        return "var(--color-base-info)";
      case "Todo":
        return "var(--color-base-default)";
      default:
        return "var(--color-base-default)";
    }
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // In a real app, this would update the task via API
    console.log("Assignee changed:", e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // In a real app, this would update the task via API
    console.log("Status changed:", e.target.value);
  };

  return (
    <div className="task-node">
      <div
        className="task-header"
        onClick={() => setIsExpanded(!isExpanded)}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <ArrowButton isExpanded={isExpanded} />
        <span className="task-title">{task.title}</span>
        <span
          className="task-status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
        <span className="task-due-date">{formatDate(task.dueDate)}</span>
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
              value={task.assignee || ""}
              onChange={handleAssigneeChange}
            >
              <option value="">Unassigned</option>
              <option value="Alex">Alex</option>
              <option value="Dmitry">Dmitry</option>
              <option value="Vladimir">Vladimir</option>
              <option value="John">John</option>
              <option value="Jane">Jane</option>
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
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="task-field">
            <label className="task-label">Due Date</label>
            <div className="task-due-date-value">
              {formatDate(task.dueDate)}
            </div>
          </div>

          <div className="task-field">
            <label className="task-label">Tags</label>
            <div className="task-tags">
              {task.tags.length > 0 ? (
                task.tags.map((tag, index) => (
                  <span key={index} className="task-tag">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="task-no-tags">No tags</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
