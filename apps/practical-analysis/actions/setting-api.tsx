import { InstrumentAnalyzeRequest } from '@libs/api/oyak/api';
import { settingApi } from '@libs/api/services';

export const getInstrumentAnalyzeHandler = (
  params?: InstrumentAnalyzeRequest,
) =>
  settingApi
    .apiSettingGetInstrumentAnalyzePost(params)
    .then((response) => response.data?.data?.list);

export const getModelPortfolioAnalyzeHandler = (symbol?: string) =>
  settingApi
    .apiSettingGetModelPortfolioAnalyzePost(symbol)
    .then((response) => response.data?.data?.list);
