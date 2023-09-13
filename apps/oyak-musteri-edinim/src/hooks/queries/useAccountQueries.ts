import { useQuery } from '@tanstack/react-query';

import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

type Contract = {
  contractId: string;
  pdfBuffer: string;
};

export type Profile = {
  addressNeighborhood: string;
  addressDistrict: string;
  cellPhone: string;
  emailAddress: string;
  occupation: string;
  address: string;
  addressCity: string;
  addressStreet: string;
  birthdate: string;
};

export type Account = {
  customerType: string;
  accountType: string;
  customerExtId: string;
};

export type BackInfo = {
  receiverBank: string;
  iban: string;
  receiverName: string;
  description: string;
};

export type AccountInfo = {
  nationalId: string;
  name: string;
  profile: Profile;
  account: Account;
  bankInfo: BackInfo;
};

const getAccountContract = async () => {
  const { data } = await InternalApi.get(Endpoints.Account.Contract);

  return {
    contractId : data.response.contractId,
    pdfBuffer  : data.response.contract.buffer,
  };
};

const getAccountInfo = async () => {
  const { data } = await InternalApi.get(Endpoints.Account.Information);

  return data;
};

const getKycType = async () => {
  const { data } = await InternalApi.get(Endpoints.Account.KycType);

  return data.response;
};

export function useAccountInfoQuery() {
  return useQuery<AccountInfo>([ 'accountInfo' ], getAccountInfo, {
    retry: 2,
  });
}

export function useAccountContractQuery() {
  return useQuery<Contract>([ 'contract' ], getAccountContract);
}

export function useKycTypeQuery() {
  return useQuery([ 'kycTypeQuery' ], getKycType);
}
