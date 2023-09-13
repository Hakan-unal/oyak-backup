import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

import SidebarItem, { SidebarItemProps } from './sidebar-item';

export interface SidebarLinkItemProps
  extends LinkProps,
    Omit<SidebarItemProps, 'isActive'> {
  exact?: boolean;
}

const SidebarLinkItem = ({
  title,
  href,
  Icon,
  exact,
  className,
  includeStroke,
  ...props
}: SidebarLinkItemProps) => {
  const { pathname } = useRouter();

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href.toString());

  return (
    <Link href={href} {...props}>
      <SidebarItem
        Icon={Icon}
        className={className}
        includeStroke={includeStroke}
        isActive={isActive}
        title={title}
      />
    </Link>
  );
};

export default SidebarLinkItem;
