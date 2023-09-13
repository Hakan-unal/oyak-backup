import React, { ReactNode, useState } from 'react';

import Loading from '../loading/loading';
import ArrowDown from '@libs/assets/images/svgs/angle-down.svg';
import TranslatedText from '@libs/components/molecules/text/translated-text';

interface AccordionProps {
  children: ReactNode;
  title: string;
  isDisable?: boolean;
  isLoading?: boolean;
  isExpanded?: boolean;
  onExpanded?: () => void;
}

const Accordion = ({
  children,
  title,
  isLoading,
  isDisable = false,
  isExpanded: defaultExpanded = false,
  onExpanded,
}: AccordionProps) => {
  const [ isExpanded, setIsExpanded ] = useState<boolean>(defaultExpanded);

  const handleExpanded = () => {
    setIsExpanded((prev) => !prev);
    onExpanded?.();
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            className={`relative w-full flex items-center justify-between gap-2 py-2 px-4 focus:outline-none border border-basic-three ${
              isExpanded ? 'rounded-t-lg' : 'rounded-lg'
            }`}
            disabled={isDisable}
            onClick={handleExpanded}
          >
            <TranslatedText
              className={`font-bold text-xs text-basic-five ${
                isDisable ? 'cursor-default' : 'cursor-pointer'
              }`}
              label={title}
            />
            <ArrowDown className={isExpanded ? 'rotate-180' : 'rotate-0'} />
          </button>
          {isExpanded && (
            <div className='rounded-b-lg border border-t-0 border-basic-three p-4'>
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Accordion;
