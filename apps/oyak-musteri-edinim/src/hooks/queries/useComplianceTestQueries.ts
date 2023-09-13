import { useQuery } from '@tanstack/react-query';

import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

export type Answer = {
  description: string;
  score: number;
};

export type ComplianceTest = {
  mainQuestion: string;
  sideQuestion: string;
  inputType: number;
  order: number;
  tag: string;
  answers: Answer[];
};

const getComplianceTest = async () => {
  const { data } = await InternalApi.get(Endpoints.Test.ComplianceTest);

  return data.response;
};

export function useComplianceTestQueries() {
  return useQuery<ComplianceTest[]>([ 'complianceTest' ], getComplianceTest);
}
