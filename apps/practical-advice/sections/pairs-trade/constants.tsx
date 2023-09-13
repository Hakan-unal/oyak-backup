import Link from 'next/link';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import { TabLabelItemProps } from '@libs/components/molecules/tab/tab-label';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';

import GraphIcon from 'prac-advice/public/images/svgs/graph.svg';
import paths from 'prac-advice/routes/internal-paths';

export enum PositionType {
  LONG = 'long',
  SHORT = 'short',
}

export const TabLabels: TabLabelItemProps[] = [
  {
    label : 'pairTrade_pairTrade_tab_pairTrade_button',
    path  : paths.PAIRS_TRADE,
  },
  {
    label : 'pairTrade_pairTrade_tab_closePositions_button',
    path  : paths.CLOSE_POSITION,
  },
];

export const PairsTradeColumnDefs: ColumnDef[] = [
  {
    headerName : 'pairTrade_pairTrade_table_short_title',
    field      : 'short',
    pinned     : 'left',
    minWidth   : 100,
    type       : [ CustomColumnEnum.LinkType ],
  },
  {
    headerName : 'pairTrade_pairTrade_table_long_title',
    field      : 'long',
    pinned     : 'left',
    minWidth   : 100,
    type       : [ CustomColumnEnum.LinkType ],
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_decisionDate_title',
    field      : 'decisionDate',
    minWidth   : 125,
    type       : [ CustomColumnEnum.DateType ],
  },
  {
    headerName : 'pairTrade_pairTrade_table_shortDecisionPrice_title',
    field      : 'shortDecisionPrice',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'pairTrade_pairTrade_table_longDecisionPrice_title',
    field      : 'longDecisionPrice',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'pairTrade_pairTrade_table_profitLoss_title',
    field      : 'proLoss',
    minWidth   : 120,
    type       : [ CustomColumnEnum.ProfitType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName   : 'pairTrade_pairTrade_table_returnGraph_title',
    minWidth     : 50,
    sortable     : false,
    cellRenderer : (cell) => (
      <div className='flex items-center justify-center'>
        <Link
          href={`${paths.RETURN_CHART}?pairDailySignalId=${
            cell?.data?.pairDailySignalId
          }&isClosePosition=${cell?.data?.positionCloseDate !== null}`}
        >
          <GraphIcon />
        </Link>
      </div>
    ),
  },
];
