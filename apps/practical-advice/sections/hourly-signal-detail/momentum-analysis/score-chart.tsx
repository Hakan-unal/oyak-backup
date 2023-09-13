import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HourlyEquitySpeedometerGraphicModel } from '@libs/api/oyak/api';
import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import LineChart from '@libs/components/molecules/chart/line-chart';
import { themeColors } from '@libs/theme/index';

interface MomentumAnalysisScoreChartProps {
  data?: HourlyEquitySpeedometerGraphicModel[];
}

const MomentumAnalysisScoreChart = ({
  data,
}: MomentumAnalysisScoreChartProps) => {
  const { t } = useTranslation();

  const columnChartOptions = useMemo(
    (): HighchartsOptionsProps | undefined => ({
      chart: {
        backgroundColor : 'transparent',
        height          : '40%',
      },
      xAxis: {
        lineWidth : 0,
        labels    : {
          enabled: false,
        },
        tickLength: 0,
      },
      yAxis: {
        title         : undefined,
        gridLineWidth : 0,
        lineColor     : 'transparent',
        labels        : {
          enabled: false,
        },
      },
      legend  : { enabled: false },
      tooltip : {
        headerFormat : '<table>',
        pointFormat  : `<tr><td style="color:{series.color};padding:0">${t(
          'hourlySigns_strategyPerformTable_table_score_title',
        )}: </td>
           <td ><b> {point.y}</b></td></tr>`,
        footerFormat : '</table>',
        useHTML      : true,
      },
      plotOptions: {
        column: {
          pointPadding : 0,
          borderWidth  : 0,
        },
      },
      series: [
        {
          name  : 'Score',
          type  : 'column',
          data  : data?.map((item) => item.score || 0),
          color : themeColors.primary.light,
        },
      ],
    }),
    [ data ],
  );

  return <LineChart options={columnChartOptions} />;
};

export default MomentumAnalysisScoreChart;
