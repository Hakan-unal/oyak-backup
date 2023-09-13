import { useState } from 'react';

import { LoadingVariant, LoadingVariantClass } from './constants';
import Spinner from '@libs/components/atomic/spinner/spinner';
import TranslatedText from '@libs/components/molecules/text/translated-text';

interface LoadingProps {
  variant?: LoadingVariant;
  label?: string;
  delay?: number;
  className?: string | undefined;
}

const SHOW_LOADING_DELAY = 100;

const Loading = ({
  variant = 'inline',
  label,
  delay = SHOW_LOADING_DELAY,
  className,
}: LoadingProps) => {
  const [ isShowed, setIsShowed ] = useState(delay === 0);

  setTimeout(() => {
    setIsShowed(true);
  }, delay);

  return isShowed ? (
    <div
      className={`${LoadingVariantClass[variant]} flex flex-col items-center justify-center ${className}`}
    >
      <Spinner height={150} width={150} />
      {!!label && (
        <div className='mt-5'>
          <TranslatedText className='font-bold text-xl' label={label} />
        </div>
      )}
    </div>
  ) : null;
};

export default Loading;
