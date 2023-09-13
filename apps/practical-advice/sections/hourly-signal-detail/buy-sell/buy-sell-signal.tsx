import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { GraphicDataRequest } from '@libs/api/oyak/api';
import InfoText from '@libs/components/molecules/text/info-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import useModal from '@libs/hooks/useModal';
import { CustomHourlyEquityBuySellGraphicModel } from '@libs/models/signal-api.model';
import { convertDate } from '@libs/utils/date.utils';

import HourlySignalBuySellGraph from './buy-sell-graph';
import { getHourlyEquityBuySellGraphicHandler } from 'prac-advice/actions/signal-api';

interface HourlySignalBuySellSignalProps {
  symbol: string;
  setLastUpdateDate: (date: string | undefined | null) => void;
}

const HourlySignalBuySellSignal = ({
  symbol,
  setLastUpdateDate,
}: HourlySignalBuySellSignalProps) => {
  const { AlertModal, infoAlert } = useModal();
  const [ isLoading, setIsLoading ] = useState(true);

  const [ yearlyData, setYearlyData ] = useState<
    CustomHourlyEquityBuySellGraphicModel[]
  >([]);

  const { mutate, data } = useMutation(
    QUERY_KEYS.HOURLY_EQUITY_BUY_SELL_GRAPHIC_BY_SYMBOL,
    (params: GraphicDataRequest) =>
      getHourlyEquityBuySellGraphicHandler(params),
    {
      onSuccess: (value) => {
        setLastUpdateDate(value?.data.lastUpdatedDate);
      },
    },
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data?.lastId && data.lastId > 0) {
      const now = new Date();

      const oneYearsAgo = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate(),
      );

      const lastDataDate = convertDate(yearlyData.at(-1)?.date as string);

      if (lastDataDate > oneYearsAgo) {
        getData();
      } else {
        setIsLoading(false);
      }
    }
  }, [ data?.lastId ]);

  const showInfoMessage = () => {
    infoAlert({
      text           : 'hourlySigns_popup_extendedInfo_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  const getData = () => {
    mutate(
      { lastId: data?.lastId || 0, symbol },
      {
        onSuccess: (response) => {
          setYearlyData((prev) => prev.concat(response?.data.list || []));
        },
      },
    );
  };

  return (
    <>
      <div className='flex flex-col'>
        <TranslatedText
          className='text-sm sm:text-base mb-8 sm:mb-10'
          label='hourlySigns_graphOfBuySellAssetSign_tab_info_text'
        />

        <div className='min-h-[500px] flex flex-col justify-between gap-12'>
          <HourlySignalBuySellGraph
            buySellGraphData={yearlyData}
            isLoading={isLoading}
          />

          <InfoText
            className='text-xs sm:text-sm cursor-pointer'
            components={[
              <a
                className='font-bold text-primary-dark cursor-pointer'
                key='hourlySigns_info_text'
                onClick={showInfoMessage}
              />,
            ]}
            label='hourlySigns_info_text'
          />
        </div>
      </div>

      <AlertModal />
    </>
  );
};

export default HourlySignalBuySellSignal;
