import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import TabLabel from './tab-label';
import Loading from '../loading/loading';

export const ActiveIndexQueryKey = 'activeIndex';
export interface TabViewItemProps {
  label: string;
  component: ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

interface TabLabelProps {
  tabs: TabViewItemProps[];
  activeIndex?: number;
  showBottomLine?: boolean;
  tabLabelOuterClassName?: string;
  tabLabelButtonClassName?: string;
  outerClassName?: string;
  onTabChange?: (index: number, item: TabViewItemProps) => void;
}

const TabView = ({
  tabs,
  activeIndex: defaultIndex,
  showBottomLine = false,
  tabLabelOuterClassName,
  tabLabelButtonClassName,
  outerClassName,
  onTabChange,
}: TabLabelProps) => {
  const { replace, pathname, query } = useRouter();
  const [ activeIndex, setActiveIndex ] = useState<number>(defaultIndex || 0);

  useEffect(() => {
    const queryActiveIndex = query?.[ActiveIndexQueryKey] as number | undefined;

    if (queryActiveIndex && queryActiveIndex !== activeIndex) {
      setActiveIndex(Number(queryActiveIndex));
    }
  }, [ activeIndex, query ]);

  const handleClick = (index: number) => {
    const item: TabViewItemProps = tabs[index];

    if (item.onClick) {
      return item.onClick();
    }

    onTabChange?.(index, item);
    replace({ pathname, query: { ...query, [ActiveIndexQueryKey]: index } });
  };

  return (
    <>
      <TabLabel
        activeIndex={activeIndex}
        buttonClassName={tabLabelButtonClassName}
        handleTabClicked={handleClick}
        items={tabs?.map((tab) => ({ label: tab.label }))}
        outerClassName={tabLabelOuterClassName}
      />
      {showBottomLine && <div className='border border-basic-two' />}
      {tabs[activeIndex].isLoading ? (
        <Loading />
      ) : (
        <div className={outerClassName}>{tabs[activeIndex].component}</div>
      )}
    </>
  );
};

export default TabView;
