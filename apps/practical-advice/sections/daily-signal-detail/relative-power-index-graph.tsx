import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomDailyScanningGraphicsModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface DailySignalRSIGraphProps {
  isLoading?: boolean;
  dailySignalTechData?: CustomDailyScanningGraphicsModel[];
}

const DailySignalRSIGraph = ({
  isLoading,
  dailySignalTechData,
}: DailySignalRSIGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!dailySignalTechData) {
      return;
    }

    return {
      chart: {
        height: '20%',
      },
      yAxis: {
        title: {
          text: t('dailySigns_strategyPerformTable_graph_rsi_label'),
        },
        startOnTick: false,
      },
      xAxis: {
        type  : 'datetime',
        title : {
          text: t('general_general_graph_date_label'),
        },
        labels: {
          style: {
            fontSize: '10px',
          },
          format: '{value:%d/%m/%Y}',
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
          name   : t('dailySigns_strategyPerformTable_graph_rsi_text')!,
          data   : dailySignalTechData?.map((value) => [ value.time, value.rsi ]),
          color  : themeColors.graph.red,
          marker : {
            enabled: false,
          },
        },
        {
          type   : 'line',
          name   : t('dailySigns_strategyPerformTable_graph_rsi50_text')!,
          data   : dailySignalTechData?.map((value) => [ value.time, value.rsI50 ]),
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
                height: '70%',
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

export default DailySignalRSIGraph;
