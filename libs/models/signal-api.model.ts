import {
  DailyScanningGraphicsModel,
  GetHourlyEquityBuySellGraphicResponseResponsePage,
  HourlyEquityBuySellGraphicModel,
  HourlyEquityCumulativeReturnModel,
  HourlyEquityDrawdownModel,
  HourlyEquityReturnModel,
  PairDailySignalsP1GraphicModel,
  PairDailySignalsP2GraphicModel,
} from '@libs/api/oyak';

export interface GraphicResponseModel<T> {
  lastUpdatedDate?: string | null;
  list?: T[];
}

export interface CustomPairDailySignalsP1GraphicModel
  extends PairDailySignalsP1GraphicModel {
  time: number;
}

export interface CustomPairDailySignalsP2GraphicModel
  extends PairDailySignalsP2GraphicModel {
  time: number;
}

export interface CustomHourlyEquityBuySellGraphicModel
  extends HourlyEquityBuySellGraphicModel {
  time: number;
}

export interface CustomDailyScanningGraphicsModel
  extends DailyScanningGraphicsModel {
  time: number;
}

export interface CustomHourlyEquityCumulativeReturnModel
  extends HourlyEquityCumulativeReturnModel {
  time: number;
}

export interface CustomHourlyEquityReturnModel extends HourlyEquityReturnModel {
  time: number;
}

export interface CustomHourlyEquityDrawdownModel
  extends HourlyEquityDrawdownModel {
  time: number;
}

export interface CustomGetHourlyEquityBuySellGraphicResponseResponsePage
  extends Omit<GetHourlyEquityBuySellGraphicResponseResponsePage, 'data'> {
  data: GraphicResponseModel<CustomHourlyEquityBuySellGraphicModel>;
}
