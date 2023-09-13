import { dateFormat, numberFormat } from 'highcharts';
import { useMemo } from 'react';

import { HighchartsOptionsProps } from '@libs/components/atomic/chart/highcharts';
import StockChart from '@libs/components/molecules/chart/stock-chart';
import { DECIMAL_FRACTION } from '@libs/constants/common';
import { t } from '@libs/locales/i18n';
import { TradingVolumeAndPriceChartItemModel } from '@libs/models/finnet';
import { DynamicType } from '@libs/models/model';
import { themeColors } from '@libs/theme/index';

interface TechnicAnalysisChartProps {
  assetId?: string;
  data?: TradingVolumeAndPriceChartItemModel[];
}

const TechnicAnalysisChart = ({ assetId, data }: TechnicAnalysisChartProps) => {
  const selectedButton = themeColors.graph.technicAnalysis.selectedButton;
  const ohlcColor = themeColors.graph.technicAnalysis.ohlc;
  const bandTopColor = themeColors.graph.technicAnalysis.bandTop;
  const bandBotColor = themeColors.graph.technicAnalysis.bandBot;
  const volumeColor = themeColors.graph.technicAnalysis.volume;
  const selectedButtonText = themeColors.black;

  const ohlcChartOptions = useMemo((): HighchartsOptionsProps | undefined => {
    if (!data) {
      return;
    }

    const filteredData = data?.filter((value) => value.indBot && value.indTop);

    return {
      rangeSelector: {
        selected       : 5,
        buttonPosition : {
          align : 'center',
          y     : -10,
        },
        inputPosition: {
          x: -10,
        },
        buttons: [
          {
            type  : 'month',
            count : 1,
            text  : `${t(
              'general_technicAnalysis_graph_tradingVolumeTime4_button',
            )}`,
          },
          {
            type  : 'month',
            count : 3,
            text  : `${t(
              'general_technicAnalysis_graph_tradingVolumeTime3_button',
            )}`,
          },
          {
            type  : 'month',
            count : 6,
            text  : `${t(
              'general_technicAnalysis_graph_tradingVolumeTime2_button',
            )}`,
          },
          {
            type  : 'year',
            count : 1,
            text  : `${t(
              'general_technicAnalysis_graph_tradingVolumeTime1_button',
            )}`,
          },
          {
            type : 'all',
            text : `${t(
              'general_technicAnalysis_graph_tradingVolumeTime5_button',
            )}`,
          },
        ],
        buttonTheme: {
          style: {
            fill  : 'none',
            color : 'black',
          },
          stroke     : 'none',
          padding    : 10,
          fontWeight : 'bold',
          height     : 18,
          width      : null,
          r          : 10,
          states     : {
            hover  : {},
            select : {
              fill  : selectedButton,
              style : {
                color: selectedButtonText,
              },
            },
          },
        },
      },
      chart: {
        height: 600,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              chart: {
                height: 500,
              },
            },
          },
        ],
      },
      title : undefined,
      yAxis : [
        {
          title     : undefined,
          height    : '65%',
          lineWidth : 2,
          resize    : {
            enabled: true,
          },
          opposite : false,
          labels   : {
            y: 5,
          },
        },
        {
          title     : undefined,
          top       : '65%',
          height    : '30%',
          offset    : 0,
          lineWidth : 2,
          resize    : {
            enabled: true,
          },
          opposite : false,
          labels   : {
            y: 5,
          },
        },
      ],
      tooltip: {
        split  : false,
        shared : true,
        formatter() {
          let s = '';

          this.points?.forEach((point: DynamicType) => {
            if (
              point.series.type === 'candlestick' ||
              point.series.type === 'ohlc'
            ) {
              s += `${dateFormat('%a, %b %e, %Y', point?.x)}<br />`;
              s += `<b><span style = "color:${point.series.color};">\u25CF</span> ${point.series.name}:</b><br />`;
              s += `<span>${t(
                'general_technicAnalysis_tooltip_openning_text',
              )}</span> ${numberFormat(
                point.point.open,
                DECIMAL_FRACTION,
              )}<br/><span>${t(
                'general_technicAnalysis_tooltip_high_text',
              )}</span> ${numberFormat(
                point.point.high,
                DECIMAL_FRACTION,
              )}<br/><span>${t(
                'general_technicAnalysis_tooltip_low_text',
              )}</span> ${numberFormat(
                point.point.low,
                DECIMAL_FRACTION,
              )}<br/><span>${t(
                'general_technicAnalysis_tooltip_closing_text',
              )}</span> ${numberFormat(
                point.point.close,
                DECIMAL_FRACTION,
              )}<br/>`;
            } else {
              s +=
                `<b><span style = "color:${point.series.color};">${point.series.name} </span>` +
                ` : ${numberFormat(point?.y, DECIMAL_FRACTION)}</b><br />`;
            }
          });

          return s;
        },
        useHTML: true,
      },
      series: [
        {
          type : 'ohlc',
          name : assetId,
          data : filteredData?.map((value) => [
            value.time,
            value.open,
            value.high,
            value.low,
            value.close,
          ]),
          color: ohlcColor,
        },
        {
          type  : 'line',
          name  : `${t('general_technicAnalysis_tooltip_bollingerTopBand_text')}`,
          data  : filteredData?.map((value) => [ value.time, value.indTop ]),
          color : bandTopColor,
        },
        {
          type : 'line',
          name : `${t(
            'general_technicAnalysis_tooltip_bollingerLowerBand_text',
          )}`,
          data  : filteredData?.map((value) => [ value.time, value.indBot ]),
          color : bandBotColor,
        },
        {
          type    : 'column',
          name    : `${t('general_technicAnalysis_tooltip_volume_text')}`,
          data    : filteredData?.map((value) => [ value.time, value.volume ]),
          yAxis   : 1,
          color   : volumeColor,
          tooltip : undefined,
        },
      ],
    };
  }, [ data ]);

  return <StockChart options={ohlcChartOptions} />;
};

export default TechnicAnalysisChart;
