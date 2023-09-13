import { useEffect, useState } from 'react';

import Highcharts, {
  HighchartsOptionsProps,
  HighchartsProps,
} from '@libs/components/atomic/chart/highcharts';

const GaugeChart = ({ options, ...rest }: HighchartsProps) => {
  const [ customOptions, setCustomOptions ] = useState<HighchartsOptionsProps>();

  useEffect(() => {
    setCustomOptions({
      ...options,
      title: {
        floating : true,
        text     : '',
      },
      boost: {
        enabled: false,
      },
    });
  }, []);

  return (
    <Highcharts options={customOptions} showNavigation={false} {...rest} />
  );
};

export default GaugeChart;
