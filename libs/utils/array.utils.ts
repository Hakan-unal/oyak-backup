import { DynamicType } from '@libs/models/model';

export const splitIntoChunk = (
  arr: DynamicType[],
  chunk: number,
): DynamicType[] => {
  const result: DynamicType[] = [];

  for (let i = 0; i < arr.length; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }

  return result;
};

export const sortArrayByKey = (array: DynamicType[], key: string) =>
  array.sort((a, b) => {
    const x = a[key];
    const y = b[key];

    if (x > y) {
      return 1;
    }

    if (x < y) {
      return -1;
    }

    return 0;
  });
