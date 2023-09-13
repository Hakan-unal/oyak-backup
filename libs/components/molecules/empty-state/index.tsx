import { useState } from 'react';

import TranslatedText, { TranslatedTextProps } from '../text/translated-text';
import EmptyStateIcon from '@libs/assets/images/svgs/empty-state.svg';

interface Props extends TranslatedTextProps {
  label: string;
  delay?: number;
}

const SHOW_EMPTY_STATE_DELAY = 100;

const EmptyState = ({ label, delay = SHOW_EMPTY_STATE_DELAY }: Props) => {
  const [ isShowed, setIsShowed ] = useState(delay === 0);

  setTimeout(() => {
    setIsShowed(true);
  }, delay);

  return isShowed ? (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <EmptyStateIcon />
      <TranslatedText
        className='font-bold mt-2'
        label={label}
        textVariant='body2'
      />
    </div>
  ) : null;
};

export default EmptyState;
