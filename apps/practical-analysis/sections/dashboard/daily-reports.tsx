/* eslint-disable max-len */
import Link from 'next/link';
import { useQuery } from 'react-query';

import Text from '@libs/components/atomic/text/text';
import CardHeader from '@libs/components/molecules/card/card-header';
import Loading from '@libs/components/molecules/loading/loading';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { dateFormatter } from '@libs/utils/date.utils';

import { getResearchGetBulletinFilesHandler } from 'prac-analysis/actions/research-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import AnalysisReportIcon from 'prac-analysis/public/images/svgs/analysis-report.svg';
import DailyBulletinIcon from 'prac-analysis/public/images/svgs/daily-bulletin.svg';
import TechnicalBulletinIcon from 'prac-analysis/public/images/svgs/technical-bulletin.svg';

interface DailyReportFileProps {
  title: string;
  Icon?;
}

const DailyReportFileNames: Record<string, DailyReportFileProps> = {
  ValueTable: {
    title : 'dashboard_dailyReports_card_analysisReport_button',
    Icon  : AnalysisReportIcon,
  },
  TechnicalBulletin: {
    title : 'dashboard_dailyReports_card_technicalJournal_button',
    Icon  : TechnicalBulletinIcon,
  },
  DailyBulletin: {
    title : 'dashboard_dailyReports_card_dailyJournal_button',
    Icon  : DailyBulletinIcon,
  },
};

const DailyReports = () => {
  const { data, isLoading } = useQuery(QUERY_KEYS.RESEARCH_BULLETIN_FILES, () =>
    getResearchGetBulletinFilesHandler(),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CardHeader title='dashboard_dailyReports_card_dailyReports_title'>
      <div className='grid grid-cols-3 gap-4'>
        {data?.map((file) => {
          const dailyReportFileAttr: DailyReportFileProps | undefined =
            DailyReportFileNames[file.reportType!];

          return (
            dailyReportFileAttr && (
              <Link
                href={file.webSiteUrl!}
                key={file.documentFileName}
                target='_blank'
              >
                <div className='daily-reports h-full flex flex-col justify-between px-3 pt-5 pb-2 border border-basic-three rounded-md gap-5'>
                  <div className='flex flex-col'>
                    <TranslatedText
                      className='daily-report-title text-sm sm:text-lg font-bold cursor-pointer'
                      label={dailyReportFileAttr.title}
                      textColor='text-primary-light'
                    />
                    <Text
                      className='cursor-pointer'
                      label={dateFormatter(file.created)}
                      textColor='text-basic-five'
                      textVariant='small3'
                    />
                  </div>
                  <div className='flex justify-end'>
                    {
                      <dailyReportFileAttr.Icon
                        className='daily-report-icon'
                        height='67px'
                        width='83px'
                      />
                    }
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </CardHeader>
  );
};

export default DailyReports;
