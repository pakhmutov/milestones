export type TaskStatus = 'Todo' | 'Doing' | 'In Review' | 'Done';

export interface Task {
  id: string;
  title: string;
  summary: string;
  assignee?: string;
  status: TaskStatus;
  dueDate: Date;
  tags: string[];
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: Date;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  milestones: Milestone[];
}