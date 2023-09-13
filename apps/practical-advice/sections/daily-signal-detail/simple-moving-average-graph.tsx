import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomDailyScanningGraphicsModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface DailySignalSMAGraphProps {
  isLoading?: boolean;
  dailySignalTechData?: CustomDailyScanningGraphicsModel[];
}

const DailySignalSMAGraph = ({
  isLoading,
  dailySignalTechData,
}: DailySignalSMAGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!dailySignalTechData) {
      return;
    }

    return {
      chart: {
        height: '40%',
      },
      yAxis: {
        title: {
          text: t('dailySigns_strategyPerformTable_graph_price_label'),
        },
        startOnTick: false,
      },
      xAxis: {
        type   : 'datetime',
        labels : {
          enabled: false,
        },
        gridLineWidth: 1,
      },
      legend: {
        align         : 'right',
        verticalAlign : 'top',
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          type   : 'line',
          name   : t('dailySigns_strategyPerformTable_graph_price_text')!,
          data   : dailySignalTechData?.map((value) => [ value.time, value.price ]),
          color  : themeColors.graph.red,
          marker : {
            enabled: false,
          },
        },
        {
          type   : 'line',
          name   : t('dailySigns_strategyPerformTable_graph_sma22_text')!,
          data   : dailySignalTechData?.map((value) => [ value.time, value.smA22 ]),
          color  : themeColors.graph.green,
          marker : {
            enabled: false,
          },
        },
        {
          type   : 'line',
          name   : t('dailySigns_strategyPerformTable_graph_sma50_text')!,
          data   : dailySignalTechData?.map((value) => [ value.time, value.smA50 ]),
          color  : themeColors.graph.black,
          marker : {
            enabled: false,
          },
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              chart: {
                height: '100%',
              },
              legend: {
                align         : 'right',
                verticalAlign : 'top',
              },
            },
          },
          {
            condition: {
              minWidth: 1200,
            },
            chartOptions: {
              chart: {
                height: '30%',
              },
            },
          },
        ],
      },
    };
  }, [ dailySignalTechData, t ]);

  return (
    <div className='flex justify-center'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='w-full'>
          <LineChart options={lineChartOptions} />
        </div>
      )}
    </div>
  );
};

export default DailySignalSMAGraph;
