import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonItemProps {
  className?: string;
  skeletonProps?: SkeletonProps;
}

const SkeletonItem = ({ className, skeletonProps }: SkeletonItemProps) => (
  <div className={className}>
    <Skeleton {...skeletonProps} />
  </div>
);

export default SkeletonItem;
