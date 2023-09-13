/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';

import { ResponseModel } from './response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

type Occupations = {
  [key: string]: string;
};

const getOccupations = async () => {
  const { data } = await InternalApi.get(Endpoints.Common.Occupations);

  delete data.response['-1']; // delete -1 key

  return data;
};

export default function useOccupationQuery() {
  return useQuery<ResponseModel<Occupations>>([ 'occupations' ], getOccupations);
}
