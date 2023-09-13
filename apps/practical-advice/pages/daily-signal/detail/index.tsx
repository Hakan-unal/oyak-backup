import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import Breadcrumb from '@libs/components/molecules/breadcrumb/breadcrumb';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import SymbolWithIconText from '@libs/components/molecules/text/symbol-with-icon-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import {
  getDailyScanningGraphicsHandler,
  getDailyScanningSignalsHandler,
} from 'prac-advice/actions/signal-api';
import paths from 'prac-advice/routes/internal-paths';
import { DailySignalColumnDefs } from 'prac-advice/sections/daily-signal-detail/constants';
import DailySignalRSIGraph from 'prac-advice/sections/daily-signal-detail/relative-power-index-graph';
import DailySignalSMAGraph from 'prac-advice/sections/daily-signal-detail/simple-moving-average-graph';

const DailySignalDetail = () => {
  const {
    query: { symbol, hasViopContract },
  } = useRouter();

  const { data: signalData, isLoading: isSignalLoading } = useQuery(
    QUERY_KEYS.DAILY_SCANNING_SIGNALS_BY_SYMBOL,
    () =>
      getDailyScanningSignalsHandler({
        status : true,
        symbol : symbol as string,
      }),
    {
      enabled: !!symbol,
    },
  );

  const { data: graphicData, isLoading: isGraphicLoading } = useQuery(
    QUERY_KEYS.DAILY_SCANNING_GRAPHIC,
    () => getDailyScanningGraphicsHandler({ symbol: symbol as string }),
    {
      enabled: !!symbol,
    },
  );

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <Breadcrumb
        className='mb-6'
        label='dailyScanningSigns_technicalView_back_button'
        prevPath={paths.DAILY_SIGNAL}
      />
      <div className='flex flex-col mb-6 sm:mb-8'>
        <div className='flex flex-row items-center gap-2'>
          <TranslatedText
            className='text-xl font-bold'
            label='dailyScanningSigns_technicalView_technicalView_title'
          />
          {symbol && (
            <SymbolWithIconText
              hasViop={hasViopContract === 'true'}
              symbolName={symbol as string}
            />
          )}
        </div>
        {graphicData?.lastUpdatedDate && (
          <LastUpdateDateText
            className='mb-4'
            isLive={false}
            label='general_general_lastReportDate_text'
            lastUpdatedDate={graphicData?.lastUpdatedDate}
            showDateTime={false}
          />
        )}
        <TranslatedText
          className='text-sm sm:text-base mb-8'
          label='dailyScanningSigns_technicalView_info_text'
        />
        <ColumnTypeTable
          sizeColumnsToFit
          className='min-w-full mb-8'
          columnDefs={DailySignalColumnDefs(false)}
          isLoading={isSignalLoading}
          rowData={signalData?.list}
        />
        <DailySignalSMAGraph
          dailySignalTechData={graphicData?.list}
          isLoading={isGraphicLoading}
        />
        <DailySignalRSIGraph
          dailySignalTechData={graphicData?.list}
          isLoading={isGraphicLoading}
        />
      </div>
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

export default DailySignalDetail;
