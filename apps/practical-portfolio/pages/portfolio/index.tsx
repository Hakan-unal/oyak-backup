import Card from '@libs/components/atomic/card/card';
import Dropdown from '@libs/components/molecules/dropdown/dropdown';
import TabView, {
  TabViewItemProps,
} from '@libs/components/molecules/tab/tab-view';
import useModal from '@libs/hooks/useModal';

import { PortfolioNameList, PortfolioTypeList } from './mock';
import PortfolioSummaryInfoCard from 'prac-portfolio/components/portfolio-summary-info/portfolio-summary-info-card';
import { PortfolioTypeEnum } from 'prac-portfolio/constants/portfolio';

const Portfolio = () => {
  const { AlertModal } = useModal();

  const tabs: TabViewItemProps[] = [
    {
      label     : 'Portföyün Getirileri',
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
        <Card>
          {/* Portfolio Type Dropdown */}
          <Dropdown
            autocomplete
            defaultValue={PortfolioTypeList[0].value}
            label='Portföy Tipi'
            options={PortfolioTypeList}
            variant='material'
          />
        </Card>
        <Card>
          {/* Portfolio Name Dropdown */}
          <Dropdown
            autocomplete
            defaultValue={PortfolioNameList[0].value}
            label='Portföy Adı'
            options={PortfolioNameList}
            variant='material'
          />
        </Card>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
        <PortfolioSummaryInfoCard
          annualReturn={40}
          biggestLost={20.37}
          buttonName='Talep Et'
          onButtonClick={undefined}
          portfolioName='Düşük Risk Portföyü'
          portfolioType={PortfolioTypeEnum.LowRisk}
          portfolioTypeName='Yatırım'
          sharpeRatio={3.26}
          volatility={14.29}
        />
        <Card className='h-[379px] col-span-2'>
          {/* Wealth Distribution */}
        </Card>
      </div>

      <Card className='h-[525px]'>
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

export default Portfolio;
