import type { Project } from '@/entities/project';

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Project 1',
    milestones: [
      {
        id: 'milestone-1-1',
        name: 'Milestone 1',
        targetDate: new Date('2026-01-10'),
        tasks: [
          {
            id: 'task-1-1-1',
            title: 'Task 1',
            summary: 'Summary 1',
            assignee: 'Alex',
            status: 'Done',
            dueDate: new Date('2026-01-20'),
            tags: ['tag1', 'tag2']
          },
          {
            id: 'task-1-1-2',
            title: 'Task 2',
            summary: 'Summary 2',
            assignee: 'Dmitry',
            status: 'In Review',
            dueDate: new Date('2026-01-25'),
            tags: ['tag3', 'tag4']
          }
        ]
      },
      {
        id: 'milestone-1-2',
        name: 'Milestone 2',
        targetDate: new Date('2026-01-30'),
        tasks: [
          {
            id: 'task-1-2-1',
            title: 'Task 3',
            summary: 'Summary 3',
            status: 'Doing',
            dueDate: new Date('2026-02-05'),
            tags: ['tag5', 'tag6']
          },
          {
            id: 'task-1-2-2',
            title: 'Task 4',
            summary: 'Summary 4',
            assignee: 'Vladimir',
            status: 'Todo',
            dueDate: new Date('2026-02-10'),
            tags: ['tag7', 'tag8']
          }
        ]
      }
    ]
  },
  {
    id: 'project-2',
    name: 'Project 2',
    milestones: [
      {
        id: 'milestone-2-1',
        name: 'Milestone 1',
        targetDate: new Date('2026-02-15'),
        tasks: [
          {
            id: 'task-2-1-1',
            title: 'Task 1',
            summary: 'Summary 1',
            assignee: 'Alex',
            status: 'Done',
            dueDate: new Date('2026-02-20'),
            tags: ['tag1', 'tag2']
          },
          {
            id: 'task-2-1-2',
            title: 'Task 2',
            summary: 'Summary 2',
            status: 'Doing',
            dueDate: new Date('2026-02-25'),
            tags: ['tag3', 'tag4']
          }
        ]
      }
    ]
  }
];
