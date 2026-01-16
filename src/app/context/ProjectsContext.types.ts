import type { Project } from '@/entities/project';

export interface ProjectsContextType {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  isNodeExpanded: (nodeId: string) => boolean;
}
