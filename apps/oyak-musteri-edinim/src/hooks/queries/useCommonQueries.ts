import { useQuery } from '@tanstack/react-query';

import { ResponseModel } from '@hooks/queries/response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

type Reason = {
  [key: string]: string;
};

const getMukimlikVergiNoNeden = async () => {
  const { data } = await InternalApi.get(
    Endpoints.Common.GetMukimlikVergiNoNeden,
  );

  return data;
};

export default function useMukimlikVergiNoNeden() {
  const { data } = useQuery<ResponseModel<Reason>>(
    [ 'mukimlikVergiNoNeden' ],
    getMukimlikVergiNoNeden,
  );

  const reasons = Object.entries(data?.response || {}).map((a) => ({
    key   : a[0],
    value : a[1],
  }));

  return { reasons };
}
