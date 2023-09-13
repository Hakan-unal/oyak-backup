/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import Breadcrumb from '@libs/components/molecules/breadcrumb/breadcrumb';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import IncreaseDecreaseText from '@libs/components/molecules/text/increase-decrease-text';
import InfoText from '@libs/components/molecules/text/info-text';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { DECIMAL_FRACTION } from '@libs/constants/common';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import {
  getPairDailySignalsHandler,
  getPairDailySignalsP2GraphicHandler,
  getPairDailySignalsT2GraphicHandler,
} from 'prac-advice/actions/signal-api';
import paths from 'prac-advice/routes/internal-paths';
import { ReturnGraphColumnDefs } from 'prac-advice/sections/pairs-trade-detail/constants';
import PairsTradeReturnGraph from 'prac-advice/sections/pairs-trade-detail/return-graph';

const ReturnChartPage = () => {
  const { query } = useRouter();

  const pairDailySignalId: number | undefined = query.pairDailySignalId
    ? Number(query.pairDailySignalId)
    : undefined;

  const isClosePosition = query.isClosePosition === 'true';

  const { data: pairDailySignal, isLoading: isPairDailySignalLoading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS,
      () =>
        getPairDailySignalsHandler({
          pairDailySignalId,
          isClosePosition,
        }),
      {
        enabled:
          pairDailySignalId !== undefined && isClosePosition !== undefined,
      },
    );

  const detailInfo = pairDailySignal?.list?.[0];

  const { data: dailySignalP2Data, isLoading: isDailySignalP2Loading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS_P2_GRAPHIC,
      () => getPairDailySignalsP2GraphicHandler(pairDailySignalId!),
      {
        enabled: pairDailySignalId !== undefined,
      },
    );

  const { data: dailySignalT2Data, isLoading: isDailySignalT2Loading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS_T2_GRAPHIC,
      () => getPairDailySignalsT2GraphicHandler(pairDailySignalId!),
      {
        enabled: query.pairDailySignalId !== undefined,
      },
    );

  const avgLossProfitRate =
    useMemo(
      () =>
        dailySignalT2Data?.list
          ?.reduce((prev, curr) => prev + (curr.proLoss || 0), 0)
          ?.toFixed(DECIMAL_FRACTION),
      [ dailySignalT2Data?.list ],
    ) || 0;

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <Breadcrumb
        className='mb-6'
        label='pairTrade_detail_strategyReturnGraph_returnPairsTrade_button'
        prevPath={isClosePosition ? paths.CLOSE_POSITION : paths.PAIRS_TRADE}
      />
      <div className='flex flex-col mb-6 sm:mb-8'>
        <TranslatedText
          className='text-xl font-bold mb-2'
          label='pairTrade_returnGraph_returnGraph_title'
        />
        {pairDailySignal?.lastUpdateDate && (
          <LastUpdateDateText
            isLive={false}
            label='general_general_lastReportDate_text'
            lastUpdatedDate={pairDailySignal.lastUpdateDate}
          />
        )}
      </div>
      <div className='flex flex-row gap-1.5 mb-6 sm:mb-8'>
        <IncreaseDecreaseText
          label={detailInfo?.long || ''}
          pointType='increase'
        />
        <IncreaseDecreaseText
          label={detailInfo?.short || ''}
          pointType='decrease'
        />
      </div>
      <InfoText
        className='text-xs sm:text-sm font-bold'
        components={[
          <label
            className={`${
              avgLossProfitRate > 0
                ? 'text-green-dark'
                : avgLossProfitRate < 0
                ? 'text-primary-dark'
                : ''
            }`}
            key='0'
          />,
        ]}
        containerClass='mb-6'
        label='pairTrade_returnGraph_table_totalProfitLoss_label'
        values={{ totalProfitLoss: avgLossProfitRate }}
      />
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-[760px] mb-8 sm:mb-10'
        columnDefs={ReturnGraphColumnDefs}
        containerClassName='flex'
        defaultColDef={{ sortable: false }}
        isLoading={isDailySignalT2Loading}
        rowData={dailySignalT2Data?.list || []}
      />
      <PairsTradeReturnGraph
        dailySignalP2Data={dailySignalP2Data}
        detailInfo={detailInfo}
        isLoading={isPairDailySignalLoading || isDailySignalP2Loading}
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

export default ReturnChartPage;
