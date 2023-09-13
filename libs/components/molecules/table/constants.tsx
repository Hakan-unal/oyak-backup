import { ColDef } from 'ag-grid-community';

import { DropdownItemProps } from '../dropdown/dropdown';
import {
  DailySignalBreakdownDirection,
  PairsTradeStatusType,
  SignalDecisionType,
  StrategyPerformanceDecisionType,
} from '@libs/api/constants';
import ArrowDown from '@libs/assets/images/svgs/arrow-down.svg';
import ArrowUp from '@libs/assets/images/svgs/arrow-up.svg';
import CaretDown from '@libs/assets/images/svgs/caret-down.svg';
import CaretUp from '@libs/assets/images/svgs/caret-up.svg';
import Info from '@libs/assets/images/svgs/Info.svg';
import { t } from '@libs/locales/i18n';
import { themeColors } from '@libs/theme/index';
import { dateFormatter, dateFormatterWithHour } from '@libs/utils/date.utils';

export const DEFAULT_PAGE_SIZE_OPTIONS: DropdownItemProps[] = [
  {
    label : 'general_general_showTen_text',
    value : 10,
  },
  {
    label : 'general_general_showTwenty_text',
    value : 20,
  },
  {
    label : 'general_general_showThirty_text',
    value : 30,
  },
];

export const INSTEAD_OF_NULL_OR_EMPTY_VALUE = '-';

export enum CustomColumnEnum {
  DecisionType = 'decisionType',
  ArrowType = 'arrowType',
  ProfitType = 'profitType',
  LinkType = 'linkType',
  DateType = 'dateType',
  DateTimeType = 'dateTimeType',
  MoneyType = 'moneyType',
  NoFilter = 'noFilter',
  InfoType = 'infoType',
  Bold = 'bold',
  SetInsteadOfEmptyValue = 'setInsteadOfEmptyValue',
}

type CustomColumnTypes =
  | CustomColumnEnum.DecisionType
  | CustomColumnEnum.ArrowType
  | CustomColumnEnum.ProfitType
  | CustomColumnEnum.LinkType
  | CustomColumnEnum.DateType
  | CustomColumnEnum.DateTimeType
  | CustomColumnEnum.MoneyType
  | CustomColumnEnum.NoFilter
  | CustomColumnEnum.InfoType
  | CustomColumnEnum.Bold
  | CustomColumnEnum.SetInsteadOfEmptyValue;

export const CustomColumnTypesDefinition: Record<CustomColumnTypes, ColDef> = {
  decisionType: {
    cellClass: (cell) => {
      let className = 'font-bold text-xs ';

      if (
        cell.value === SignalDecisionType.SELL ||
        cell.value === StrategyPerformanceDecisionType.LOSS ||
        cell.value === PairsTradeStatusType.SELL
      ) {
        className += 'text-primary-dark';
      } else if (
        cell.value === SignalDecisionType.BUY ||
        cell.value === StrategyPerformanceDecisionType.PROFIT ||
        cell.value === PairsTradeStatusType.BUY
      ) {
        className += 'text-green-dark';
      } else {
        className += 'text-basic-six';
      }

      return className;
    },
  },
  arrowType: {
    cellRenderer: (cell) => {
      if (
        cell.data?.breakdownDirection === DailySignalBreakdownDirection.DOWN ||
        cell.value === SignalDecisionType.SELL
      ) {
        return (
          <div className='flex flex-row items-center gap-1 '>
            <label className='w-full sm:w-2/5'>{cell.value}</label>
            <div className='flex justify-center items-center'>
              <ArrowDown
                fill={themeColors.primary.dark}
                height='20px'
                width='12px'
              />
            </div>
          </div>
        );
      } else if (
        cell.data?.breakdownDirection === DailySignalBreakdownDirection.UP ||
        cell.value === SignalDecisionType.BUY
      ) {
        return (
          <div className='flex flex-row items-center gap-1'>
            <label className='w-full sm:w-2/5'>{cell.value}</label>
            <div className='flex justify-center items-center'>
              <ArrowUp
                fill={themeColors.green.dark}
                height='20px'
                width='12px'
              />
            </div>
          </div>
        );
      }

      return <label>{cell.value}</label>;
    },
  },
  profitType: {
    cellClass: (cell) => {
      let className = 'font-bold text-xs ';
      const formatedCellValue = cell.value?.toString()?.replace('%', '');

      if (formatedCellValue < 0) {
        className += 'text-primary-dark';
      } else if (formatedCellValue > 0) {
        className += 'text-green-dark';
      } else {
        className += 'text-basic-six';
      }

      return className;
    },
    cellRenderer: (cell) => {
      const formatedCellValue = cell.value?.toString()?.replace('%', '');

      if (formatedCellValue < 0) {
        return (
          <div className='flex flex-row items-center gap-1'>
            <div className='flex justify-center items-center'>
              <CaretDown
                fill={themeColors.primary.dark}
                height='5px'
                width='10px'
              />
            </div>
            <label>{cell.value}</label>
          </div>
        );
      } else if (formatedCellValue > 0) {
        return (
          <div className='flex flex-row items-center gap-1'>
            <div className='flex justify-center items-center'>
              <CaretUp
                fill={themeColors.green.dark}
                height='5px'
                width='10px'
              />
            </div>
            <label>{cell.value}</label>
          </div>
        );
      }

      return <label>{cell.value}</label>;
    },
  },
  linkType: {
    cellClass: () => 'text-xs font-bold text-blue-dark cursor-pointer',
  },
  dateType: {
    cellRenderer       : (cell) => dateFormatter(cell.value),
    getQuickFilterText : (cell) => dateFormatter(cell.value)?.toString() || '',
  },
  dateTimeType: {
    cellRenderer       : (cell) => dateFormatterWithHour(cell.value),
    getQuickFilterText : (cell) =>
      dateFormatterWithHour(cell.value)?.toString() || '',
  },
  moneyType: {
    cellRenderer: (cell) => cell.value?.toString()?.replace('.', ','),
  },
  noFilter: {
    getQuickFilterText: () => '',
  },
  infoType: {
    cellRenderer: (cell) => infoColumnCell(cell),
  },
  bold: {
    cellClass: () => 'font-bold',
  },
  setInsteadOfEmptyValue: {
    cellRenderer: (cell) => {
      if (cell.value === '' || !cell.value) {
        return INSTEAD_OF_NULL_OR_EMPTY_VALUE;
      }

      return cell.value;
    },
  },
};

export const infoColumnCell = (
  cell,
  showLabel?: string,
  onClick?: (cell) => void,
) => {
  if (!showLabel || cell.value === t(showLabel)) {
    return (
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => onClick?.(cell)}
      >
        <label className='cursor-pointer'>{cell.value}</label>
        <Info fill={themeColors.basic.four} height='16px' width='16px' />
      </div>
    );
  }

  return cell.value;
};

export interface InfoHeaderGroupCellProps {
  cell?;
  displayName?: string;
  showInfoIcon?: boolean;
  onClick?: (cell) => void;
}

export const infoheaderGroupCell = ({
  cell,
  displayName,
  showInfoIcon = false,
  onClick,
}: InfoHeaderGroupCellProps) => {
  const cursorDefinationClass = showInfoIcon ? 'cursor-pointer' : '';

  return (
    <div
      className={`w-full flex items-center gap-2 ${cursorDefinationClass}`}
      onClick={() => onClick?.(cell)}
    >
      <label className={`font-bold ${cursorDefinationClass}`}>
        {t(displayName || cell?.displayName)}
      </label>
      {showInfoIcon && (
        <Info fill={themeColors.basic.four} height='16px' width='16px' />
      )}
    </div>
  );
};
