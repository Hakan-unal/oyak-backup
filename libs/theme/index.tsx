import { theme } from '../../tailwind.config';

import { DynamicType } from '@libs/models/model';

export const themeColors: DynamicType = theme?.extend?.colors;

export function getCurrentBreakpoints() {
  if (window === undefined) {
    return '';
  }

  return Object.entries(theme?.extend?.screens as DynamicType)
    .filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([ _, value ]) =>
        window.innerWidth >= Number(value?.toString()?.replace('px', '')),
    )
    ?.splice(-1);
}
