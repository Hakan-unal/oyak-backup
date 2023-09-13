import InfoText from '@libs/components/molecules/text/info-text';
import useModal from '@libs/hooks/useModal';

import HourlyClosing from './hourly-closing';
import LastObservationScore from './last-observation';
import MomentumAnalysis from './momentum';

interface SentimentAnalysisProps {
  assetId?: string;
}

const SentimentAnalysis = ({ assetId }: SentimentAnalysisProps) => {
  const { AlertModal, infoAlert } = useModal();

  const showInfoMessage = () => {
    infoAlert({
      text           : 'sentimentAnalysis_sentimentAnalysis_popup_reservation_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  return (
    <div className='flex flex-col'>
      <MomentumAnalysis assetId={assetId} />
      <LastObservationScore assetId={assetId} />
      <HourlyClosing symbol={assetId} />
      <InfoText
        className='text-basic-five'
        components={[
          <a
            className='font-bold text-primary-dark cursor-pointer'
            key='sentimentAnalysis_sentimentAnalysis_reservation_text'
            onClick={showInfoMessage}
          />,
        ]}
        label='sentimentAnalysis_sentimentAnalysis_reservation_text'
        textVariant='body4'
      />
      <AlertModal />
    </div>
  );
};

export default SentimentAnalysis;
