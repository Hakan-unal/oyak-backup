/* eslint-disable @typescript-eslint/no-magic-numbers */
export interface SidebarItemProps {
  title: string;
  isActive: boolean;
  Icon?;
  exact?: boolean;
  className?: string;
  includeStroke?: boolean;
}

const SidebarItem = ({
  title,
  isActive,
  Icon,
  className,
  includeStroke = false,
}: SidebarItemProps) => {
  const fontWeight = isActive ? 'font-bold' : 'font-normal';

  return (
    <div
      className={`flex items-center justify-start mb-4 sm:mb-0 ${
        isActive ? 'text-primary-dark' : 'text-basic-six'
      } ${fontWeight} ${className}`}
    >
      {Icon && (
        <div className='h-[24px] w-[24px] mr-4'>
          <Icon
            className={`mr-4 ${
              isActive
                ? 'stroke-primary-dark fill-primary-dark'
                : 'stroke-basic-six fill-basic-six'
            }`}
            height='24px'
            strokeWidth={includeStroke ? 2 : 0}
            width='24px'
          />
        </div>
      )}
      <span>{title}</span>
    </div>
  );
};

export default SidebarItem;
