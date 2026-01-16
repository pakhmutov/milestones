import type { Project } from '@/entities/project';

export function matchesSearch(project: Project, searchQuery: string): boolean {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase();

  if (project.name.toLowerCase().includes(query)) {
    return true;
  }

  return project.milestones.some((milestone) => {
    if (milestone.name.toLowerCase().includes(query)) {
      return true;
    }

    return milestone.tasks.some((task) => {
      return task.title.toLowerCase().includes(query) || task.summary.toLowerCase().includes(query);
    });
  });
}

export function getVisibleTaskCount(projects: Project[], searchQuery: string): number {
  if (!searchQuery.trim()) {
    return projects.reduce(
      (count, project) =>
        count +
        project.milestones.reduce(
          (milestoneCount, milestone) => milestoneCount + milestone.tasks.length,
          0,
        ),
      0,
    );
  }

  const query = searchQuery.toLowerCase();
  let count = 0;

  projects.forEach((project) => {
    project.milestones.forEach((milestone) => {
      milestone.tasks.forEach((task) => {
        if (
          project.name.toLowerCase().includes(query) ||
          milestone.name.toLowerCase().includes(query) ||
          task.title.toLowerCase().includes(query) ||
          task.summary.toLowerCase().includes(query)
        ) {
          count++;
        }
      });
    });
  });

  return count;
}

export function shouldExpandNode(
  projectId: string,
  milestoneId: string | null,
  projects: Project[],
  searchQuery: string,
): boolean {
  if (!searchQuery.trim()) return false;

  const query = searchQuery.toLowerCase();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return false;

  if (project.name.toLowerCase().includes(query)) {
    return true;
  }

  if (milestoneId) {
    const milestone = project.milestones.find((m) => m.id === milestoneId);
    if (!milestone) return false;

    if (milestone.name.toLowerCase().includes(query)) {
      return true;
    }

    return milestone.tasks.some(
      (task) =>
        task.title.toLowerCase().includes(query) || task.summary.toLowerCase().includes(query),
    );
  }

  return project.milestones.some((milestone) => {
    if (milestone.name.toLowerCase().includes(query)) {
      return true;
    }
    return milestone.tasks.some(
      (task) =>
        task.title.toLowerCase().includes(query) || task.summary.toLowerCase().includes(query),
    );
  });
}
