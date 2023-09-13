import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomHourlyEquityBuySellGraphicModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface HourlySignalBuySellGraphProps {
  isLoading?: boolean;
  buySellGraphData?: CustomHourlyEquityBuySellGraphicModel[];
}

const HourlySignalBuySellGraph = ({
  isLoading,
  buySellGraphData,
}: HourlySignalBuySellGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!buySellGraphData && isLoading) {
      return;
    }

    return {
      yAxis: [
        {
          title: {
            text: t('hourlySigns_strategyPerformance_graph_closing_label'),
          },
          startOnTick        : false,
          minorGridLineWidth : 1,
          minorTickInterval  : 50,
          gridLineWidth      : 0,
        },
        {
          title: {
            text: t('pairTrade_detail_strategyReturnGraph_return_label'),
          },
          startOnTick        : false,
          opposite           : true,
          minorGridLineWidth : 1,
          minorTickInterval  : 50,
          gridLineWidth      : 0,
        },
      ],
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
          name   : t('hourlySigns_strategyPerformance_graph_closing_text')!,
          data   : buySellGraphData?.map((value) => [ value.time, value.closePrice ]),
          color  : themeColors.graph.black,
          marker : {
            enabled: false,
          },

          yAxis: 0,
        },
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_return_text')!,
          data : buySellGraphData?.map((value) => [
            value.time,
            value.rateOfChange,
          ]),
          color  : themeColors.primary.dark,
          marker : {
            enabled: false,
          },

          yAxis: 1,
        },
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_buy_text')!,
          data : buySellGraphData?.map((value) => [
            value.time,
            value.closeBuyPrice,
          ]),
          color     : themeColors.graph.green,
          lineWidth : 0,
          marker    : {
            symbol  : 'circle',
            enabled : true,
            radius  : 6,
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
            inactive: {
              opacity: 0.8,
            },
          },
        },
        {
          type : 'line',
          name : t('hourlySigns_strategyPerformance_graph_sell_text')!,
          data : buySellGraphData?.map((value) => [
            value.time,
            value.closeSellPrice,
          ]),
          color     : themeColors.graph.red,
          lineWidth : 0,
          marker    : {
            symbol  : 'circle',
            enabled : true,
            radius  : 6,
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
            inactive: {
              opacity: 0.8,
            },
          },
        },
      ],
    };
  }, [ buySellGraphData, t ]);

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

export default HourlySignalBuySellGraph;
