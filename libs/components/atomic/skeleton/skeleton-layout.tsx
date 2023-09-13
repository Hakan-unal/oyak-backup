import { ReactElement, ReactNode, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { themeColors } from '@libs/theme/index';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLayoutProps {
  className?: string;
  children?: ReactNode | ReactElement;
  delay?: number;
}

const SHOW_SKELETON_DELAY = 200;

const SkeletonLayout = ({
  children,
  className,
  delay = SHOW_SKELETON_DELAY,
}: SkeletonLayoutProps) => {
  const [ isShowed, setIsShowed ] = useState(delay === 0);

  setTimeout(() => {
    setIsShowed(true);
  }, delay);

  return isShowed ? (
    <SkeletonTheme
      baseColor={themeColors.skeleton.base}
      highlightColor={themeColors.skeleton.highlight}
    >
      <div className={className}>{children}</div>
    </SkeletonTheme>
  ) : null;
};

export default SkeletonLayout;
