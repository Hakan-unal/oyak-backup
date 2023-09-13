/* eslint-disable max-len */

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { signalApi } from '@libs/api/services';
import Breadcrumb from '@libs/components/molecules/breadcrumb/breadcrumb';
import IconButton from '@libs/components/molecules/button/buton-icon';
import TabView, {
  TabViewItemProps,
} from '@libs/components/molecules/tab/tab-view';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import SymbolWithIconText from '@libs/components/molecules/text/symbol-with-icon-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';
import ExternalArrow from 'prac-advice/public/images/svgs/external-arrow-icon.svg';
import paths from 'prac-advice/routes/internal-paths';
import HourlySignalAssetDecisionPoint from 'prac-advice/sections/hourly-signal-detail/asset-decision-point';
import HourlySignalBuySellSignal from 'prac-advice/sections/hourly-signal-detail/buy-sell/buy-sell-signal';
import HourlySignalMomentumAnalysis from 'prac-advice/sections/hourly-signal-detail/momentum-analysis/momentum-analysis';
import HourlySignalStrategyPerformance from 'prac-advice/sections/hourly-signal-detail/strategy-performance/strategy-performance';

const getHourlyEquityDecisionStatusHandler = (symbol: string) =>
  signalApi
    .apiSignalGetHourlyEquityDecisionStatusPost({ symbol, status: true })
    .then((response) => response.data?.data);

const HourlySignalDetail = () => {
  const {
    query: { symbol },
    push,
  } = useRouter();

  const [ lastUpdateDate, setLastUpdateDate ] = useState<
    string | undefined | null
  >();

  const { data } = useQuery(
    QUERY_KEYS.HOURLY_EQUITY_DECISION_STATUS_BY_SYMBOL,
    () => getHourlyEquityDecisionStatusHandler(symbol as string),
    {
      onSuccess: (value) => {
        setLastUpdateDate(value?.lastUpdatedDate);
      },
      enabled: !!symbol,
    },
  );

  const symbolInfo = data?.list?.[0];
  const isTermViopShare = symbolInfo?.isFuture;

  const tabs: TabViewItemProps[] = [
    {
      label     : 'hourlySigns_assetDecisionPoint_tab_assetDecisionPoint_button',
      component : (
        <HourlySignalAssetDecisionPoint
          list={data?.list}
          symbol={symbol as string}
        />
      ),
    },
    {
      label     : 'hourlySigns_assetDecisionPoint_tab_buySellSignalGraph_button',
      component : (
        <HourlySignalBuySellSignal
          setLastUpdateDate={setLastUpdateDate}
          symbol={symbol as string}
        />
      ),
    },
    {
      label     : 'hourlySigns_assetDecisionPoint_tab_momentumAnalysis_button',
      component : (
        <HourlySignalMomentumAnalysis
          setLastUpdateDate={setLastUpdateDate}
          symbol={symbol as string}
        />
      ),
    },
    {
      label     : 'hourlySigns_assetDecisionPoint_tab_strategyPerformance_button',
      component : (
        <HourlySignalStrategyPerformance
          setLastUpdateDate={setLastUpdateDate}
          symbol={symbol as string}
        />
      ),
    },
  ];

  const handleTabChange = (index: number) => {
    if (index === 0) {
      setLastUpdateDate(data?.lastUpdatedDate);
    }
  };

  const redirectToPracticalAnalysis = () => {
    push({
      pathname : process.env.NEXT_PUBLIC_PRACTICAL_ANALYSIS!,
      query    : {
        token   : getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN),
        assetId : symbol,
      },
    });
  };

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <div className='flex justify-between'>
        <Breadcrumb
          className='mb-6'
          label='hourlySigns_assetDecisionPoint_returnToSignalList_button'
          prevPath={paths.HOURLY_SIGNAL}
        />
        {!isTermViopShare && (
          <IconButton
            buttonClassName='h-full md:hidden flex items-center rounded-3xl gap-1 cursor-pointer'
            icon={<ExternalArrow className='cursor-pointer' />}
            label='general_general_practicalAnalysis_button'
            onClick={redirectToPracticalAnalysis}
            textClassName='cursor-pointer'
            textColor='text-primary-dark'
          />
        )}
      </div>

      <div className='flex flex-col mb-6 sm:mb-8'>
        <div className='flex justify-between'>
          <div className='flex flex-row items-center gap-2 '>
            <TranslatedText
              className='text-xl font-bold'
              label='hourlySigns_assetDecisionPoint_assetAnalysis_title'
            />
            {symbolInfo && (
              <SymbolWithIconText
                hasViop={symbolInfo?.hasViopContract}
                symbolName={symbolInfo?.symbol}
              />
            )}
          </div>
          {!isTermViopShare && (
            /* TODO(munzur.kolkiran): button color should add tailwind.css */
            <IconButton
              buttonClassName='h-full hidden md:flex justify-center items-center rounded-3xl gap-1 py-2 px-4  bg-[#fde6e9] cursor-pointer'
              icon={<ExternalArrow className='cursor-pointer' />}
              label='general_general_practicalAnalysis_button'
              onClick={redirectToPracticalAnalysis}
              textClassName='cursor-pointer'
              textColor='text-primary-dark'
            />
          )}
        </div>
        {data?.lastUpdatedDate && (
          <LastUpdateDateText
            isLive={false}
            label='general_general_lastReportDate_text'
            lastUpdatedDate={lastUpdateDate}
          />
        )}
      </div>

      <TabView
        onTabChange={handleTabChange}
        tabLabelOuterClassName='mb-8'
        tabs={tabs}
      />
    </div>
  );
};

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default HourlySignalDetail;
