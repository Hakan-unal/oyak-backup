import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomHourlyEquityReturnModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface HourlySignalDrawdownGraphProps {
  isLoading?: boolean;
  drawdownGraphData?: CustomHourlyEquityReturnModel[];
}

const HourlySignalDrawdownGraph = ({
  isLoading,
  drawdownGraphData,
}: HourlySignalDrawdownGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!drawdownGraphData) {
      return;
    }

    return {
      chart: {
        height     : '10%',
        marginLeft : 60,
      },
      yAxis: {
        title       : undefined,
        startOnTick : false,
        endOnTick   : false,
      },
      xAxis: {
        crosshair : true,
        type      : 'datetime',
        labels    : {
          style: {
            fontSize: '10px',
          },
          format: '{value:%d/%m/%Y}',
        },
        gridLineWidth: 1,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          type   : 'line',
          name   : t('hourlySigns_strategyPerformance_graph_closing_text')!,
          data   : drawdownGraphData?.map((value) => [ value.time, value.closePrice ]),
          color  : themeColors.basic.six,
          marker : {
            enabled: false,
          },
        },
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_return_text')!,
          data : drawdownGraphData?.map((value) => [
            value.time,
            value.rateOfChangePrice,
          ]),
          color  : themeColors.primary.light,
          marker : {
            enabled: false,
          },
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              chart: {
                height     : '40%',
                marginLeft : 50,
              },
            },
          },
        ],
      },
    };
  }, [ drawdownGraphData, t ]);

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

export default HourlySignalDrawdownGraph;
