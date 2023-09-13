import { CellClickedEvent } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { RetryServiceInterval } from '@libs/api/constants';
import { signalApi } from '@libs/api/services';
import TabLabel from '@libs/components/molecules/tab/tab-label';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import PaginationTable from '@libs/components/molecules/table/pagination-table';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import useModal from '@libs/hooks/useModal';

import paths from 'prac-advice/routes/internal-paths';
import {
  HourlySignalColumnDefs,
  TabLabels,
} from 'prac-advice/sections/hourly-signal/constants';

const getHourlyEquityDecisionStatusHandler = () =>
  signalApi
    .apiSignalGetHourlyEquityDecisionStatusPost({ status: true })
    .then((response) => response.data?.data);

const HourlySignal = () => {
  const { push } = useRouter();
  const { AlertModal, infoAlert } = useModal();

  const { data, isLoading } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_DECISION_STATUS,
    getHourlyEquityDecisionStatusHandler,
    {
      refetchInterval: RetryServiceInterval.ONE_MINUTE,
    },
  );

  const showInfoMessage = () => {
    infoAlert({
      text           : 'hourlySigns_hourlySignsTable_popup_longExplanation_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.LinkType)) {
      return;
    }

    push({
      pathname : paths.HOURLY_SIGNAL_DETAIL,
      query    : { symbol: event.value },
    });
  };

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one  rounded-lg'>
      <TabLabel items={TabLabels} outerClassName='mb-8' />
      <TranslatedText
        className='mb-4 cursor-pointer'
        components={[
          <a
            className='font-bold text-primary-dark cursor-pointer'
            key='0'
            onClick={showInfoMessage}
          />,
        ]}
        label='hourlySigns_hourlySignsTable_explanation_text'
      />
      <LastUpdateDateText
        className='mb-8'
        isLoading={isLoading}
        lastUpdatedDate={data?.lastUpdatedDate}
      />
      <PaginationTable
        sizeColumnsToFit
        className='min-h-[448px] min-w-full'
        columnDefs={HourlySignalColumnDefs}
        isLoading={isLoading}
        onCellClicked={handleCellClicked}
        rowData={data?.list}
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

export default HourlySignal;
