import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import PieChart from '@libs/components/molecules/chart/pie-chart';
import Loading from '@libs/components/molecules/loading/loading';
import LastUpdateDateText from '@libs/components/molecules/text/last-update-date-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import {
  MOMENTUM_AREA_LABEL,
  sentimentColors,
  UNDEFINED_VALUE,
} from './constants';
import {
  getSentimentLastScoresHandler,
  getSentimentMomentumAreasHandler,
} from 'prac-analysis/actions/sentiment-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface MomentumAnalysisProps {
  assetId?: string;
}

const MomentumAnalysis = ({ assetId }: MomentumAnalysisProps) => {
  const { t } = useTranslation();

  const { data } = useQuery(QUERY_KEYS.GET_SENTIMENT_MOMENTUM_AREAS, () =>
    getSentimentMomentumAreasHandler(),
  );

  const {
    data: scoreData,
    refetch,
    isFetching,
  } = useQuery(QUERY_KEYS.GET_SENTIMENT_LAST_SCORES_BY_ID, () =>
    getSentimentLastScoresHandler(assetId),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, assetId ]);

  return (
    <div className='mb-6'>
      <div className='flex flex-col md:flex-row gap-4 F'>
        <div className='w-full flex flex-col'>
          <TranslatedText
            label='general_general_momentumAnalysis_title'
            textVariant='body1'
          />
          <LastUpdateDateText
            className='my-6'
            isLive={false}
            isLoading={isFetching}
            lastUpdatedDate={scoreData?.[0]?.created}
          />

          <TranslatedText
            className='mb-8'
            label='sentimentAnalysis_sentimentAnalysis_info1_text'
            textVariant='body2'
          />
          <TranslatedText
            components={[ <span className='font-bold' key='0' /> ]}
            label='sentimentAnalysis_sentimentAnalysis_info_text'
            textVariant='body2'
            values={{
              symbol       : scoreData?.[0]?.symbol,
              momentumArea : t(
                MOMENTUM_AREA_LABEL[
                  scoreData?.[0]?.momentumArea || UNDEFINED_VALUE
                ],
              ),
              percentage:
                data?.find(
                  (item) =>
                    item.momentumAreaName ===
                    t(
                      MOMENTUM_AREA_LABEL[
                        scoreData?.[0]?.momentumArea || UNDEFINED_VALUE
                      ],
                    ),
                )?.momentumValue || 0,
            }}
          />
        </div>
        {isFetching ? (
          <Loading />
        ) : (
          <div className='w-full md:w-1/2'>
            <PieChart
              data={data || []}
              defaultSelected={t(
                MOMENTUM_AREA_LABEL[
                  scoreData?.[0]?.momentumArea || UNDEFINED_VALUE
                ],
              )}
              sentimentColors={sentimentColors}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MomentumAnalysis;
