import { useProjects } from '@/app/context/useProjects';
import { getVisibleTaskCount } from '@/shared/lib/utils/search';
import './SearchBar.scss';

export function SearchBar() {
  const { searchQuery, setSearchQuery, projects } = useProjects();
  const visibleTaskCount = getVisibleTaskCount(projects, searchQuery);

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <label htmlFor="search-input" className="search-label">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search projects, milestones, and tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="search-stats">
        <span className="task-count">
          {visibleTaskCount} {visibleTaskCount === 1 ? 'task' : 'tasks'} visible
        </span>
      </div>
    </div>
  );
}
