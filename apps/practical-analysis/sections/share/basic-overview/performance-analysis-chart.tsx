import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { FinnetSharedRequestModel } from '@libs/models/finnet';
import { themeColors } from '@libs/theme/index';

import { getShareClosingGraphDataHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const PerformanceAnalysisChart = ({ serviceParams }: Props) => {
  const { t } = useTranslation();
  const perfRateColor = themeColors.graph.performanceAnalysis.perfRate;
  const closingColor = themeColors.graph.performanceAnalysis.closing;

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.SHARE_PERFORMANCE_CHART,
    () => getShareClosingGraphDataHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!data) {
      return;
    }

    return {
      yAxis: [
        {
          labels: {
            format : '{value}%',
            style  : {
              color: perfRateColor,
            },
          },
          title: {
            text  : t('general_basicOverview_graph_relativePerformance_text'),
            style : {
              color: perfRateColor,
            },
            x: 0,
          },
          opposite: true,
        },
        {
          title: {
            text  : t('general_basicOverview_graph_assetPrice_text'),
            style : {
              color: closingColor,
            },
          },
          labels: {
            x: -20,
          },
        },
      ],
      xAxis: {
        type      : 'datetime',
        crosshair : true,
      },
      legend: {
        align         : 'left',
        verticalAlign : 'top',
        borderWidth   : 0,
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          type  : 'line',
          name  : t('general_basicOverview_graph_closes_text')!,
          data  : data?.map((value) => [ value.time, value.closing ]),
          color : closingColor,
          yAxis : 1,
        },
        {
          type    : 'line',
          name    : t('general_basicOverview_graph_relativePerformance_text')!,
          data    : data?.map((value) => [ value.time, value.perfRate ]),
          color   : perfRateColor,
          tooltip : {
            valueDecimals : 2,
            valueSuffix   : '%',
          },
          yAxis: 0,
        },
      ],
    };
  }, [ data, t ]);

  return (
    <div className='flex justify-center'>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='w-full'>
          <LineChart options={lineChartOptions} />
        </div>
      )}
    </div>
  );
};

export default PerformanceAnalysisChart;
