import type { Task } from "@/entities/task";

export interface Milestone {
  id: string;
  name: string;
  targetDate: Date;
  tasks: Task[];
}