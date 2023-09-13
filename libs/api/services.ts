import {
  TeknikAnalizApi,
  TeknikBakisApi,
  TemelBakisApi,
  TemelVerilerApi,
} from '@libs/api/finnet/api';
import {
  ResearchApi,
  SentimentApi,
  SettingApi,
  SignalApi,
  TokenApi,
} from '@libs/api/oyak/api';

export const researchApi = new ResearchApi();
export const sentimentApi = new SentimentApi();
export const settingApi = new SettingApi();
export const signalApi = new SignalApi();
export const tokenApi = new TokenApi();
export const technicAnalysisApi = new TeknikAnalizApi();
export const technicOverviewApi = new TeknikBakisApi();
export const basicOverviewApi = new TemelBakisApi();
export const basicDataApi = new TemelVerilerApi();
