export type LoadingVariant = 'inline' | 'screen';

export const LoadingVariantClass: Record<LoadingVariant, string> = {
  inline : '',
  screen : 'fixed inset-0 bg-basic-three bg-opacity-50 transition-opacity z-50',
};
