import { useContext } from 'react';
import { ProjectsContext } from './ProjectsContext.context';

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('undefined projects context');
  }
  return context;
}
