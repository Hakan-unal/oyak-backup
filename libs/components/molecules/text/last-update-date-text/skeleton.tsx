import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonItem from '../../../atomic/skeleton/skeleton-item';
import SkeletonLayout from '../../../atomic/skeleton/skeleton-layout';

interface LastUpdateDateSkeletonProps {
  className?: string;
  isLive?: boolean;
}

const LastUpdateDateSkeleton = ({
  className,
  isLive,
}: LastUpdateDateSkeletonProps) => (
  <SkeletonLayout className={`flex gap-6 ${className}`}>
    {isLive && (
      <SkeletonItem skeletonProps={{ circle: true, width: 9, height: 9 }} />
    )}
    <SkeletonItem className='w-1/2 sm:w-1/4' />
  </SkeletonLayout>
);

export default LastUpdateDateSkeleton;
