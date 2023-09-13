import Card from '@libs/components/atomic/card/card';
import useModal from '@libs/hooks/useModal';

const ToleranceTest = () => {
  const { AlertModal } = useModal();

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
        <Card className='h-[414px]'>{/* Welcome */}</Card>
        <Card className='h-[414px]'>{/* Special Portfolio */}</Card>
      </div>
      <Card className='w-full h-[555px]'>{/* Mutual Fund */}</Card>
      <Card className='w-full h-[244px]'>{/* Do you know ? */}</Card>
      <AlertModal />
    </div>
  );
};

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default ToleranceTest;
