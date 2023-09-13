/* eslint-disable max-len */
import Button from '../button/button';
import CloseIcon from '@libs/assets/images/svgs/close.svg';

interface VideoModalProps {
  link: string;
  outsideClick?: () => void;
}

const VideoModal = ({ link, outsideClick }: VideoModalProps) => (
  <div
    aria-labelledby='modal-title'
    aria-modal='true'
    className='relative z-10'
    onClick={outsideClick}
    role='dialog'
  >
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex flex-col min-h-full items-center justify-center p-4 text-center'>
        <div className='relative transform overflow-hidden bg-white rounded-lg text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-[960px] min-h-[550px]'>
          <div className='w-full h-full flex flex-row justify-end items-start'>
            <Button
              buttonType='colorless'
              className='font-bold'
              onClick={outsideClick}
            >
              <CloseIcon height='45px' width='45px' />
            </Button>
          </div>
          <iframe
            allowFullScreen
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            height='544px'
            src={link}
            title='YouTube video player'
            width='100%'
          />
        </div>
      </div>
    </div>
  </div>
);

export default VideoModal;
