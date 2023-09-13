import { IndicatorStatusEnum, SignalDecisionType } from '@libs/api/constants';
import { themeColors } from '@libs/theme';

interface ColorType {
  base: string;
  textColor: string;
  iconBackgroundColor?: string;
}

export const IndicatorStatusColor: Record<IndicatorStatusEnum, ColorType> = {
  Positive: {
    base                : themeColors.green.dark,
    textColor           : 'text-green-dark',
    iconBackgroundColor : 'bg-softGreen-light',
  },
  Notr: {
    base      : themeColors.basic.six,
    textColor : 'text-six-dark',
  },
  Negative: {
    base                : themeColors.primary.dark,
    textColor           : 'text-primary-dark',
    iconBackgroundColor : 'bg-softRed-light',
  },
};

export const getIndicatorStatusByValue = (
  value?: number | string,
): IndicatorStatusEnum => {
  if (value && value > 0) {
    return IndicatorStatusEnum.POSITIVE;
  } else if (value && value < 0) {
    return IndicatorStatusEnum.NEGATIVE;
  }

  return IndicatorStatusEnum.NOTR;
};

export const getIndicatorStatusByDecision = (
  decision?: string | null,
): IndicatorStatusEnum => {
  if (decision === SignalDecisionType.BUY) {
    return IndicatorStatusEnum.POSITIVE;
  } else if (decision === SignalDecisionType.SELL) {
    return IndicatorStatusEnum.NEGATIVE;
  }

  return IndicatorStatusEnum.NOTR;
};
