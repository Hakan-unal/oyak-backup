import { useMemo } from 'react';

import { HourlyEquitySpeedometerGraphicModel } from '@libs/api/oyak/api';
import CaretUp from '@libs/assets/images/svgs/caret-up.svg';
import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import Text from '@libs/components/atomic/text/text';
import GaugeChart from '@libs/components/molecules/chart/gauge-chart';
import { themeColors } from '@libs/theme/index';

import {
  SpeedometerPlotBands,
  SpeedometerYAxisTickPositions,
} from './constant';
import MomentumAnalysisScoreChart from './score-chart';

interface SpeedometerProps {
  score?: number;
  data?: HourlyEquitySpeedometerGraphicModel[];
}

const MomentumAnalysisScoreSpeedmeter = ({ data }: SpeedometerProps) => {
  const { scoreChanging, score } = useMemo(() => {
    const scoreChanging =
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (data?.at(-1)?.currentDay || 0) - (data?.at(-2)?.previousDay || 0);

    const score = data?.at(-1)?.score || 0;

    return { scoreChanging, score };
  }, [ data ]);

  const chartOptions = useMemo(
    (): HighchartsOptionsProps | undefined => ({
      chart: {
        type            : 'gauge',
        backgroundColor : 'transparent',
        reflow          : false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min               : SpeedometerYAxisTickPositions[0],
        max               : SpeedometerYAxisTickPositions.at(-1),
        tickColor         : 'black',
        tickPosition      : 'outside',
        tickLength        : 5,
        tickWidth         : 8,
        tickPositions     : SpeedometerYAxisTickPositions.map((item) => item),
        minorTickInterval : 0,
        title             : {
          text  : score?.toString(),
          y     : 35,
          style : {
            color    : themeColors.grey.light,
            fontSize : '50px',
          },
        },
        // TODO(munzur.kolkiran) add rotate auto
        labels: {
          distance : 20,
          style    : {
            fontSize: '12px',
          },
        },
        plotBands: SpeedometerPlotBands.map((item) => item),
      },
      xAxis: {
        crosshair: true,
      },
      pane: {
        startAngle : -90,
        endAngle   : 90,
        center     : [ '50%', '50%' ],
        background : [
          {
            innerRadius : '100%',
            outerRadius : '100%',
            shape       : 'arc',
          },
        ],
      },
      plotOptions : undefined,
      tooltip     : {
        enabled: false,
      },
      series: [
        {
          type       : 'gauge',
          name       : 'Speedometer',
          data       : score ? [ score ] : [],
          dataLabels : {
            enabled: false,
          },
          dial: {
            radius          : '75%',
            backgroundColor : themeColors.grey.light,
            baseLength      : '85%',
            rearLength      : '-85%',
            baseWidth       : 18,
          },
          pivot: undefined,
        },
      ],
    }),
    [ score ],
  );

  return (
    <div
      className={`relative w-[330px] sm:w-[380px] md:w-auto h-[300px] flex flex-col items-center px-2`}
    >
      {chartOptions && <GaugeChart options={chartOptions} />}
      <div className='absolute top-[55%] flex gap-2'>
        {scoreChanging !== 0 ? (
          <>
            <CaretUp
              fill={
                scoreChanging > 0
                  ? themeColors.green.dark
                  : themeColors.primary.light
              }
              height='40px'
              style={scoreChanging < 0 ? { transform: 'rotate(180deg)' } : {}}
              width='25px'
            />
            <Text
              className='font-600 text-2xl md:text-3xl'
              label={scoreChanging?.toString()}
              textColor={`${
                scoreChanging > 0 ? 'text-green-dark' : 'text-primary-light'
              }`}
            />
          </>
        ) : (
          <Text
            className='font-600 text-2xl md:text-3xl'
            label={scoreChanging?.toString()}
            textColor={themeColors.grey.light}
          />
        )}
      </div>
      <div className='w-1/2 absolute bottom-[10px] sm:-bottom-[20px]'>
        <MomentumAnalysisScoreChart data={data || []} />
      </div>
    </div>
  );
};

export default MomentumAnalysisScoreSpeedmeter;
