import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SentimentMomentumAreasModel } from '@libs/api/oyak/api';
import Highcharts, {
  HighchartsOptionsProps,
  HighchartsProps,
} from '@libs/components/atomic/chart/highcharts';
import { DynamicType } from '@libs/models/model';
import { sortArrayByKey } from '@libs/utils/array.utils';

const SORT_KEY = 'priority';

interface Props extends HighchartsProps {
  data: SentimentMomentumAreasModel[];
  defaultSelected?: DynamicType;
  sentimentColors: string[];
}

// TODO (yusuf.aytin): edit for global using format
const PieChart = ({
  data,
  defaultSelected,
  sentimentColors,
  ...rest
}: Props) => {
  const [ chartOptions, setChartOptions ] = useState<HighchartsOptionsProps>();
  const [ selectedValue, setSelectedValue ] = useState<DynamicType>();
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      prepareData();
    }
  }, [ data, selectedValue ]);

  useEffect(() => {
    setSelectedValue(undefined);
    prepareData();
  }, [ defaultSelected ]);

  const prepareData = () => {
    const _result: DynamicType[][] = [];
    const sortData = sortArrayByKey(data, SORT_KEY);

    sortData?.forEach((item: DynamicType) => {
      const _item: DynamicType = [];

      const isSelected =
        item?.momentumAreaName === (selectedValue?.name || defaultSelected);

      _item.push(
        item?.momentumAreaName,
        item?.momentumValue,
        isSelected,
        isSelected,
      );

      if (isSelected && !selectedValue) {
        setSelectedValue({
          name : item?.momentumAreaName,
          y    : item?.momentumValue,
        });
      }

      _result.push(_item);
    });

    setChartOptions({
      chart: {
        type     : 'variablepie',
        renderTo : 'container',
      },
      colors : sentimentColors,
      series : [
        {
          innerSize        : '75%',
          type             : 'pie',
          allowPointSelect : true,
          keys             : [ 'name', 'y', 'selected', 'sliced' ],
          data             : _result.reverse(),
          point            : {
            events: {
              click(event) {
                setSelectedValue(event.point.options);
              },
            },
          },
        },
      ],
      tooltip: {
        headerFormat : '',
        pointFormat  : `<b>{point.name}</b><br/>${t(
          'sentimentAnalysis_sentimentAnalysis_hourlyClosingGraph_score2_text',
        )} <b>{point.y}</b>`,
      },
      title: selectedValue
        ? {
            align         : 'center',
            text          : `${selectedValue?.name.split(' ').join('<br/>')}`,
            verticalAlign : 'middle',
            floating      : true,
            style         : {
              fontSize   : '13px',
              fontWeight : 'bold',
              textAlign  : 'center',
            },
          }
        : undefined,
      plotOptions: {
        pie: {
          center     : [ '50%', '50%' ],
          dataLabels : {
            connectorWidth : 0,
            padding        : -2,
            distance       : 20,
            formatter() {
              return this.point?.y === 0 ? '' : this.point?.y;
            },
          },
        },
      },
    });
  };

  return <Highcharts options={chartOptions} showNavigation={false} {...rest} />;
};

export default PieChart;
