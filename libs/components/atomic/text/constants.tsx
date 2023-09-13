export type TextVariantType =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'small1'
  | 'small2'
  | 'small3'
  | 'header2'
  | 'title1';

export const TextVariant: Record<TextVariantType, string> = {
  body1   : 'text-sm sm:text-base font-bold',
  body2   : 'text-sm sm:text-base font-normal',
  body3   : 'text-xs sm:text-sm font-bold',
  body4   : 'text-xs sm:text-sm font-normal',
  small1  : 'text-xs font-bold',
  small2  : 'text-xs font-normal',
  small3  : 'text-xxs font-normal',
  header2 : 'text-xl font-bold',
  title1  : 'text-lg font-bold',
};
