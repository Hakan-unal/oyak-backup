export type StatusPointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type IncreaseDecreaseType = 'increase' | 'decrease' | '';

export const SizeVariants: Record<StatusPointSize, string> = {
  sm    : 'h-[9px] w-[9px]',
  md    : 'h-[12px] w-[12px]',
  lg    : 'h-[15px] w-[15px]',
  xl    : 'h-[18px] w-[18px]',
  '2xl' : 'h-[24px] w-[24px]',
  '3xl' : 'h-[28px] w-[28px]',
  '4xl' : 'h-[32px] w-[32px]',
};
