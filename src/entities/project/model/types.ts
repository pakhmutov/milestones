import type { Milestone } from "@/entities/milestone";

export interface Project {
  id: string;
  name: string;
  milestones: Milestone[];
}