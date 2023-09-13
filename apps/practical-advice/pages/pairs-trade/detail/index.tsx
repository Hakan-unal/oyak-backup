import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { BISTAssetEnum } from '@libs/api/constants';
import Breadcrumb from '@libs/components/molecules/breadcrumb/breadcrumb';
import Loading from '@libs/components/molecules/loading/loading';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import IncreaseDecreaseText from '@libs/components/molecules/text/increase-decrease-text';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import useModal from '@libs/hooks/useModal';
import { dateFormatter } from '@libs/utils/date.utils';

import {
  getPairDailySignalsHandler,
  getPairDailySignalsP1GraphicHandler,
  getPairDailySignalsT1GraphicHandler,
} from 'prac-advice/actions/signal-api';
import paths from 'prac-advice/routes/internal-paths';
import { PairsTradeDetailColumnDefs } from 'prac-advice/sections/pairs-trade-detail/constants';
import PairsTradeStrategyGraph from 'prac-advice/sections/pairs-trade-detail/strategy-graph';

const PairsTradeDetail = () => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { AlertModal, infoAlert } = useModal();

  const pairDailySignalId: number | undefined = query.pairDailySignalId
    ? Number(query.pairDailySignalId)
    : undefined;

  const isClosePosition = query.isClosePosition === 'true';

  const { data: pairDailySignal, isLoading: isPairDailySignalLoading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS_BY_SYMBOL,
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

  const { data: dailySignalP1Data, isLoading: isDailySignalP1Loading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS_P1_GRAPHIC,
      () => getPairDailySignalsP1GraphicHandler(pairDailySignalId!),
      {
        enabled: pairDailySignalId !== undefined,
      },
    );

  const { data: dailySignalT1Data, isLoading: isDailySignalT1Loading } =
    useQuery(
      QUERY_KEYS.PAIR_DAILY_SIGNALS_T1_GRAPHIC,
      () => getPairDailySignalsT1GraphicHandler(pairDailySignalId!),
      {
        enabled: query.pairDailySignalId !== undefined,
      },
    );

  const getSymbolTextInSentence = (symbol?: string | null) => {
    if (!symbol) {
      return;
    }

    if (symbol === BISTAssetEnum.XU030) {
      return t('pairTrade_detail_strategyReturnGraph_explanation1_text', {
        symbol,
      });
    }

    return t('pairTrade_detail_strategyReturnGraph_explanation2_text', {
      symbol,
    });
  };

  const showInfoMessage = () => {
    infoAlert({
      text           : 'pairTrade_detail_strategyReturnGraph_longExplanation_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  if (isPairDailySignalLoading) {
    return <Loading />;
  }

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
          label='pairTrade_detail_strategyReturnGraph_strategyReturnGraph_title'
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
      <TranslatedText
        className='mb-8 sm:mb-10 cursor-pointer'
        components={[
          <a
            className='font-bold text-primary-dark cursor-pointer'
            key='0'
            onClick={showInfoMessage}
          />,
        ]}
        label='pairTrade_detail_strategyReturnGraph_shortExplanation_text'
      />
      <div className='h-[375px] mb-8'>
        <PairsTradeStrategyGraph
          dailySignalP1Data={dailySignalP1Data}
          detailInfo={detailInfo}
          isLoading={isDailySignalP1Loading || isPairDailySignalLoading}
        />
      </div>
      <TranslatedText
        className='mb-8 sm:mb-12'
        label='pairTrade_detail_strategyReturnGraph_explanation_text'
        values={{
          longSymbol  : getSymbolTextInSentence(detailInfo?.long),
          shortSymbol : getSymbolTextInSentence(detailInfo?.short),
          updatedDate : dateFormatter(dailySignalP1Data?.at(-1)?.date),
        }}
      />
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-[660px]'
        columnDefs={PairsTradeDetailColumnDefs}
        containerClassName='flex'
        defaultColDef={{ sortable: false }}
        isLoading={isDailySignalT1Loading}
        rowData={dailySignalT1Data?.list || []}
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

export default PairsTradeDetail;
