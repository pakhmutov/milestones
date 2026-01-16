import type { Project } from '@/entities/project';

export function calculateProjectProgress(project: Project): number {
  const allTasks = project.milestones.flatMap((milestone) => milestone.tasks);
  if (allTasks.length === 0) return 0;

  const doneTasks = allTasks.filter((task) => task.status === 'Done').length;
  return Math.round((doneTasks / allTasks.length) * 100);
}
