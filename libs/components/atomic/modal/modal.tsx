/* eslint-disable max-len */
import { ReactElement, ReactNode, useRef } from 'react';

import { ModalColorType, ModalColorVariants } from './constants';
import Button, { ButtonProps } from '../button/button';
import CloseIcon from '@libs/assets/images/svgs/close.svg';
import { DynamicType } from '@libs/models/model';
import { themeColors } from '@libs/theme/index';

export interface ModalProps {
  Icon?: DynamicType;
  title: string;
  titleColorType?: ModalColorType;
  toggleModal?: boolean;
  hideCloseButton?: boolean;
  closeButtonClick?: () => void;
  hideButtons?: boolean;
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
  oneButton?: ButtonProps;
  preChild?: ReactNode | ReactElement;
  children: ReactNode | ReactElement;
}

const Modal = ({
  preChild,
  children,
  Icon,
  title,
  titleColorType = 'base',
  toggleModal = true,
  hideCloseButton = false,
  closeButtonClick,
  hideButtons = false,
  leftButton,
  rightButton,
  oneButton,
}: ModalProps) => {
  const ref = useRef<DynamicType>(null);

  const handleOutsideClick = (event) => {
    if (toggleModal && !ref?.current?.contains(event.target)) {
      closeButtonClick?.();
    }
  };

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
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
          <div
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg'
            ref={ref}
          >
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='flex flex-col items-start justify-around'>
                <div className='w-full flex flex-row justify-between'>
                  <div className='flex items-center justify-start gap-4 sm:gap-2'>
                    {Icon && (
                      <>
                        <div className='hidden sm:block'>
                          <Icon
                            fill={themeColors.basic.six}
                            height='30'
                            width='30'
                          />
                        </div>
                        <div className='block sm:hidden'>
                          <Icon
                            fill={themeColors.basic.six}
                            height='20'
                            width='20'
                          />
                        </div>
                      </>
                    )}
                    <label
                      className={`${ModalColorVariants[titleColorType]} text-base sm:text-lg font-bold`}
                    >
                      {title}
                    </label>
                  </div>
                  {!hideCloseButton && (
                    <Button
                      buttonColor='primary'
                      buttonType='text'
                      className='font-bold mr-2'
                      onClick={closeButtonClick}
                    >
                      <CloseIcon height='24px' width='24px' />
                    </Button>
                  )}
                </div>
                <div className='relative mt-4 sm:mt-0 sm:text-left'>
                  <div className='flex flex-col items-center gap-2 mt-4'>
                    {preChild}
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`px-4 py-3 flex ${
                oneButton ? 'flex-row-reverse' : 'flex-row justify-center'
              } sm:px-6`}
            >
              {!hideButtons &&
                (oneButton ? (
                  <Button {...oneButton} />
                ) : (
                  <div className='flex flex-row items-center gap-4'>
                    {leftButton && <Button {...leftButton} />}
                    {rightButton && <Button {...rightButton} />}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
