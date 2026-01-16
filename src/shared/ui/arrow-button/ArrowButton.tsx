import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import cn from 'classnames';
import './ArrowButton.scss';

interface ArrowButtonProps {
  isExpanded: boolean;
}

const block = 'arrow-button';

export function ArrowButton({ isExpanded }: ArrowButtonProps) {
  const classes = cn(block, { [`${block}--expanded`]: isExpanded });
  return (
    <button tabIndex={-1} className={classes}>
      <ArrowRightIcon />
    </button>
  );
}
