import { DynamicType } from './model';

export interface FinnetSharedRequestModel {
  base?: string;
  assetId?: string;
  shareBalanceFormat?: string;
  date?: string;
  firstDate?: string;
  accountPeriod?: string;
}

export interface FinnetSharedResponseModel {
  Baslik?: string;
  CachedTime?: string;
  Durum: boolean;
  IsCached: boolean;
  Mesaj?: string;
  TabloHesaplamaSuresi?: string;
  TabloListesi?: FinnetSharedTableListViewModel[];
}

export interface FinnetSharedTableListViewModel {
  Baslik?: string;
  BaslikListe?: FinnedSharedTableHeaderListViewModel[];
  HaberAdet?: string;
  HaberSure?: string;
  JSVeriler?: DynamicType[];
  Veriler?: DynamicType[];
  WebAd?: string;
}

export interface FinnedSharedTableHeaderListViewModel {
  Alan?: string;
  Baslik?: string;
  Goster: boolean;
  PropertyName?: string;
  TextAlign?: string;
  VeriFormat?: string;
  VeriTip?: string;
}

export interface BasicViewCommentRequestModel {
  assetId?: string;
  date?: string;
  accountPeriod?: string;
  shareBalanceFormat?: string;
  averageDate?: string;
}

export interface ShareClosingGraphDataRequestModel {
  base?: string;
  currency?: string;
  dateOrderBy?: string;
  assetId?: string;
  lastDate?: string;
  firstDate?: string;
}

export interface ShareListResponseModel {
  assetId?: string;
  shareBalanceFormat?: string;
  name?: string;
}

export interface ShareClosingGraphItemModel {
  time: number;
  closing?: string;
  perfRate?: string;
}

export interface TradingVolumeAndPriceChartItemModel {
  time: number;
  open?: number;
  close?: number;
  low?: number;
  high?: number;
  volume?: number;
  indBot?: number;
  indTop?: number;
}

export interface TechnicalIndicatorsChartModel
  extends Omit<FinnetSharedTableListViewModel, 'JSVeriler'> {
  JSVeriler?: TechnicalIndicatorsDataObjectModel[];
}

export interface TechnicalIndicatorsDataObjectModel {
  baslik?: DynamicType;
  o?: DynamicType;
  s?: TechnicalIndicatorsChartItemModel;
}

export interface TechnicalIndicatorsChartItemModel {
  DI?: string;
  DI1?: string;
  DISinyal?: string;
  DXYSinyal?: string;
  KapanisPsar?: string;
  MACD?: string;
  MACDSinyal?: string;
  MOM?: string;
  MOMOrtalama?: string;
  MOMSinyal?: string;
  RSI?: string;
  RSIOrtalama?: string;
  RSISinyal?: string;
  STOCSinyal?: string;
  StochacticsD?: string;
  StochacticsK?: string;
  _DX?: string;
  _Kapanis?: string;
  _MACDSinyalSerisi?: string;
  _ParabolicSar?: string;
}
