import {
  EquitySignalRequest,
  GraphicDataRequest,
  PairDailySignalRequest,
} from '@libs/api/oyak/api';
import { signalApi, tokenApi } from '@libs/api/services';
import {
  CustomDailyScanningGraphicsModel,
  CustomGetHourlyEquityBuySellGraphicResponseResponsePage,
  CustomHourlyEquityCumulativeReturnModel,
  CustomHourlyEquityDrawdownModel,
  CustomHourlyEquityReturnModel,
  CustomPairDailySignalsP1GraphicModel,
  CustomPairDailySignalsP2GraphicModel,
  GraphicResponseModel,
} from '@libs/models/signal-api.model';

export const getCustomerInfoHandler = () =>
  tokenApi.apiTokenGetCustomerInfoPost().then((response) => response.data?.data);

export const getHourlyEquityDecisionStatusHandler = ({ take }) =>
  signalApi
    .apiSignalGetHourlyEquityDecisionStatusPost({ status: true })
    .then((response) => response.data?.data?.list?.slice(0, take));

export const getHourlyEquityDecisionStrategyPerformanceHandler = (
  params: EquitySignalRequest,
) =>
  signalApi
    .apiSignalGetHourlyEquityDecisionStrategyPerformancePost(params)
    .then((response) => response.data?.data);

export const getPairDailySignalsHandler = (params: PairDailySignalRequest) =>
  signalApi
    .apiSignalGetPairDailySignalsPost(params)
    .then((response) => response.data?.data);

export const getPairDailySignalsP1GraphicHandler = (
  pairDailySignalId: number,
) =>
  signalApi
    .apiSignalGetPairDailySignalsP1GraphicPost({ pairDailySignalId })
    .then((response): CustomPairDailySignalsP1GraphicModel[] | undefined =>
      response.data.data?.list?.map((value) => ({
        ...value,
        time: value.date ? new Date(value.date).getTime() : 0,
      })),
    );

export const getPairDailySignalsT1GraphicHandler = (
  pairDailySignalId: number,
) =>
  signalApi
    .apiSignalGetPairDailySignalsT1GraphicPost(pairDailySignalId)
    .then((response) => response.data?.data);

export const getPairDailySignalsP2GraphicHandler = (
  pairDailySignalId: number,
) =>
  signalApi
    .apiSignalGetPairDailySignalsP2GraphicPost({ pairDailySignalId })
    .then((response): CustomPairDailySignalsP2GraphicModel[] | undefined =>
      response.data.data?.list?.map((value) => ({
        ...value,
        time: value.date ? new Date(value.date).getTime() : 0,
      })),
    );

export const getPairDailySignalsT2GraphicHandler = (
  pairDailySignalId: number,
) =>
  signalApi
    .apiSignalGetPairDailySignalsT2GraphicPost(pairDailySignalId)
    .then((response) => response.data?.data);

export const getDailyScanningSignalsHandler = (params: EquitySignalRequest) =>
  signalApi
    .apiSignalGetDailyScanningSignalsPost(params)
    .then((response) => response.data?.data);

export const getDailyScanningGraphicsHandler = (params: GraphicDataRequest) =>
  signalApi
    .apiSignalGetDailyScanningGraphicsPost(params)
    .then(
      (
        response,
      ):
        | GraphicResponseModel<CustomDailyScanningGraphicsModel>
        | undefined => ({
        lastUpdatedDate : response.data.data?.lastUpdatedDate,
        list            : response.data.data?.list?.map((value) => ({
          ...value,
          time: value.date ? new Date(value.date).getTime() : 0,
        })),
      }),
    );

export const getHourlyEquityBuySellGraphicHandler = (
  params: GraphicDataRequest,
) =>
  signalApi
    .apiSignalGetHourlyEquityBuySellGraphicPost(params)
    .then(
      (
        response,
      ):
        | CustomGetHourlyEquityBuySellGraphicResponseResponsePage
        | undefined => ({
        ...response.data,
        data: {
          lastUpdatedDate : response.data.data?.lastUpdatedDate,
          list            : response.data.data?.list?.map((value) => ({
            ...value,
            time: value.date ? new Date(value.date).getTime() : 0,
          })),
        },
      }),
    );

export const getHourlyEquitySpeedometerGraphicHandler = (symbol: string) =>
  signalApi
    .apiSignalGetHourlyEquitySpeedometerGraphicPost({ symbol, status: true })
    .then((response) => response.data?.data);

export const getHourlyEquityCumulativeReturnHandler = (symbol: string) =>
  signalApi
    .apiSignalGetHourlyEquityCumulativeReturnPost({ symbol })
    .then(
      (
        response,
      ):
        | GraphicResponseModel<CustomHourlyEquityCumulativeReturnModel>
        | undefined => ({
        lastUpdatedDate : response.data.data?.lastUpdatedDate,
        list            : response.data.data?.list?.map((value) => ({
          ...value,
          time: value.date ? new Date(value.date).getTime() : 0,
        })),
      }),
    );

export const getHourlyEquityReturnHandler = (symbol: string) =>
  signalApi
    .apiSignalGetHourlyEquityReturnPost({ symbol })
    .then(
      (
        response,
      ): GraphicResponseModel<CustomHourlyEquityReturnModel> | undefined => ({
        lastUpdatedDate : response.data.data?.lastUpdatedDate,
        list            : response.data.data?.list?.map((value) => ({
          ...value,
          time: value.date ? new Date(value.date).getTime() : 0,
        })),
      }),
    );

export const getHourlyEquityDrawdownHandler = (symbol: string) =>
  signalApi
    .apiSignalGetHourlyEquityDrawdownPost({ symbol })
    .then(
      (
        response,
      ): GraphicResponseModel<CustomHourlyEquityDrawdownModel> | undefined => ({
        lastUpdatedDate : response.data.data?.lastUpdatedDate,
        list            : response.data.data?.list?.map((value) => ({
          ...value,
          time: value.date ? new Date(value.date).getTime() : 0,
        })),
      }),
    );
