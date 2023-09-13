import { ReactElement, ReactNode, useRef } from 'react';

import TranslatedText from '../text/translated-text';
import CloseIcon from '@libs/assets/images/svgs/close.svg';
import Button, { ButtonProps } from '@libs/components/atomic/button/button';
import { DynamicType } from '@libs/models/model';

export interface StepperItemProps {
  title: string;
  subTitle: string;
  component: ReactNode;
  isLoading?: boolean;
  nextButton?: ButtonProps;
  previousButton?: ButtonProps;
}
export interface StepperModalProps {
  closeButtonClick?: () => void;
  previousButton?: ButtonProps;
  nextButton?: ButtonProps;
  children: ReactNode | ReactElement;
  totalStep: number;
  currentStep: number;
  step: StepperItemProps;
  toggleModal?: boolean;
}

const StepperModal = ({
  children,
  closeButtonClick,
  previousButton,
  nextButton,
  totalStep,
  currentStep,
  step,
  toggleModal = false,
}: StepperModalProps) => {
  const ref = useRef<DynamicType>(null);

  const handleOutsideClick = (event) => {
    if (toggleModal && !ref?.current?.contains(event.target)) {
      closeButtonClick?.();
    }
  };

  // TODO(munzur.kolkiran):should use color from tailwind.confing
  return (
    <div
      aria-labelledby='modal-title'
      aria-modal='true'
      className='relative z-10'
      onClick={handleOutsideClick}
      role='dialog'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

      <div className='fixed inset-0 z-10 overflow-y-auto '>
        <div className='flex min-h-full items-center justify-center'>
          <div
            className='relative md:min-w-[775px] overflow-hidden  mx-4 md:mx-0 rounded-lg bg-white shadow-xl'
            ref={ref}
          >
            <div className='w-full flex gap-1'>
              {[ ...Array(totalStep).keys() ].map?.((_, index: number) => (
                <div
                  className={`w-1/3 h-3 ${
                    index <= currentStep ? 'bg-primary-light' : 'bg-[#D9D9D9]'
                  }`}
                  key={index}
                />
              ))}
            </div>
            <div className='flex flex-col items-start justify-around'>
              <div className='w-full bg-[#f6f6f6]'>
                <div className='w-full flex justify-between mt-14 md:mt-10'>
                  <TranslatedText
                    className='flex-1 ml-6 md:ml-20 text-center text-basic-six font-bold text-2xl'
                    label={step.title}
                  />
                  <Button
                    buttonType='text'
                    className='mr-5 md:mr-14'
                    onClick={closeButtonClick}
                  >
                    <CloseIcon height='18px' width='18px' />
                  </Button>
                </div>
                <div className='flex flex-col items-center md:flex-row mx-4 mt-8 mb-6 md:mt-14 md:mb-14 ml-4 md:ml-16'>
                  <div className='text-center md:text-start'>
                    <span className='text-primary-dark text-5xl'>
                      {currentStep + 1}/
                    </span>
                    <span className='text-primary-dark text-2xl'>
                      {totalStep}
                    </span>
                  </div>
                  <TranslatedText
                    className='max-w-[580px] ml-4 md:ml-3 font-bold text-basic-five text-lg'
                    label={step.subTitle}
                  />
                </div>
              </div>
              <div className='w-full bg-red-300 flex justify-center mt-4 md:mt-9'>
                {children}
              </div>
            </div>
            <div className='flex w-full justify-center gap-4 my-4 md:my-12'>
              <Button {...previousButton} className='w-44 sm:w-56' />
              <Button {...nextButton} className='w-44 sm:w-56' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperModal;
