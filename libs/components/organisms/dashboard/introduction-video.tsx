import { useTranslation } from 'react-i18next';

import Button from '@libs/components/atomic/button/button';
import CardHeader from '@libs/components/molecules/card/card-header';
import CardVideo, {
  CardVideoProps,
} from '@libs/components/molecules/card/card-video';

interface IntroductionVideoProps {
  items: CardVideoProps[];
  className: string;
  onVideoClick?: (link: string) => void;
  onDescriptionClick?: (link: string) => void;
}

const IntroductionVideo = ({
  items,
  className,
  onVideoClick,
  onDescriptionClick,
}: IntroductionVideoProps) => {
  const { t } = useTranslation();

  return (
    <CardHeader
      className={`overflow-x-hidden scroll-smooth ${className}`}
      title='dashboard_videoCard_card_introductionVideos_title'
    >
      <div className='flex flex-col gap-4'>
        {items.map((video) => (
          <Button buttonType='colorless' key={video.link}>
            <CardVideo
              description={video.description}
              duration={video.duration}
              link={video.link}
              onDescriptionClick={() =>
                onDescriptionClick?.(t(video.description))
              }
              onVideoClick={() => onVideoClick?.(t(video.link))}
              title={video.title}
            />
          </Button>
        ))}
      </div>
    </CardHeader>
  );
};

export default IntroductionVideo;
