import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PairDailySignalModel } from '@libs/api/oyak/api';
import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { CustomPairDailySignalsP2GraphicModel } from '@libs/models/signal-api.model';
import { themeColors } from '@libs/theme/index';

interface PairsTradeReturnGraphProps {
  isLoading?: boolean;
  detailInfo?: PairDailySignalModel;
  dailySignalP2Data?: CustomPairDailySignalsP2GraphicModel[];
}

const PairsTradeReturnGraph = ({
  isLoading,
  detailInfo,
  dailySignalP2Data,
}: PairsTradeReturnGraphProps) => {
  const { t } = useTranslation();

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!dailySignalP2Data || !detailInfo) {
      return;
    }

    return {
      yAxis: {
        title: {
          text: t('pairTrade_returnGraph_graph_additiveReturn_label'),
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
          name   : detailInfo?.long || '',
          data   : dailySignalP2Data?.map((value) => [ value.time, value.long ]),
          color  : themeColors.graph.green,
          marker : {
            enabled: false,
          },
        },
        {
          type   : 'line',
          name   : detailInfo?.short || '',
          data   : dailySignalP2Data?.map((value) => [ value.time, value.short ]),
          color  : themeColors.graph.red,
          marker : {
            enabled: false,
          },
        },
        {
          type : 'line',
          name : t('pairTrade_returnGraph_graph_additiveReturn_text')!,
          data : dailySignalP2Data?.map((value) => [
            value.time,
            value.totalReturn,
          ]),
          color  : themeColors.graph.black,
          marker : {
            symbol  : 'circle',
            enabled : true,
          },
        },
      ],
    };
  }, [ dailySignalP2Data, detailInfo, t ]);

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

export default PairsTradeReturnGraph;
