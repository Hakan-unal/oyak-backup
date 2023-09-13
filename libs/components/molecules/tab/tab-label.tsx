import { useRouter } from 'next/router';

import Button from '@libs/components/atomic/button/button';

export interface TabLabelItemProps {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface TabLabelProps {
  items: TabLabelItemProps[];
  activeIndex?: number;
  outerClassName?: string;
  buttonClassName?: string;
  handleTabClicked?: (index: number, item: TabLabelItemProps) => void;
}

const TabLabel = ({
  items,
  activeIndex = 0,
  handleTabClicked,
  outerClassName,
  buttonClassName,
}: TabLabelProps) => {
  const { push } = useRouter();

  const handleClick = (index: number, item: TabLabelItemProps) => {
    if (item.onClick) {
      return item.onClick();
    } else if (handleTabClicked) {
      return handleTabClicked(index, item);
    }

    if (item.path) {
      push(item.path);
    }
  };

  return (
    <div
      className={`flex flex-row gap-6 ${outerClassName} overflow-x-auto no-scrollbar`}
    >
      {items.map((item, index) => (
        <Button
          buttonColor={index === activeIndex ? 'primary' : 'secondary'}
          buttonType='tabLabel'
          className={buttonClassName}
          key={item.label}
          label={item.label}
          onClick={() => handleClick(index, item)}
        />
      ))}
    </div>
  );
};

export default TabLabel;
