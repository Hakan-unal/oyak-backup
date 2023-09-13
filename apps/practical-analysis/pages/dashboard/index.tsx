import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

import VideoModal from '@libs/components/atomic/modal/video-modal';
import CardHeader from '@libs/components/molecules/card/card-header';
import Banner from '@libs/components/organisms/dashboard/banner';
import IntroductionVideo from '@libs/components/organisms/dashboard/introduction-video';
import UserInfoCard from '@libs/components/organisms/dashboard/user-info-card';
import useModal from '@libs/hooks/useModal';

import { getModelPortfolioAnalyzeHandler } from 'prac-analysis/actions/setting-api';
import { getCustomerInfoHandler } from 'prac-analysis/actions/token-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import externalPaths from 'prac-analysis/routes/external-paths';
import paths from 'prac-analysis/routes/internal-paths';
import { VideoLists } from 'prac-analysis/sections/dashboard/constants';
import DailyReports from 'prac-analysis/sections/dashboard/daily-reports';
import ModelPortfolioTable from 'prac-analysis/sections/dashboard/model-portfolio-table';
import ResearchReports from 'prac-analysis/sections/dashboard/research-reports';

const Dashboard = () => {
  const { push } = useRouter();
  const { AlertModal, infoAlert } = useModal();
  const [ videoLink, setVideoLink ] = useState<string>();

  const { data: customerInfo, isLoading: isCustomerInfoLoading } = useQuery(
    QUERY_KEYS.GET_CUSTOMER_INFO,
    getCustomerInfoHandler,
  );

  const { data: modelPortfolioData, isLoading: isModelPortfolioLoading } =
    useQuery(QUERY_KEYS.MODEL_PORTFOLIO, () =>
      getModelPortfolioAnalyzeHandler(),
    );

  return (
    <div className='flex flex-col px-4 sm:px-0 pt-4 sm:pt-0'>
      <Banner redirectUrl={externalPaths.BANNER_LINK} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col justify-between gap-6'>
          <UserInfoCard
            cardClassName='p-4 lg:p-4'
            fullName={customerInfo?.fullName}
            isLoading={isCustomerInfoLoading}
          />
          <CardHeader
            showMore={{
              label:
                'dashboard_modelPortfoy_card_assetsCoveredByResearch_button',
              onClick: () => push(paths.RESEARCHED_SHARE),
            }}
            title='dashboard_modelPortfoy_card_modelPortfoy_title'
          >
            <ModelPortfolioTable
              data={modelPortfolioData!}
              isLoading={isModelPortfolioLoading}
            />
          </CardHeader>
          <DailyReports />
        </div>
        <div className='flex flex-col gap-6'>
          <ResearchReports />
          <IntroductionVideo
            className='sm:h-[400px]'
            items={VideoLists}
            onDescriptionClick={(description) =>
              infoAlert({ text: description, textMobileSize: 'text-xs' })
            }
            onVideoClick={setVideoLink}
          />
        </div>
      </div>
      <AlertModal />
      {!!videoLink && (
        <VideoModal
          link={videoLink}
          outsideClick={() => setVideoLink(undefined)}
        />
      )}
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

export default Dashboard;
