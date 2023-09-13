import TranslatedText from '../translated-text';
import StatusPoint from '@libs/components/atomic/point/status-point';
import LastUpdateDateSkeleton from '@libs/components/molecules/text/last-update-date-text/skeleton';
import { dateFormatter, dateFormatterWithHour } from '@libs/utils/date.utils';

interface LastUpdateDateTextProps {
  label?: string;
  lastUpdatedDate?: Date | string | null;
  showDateTime?: boolean;
  className?: string;
  isLive?: boolean;
  isLoading?: boolean;
}

const LastUpdateDateText = ({
  label = 'general_general_lastDataDate_text',
  lastUpdatedDate,
  showDateTime = true,
  className,
  isLive = true,
  isLoading,
}: LastUpdateDateTextProps) => {
  if (isLoading) {
    return <LastUpdateDateSkeleton className={className} isLive={isLive} />;
  }

  return (
    <div className={`flex flex-row items-center gap-6 ${className}`}>
      {isLive && <StatusPoint color='bg-green-dark' size='sm' />}
      <TranslatedText
        className='font-medium text-sm'
        components={[ <span className='font-normal' key='0' /> ]}
        label={label}
        textColor='text-basic-five'
        values={{
          lastUpdatedDate: showDateTime
            ? dateFormatterWithHour(lastUpdatedDate)
            : dateFormatter(lastUpdatedDate),
        }}
      />
    </div>
  );
};

export default LastUpdateDateText;
