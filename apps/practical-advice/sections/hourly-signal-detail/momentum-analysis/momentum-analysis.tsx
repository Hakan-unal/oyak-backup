/* eslint-disable complexity */
/* eslint-disable max-len */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import Loading from '@libs/components/molecules/loading/loading';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import Speedometer from './speedometer';
import {
  HourlySignalMomentumBuyAnalysisColumnDefs,
  HourlySignalMomentumSellAnalysisColumnDefs,
} from '../constants';
import { getHourlyEquitySpeedometerGraphicHandler } from 'prac-advice/actions/signal-api';

interface HourlySignalMomentumAnalysisProps {
  symbol: string;
  setLastUpdateDate: (date: string | undefined | null) => void;
}

const HourlySignalMomentumAnalysis = ({
  symbol,
  setLastUpdateDate,
}: HourlySignalMomentumAnalysisProps) => {
  const { data, isLoading } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_SPEEDMETER_GRAPHIC_BY_SYMBOL,
    () => getHourlyEquitySpeedometerGraphicHandler(symbol as string),
    {
      onSuccess: (value) => {
        setLastUpdateDate(value?.lastUpdatedDate);
      },
      enabled: !!symbol,
    },
  );

  const { t } = useTranslation();

  const { scoreChanging, score } = useMemo(() => {
    const scoreChanging =
      (data?.list?.at(-1)?.currentDay || 0) -
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (data?.list?.at(-2)?.previousDay || 0);

    const score = data?.list?.at(-1)?.score || 0;

    return { scoreChanging, score };
  }, [ data?.list ]);

  const HourlySignalMomentumBuyAnalysisData = [
    {
      label : t('hourlySigns_momentumAnalysis_table_highMomentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_buyMomentumHighMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_buyMomentumHighMin_text'),
    },
    {
      label : t('hourlySigns_momentumAnalysis_table_momentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_buyMomentumMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_buyMomentumMin_text'),
    },
    {
      label : t('hourlySigns_momentumAnalysis_table_lowMomentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_buyMomentumLowMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_buyMomentumLowMin_text'),
    },
  ];

  const HourlySignalMomentumSellAnalysisData = [
    {
      label : t('hourlySigns_momentumAnalysis_table_highMomentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_sellMomentumHighMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_sellMomentumHighMin_text'),
    },
    {
      label : t('hourlySigns_momentumAnalysis_table_momentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_sellMomentumMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_sellMomentumMin_text'),
    },
    {
      label : t('hourlySigns_momentumAnalysis_table_lowMomentumAreas_title'),
      max   : t('hourlySigns_momentumAnalysis_table_sellMomentumLowMax_text'),
      min   : t('hourlySigns_momentumAnalysis_table_sellMomentumLowMin_text'),
    },
  ];

  return (
    <div className='flex flex-col gap-12'>
      <div className='grid grid-cols-0 md:grid-cols-2 gap-9'>
        <ColumnTypeTable
          sizeColumnsToFit
          className='w-full'
          columnDefs={HourlySignalMomentumBuyAnalysisColumnDefs}
          defaultColDef={{ sortable: false }}
          rowData={HourlySignalMomentumBuyAnalysisData}
        />
        <ColumnTypeTable
          sizeColumnsToFit
          className='w-full'
          columnDefs={HourlySignalMomentumSellAnalysisColumnDefs}
          defaultColDef={{ sortable: false }}
          rowData={HourlySignalMomentumSellAnalysisData}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-0 md:grid-cols-2 gap-9'>
          <div className='w-full flex flex-col items-center justify-start border-0 sm:border border-basic-three rounded-sm'>
            <Speedometer data={data?.list || []} score={score} />
          </div>
          <div className='w-full flex flex-col gap-6'>
            <TranslatedText
              label='hourlySigns_momentumAnalysis_tab_explanation_text'
              values={{
                score,
                scoreChanging,
              }}
            />
            <TranslatedText label='hourlySigns_momentumAnalysis_tab_explanation2_text' />
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlySignalMomentumAnalysis;
