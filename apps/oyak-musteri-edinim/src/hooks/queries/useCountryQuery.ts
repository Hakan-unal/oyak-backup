import { useQuery } from '@tanstack/react-query';

import { ResponseModel } from '@hooks/queries/response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

type Country = {
  [key: string]: string;
};

const getCountries = async () => {
  const { data } = await InternalApi.get(Endpoints.Common.Counties);

  return data;
};

export default function useCountryQuery() {
  const { data } = useQuery<ResponseModel<Country>>(
    [ 'countries' ],
    getCountries,
  );

  const countries = Object.entries(data?.response || {}).map((a) => ({
    key   : a[0],
    value : a[1],
  }));

  return { countries };
}
