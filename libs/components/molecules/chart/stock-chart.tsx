import Highcharts, {
  HighchartsOptionsProps,
  HighchartsProps,
} from '@libs/components/atomic/chart/highcharts';

const StockChart = ({ options, ...rest }: HighchartsProps) => {
  const customOptions: HighchartsOptionsProps = {
    title      : undefined,
    stockTools : {
      gui: {
        enabled: false,
      },
    },

    ...options,
  };

  return (
    <Highcharts
      options={customOptions}
      showNavigation={false}
      {...rest}
      constructorType='stockChart'
    />
  );
};

export default StockChart;
