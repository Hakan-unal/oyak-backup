import Button from '@libs/components/atomic/button/button';
import Card from '@libs/components/atomic/card/card';
import HeaderText from '@libs/components/molecules/text/header-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import HowWorksIcon from 'prac-analysis/public/images/svgs/how-works.svg';

interface IntroductionCardProps {
  onClick: () => void;
}

const IntroductionCard = ({ onClick }: IntroductionCardProps) => (
  <Card className='min-h-[229px] px-4 py-6 md:px-4 md:py-6 lg:px-6 lg:py-8'>
    <HeaderText label='dashboard_praticSuggestionCard_card_praticSuggestion_title' />
    <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 mt-6'>
      <div className='flex flex-col items-center sm:items-start gap-6'>
        <TranslatedText
          className='text-xs md:text-sm text-center sm:text-left'
          label='dashboard_praticSuggestionCard_card_explanation_text'
        />
        <Button
          buttonColor='secondary'
          className='font-normal text-sm px-5 py-2 w-fit'
          label='dashboard_praticSuggestionCard_card_inspectDetails_button'
          onClick={onClick}
        />
      </div>
      <div className='h-[116px] w-[143px] -mt-0 sm:-mt-6'>
        <HowWorksIcon height='116px' width='143px' />
      </div>
    </div>
  </Card>
);

export default IntroductionCard;
