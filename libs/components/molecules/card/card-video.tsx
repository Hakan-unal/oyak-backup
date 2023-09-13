import TranslatedText from '../text/translated-text';
import VideoPreviewMobile from '@libs/assets/images/svgs/video-preview-mobile.svg';
import VideoPreview from '@libs/assets/images/svgs/video-preview.svg';
import Card from '@libs/components/atomic/card/card';

export interface CardVideoProps {
  link: string;
  title: string;
  description: string;
  duration: string;
  onDescriptionClick?: () => void;
  onVideoClick?: () => void;
}

const CardVideo = ({
  title,
  description,
  duration,
  onDescriptionClick,
  onVideoClick,
}: CardVideoProps) => (
  <Card className='p-4'>
    <div className='flex flex-row gap-4 items-center'>
      <div onClick={() => onVideoClick?.()}>
        <div className='hidden lg:block'>
          <VideoPreview />
        </div>
        <div className='block lg:hidden'>
          <VideoPreviewMobile />
        </div>
      </div>
      <div className='flex flex-col items-start text-left gap-2 overflow-x-auto no-scrollbar'>
        <TranslatedText
          className='text-sm md:text-base font-bold text-single-line'
          label={title}
          textColor='text-basic-six'
        />
        <TranslatedText
          className='text-xs md:text-sm multine-ellipsis'
          label={description}
          onClick={() => onDescriptionClick?.()}
          textColor='text-black'
        />
        <TranslatedText className='text-xs text-single-line' label={duration} />
      </div>
    </div>
  </Card>
);

export default CardVideo;
