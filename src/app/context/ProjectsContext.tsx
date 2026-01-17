import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '@/entities/project';
import type { Task } from '@/entities/task';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { shouldExpandNode } from '@/shared/lib/utils/search';
import { ProjectsContext } from './ProjectsContext.context';

function restoreDates(projects: unknown[]): Project[] {
  return projects.map((project) => {
    const p = project as {
      id: string;
      name: string;
      milestones: Array<{
        id: string;
        name: string;
        targetDate: string | Date;
        tasks: Array<{
          id: string;
          title: string;
          summary: string;
          assignee?: string;
          status: string;
          dueDate: string | Date;
          tags: string[];
        }>;
      }>;
    };
    return {
      ...p,
      milestones: p.milestones.map((milestone) => ({
        ...milestone,
        targetDate: new Date(milestone.targetDate),
        tasks: milestone.tasks.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
        })),
      })),
    } as Project;
  });
}

export function ProjectsProvider({
  children,
  projects: initialProjects,
}: {
  children: ReactNode;
  projects: Project[];
}) {
  const [storedProjects, setStoredProjects] = useLocalStorage<Project[]>(
    'milestones-projects',
    initialProjects,
  );

  const [projects, setProjectsState] = useState<Project[]>(() => {
    try {
      return restoreDates(storedProjects as unknown[]);
    } catch {
      return initialProjects;
    }
  });

  const setProjects = (newProjects: Project[] | ((prev: Project[]) => Project[])) => {
    setProjectsState((prev) => {
      const updated = typeof newProjects === 'function' ? newProjects(prev) : newProjects;
      setStoredProjects(updated);
      return updated;
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [expandedNodes, setExpandedNodes] = useLocalStorage<Set<string>>(
    'milestones-expanded-nodes',
    new Set<string>(),
  );
  const lastSearchQueryRef = useRef<string>('');

  useEffect(() => {
    if (debouncedSearchQuery === lastSearchQueryRef.current) return;
    lastSearchQueryRef.current = debouncedSearchQuery;

    if (!debouncedSearchQuery.trim()) return;

    const newExpanded = new Set(expandedNodes);
    let hasChanges = false;

    projects.forEach((project) => {
      if (shouldExpandNode(project.id, null, projects, debouncedSearchQuery)) {
        if (!newExpanded.has(project.id)) {
          newExpanded.add(project.id);
          hasChanges = true;
        }

        project.milestones.forEach((milestone) => {
          if (shouldExpandNode(project.id, milestone.id, projects, debouncedSearchQuery)) {
            const milestoneNodeId = `${project.id}-${milestone.id}`;
            if (!newExpanded.has(milestoneNodeId)) {
              newExpanded.add(milestoneNodeId);
              hasChanges = true;
            }
          }
        });
      }
    });

    if (hasChanges) {
      setExpandedNodes(newExpanded);
    }
  }, [debouncedSearchQuery, expandedNodes, projects, setExpandedNodes]);

  const toggleNode = (nodeId: string) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(nodeId)) {
      newSet.delete(nodeId);
    } else {
      newSet.add(nodeId);
    }
    setExpandedNodes(newSet);
  };

  const isNodeExpanded = (nodeId: string): boolean => {
    return expandedNodes.has(nodeId);
  };

  const updateTask = (
    projectId: string,
    milestoneId: string,
    taskId: string,
    updates: { assignee?: string; status?: string },
  ) => {
    setProjects((prevProjects) => {
      const updated = prevProjects.map((project) => {
        if (project.id !== projectId) return project;

        return {
          ...project,
          milestones: project.milestones.map((milestone) => {
            if (milestone.id !== milestoneId) return milestone;

            return {
              ...milestone,
              tasks: milestone.tasks.map((task) => {
                if (task.id !== taskId) return task;

                return {
                  ...task,
                  ...(updates.assignee !== undefined && {
                    assignee: updates.assignee || undefined,
                  }),
                  ...(updates.status !== undefined && { status: updates.status as Task['status'] }),
                };
              }),
            };
          }),
        };
      });
      return updated;
    });
  };

  const removeTask = (projectId: string, milestoneId: string, taskId: string) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id !== projectId) return project;

        return {
          ...project,
          milestones: project.milestones.map((milestone) => {
            if (milestone.id !== milestoneId) return milestone;

            return {
              ...milestone,
              tasks: milestone.tasks.filter((task) => task.id !== taskId),
            };
          }),
        };
      });
    });
  };

  const resetProjects = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all changes? This will restore projects to their initial state.',
      )
    ) {
      setProjectsState(initialProjects);
      setStoredProjects(initialProjects);
      setExpandedNodes(new Set<string>());
      setSearchQuery('');
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        searchQuery,
        setSearchQuery,
        expandedNodes,
        toggleNode,
        isNodeExpanded,
        updateTask,
        removeTask,
        resetProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
