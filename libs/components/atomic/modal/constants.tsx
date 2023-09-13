export type ModalColorType = 'base' | 'warning' | 'error' | 'info';

export const ModalColorVariants: Record<ModalColorType, string> = {
  base    : 'text-basic-six',
  warning : 'text-orange-dark',
  error   : 'text-primary-dark',
  info    : 'text-blue-dark',
};
