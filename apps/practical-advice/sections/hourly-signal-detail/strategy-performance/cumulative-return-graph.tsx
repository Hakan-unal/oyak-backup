/* eslint-disable import/no-named-as-default-member */
import Highcharts from 'highcharts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomHourlyEquityCumulativeReturnModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface HourlySignalCumulativeReturnGraphProps {
  isLoading?: boolean;
  cumulativeReturnGraphData?: CustomHourlyEquityCumulativeReturnModel[];
}

const HourlySignalCumulativeReturnGraph = ({
  isLoading,
  cumulativeReturnGraphData,
}: HourlySignalCumulativeReturnGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!cumulativeReturnGraphData) {
      return;
    }

    return {
      chart: {
        height     : '30%',
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
          enabled: false,
        },
        gridLineWidth: 1,
      },
      legend: {
        align         : 'right',
        verticalAlign : 'top',
        y             : -45,
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_closing_text')!,
          data : cumulativeReturnGraphData?.map((value) => [
            value.time,
            value.closePrice,
          ]),
          color  : themeColors.basic.six,
          marker : {
            color   : 'red',
            enabled : false,
          },
        },
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_return_text')!,
          data : cumulativeReturnGraphData?.map((value) => [
            value.time,
            value.rateOfChangePrice,
          ]),
          color  : themeColors.primary.light,
          marker : {
            enabled: false,
          },
        },
      ],
      title: {
        text: `${t(
          'hourlySigns_strategyPerformance_graph_cumulativeReturn_label',
        )}`,
        align : 'left',
        x     : 40,
        y     : 20,
        style : {
          fontSize: '10px',
        },
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick(e) {
              const seriesName = this.name;
              const seriesVisibility = this.visible;

              Highcharts?.charts
                ?.filter((chart) => chart)
                ?.forEach((chart) => {
                  chart?.series?.forEach((elem) => {
                    if (seriesName === elem.name) {
                      seriesVisibility ? elem.hide() : elem.show();
                    } else {
                      elem.update({
                        opacity : 1,
                        type    : 'line',
                      });
                    }
                  });
                });
              e.preventDefault();
            },
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              chart: {
                height     : '80%',
                marginLeft : 50,
              },
            },
          },
        ],
      },
    };
  }, [ cumulativeReturnGraphData, t ]);

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

export default HourlySignalCumulativeReturnGraph;
