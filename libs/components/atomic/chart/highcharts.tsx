/* eslint-disable import/no-named-as-default-member */
import HighchartsLib from 'highcharts';
// eslint-disable-next-line import/no-named-as-default
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';

import { SHORT_WEEK_DAYS } from '@libs/constants/date-constants';
import { t } from '@libs/locales/i18n';

export type HighchartsOptionsProps = Highcharts.Options;
export interface HighchartsProps extends HighchartsReact.Props {
  showNavigation?: boolean;
}

const Highcharts = ({ options, ...rest }: HighchartsProps) => {
  useEffect(() => {
    HighchartsLib.setOptions({
      lang: {
        rangeSelectorZoom : '',
        decimalPoint      : ',',
        thousandsSep      : '.',
        loading           : t('general_general_loading_text') || '',
        months            : [
          t('general_general_january_text'),
          t('general_general_february_text'),
          t('general_general_march_text'),
          t('general_general_april_text'),
          t('general_general_may_text'),
          t('general_general_june_text'),
          t('general_general_july_text'),
          t('general_general_august_text'),
          t('general_general_september_text'),
          t('general_general_october_text'),
          t('general_general_november_text'),
          t('general_general_december_text'),
        ],
        weekdays    : SHORT_WEEK_DAYS.map((day) => t(day)),
        shortMonths : [
          t('general_general_jan_text'),
          t('general_general_feb_text'),
          t('general_general_mar_text'),
          t('general_general_apr_text'),
          t('general_general_mayShort_text'),
          t('general_general_jun_text'),
          t('general_general_jul_text'),
          t('general_general_aug_text'),
          t('general_general_sep_text'),
          t('general_general_oct_text'),
          t('general_general_nov_text'),
          t('general_general_dec_text'),
        ],
      },
      time  : { useUTC: false },
      chart : {
        reflow : true,
        style  : {
          fontFamily: 'Roboto',
        },
      },
    });
  }, []);

  return (
    <HighchartsReact
      highcharts={HighchartsLib}
      options={{
        accessibility: {
          enabled: false,
        },
        ...options,
        credits: { enabled: false },
      }}
      {...rest}
    />
  );
};

export default Highcharts;
