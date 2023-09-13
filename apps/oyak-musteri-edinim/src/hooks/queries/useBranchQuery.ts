import { useQuery } from '@tanstack/react-query';

import { ResponseModel } from './response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

type Branch = {
  [key: string]: string;
};

const getBranches = async () => {
  const { data } = await InternalApi.get(Endpoints.Common.Branches);

  delete data.response['-1']; // delete -1:Sube seciniz

  return data;
};

export default function useBranchesQuery() {
  const { data, isLoading, isError, isFetching } = useQuery<
    ResponseModel<Branch>
  >([ 'branches' ], getBranches);

  const options = Object.entries(data?.response || {}).map((a) => ({
    value : a[0],
    label : a[1],
  }));

  return {
    options,
    isError,
    isLoading,
    isFetching,
  };
}
