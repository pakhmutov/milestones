import { ProjectsProvider } from '@/app/context/ProjectsContext';
import { ProjectTree } from '@/widgets/project-tree/ProjectTree';
import { SearchBar } from '@/widgets/search/SearchBar';
import { mockProjects } from '@/shared/lib/mockData';
import './ProjectsPage.scss';

export function ProjectsPage() {
  return (
    <ProjectsProvider projects={mockProjects}>
      <div className="projects-page">
        <header className="projects-page__header">
          <h1 className="projects-page__title">Project Milestones</h1>
          <p className="projects-page__subtitle">A lightweight roadmap tree viewer</p>
        </header>

        <main className="projects-page__main">
          <SearchBar />
          <ProjectTree />
        </main>
      </div>
    </ProjectsProvider>
  );
}
