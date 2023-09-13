import SkeletonItem from '@libs/components/atomic/skeleton/skeleton-item';
import SkeletonLayout from '@libs/components/atomic/skeleton/skeleton-layout';

const UserInfoCardSkeleton = () => (
  <SkeletonLayout>
    <div className='w-full p-4 lg:p-6 bg-white rounded-lg  border border-gray-200 shadow'>
      <div className='flex flex-row items-center gap-4'>
        <SkeletonItem
          className='rounded-full leading-4'
          skeletonProps={{ circle: true, width: 40, height: 40 }}
        />
        <div className='flex flex-col sm:flex-row w-3/4 sm:w-1/2 sm:gap-2'>
          <SkeletonItem className='w-1/2' />
          <SkeletonItem className='w-1/2' />
        </div>
      </div>
    </div>
  </SkeletonLayout>
);

export default UserInfoCardSkeleton;
