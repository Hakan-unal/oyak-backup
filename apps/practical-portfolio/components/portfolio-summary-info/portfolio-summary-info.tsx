// TODO(eren.tur): Will be add loc.key

import Info from '@libs/assets/images/svgs/Info.svg';
import Button from '@libs/components/atomic/button/button';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { themeColors } from '@libs/theme';

import {
  PortfolioType,
  PortfolioTypeIcons,
} from 'prac-portfolio/constants/portfolio';

export interface PortfolioSummaryInfoProps {
  portfolioType: PortfolioType;
  portfolioTypeName: string;
  portfolioName: string;
  annualReturn: number;
  biggestLost: number;
  volatility?: number;
  sharpeRatio?: number;
  showInfoIcon?: boolean;
  onInfoClick?: () => void;
}

const PortfolioSummaryInfo = ({
  portfolioType,
  portfolioTypeName,
  portfolioName,
  annualReturn,
  biggestLost,
  volatility,
  sharpeRatio,
  showInfoIcon = false,
  onInfoClick,
}: PortfolioSummaryInfoProps) => {
  const PortfolioTypeIcon = PortfolioTypeIcons[portfolioType];

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2'>
        <PortfolioTypeIcon height='91px' width='112px' />
      </div>
      <TranslatedText
        label={portfolioTypeName}
        textColor='text-basic-four'
        textVariant='small1'
      />
      <Button
        buttonType='colorless'
        className='flex items-center gap-2'
        disabled={!showInfoIcon}
        onClick={onInfoClick}
      >
        <TranslatedText label={portfolioName} textVariant='title1' />
        {showInfoIcon && (
          <Info fill={themeColors.basic.six} height='20px' width='20px' />
        )}
      </Button>
      <div className='flex mt-5 gap-4'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col items-center'>
            <TranslatedText
              label='Yıllık Getiri'
              textColor='text-basic-four'
              textVariant='small2'
            />
            <TranslatedText
              className='font-bold'
              label={`%${annualReturn}`}
              textColor='text-green-dark'
            />
          </div>
          <div className='flex flex-col items-center'>
            <TranslatedText
              label='En Büyük Kayıp'
              textColor='text-basic-four'
              textVariant='small2'
            />
            <TranslatedText className='font-bold' label={`%${biggestLost}`} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {volatility && (
            <div className='flex flex-col items-center'>
              <TranslatedText
                label='Volatilite'
                textColor='text-basic-four'
                textVariant='small2'
              />
              <TranslatedText className='font-bold' label={`%${volatility}`} />
            </div>
          )}
          {sharpeRatio && (
            <div className='flex flex-col items-center'>
              <TranslatedText
                label='Sharpe Rasyosu'
                textColor='text-basic-four'
                textVariant='small2'
              />
              <TranslatedText className='font-bold' label={`${sharpeRatio}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryInfo;
