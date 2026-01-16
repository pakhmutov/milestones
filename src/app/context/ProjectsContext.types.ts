import type { Project } from '@/entities/project';

export interface ProjectsContextType {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  isNodeExpanded: (nodeId: string) => boolean;
  updateTask: (
    projectId: string,
    milestoneId: string,
    taskId: string,
    updates: { assignee?: string; status?: string },
  ) => void;
  removeTask: (projectId: string, milestoneId: string, taskId: string) => void;
}
