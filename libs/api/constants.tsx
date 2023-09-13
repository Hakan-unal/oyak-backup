/* eslint-disable @typescript-eslint/no-magic-numbers */
export const WhiteListPath = [ '/innovance/' ];

export const AuthorizationHeaderKey = 'Authorization';
export const AuthorizationPrefix = 'Bearer';

export const IS_COOKIE_SECURE = process.env.COOKIE_SECURE === 'true';
export const SERVICE_TIMEOUT = 60000;

export enum RetryServiceInterval {
  ONE_MINUTE = 60000,
  FIVE_MINUTE = 300000,
}

export enum SignalDecisionType {
  SELL = 'SAT',
  BUY = 'AL',
}

export enum StrategyPerformanceDecisionType {
  LOSS = 'ZARAR',
  PROFIT = 'KAR',
}

export enum PairsTradeStatusType {
  SELL = 'SATIM',
  BUY = 'ALIM',
}

export enum DailySignalBreakdownDirection {
  UP = 'YUKARI',
  DOWN = 'ASAGI',
}

export enum BISTAssetEnum {
  XU030 = 'XU030',
  XU050 = 'XU050',
  XU100 = 'XU100',
}

export enum ShareBalanceFormatEnum {
  INDUSTRY = 'Sanayi',
  BANK = 'Banka',
  INSURANCE = 'Sigorta',
}

export enum IndicatorStatusEnum {
  POSITIVE = 'Positive',
  NOTR = 'Notr',
  NEGATIVE = 'Negative',
}
