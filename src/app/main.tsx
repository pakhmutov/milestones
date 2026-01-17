import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/main.scss';
import { App } from './App.tsx';

const initializeTheme = () => {
  try {
    const storedTheme = localStorage.getItem('milestones-theme');
    const theme = storedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
};

initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
