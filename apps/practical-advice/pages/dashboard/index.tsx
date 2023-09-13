import { CellClickedEvent } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

import VideoModal from '@libs/components/atomic/modal/video-modal';
import CardHeader from '@libs/components/molecules/card/card-header';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import Banner from '@libs/components/organisms/dashboard/banner';
import IntroductionVideo from '@libs/components/organisms/dashboard/introduction-video';
import UserInfoCard from '@libs/components/organisms/dashboard/user-info-card';
import { QUERY_KEYS } from '@libs/constants/query-keys';
import useModal from '@libs/hooks/useModal';

import {
  getCustomerInfoHandler,
  getHourlyEquityDecisionStatusHandler,
} from 'prac-advice/actions/signal-api';
import HowWorksIcon from 'prac-advice/public/images/svgs/how-works.svg';
import externalPaths from 'prac-advice/routes/external-paths';
import paths from 'prac-advice/routes/internal-paths';
import {
  HourlySignalColumnDefs,
  TAKE_SIGNAL_COUNT,
  VideoLists,
} from 'prac-advice/sections/dashboard/constants';
import IntroductionCard from 'prac-advice/sections/dashboard/introduction-card';

const Dashboard = () => {
  const { push } = useRouter();
  const { AlertModal, infoAlert } = useModal();
  const [ videoLink, setVideoLink ] = useState<string>();

  const {
    data: hourlyEquityDecisionList,
    isLoading: isHourlyEquityDecisionListLoading,
  } = useQuery(QUERY_KEYS.DASHBOARD_HOURLY_EQUITY_DECISION_STATUS, () =>
    getHourlyEquityDecisionStatusHandler({ take: TAKE_SIGNAL_COUNT }),
  );

  const { data: customerInfo, isLoading: isCustomerInfoLoading } = useQuery(
    QUERY_KEYS.GET_CUSTOMER_INFO,
    getCustomerInfoHandler,
  );

  const showIntroductionInfoModal = () => {
    infoAlert({
      title          : 'dashboard_praticSuggestionCard_card_praticSuggestion_title',
      text           : 'dashboard_praticSuggestionCard_popup_detailInfo_text',
      preChild       : <HowWorksIcon height='208px' width='256px' />,
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.LinkType)) {
      return;
    }

    push({
      pathname : paths.HOURLY_SIGNAL_DETAIL,
      query    : { symbol: event.value },
    });
  };

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
          <div className='flex flex-col gap-6'>
            <CardHeader
              showMore={{
                label   : 'general_general_seeAll_button',
                onClick : () => push(paths.HOURLY_SIGNAL),
              }}
              title='dashboard_hourlySigns_card_title'
            >
              <ColumnTypeTable
                sizeColumnsToFit
                className='w-full'
                columnDefs={HourlySignalColumnDefs}
                defaultColDef={{ sortable: false }}
                isLoading={isHourlyEquityDecisionListLoading}
                onCellClicked={handleCellClicked}
                rowData={hourlyEquityDecisionList || []}
              />
            </CardHeader>
            <IntroductionCard onClick={showIntroductionInfoModal} />
          </div>
        </div>
        <div className='flex flex-col'>
          <IntroductionVideo
            className='sm:h-[740px]'
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
