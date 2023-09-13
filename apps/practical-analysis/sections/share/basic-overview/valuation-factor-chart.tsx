/* eslint-disable max-nested-callbacks */
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import Loading from '@libs/components/molecules/loading/loading';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import {
  SHOW_LAST_FOUR_YEAR_AND_CURRENT_HEADER_COUNT,
  ValuationFactorChartColors,
} from './constants';
import { getValuationFactorTableHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const ValuationFactorChart = ({ serviceParams }: Props) => {
  const { t } = useTranslation();

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.VALUATION_FACTOR,
    () => getValuationFactorTableHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!data) {
      return;
    }

    const headerList = data?.BaslikListe?.slice(
      SHOW_LAST_FOUR_YEAR_AND_CURRENT_HEADER_COUNT,
    );

    return {
      yAxis: {
        title: undefined,
      },
      xAxis: [
        {
          categories: headerList?.map((header) => header.Baslik!),
        },
      ],
      legend: {
        align         : 'center',
        verticalAlign : 'bottom',
        borderWidth   : 0,
      },
      tooltip: {
        shared: true,
      },
      series: data.JSVeriler?.map((series, index) => ({
        type    : 'line',
        name    : series.baslik?.Text,
        data    : headerList?.map((header) => series.o?.[header.PropertyName!] || 0),
        tooltip : {
          valueDecimals: 2,
        },
        color: ValuationFactorChartColors[index],
      })),
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

export default ValuationFactorChart;
