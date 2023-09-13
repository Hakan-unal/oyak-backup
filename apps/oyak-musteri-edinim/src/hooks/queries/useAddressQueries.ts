import { useQuery } from '@tanstack/react-query';

import { ResponseModel } from './response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';

export type AddressItem = {
  ad: string;
  kod: number;
};
export const QuestionTypes = {
  Security     : 10,
  Purpose      : 20,
  Amount       : 21,
  IncomeSource : 22,
  Income       : 23,
  Volume       : 24,
  Question7    : 25,
};

const getCities = async () => {
  const { data } = await InternalApi.get<
    ResponseModel<{ cityList: AddressItem[] }>
  >(Endpoints.Address.Cities);

  return data.response.cityList.map((q) => ({
    value : q.kod.toString(),
    label : q.ad,
  }));
};

const getDistrict = async ({ queryKey }: DynamicType) => {
  const [ , cityCode ] = queryKey;

  const { data } = await InternalApi.post<
    ResponseModel<{ districtList: AddressItem[] }>
  >(Endpoints.Address.Districts, null, {
    params: {
      cityCode,
    },
  });

  return data.response.districtList.map((q) => ({
    value : q.kod.toString(),
    label : q.ad,
  }));
};

const getNeighborhood = async ({ queryKey }: DynamicType) => {
  const [ , districtCode ] = queryKey;

  const { data } = await InternalApi.post<
    ResponseModel<{ neighborhoodList: AddressItem[] }>
  >(Endpoints.Address.Neighborhoods, null, {
    params: {
      districtCode,
    },
  });

  return data.response.neighborhoodList.map((q) => ({
    value : q.kod.toString(),
    label : q.ad,
  }));
};

const getStreet = async ({ queryKey }: DynamicType) => {
  const [ , neighborhoodCode ] = queryKey;

  const { data } = await InternalApi.post<
    ResponseModel<{ cbsmList: AddressItem[] }>
  >(Endpoints.Address.Streets, null, {
    params: {
      neighborhoodCode,
    },
  });

  return data.response.cbsmList.map((q) => ({
    value : q.kod.toString(),
    label : q.ad,
  }));
};

type Apartment = {
  ada: string;
  binaNo: string;
  blokAdi: string;
  csbmKodu: number;
  disKapiNo: string;
  esBinaKimlikNo: string;
  esBinaKodu: string;
  hataBilgisi: string;
  kod: number;
  parsel: string;
  siteAdi: string;
};

const getApartments = async ({ queryKey }: DynamicType) => {
  const [ , streetCode ] = queryKey;

  const { data } = await InternalApi.post<
    ResponseModel<{ apartmentList: Apartment[] }>
  >(Endpoints.Address.Apartments, null, {
    params: {
      streetCode,
    },
  });

  return data.response.apartmentList.map((q) => ({
    value : q.kod.toString(),
    label : q.blokAdi,
  }));
};

type Flat = {
  adresNo: number;
  binaKodu: number;
  hataBilgisi: string | null;
  icKapiNo: string;
  katNo: number;
  kod: number;
  tip: string | null;
  tur: string | null;
};

const getFlats = async ({ queryKey }: DynamicType) => {
  const [ , apartmentCode ] = queryKey;

  const { data } = await InternalApi.post<ResponseModel<{ flatList: Flat[] }>>(
    Endpoints.Address.Flats,
    null,
    {
      params: {
        apartmentCode,
      },
    },
  );

  return data.response.flatList.map((q) => ({
    value : q.adresNo.toString(),
    label : q.icKapiNo,
  }));
};

export function useCityQuery() {
  return useQuery([ 'cities' ], getCities);
}

export function useDistrictQuery(cityCode?: string) {
  return useQuery([ 'district', cityCode ], getDistrict, { enabled: !!cityCode });
}
export function useNeighborQuery(districtCode?: string) {
  return useQuery([ 'neightborhood', districtCode ], getNeighborhood, {
    enabled: !!districtCode,
  });
}
export function useStreetQuery(neighbourhoodCode?: string) {
  return useQuery([ 'street', neighbourhoodCode ], getStreet, {
    enabled: !!neighbourhoodCode,
  });
}
export function useApartmentQuery(streetCode?: string) {
  return useQuery([ 'apartment', streetCode ], getApartments, {
    enabled: !!streetCode && streetCode !== 'null',
  });
}
export function useFlatQuery(apartmentCode?: string) {
  return useQuery([ 'flat', apartmentCode ], getFlats, {
    enabled: !!apartmentCode && apartmentCode !== 'null',
  });
}
