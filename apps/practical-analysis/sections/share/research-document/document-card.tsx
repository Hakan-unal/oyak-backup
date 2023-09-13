import { useTranslation } from 'react-i18next';

import Card from '@libs/components/atomic/card/card';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import FinancialResultIcon from 'prac-analysis/public/images/svgs/financial-results.svg';
import DocumentIcon from 'prac-analysis/public/images/svgs/update-document.svg';

interface CardDocumentProps {
  title: string;
  subtitle?: string | null;
}

const DocumentCard = ({ title, subtitle }: CardDocumentProps) => {
  const { t } = useTranslation();
  const iconFlag = t('general_assetsCoveredByResearch_financialResults_text');

  return (
    <Card className='p-3 lg:p-4'>
      <div className='flex flex-row gap-2'>
        <div>
          {subtitle?.includes(iconFlag) ? (
            <FinancialResultIcon />
          ) : (
            <DocumentIcon />
          )}
        </div>
        <div className='flex flex-col'>
          <TranslatedText
            className='font-bold text-sm cursor-pointer'
            label={title}
          />
          {subtitle && (
            <TranslatedText
              className='text-xs cursor-pointer'
              label={subtitle}
              textColor='text-primary-dark'
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;
