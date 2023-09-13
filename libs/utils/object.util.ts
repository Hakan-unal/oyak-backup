import { DynamicType } from '@libs/models/model';

export const findByText = (
  items: DynamicType[] | null | undefined,
  text: string,
): DynamicType[] | null | undefined => {
  if (!text || !items || items.length === 0) {
    return items;
  }

  const splitedText = text.split(' ');

  return items?.filter((item) =>
    Object.entries(item)?.some(([ , value ]) =>
      splitedText.every((st) =>
        value
          ?.toString()
          ?.toLocaleLowerCase()
          ?.includes(st?.toLocaleLowerCase()),
      ),
    ),
  );
};
