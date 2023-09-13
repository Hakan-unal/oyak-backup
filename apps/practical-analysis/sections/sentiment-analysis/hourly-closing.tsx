/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */

import Highcharts from 'highcharts';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import EmptyState from '@libs/components/molecules/empty-state';
import Loading from '@libs/components/molecules/loading/loading';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { DynamicType } from '@libs/models/model';
import { themeColors } from '@libs/theme/index';
import { dateFormatterWithHour } from '@libs/utils/date.utils';

import {
  negativeColor,
  negativeStrongColor,
  neutralColor,
  positiveColor,
  positiveStrongColor,
} from './constants';
import { getSentimentGraphicsHandler } from 'prac-analysis/actions/sentiment-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface HourlyClosingProps {
  symbol?: string;
}

const HourlyClosing = ({ symbol }: HourlyClosingProps) => {
  const { t } = useTranslation();

  const {
    data: graphData,
    isFetching,
    refetch,
  } = useQuery(
    QUERY_KEYS.GET_SENTIMENT_GRAPHICS,
    () => getSentimentGraphicsHandler({ symbol }),
    {
      enabled: !!symbol,
    },
  );

  useEffect(() => {
    refetch();
  }, [ refetch, symbol ]);

  const lineChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!graphData) {
      return;
    }

    return {
      chart: {
        marginLeft    : 60,
        spacingTop    : 10,
        spacingBottom : 10,
        height        : '40%',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              chart: {
                height: '80%',
              },
            },
          },
        ],
      },
      title  : undefined,
      legend : {
        enabled: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        title: {
          text: `${symbol} - ${t(
            'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_closingPrice_text',
          )}`,
        },
      },
      tooltip: {
        borderWidth     : 0,
        backgroundColor : 'none',
        pointFormat     : `<span style='font-size: 12px'>${t(
          'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_date_text',
        )} {point.date}</span><br/><span style='font-size: 12px'>${t(
          'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_closingPrice2_text',
        )} <b>{point.y}</b></span>`,
        headerFormat : '',
        shadow       : false,
        useHTML      : true,
      },
      series: [
        {
          data: graphData?.map((graph) => ({
            date : dateFormatterWithHour(graph.date),
            y    : graph.closePrice,
          })),
          type      : 'line',
          color     : themeColors.basic.six,
          lineWidth : 0.5,
          marker    : {
            enabled: false,
          },
        },
      ],
    };
  }, [ graphData, symbol ]);

  const columnChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!graphData) {
      return;
    }

    return {
      chart: {
        marginLeft    : 60,
        spacingTop    : 10,
        spacingBottom : 10,
        height        : '20%',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              chart: {
                height: '80%',
              },
            },
          },
        ],
      },
      title  : undefined,
      legend : {
        enabled: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        title: {
          text: t(
            'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_score_text',
          ),
        },
      },
      tooltip: {
        borderWidth     : 0,
        backgroundColor : 'none',
        pointFormat     : `<span style='font-size: 12px'>${t(
          'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_date_text',
        )} {point.date}</span><br/><span style='font-size: 12px'>${t(
          'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_score2_text',
        )} <b>{point.y}</b></span>`,
        headerFormat : '',
        shadow       : false,
        useHTML      : true,
      },
      series: [
        {
          data: graphData?.map((graph) => ({
            date : dateFormatterWithHour(graph.date),
            y    : graph.score,
          })),
          type  : 'column',
          zones : [
            {
              value : -25,
              color : negativeStrongColor,
            },
            {
              value : -6,
              color : negativeColor,
            },
            {
              value : 6,
              color : neutralColor,
            },
            {
              value : 25,
              color : positiveColor,
            },
            {
              color: positiveStrongColor,
            },
          ],
        },
      ],
    };
  }, [ graphData ]);

  useEffect(() => {
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    Highcharts.Pointer.prototype.reset = () => {};

    const prototype = Highcharts.Point.prototype as DynamicType;

    prototype.highlight = function (event) {
      this.onMouseOver(); // Show the hover marker
      this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
  }, []);

  const handleMouseMove = (e: DynamicType) => {
    let point: DynamicType = null;
    let event;

    e.persist();
    Highcharts.charts.forEach((chart) => {
      if (!chart) {
        return;
      }

      event = chart?.pointer.normalize(e); // Find coordinates within the chart
      point = chart?.series[0].searchPoint(event, true); // Get the hovered point

      if (point) {
        point?.highlight(e);
      }
    });
  };

  return (
    <div className='flex flex-col mb-16 w-full'>
      <TranslatedText
        label='sentimentAnalysis_sentimentAnalysis_priceChange_subtitle'
        textVariant='body1'
      />
      <div className='w-full my-6'>
        <TranslatedText
          label='sentimentAnalysis_sentimentAnalysis_graphInfo_text'
          textVariant='body2'
        />
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div
          className='w-full'
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
        >
          {graphData && graphData?.length > 0 ? (
            <>
              <div>
                <LineChart options={lineChartOptions} />
              </div>
              <div>
                <LineChart options={columnChartOptions} />
              </div>
            </>
          ) : (
            <EmptyState label='general_general_graph_emptyState_text' />
          )}
        </div>
      )}
    </div>
  );
};

export default HourlyClosing;
