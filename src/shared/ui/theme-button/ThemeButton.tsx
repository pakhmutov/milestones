import { useEffect } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import ThemeIcon from '@/shared/assets/icons/moon.svg';
import './ThemeButton.scss';

type Theme = 'light' | 'dark';

export function ThemeButton() {
  const [theme, setTheme] = useLocalStorage<Theme>('milestones-theme', 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button type="button" className="theme-button" onClick={handleClick} aria-label="Toggle theme">
      <ThemeIcon />
    </button>
  );
}
