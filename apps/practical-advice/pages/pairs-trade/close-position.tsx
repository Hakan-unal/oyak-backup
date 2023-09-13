import { CellClickedEvent } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import TabLabel from '@libs/components/molecules/tab/tab-label';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import PaginationTable from '@libs/components/molecules/table/pagination-table';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { QUERY_KEYS } from '@libs/constants/query-keys';

import { getPairDailySignalsHandler } from 'prac-advice/actions/signal-api';
import paths from 'prac-advice/routes/internal-paths';
import {
  PairsTradeColumnDefs,
  TabLabels,
} from 'prac-advice/sections/pairs-trade/constants';

const ClosePosition = () => {
  const { push } = useRouter();

  const { data, isLoading } = useQuery(QUERY_KEYS.PAIR_DAILY_SIGNALS, () =>
    getPairDailySignalsHandler({ isClosePosition: true }),
  );

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.LinkType)) {
      return;
    }

    push({
      pathname : paths.PAIRS_TRADE_DETAIL,
      query    : {
        pairDailySignalId : event.data?.pairDailySignalId,
        isClosePosition   : true,
      },
    });
  };

  return (
    <div className='flex flex-col p-4 sm:p-10 bg-basic-one rounded-lg'>
      <TabLabel activeIndex={1} items={TabLabels} outerClassName='mb-8' />
      <TranslatedText
        className='mb-4'
        label='pairTrade_closePositions_tab_explanation_text'
      />
      <PaginationTable
        sizeColumnsToFit
        className='min-h-[448px] min-w-full'
        columnDefs={PairsTradeColumnDefs}
        defaultColDef={{ minWidth: 75 }}
        isLoading={isLoading}
        onCellClicked={handleCellClicked}
        rowData={data?.list}
      />
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

export default ClosePosition;
