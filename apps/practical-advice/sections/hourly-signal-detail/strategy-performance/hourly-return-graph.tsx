import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomHourlyEquityReturnModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface HourlySignalHourlyReturnGraphProps {
  isLoading?: boolean;
  hourlyReturnGraphData?: CustomHourlyEquityReturnModel[];
}

const HourlySignalHourlyReturnGraph = ({
  isLoading,
  hourlyReturnGraphData,
}: HourlySignalHourlyReturnGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!hourlyReturnGraphData) {
      return;
    }

    return {
      chart: {
        height     : '10%',
        marginLeft : 60,
      },
      yAxis: {
        title        : undefined,
        startOnTick  : false,
        endOnTick    : false,
        tickInterval : 0.05,
      },
      xAxis: {
        crosshair : true,
        type      : 'datetime',
        labels    : {
          enabled: false,
        },
        gridLineWidth: 1,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          pointPadding : 0.5,
          borderWidth  : 0,
        },
      },
      series: [
        {
          type : 'column',
          name : t('hourlySigns_strategyPerformance_graph_return_text')!,
          data : hourlyReturnGraphData?.map((value) => [
            value.time,
            value.rateOfChangePrice,
          ]),
          color: themeColors.primary.light,
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
  }, [ hourlyReturnGraphData, t ]);

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

export default HourlySignalHourlyReturnGraph;
