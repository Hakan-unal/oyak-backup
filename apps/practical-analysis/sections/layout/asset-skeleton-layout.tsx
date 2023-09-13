// TODO(eren.tur):color information will come dynamically, caret-right icon information will be passed to the color palette
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';

import { IndicatorStatusEnum } from '@libs/api/constants';
import { InstrumentAnalyzeModel } from '@libs/api/oyak/api';
import Card from '@libs/components/atomic/card/card';
import Text from '@libs/components/atomic/text/text';
import Dropdown, {
  DropdownItemProps,
} from '@libs/components/molecules/dropdown/dropdown';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import {
  getIndicatorStatusByDecision,
  getIndicatorStatusByValue,
  IndicatorStatusColor,
} from '@libs/utils/share.utils';
import { formatMoneyAmount } from '@libs/utils/string.utils';

import { INSTEAD_OF_NULL_SHARE_VALUE } from './constants';
import { COOKIE_KEYS } from 'prac-analysis/constants/cookies';
import CaretRight from 'prac-analysis/public/images/svgs/caret-right.svg';
import CaretUp from 'prac-analysis/public/images/svgs/caret-up.svg';

interface AssetSkeletonLayoutProps {
  children: ReactNode;
  initialAssetId?: string | null;
  assets?: InstrumentAnalyzeModel[] | null;
  onAssetChange?: (value: InstrumentAnalyzeModel) => void;
}

const AssetSkeletonLayout = ({
  children,
  initialAssetId,
  assets,
}: AssetSkeletonLayoutProps) => {
  const {
    pathname,
    replace,
    push,
    query: { symbol },
  } = useRouter();

  const cardSharedClassName =
    'w-full flex px-4 lg:px-10 py-3 sm:py-6 rounded-none sm:rounded-lg';

  const selectedAsset = useMemo(
    () => assets?.find((asset) => asset.symbol === (symbol || initialAssetId)),
    [ symbol, initialAssetId, assets ],
  );

  const priceChangeIndicatorStatus = useMemo(
    () =>
      getIndicatorStatusByValue(
        selectedAsset?.priceChangeRate?.replace('%', ''),
      ),
    [ selectedAsset?.priceChangeRate ],
  );

  const decisionIndicatorStatus = useMemo(
    () => getIndicatorStatusByDecision(selectedAsset?.decision),
    [ selectedAsset?.decision ],
  );

  const handleOnAssetChange = (item: DropdownItemProps) => {
    replace({
      pathname,
      query: { symbol: item.value },
    });
  };

  const redirectToPracticalAdvice = () => {
    push({
      pathname : process.env.NEXT_PUBLIC_PRACTICAL_ADVICE!,
      query    : {
        token   : getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN),
        assetId : symbol || initialAssetId,
      },
    });
  };

  const iconBackgroundColor = useMemo(
    () => IndicatorStatusColor[decisionIndicatorStatus].iconBackgroundColor,
    [ decisionIndicatorStatus ],
  );

  return (
    <div className='flex flex-col gap-1 sm:gap-6'>
      <div className='w-full flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-6'>
        <Card className={`${cardSharedClassName} items-end`}>
          <div className='w-full'>
            <Dropdown
              autocomplete
              defaultValue={selectedAsset?.symbol as string | undefined}
              label='general_general_assetSelection_placeholder'
              onChange={handleOnAssetChange}
              options={
                assets?.map((asset) => ({
                  label : `${asset.symbol} (${asset.description})`,
                  value : asset.symbol as string,
                })) || []
              }
              variant='material'
            />
          </div>
        </Card>
        <div className='w-full flex lg:grid lg:grid-cols-2 gap-1 sm:gap-2 md:gap-6'>
          <Card
            className={`${cardSharedClassName} flex-col items-center sm:items-start `}
          >
            <TranslatedText
              className='mt-2 text-sm md:text-xs'
              label='general_general_price_label'
              textColor='text-basic-five'
            />
            {selectedAsset && (
              <div className='flex justify-center sm:justify-start items-center w-full'>
                <CaretUp
                  className={`${
                    priceChangeIndicatorStatus === IndicatorStatusEnum.POSITIVE
                      ? 'rotate-0'
                      : 'rotate-180'
                  }`}
                  fill={IndicatorStatusColor[priceChangeIndicatorStatus].base}
                  height='7px'
                  width='12px'
                />
                <Text
                  className='ml-3'
                  label={formatMoneyAmount(selectedAsset?.lastPrice)}
                  textVariant='header2'
                />
                {selectedAsset?.priceChangeRate && (
                  <Text
                    className='ml-1'
                    label={`(${selectedAsset?.priceChangeRate})`}
                    textColor={
                      IndicatorStatusColor[priceChangeIndicatorStatus].textColor
                    }
                    textVariant='body3'
                  />
                )}
              </div>
            )}
          </Card>
          <Card
            className={`${cardSharedClassName} items-center justify-center sm:justify-between gap-3`}
          >
            <div className='flex flex-col items-center sm:items-start overflow-x-hidden'>
              <TranslatedText
                className='text-single-line text-sm md:text-xs'
                label='general_general_practicalSuggestionSignal_label'
                textColor='text-basic-five'
              />
              <Text
                label={selectedAsset?.decision || INSTEAD_OF_NULL_SHARE_VALUE}
                textColor={
                  IndicatorStatusColor[decisionIndicatorStatus].textColor
                }
                textVariant='header2'
              />
            </div>
            {selectedAsset?.decision && (
              <div
                className={`h-5 w-5 sm:h-8 sm:w-8 flex justify-center items-center rounded cursor-pointer ${iconBackgroundColor} `}
                onClick={redirectToPracticalAdvice}
              >
                <CaretRight
                  fill={IndicatorStatusColor[decisionIndicatorStatus].base}
                  height='13px'
                  width='7px'
                />
              </div>
            )}
          </Card>
        </div>
      </div>
      <Card className='shadow-none rounded-none border-none sm:rounded-lg sm:border sm:shadow'>
        {children}
      </Card>
    </div>
  );
};

export default AssetSkeletonLayout;
