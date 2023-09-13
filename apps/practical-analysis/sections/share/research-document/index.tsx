import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ResearchFileModel } from '@libs/api/oyak/api';
import Text from '@libs/components/atomic/text/text';
import EmptyState from '@libs/components/molecules/empty-state';
import Loading from '@libs/components/molecules/loading/loading';
import { LONG_MONTH_YEARS } from '@libs/constants/date-constants';

import DocumentCard from './document-card';
import { getResearchFilesHandler } from 'prac-analysis/actions/research-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface GroupedFileProps {
  year: number;
  items: ResearchFileModel[];
}

interface Props {
  assetId: string;
}

const ShareResearchDocument = ({ assetId }: Props) => {
  const serviceParams = useMemo(
    () => ({
      lastId         : -1,
      recordCount    : 1000,
      pageNumber     : 0,
      sortColumnName : '',
      descending     : true,
      equityCode     : assetId,
    }),
    [ assetId ],
  );

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.RESEARCH_DOCUMENT_FILES,
    () => getResearchFilesHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const groupedData = useMemo(() => {
    if (!data) {
      return;
    }

    const groupYears: GroupedFileProps[] = [];

    for (let index = 0; index < data.length; index++) {
      const file = data[index];

      let currentGroupYear = groupYears.find(
        (groupYear) => groupYear.year === file.reportYear,
      );

      if (!currentGroupYear) {
        currentGroupYear = { year: file.reportYear!, items: [] };
        groupYears.push(currentGroupYear);
      }

      currentGroupYear?.items.push(file);
    }

    return groupYears;
  }, [ data ]);

  const isEmptyData = !(groupedData && groupedData.length > 0);
  const handleMonth = (month) => LONG_MONTH_YEARS[month];

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-[500px] rounded-lg flex flex-col gap-8 ${
        isEmptyData ? 'justify-center' : 'justify-start'
      }`}
    >
      {!isEmptyData ? (
        groupedData?.map((groupItem) => (
          <>
            <Text
              className='font-bold text-xl'
              label={groupItem.year.toString()}
              textColor='text-primary-dark'
            />

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-8'>
              {groupItem.items.map((file) => (
                <Link
                  href={file.webSiteUrl!}
                  key={file.fileName}
                  target='_blank'
                >
                  <DocumentCard
                    subtitle={file?.reportType}
                    title={handleMonth((file.reportMonth || 0) - 1)}
                  />
                </Link>
              ))}
            </div>
          </>
        ))
      ) : (
        <EmptyState label='reports_assetsCoveredByResearch_emptyState_text' />
      )}
    </div>
  );
};

export default ShareResearchDocument;
