import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { StrategyPerformanceDecisionType } from '@libs/api/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import InfoText from '@libs/components/molecules/text/info-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import { dateFormatter } from '@libs/utils/date.utils';
import { formatNumberFraction } from '@libs/utils/string.utils';

import HourlySignalCumulativeReturnGraph from './cumulative-return-graph';
import HourlySignalDrawdownGraph from './drawdown-graph';
import HourlySignalHourlyReturnGraph from './hourly-return-graph';
import { StrategyPerformanceColumnDefs } from '../constants';
import {
  getHourlyEquityCumulativeReturnHandler,
  getHourlyEquityDecisionStrategyPerformanceHandler,
  getHourlyEquityDrawdownHandler,
  getHourlyEquityReturnHandler,
} from 'prac-advice/actions/signal-api';

interface HourlySignalStrategyPerformanceProps {
  symbol: string;
  setLastUpdateDate: (date: string | undefined | null) => void;
}

const HourlySignalStrategyPerformance = ({
  symbol,
  setLastUpdateDate,
}: HourlySignalStrategyPerformanceProps) => {
  const {
    data: strategyPerformanceData,
    isLoading: isStrategyPerformanceLoading,
  } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_DECISION_STRATEGY_PERFORMANCE,
    () =>
      getHourlyEquityDecisionStrategyPerformanceHandler({
        symbol,
        status: true,
      }),
    {
      onSuccess: (value) => {
        setLastUpdateDate(value?.lastUpdatedDate);
      },
      enabled: !!symbol,
    },
  );

  const { data: cumulativeReturnData, isLoading: isCumulativeReturnLoading } =
    useQuery(
      QUERY_KEYS.HOURLY_EQUITY_CUMULATIVE_RETURN_BY_SYMBOL,
      () => getHourlyEquityCumulativeReturnHandler(symbol as string),
      {
        enabled: !!symbol,
      },
    );

  const { data: hourlyReturnData, isLoading: isHourlyReturnLoading } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_HOURLY_RETURN_BY_SYMBOL,
    () => getHourlyEquityReturnHandler(symbol as string),
    {
      enabled: !!symbol,
    },
  );

  const { data: drawdownData, isLoading: isDrawdownLoading } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_DRAWDOWN_BY_SYMBOL,
    () => getHourlyEquityDrawdownHandler(symbol as string),
    {
      enabled: !!symbol,
    },
  );

  const avgLossProfitRate = useMemo(() => {
    const lossData = strategyPerformanceData?.list?.find(
      (strategyData) =>
        strategyData.decision === StrategyPerformanceDecisionType.LOSS,
    );

    const profitData = strategyPerformanceData?.list?.find(
      (strategyData) =>
        strategyData.decision === StrategyPerformanceDecisionType.PROFIT,
    );

    return lossData && profitData
      ? formatNumberFraction(
        Number(profitData.averageIncome) /
            Math.abs(Number(lossData.averageIncome)),
      )
      : undefined;
  }, [ strategyPerformanceData?.list ]);

  const graphStartEndDate = useMemo((): Date[] | undefined => {
    if (cumulativeReturnData?.list && cumulativeReturnData.list.length > 1) {
      return [
        new Date(
          cumulativeReturnData.list[cumulativeReturnData.list.length - 1].date!,
        ),
        new Date(cumulativeReturnData.list[0].date!),
      ];
    }

    return;
  }, [ cumulativeReturnData ]);

  return (
    <div className='flex flex-col'>
      <TranslatedText
        className='text-sm sm:text-base mb-8 sm:mb-10'
        label='hourlySigns_strategyAnalysis_tab_explanation_text'
      />
      <InfoText
        className='text-xs sm:text-sm font-bold'
        label='hourlySigns_strategyAnalysis_tab_avgProfitLoss_text'
        values={{ count: avgLossProfitRate }}
      />
      <ColumnTypeTable
        sizeColumnsToFit
        className='min-h-[128px] w-full mt-6 mb-10'
        columnDefs={StrategyPerformanceColumnDefs}
        defaultColDef={{ sortable: false }}
        isLoading={isStrategyPerformanceLoading}
        rowData={strategyPerformanceData?.list || []}
      />
      <div
        className='min-h-[500px] flex flex-col justify-between border-2 rounded-xl p-2 mb-8 sm:mb-10'
        id='strategyContainerId'
      >
        <HourlySignalCumulativeReturnGraph
          cumulativeReturnGraphData={cumulativeReturnData?.list}
          isLoading={isCumulativeReturnLoading}
        />
        <TranslatedText
          className='text-xxs ml-12'
          label='hourlySigns_strategyPerformance_graph_hourlyReturn_label'
        />
        <HourlySignalHourlyReturnGraph
          hourlyReturnGraphData={hourlyReturnData?.list}
          isLoading={isHourlyReturnLoading}
        />
        <TranslatedText
          className='text-xxs ml-12'
          label='hourlySigns_strategyPerformance_graph_drawdown_label'
        />
        <HourlySignalDrawdownGraph
          drawdownGraphData={drawdownData?.list}
          isLoading={isDrawdownLoading}
        />
      </div>
      <TranslatedText
        className='text-sm sm:text-base'
        components={{
          ul: (
            <ul
              key={1}
              style={{ listStyleType: 'circle', listStylePosition: 'inside' }}
            />
          ),
          li: <li key={0} />,
        }}
        label='hourlySigns_strategyAnalysis_tab_explanation1_text'
        values={{
          updatedDate: dateFormatter(graphStartEndDate?.[0]),
        }}
      />
    </div>
  );
};

export default HourlySignalStrategyPerformance;
