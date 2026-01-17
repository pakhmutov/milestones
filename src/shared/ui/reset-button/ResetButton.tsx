import { useProjects } from '@/app/context/useProjects';
import ResetIcon from '@/shared/assets/icons/reset.svg';
import './ResetButton.scss';

export function ResetButton() {
  const { resetProjects } = useProjects();

  const handleClick = () => {
    resetProjects();
  };

  return (
    <button
      type="button"
      className="reset-button"
      onClick={handleClick}
      aria-label="Reset all changes"
    >
      <ResetIcon />
    </button>
  );
}
