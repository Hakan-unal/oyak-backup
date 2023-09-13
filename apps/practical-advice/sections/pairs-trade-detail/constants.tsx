import { ColumnDef } from '@libs/components/atomic/table/constants';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';

export const PairsTradeDetailColumnDefs: ColumnDef[] = [
  {
    headerName : ' ',
    field      : 'method',
    minWidth   : 225,
    cellClass  : 'bg-basic-two font-bold',
  },
  {
    headerName : 'pairTrade_detail_strategyReturnTable_positionsCount_title',
    field      : 'countOfOrders',
    minWidth   : 150,
  },
  {
    headerName : 'pairTrade_detail_strategyReturnTable_profitLoss_title',
    field      : 'sumOfOrders',
    type       : [ CustomColumnEnum.MoneyType ],
  },
];

export const ReturnGraphColumnDefs: ColumnDef[] = [
  {
    headerName : 'pairTrade_returnGraph_table_status_title',
    field      : 'direction',
    type       : [ CustomColumnEnum.DecisionType ],
  },
  {
    headerName : 'pairTrade_returnGraph_table_asset_title',
    field      : 'stockSymbol',
  },
  {
    headerName : 'pairTrade_returnGraph_table_price_title',
    field      : 'positionOpenPrice',
    type       : [ CustomColumnEnum.MoneyType ],
  },
  {
    headerName : 'pairTrade_returnGraph_table_closePrices_title',
    field      : 'positionClosePrice',
    minWidth   : 125,
    type       : [ CustomColumnEnum.MoneyType ],
  },
  {
    headerName : 'pairTrade_returnGraph_table_profitLoss_title',
    field      : 'proLoss',
    type       : [ CustomColumnEnum.MoneyType ],
  },
];
