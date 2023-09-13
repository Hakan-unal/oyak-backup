import Card from '@libs/components/atomic/card/card';
import CardHeader from '@libs/components/molecules/card/card-header';
import TabView, {
  TabViewItemProps,
} from '@libs/components/molecules/tab/tab-view';
import useModal from '@libs/hooks/useModal';

const Compare = () => {
  const { AlertModal } = useModal();

  const tabs: TabViewItemProps[] = [
    {
      label     : 'Portföyün Getirileri',
      component : null,
    },
    {
      label     : 'Portföy Ağırlığı',
      component : null,
    },
    {
      label     : 'Portföyün Geçmiş Dağılımları',
      component : null,
    },
    {
      label     : 'Risk Ölçütleri',
      component : null,
    },
  ];

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <CardHeader className='h-[683px]' title='Seçilen Portföyler'>
        {/* Selected Portfolios */}
      </CardHeader>
      <Card className='h-[704px]'>
        <TabView tabLabelButtonClassName='pb-4' tabs={tabs} />
      </Card>
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

export default Compare;
