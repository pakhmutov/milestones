import { createContext } from 'react';
import type { ProjectsContextType } from './ProjectsContext.types';

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);
