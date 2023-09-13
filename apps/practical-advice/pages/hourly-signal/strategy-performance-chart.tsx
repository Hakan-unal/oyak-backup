import { useQuery } from 'react-query';

import TabLabel from '@libs/components/molecules/tab/tab-label';
import PaginationTable from '@libs/components/molecules/table/pagination-table';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import useModal from '@libs/hooks/useModal';

import { getHourlyEquityDecisionStrategyPerformanceHandler } from 'prac-advice/actions/signal-api';
import {
  HourlySignalStrategyPerformanceColumnDefs,
  TabLabels,
} from 'prac-advice/sections/hourly-signal/constants';

const StrategyPerformanceChart = () => {
  const { AlertModal, infoAlert } = useModal();

  const { data, isLoading } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_DECISION_STRATEGY_PERFORMANCE,
    () => getHourlyEquityDecisionStrategyPerformanceHandler({ status: true }),
  );

  const showInfoMessage = () => {
    infoAlert({
      text           : 'hourlySigns_strategyPerformTable_popup_longExplanation_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <TabLabel activeIndex={1} items={TabLabels} outerClassName='mb-8' />
      <TranslatedText
        className='mb-4 cursor-pointer'
        components={[
          <a
            className='font-bold text-primary-dark cursor-pointer'
            key='0'
            onClick={showInfoMessage}
          />,
        ]}
        label='hourlySigns_strategyPerformTable_explanation_text'
      />
      <LastUpdateDateText
        className='mb-8'
        isLive={false}
        label='general_general_lastReportDate_text'
        lastUpdatedDate={data?.lastUpdatedDate}
      />
      <PaginationTable
        sizeColumnsToFit
        className='min-h-[448px] min-w-full'
        columnDefs={HourlySignalStrategyPerformanceColumnDefs}
        defaultColDef={{ minWidth: 150 }}
        isLoading={isLoading}
        rowData={data?.list || []}
      />
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

export default StrategyPerformanceChart;
