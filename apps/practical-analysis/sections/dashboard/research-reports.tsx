import Link from 'next/link';
import { useQuery } from 'react-query';

import Text from '@libs/components/atomic/text/text';
import CardHeader from '@libs/components/molecules/card/card-header';
import Loading from '@libs/components/molecules/loading/loading';
import { dateFormatter } from '@libs/utils/date.utils';

import { getResearchFilesHandler } from 'prac-analysis/actions/research-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import ResearchFilesIcon from 'prac-analysis/public/images/svgs/research-files.svg';

const ResearchReports = () => {
  const { data, isLoading } = useQuery(QUERY_KEYS.RESEARCH_FILES, () =>
    getResearchFilesHandler({
      descending     : true,
      equityCode     : 'All',
      lastId         : -1,
      pageNumber     : 0,
      recordCount    : 5,
      sortColumnName : '',
    }),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CardHeader title='dashboard_researchReports_card_researchReports_title'>
      {data?.map((file, index) => (
        <div
          className={`flex justify-between items-center px-4 py-5 ${
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            index % 2 === 1 ? 'bg-basic-two' : 'transparent'
          }`}
          key={file.id}
        >
          <div className='flex gap-2'>
            <ResearchFilesIcon />
            <div className='flex flex-col justify-center'>
              <Link href={file.webSiteUrl!} target='_blank'>
                <Text
                  className='cursor-pointer'
                  label={file.equityCode}
                  textColor='text-blue-dark'
                  textVariant='body1'
                />
              </Link>
              <Text
                label={dateFormatter(file.createdDate)}
                textColor='text-basic-four'
                textVariant='small2'
              />
            </div>
          </div>
          <Text
            className='px-2 py-0.5 rounded bg-basic-three'
            label={file.reportType}
            textVariant='small2'
          />
        </div>
      ))}
    </CardHeader>
  );
};

export default ResearchReports;
