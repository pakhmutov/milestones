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
