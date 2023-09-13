import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import StatusPoint from '@libs/components/atomic/point/status-point';
import GaugeChart from '@libs/components/molecules/chart/gauge-chart';
import Loading from '@libs/components/molecules/loading/loading';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { themeColors } from '@libs/theme/index';

import {
  MOMENTUM_AREA_LABEL,
  negativeColor,
  negativeStrongColor,
  neutralColor,
  pointerColors,
  positiveColor,
  positiveStrongColor,
  UNDEFINED_VALUE,
} from './constants';
import { getSentimentLastScoresHandler } from 'prac-analysis/actions/sentiment-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

const momentumDatas = [
  {
    label : MOMENTUM_AREA_LABEL.PositiveStrongMomentum,
    min   : 25,
    max   : 44,
  },
  {
    label : MOMENTUM_AREA_LABEL.PositiveMomentum,
    min   : 6,
    max   : 25,
  },
  {
    label : MOMENTUM_AREA_LABEL.Neutral,
    min   : -6,
    max   : 6,
  },
  {
    label : MOMENTUM_AREA_LABEL.NegativeMomentum,
    min   : -25,
    max   : -6,
  },
  {
    label : MOMENTUM_AREA_LABEL.NegativeStrongMomentum,
    min   : -44,
    max   : -25,
  },
];

interface LastObservationScoreProps {
  assetId?: string;
}

const LastObservationScore = ({ assetId }: LastObservationScoreProps) => {
  const { t } = useTranslation();
  const whiteColor = themeColors.graph.white;

  const {
    data: scoreData,
    refetch,
    isFetching,
  } = useQuery(QUERY_KEYS.GET_SENTIMENT_LAST_SCORES_BY_ID, () =>
    getSentimentLastScoresHandler(assetId),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, assetId ]);

  const gaugeChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!scoreData) {
      return;
    }

    return {
      chart: {
        type   : 'gauge',
        height : '80%',
      },
      title  : undefined,
      legend : {
        enabled: false,
      },
      pane: {
        startAngle : -90,
        endAngle   : 90,
        size       : '100%',
        center     : [ '50%', '75%' ],
        background : [
          {
            innerRadius : '100%',
            outerRadius : '100%',
            shape       : 'arc',
          },
        ],
      },
      tooltip: {
        enabled: false,
      },
      // TODO (yusuf.aytin): using momentumDatas array value
      yAxis: {
        min               : -44,
        max               : 44,
        tickPosition      : 'inside',
        tickColor         : whiteColor,
        tickLength        : undefined,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        tickPositions     : [ -44, -25, -6, 6, 25, 44 ],
        minorTickInterval : undefined,
        labels            : {
          distance : 20,
          style    : {
            fontSize: '18px',
          },
        },
        plotBands: [
          {
            from      : -44,
            to        : -25,
            color     : negativeStrongColor,
            thickness : 20,
          },
          {
            from      : -25,
            to        : -6,
            color     : negativeColor,
            thickness : 20,
          },
          {
            from      : -6,
            to        : 6,
            color     : neutralColor,
            thickness : 20,
          },
          {
            from      : 6,
            to        : 25,
            color     : positiveColor,
            thickness : 20,
          },
          {
            from      : 25,
            to        : 44,
            color     : positiveStrongColor,
            thickness : 20,
          },
        ],
      },
      series: [
        {
          name       : 'Score',
          data       : [ scoreData?.[0]?.score || 0 ],
          dataLabels : {
            format: `<div style="width: 150px; white-space: normal; text-align: center;color:#6A6A6A"><span style="font-size: 30px;">{y}</span><br/><span style="font-size: 14px; line-height: 20px">${t(
              MOMENTUM_AREA_LABEL[
                scoreData?.[0]?.momentumArea || UNDEFINED_VALUE
              ],
            )}</span></div>`,
            borderWidth   : 0,
            useHTML       : true,
            verticalAlign : 'bottom',
          },
          dial: {
            radius          : '75%',
            backgroundColor : 'gray',
            baseWidth       : 18,
            baseLength      : '85%',
            rearLength      : '-85%',
          },
          type  : 'gauge',
          pivot : undefined,
        },
      ],
    };
  }, [ scoreData, t ]);

  return (
    <div className='flex flex-col mb-16 w-full'>
      <TranslatedText
        label='sentimentAnalysis_sentimentAnalysis_lastScore_subtitle'
        textVariant='body1'
      />
      <div className='my-6'>
        <TranslatedText
          components={[ <span className='font-bold' key='0' /> ]}
          label={'sentimentAnalysis_sentimentAnalysis_speedometerInfo_text'}
          textVariant='body2'
          values={{
            symbol       : scoreData?.[0]?.symbol,
            score        : scoreData?.[0]?.score?.toString(),
            momentumArea : t(
              MOMENTUM_AREA_LABEL[
                scoreData?.[0]?.momentumArea || UNDEFINED_VALUE
              ],
            ),
          }}
        />
      </div>
      <div className='flex flex-col md:flex-row border'>
        {isFetching ? (
          <Loading />
        ) : (
          <div className='w-full md:w-1/2 justify-center'>
            <GaugeChart options={gaugeChartOptions} />
          </div>
        )}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-8 md:gap-7'>
            {momentumDatas.map((momentum, index) => (
              <div className='flex justify-start' key={index}>
                <div className='mr-3 md:mr-4 self-center'>
                  <StatusPoint color={pointerColors[index]} size='xl' />
                </div>
                <div className='flex flex-col'>
                  <TranslatedText
                    className='mb-0.5 md:mb-0'
                    label={momentum.label}
                    textVariant='body1'
                  />
                  <TranslatedText
                    className='mb-0.5 md:mb-0'
                    label='sentimentAnalysis_sentimentAnalysis_maxMin_title'
                    textVariant='body2'
                    values={{
                      min : momentum.min,
                      max : momentum.max,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastObservationScore;
