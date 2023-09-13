import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ResponseModel } from './queries/response.model';
import { InternalApi } from '@utils/fetch.util';

import { UserStatus } from '@models/auth.model';

export enum RegisterModalSteps {
  BRANCH = 0,
  ADDRESS = 1,
  KYC_FLOW = 2,
  COMPLIENCE_TEST = 3,
  CONTRACT = 4,
  UPLOAD_DOCUMENT = 5,
  COMPLETED = 6,
  LAST_OPEN_ACCOUNT_STEP = '6',
}

const checkStep = (status: UserStatus | undefined) => {
  if (!status?.branch) {
    return '0';
  } else if (!status.adress) {
    return '1';
  } else if (!status.kycFLow) {
    return '2';
  } else if (!status.complianceTest) {
    return '3';
  } else if (!status.contract) {
    return '4';
  } else if (!status.uploadDocuments && !status.approve) {
    return '5';
  }

  return '6';
};

export default function useStatus(enabled = true) {
  const [ current, setCurrent ] = useState<string>();
  const [ isOpenAccount, setIsOpenAccount ] = useState<boolean>();

  const { data: status, refetch } = useQuery(
    [ 'status' ],
    () =>
      InternalApi.get<ResponseModel<UserStatus>>('/api/status').then(
        (r) => r.data.response,
      ),
    {
      enabled,
    },
  );

  useEffect(() => {
    const step = checkStep(status);

    setCurrent(step);
    setIsOpenAccount(step === RegisterModalSteps.LAST_OPEN_ACCOUNT_STEP);
  }, [ status ]);

  return { status, current, refetch, isOpenAccount };
}
