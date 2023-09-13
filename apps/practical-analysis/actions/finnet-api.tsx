import { ShareBalanceFormatEnum } from '@libs/api/constants';
import {
  basicDataApi,
  basicOverviewApi,
  technicAnalysisApi,
  technicOverviewApi,
} from '@libs/api/services';
import {
  BasicViewCommentRequestModel,
  FinnetSharedRequestModel,
  FinnetSharedResponseModel,
  FinnetSharedTableListViewModel,
  ShareClosingGraphDataRequestModel,
  ShareClosingGraphItemModel,
  ShareListResponseModel,
  TechnicalIndicatorsChartModel,
  TradingVolumeAndPriceChartItemModel,
} from '@libs/models/finnet';
import { DynamicType } from '@libs/models/model';

export const getTradingVolumeAndPriceChartHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicAnalysisApi
    .islemHacmiVeFiyatGrafikPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then((response): TradingVolumeAndPriceChartItemModel[] | undefined =>
      (response.data as DynamicType)?.TabloListesi?.[0]?.JSVeriler?.map(
        (value): TradingVolumeAndPriceChartItemModel => ({
          time   : value.o?.Tarih ? new Date(value.o?.Tarih).getTime() : 0,
          open   : value.o?.Acilis,
          close  : value.o?.Kapanis,
          low    : value.o?.Dusuk,
          high   : value.o?.Yuksek,
          volume : value.o?.Hacim,
          indBot : value.o?.p1,
          indTop : value.o?.p2,
        }),
      ),
    );

export const getSupportResistanceLevelTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicOverviewApi
    .destekDirencSeviyesiTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getTechnicalIndicatorsChartHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicOverviewApi
    .teknikGostergelerTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): TechnicalIndicatorsChartModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getTechnicalIndicatorsCommentHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicOverviewApi
    .teknikGostergelerYorumuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then((response) => response.data);

export const getPriceChangesChartHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicOverviewApi
    .fiyatDegisimleriTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getMovingAverageAnalysisChartHandler = (
  params?: FinnetSharedRequestModel,
) =>
  technicOverviewApi
    .hareketliOrtalamaAnaliziTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getShareListHandler = () =>
  basicOverviewApi
    .hisseListesiGet()
    .then((response): ShareListResponseModel[] =>
      (response.data as DynamicType)?.map((share) => ({
        assetId            : share.Value,
        shareBalanceFormat : share.HisseBilancoFormat,
        name               : share.Text,
      })),
    );

export const getShareTermListHandler = (assetId?: string) =>
  basicOverviewApi
    .hisseDonemListesiGet(assetId)
    .then((response) => response.data);

export const getBasicViewCommentHandler = (
  params?: BasicViewCommentRequestModel,
) =>
  basicOverviewApi
    .temelBakisYorumuPost(
      params?.assetId,
      params?.date,
      params?.accountPeriod,
      params?.shareBalanceFormat,
      params?.averageDate,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getValuationFactorTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicOverviewApi
    .degerlemeCarpanlariTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then((response): FinnetSharedTableListViewModel | undefined => {
      const result = (
        response.data as unknown as FinnetSharedResponseModel | undefined
      )?.TabloListesi?.[0];

      if (
        params?.shareBalanceFormat === ShareBalanceFormatEnum.BANK ||
        params?.shareBalanceFormat === ShareBalanceFormatEnum.INSURANCE
      ) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return { ...result, JSVeriler: result?.JSVeriler?.slice(0, 2) };
      }

      return result;
    });

export const getShareClosingGraphDataHandler = (
  params?: ShareClosingGraphDataRequestModel,
) =>
  basicOverviewApi
    .hisseKapanisGrafikVeriPost(
      params?.base,
      params?.currency,
      params?.dateOrderBy,
      params?.assetId,
      params?.lastDate,
      params?.firstDate,
    )
    .then((response): ShareClosingGraphItemModel[] | undefined => {
      const data: DynamicType = response.data;

      const closingResult: FinnetSharedResponseModel | undefined = JSON.parse(
        data?.kapanis || '',
      );

      const performanceRateTableItem = JSON.parse(data?.relPerfYuzed || '');
      const closingTableItem = closingResult?.TabloListesi?.[0];

      return closingTableItem?.JSVeriler?.map((closingRow, index) => ({
        time     : new Date(closingRow?.s?._Tarih).getTime(),
        closing  : closingRow?.o?._Kapanis,
        perfRate : performanceRateTableItem?.JSVeriler?.[index]?.o?._Kapanis,
      }));
    });

export const getShareSummaryTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .hisseOzetiTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getSharePerformanceChartHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .hissePerformansiTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getProfitabilityRatioTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .karlilikOraniTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then((response): FinnetSharedTableListViewModel => {
      const data: DynamicType = response.data;

      const quarterResult: FinnetSharedResponseModel | undefined = JSON.parse(
        data?.ceyrekResult || '',
      );

      const cumulativeResult: FinnetSharedResponseModel | undefined =
        JSON.parse(data?.kumulatifResult || '');

      const cumulativeTableItem = cumulativeResult?.TabloListesi?.[0];

      const result: FinnetSharedTableListViewModel | undefined =
        quarterResult?.TabloListesi?.[0];

      return {
        Baslik      : result?.Baslik,
        BaslikListe : result?.BaslikListe?.reverse()?.concat(
          cumulativeTableItem?.BaslikListe?.reverse() || [],
        ),
        JSVeriler: result?.JSVeriler?.map((quarterRow) => ({
          ...quarterRow.s,
          ...cumulativeTableItem?.JSVeriler?.find(
            (cumulativeRow) => cumulativeRow?.s?.Baslik === quarterRow?.s?.Baslik,
          )?.s,
        })),
      };
    });

export const getDividendInformationTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .temettuBilgileriTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );

export const getSummaryFinancialsTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .ozetFinansallarTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then((response): FinnetSharedTableListViewModel => {
      const data: DynamicType = response.data;

      const quarterResult: FinnetSharedResponseModel | undefined = JSON.parse(
        data?.ceyrekResult || '',
      );

      const cumulativeResult: FinnetSharedResponseModel | undefined =
        JSON.parse(data?.kumulatifResult || '');

      const cumulativeTableItem = cumulativeResult?.TabloListesi?.[0];

      const result: FinnetSharedTableListViewModel | undefined =
        quarterResult?.TabloListesi?.[0];

      return {
        Baslik      : result?.Baslik,
        BaslikListe : result?.BaslikListe?.reverse()?.concat(
          cumulativeTableItem?.BaslikListe?.reverse() || [],
        ),
        JSVeriler: result?.JSVeriler?.map((quarterRow) => ({
          ...quarterRow.s,
          ...cumulativeTableItem?.JSVeriler?.find(
            (cumulativeRow) => cumulativeRow?.s?.Baslik === quarterRow?.s?.Baslik,
          )?.s,
        })),
      };
    });

export const getIndebtednessInformationTableHandler = (
  params?: FinnetSharedRequestModel,
) =>
  basicDataApi
    .borclulukBilgileriTablosuPost(
      params?.base,
      params?.assetId,
      params?.shareBalanceFormat,
      params?.date,
      params?.firstDate,
      params?.accountPeriod,
    )
    .then(
      (response): FinnetSharedTableListViewModel | undefined =>
        (response.data as unknown as FinnetSharedResponseModel | undefined)
          ?.TabloListesi?.[0],
    );
