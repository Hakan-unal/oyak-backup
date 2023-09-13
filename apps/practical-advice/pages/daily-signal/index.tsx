import { CellClickedEvent } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import PaginationTable from '@libs/components/molecules/table/pagination-table';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import { getDailyScanningSignalsHandler } from 'prac-advice/actions/signal-api';
import paths from 'prac-advice/routes/internal-paths';
import { DailySignalColumnDefs } from 'prac-advice/sections/daily-signal-detail/constants';

const DailySignal = () => {
  const { push } = useRouter();

  const { data, isLoading } = useQuery(QUERY_KEYS.DAILY_SCANNING_SIGNALS, () =>
    getDailyScanningSignalsHandler({ status: true }),
  );

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.LinkType)) {
      return;
    }

    push({
      pathname : paths.DAILY_SIGNAL_DETAIL,
      query    : {
        symbol          : event.value,
        hasViopContract : event.data?.hasViopContract,
      },
    });
  };

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <TranslatedText
        className='hidden md:block font-bold text-xl mb-6'
        label='dailyScanningSigns_dailyScanningSigns_scanningList_title'
      />
      <TranslatedText
        className='text-sm sm:text-base mb-4'
        label='dailyScanningSigns_dailyScanningSigns_info_text'
      />
      <LastUpdateDateText
        className='mb-6 sm:mb-11'
        isLive={false}
        isLoading={isLoading}
        label='general_general_lastReportDate_text'
        lastUpdatedDate={data?.lastUpdatedDate}
        showDateTime={false}
      />
      <PaginationTable
        sizeColumnsToFit
        className='min-h-[448px] min-w-full'
        columnDefs={DailySignalColumnDefs()}
        isLoading={isLoading}
        onCellClicked={handleCellClicked}
        rowData={data?.list}
      />
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

export default DailySignal;
