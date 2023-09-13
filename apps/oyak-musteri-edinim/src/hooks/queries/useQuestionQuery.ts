import { useQueries } from '@tanstack/react-query';

import { ResponseModel } from './response.model';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

export type Questions = {
  questionId: number;
  type: number;
  description: string;
  order: number;
};
export const QuestionTypes = {
  Security     : 10,
  Purpose      : 20,
  Amount       : 21,
  IncomeSource : 22,
  Income       : 23,
  Volume       : 24,
  Lot          : 25,
};

const getQuestions = async ({ queryKey }: { queryKey: Array<unknown> }) => {
  const [ , questionType ] = queryKey;

  const { data } = await InternalApi.get<ResponseModel<Questions[]>>(
    Endpoints.Common.Questions,
    {
      params: { questionType },
    },
  );

  return data.response.map((q) => ({
    key   : q.questionId.toString(),
    value : q.description,
  }));
};

export default function useQuestionQuery() {
  return useQueries({
    queries: Object.values(QuestionTypes).map((type) => ({
      queryKey  : [ 'questions', type ],
      queryFn   : getQuestions,
      staleTime : Infinity,
      retry     : 3,
    })),
  });
}
