import { UrlObject } from 'url';

import Link from 'next/link';

import Button, { ButtonProps } from '@libs/components/atomic/button/button';

export interface ButtonLinkProps extends ButtonProps {
  href: string | UrlObject;
  replace?: boolean;
  prefetch?: boolean;
  isExternal?: boolean;
}

const LinkButton = ({
  href,
  replace,
  prefetch,
  isExternal,
  className,
  ...props
}: ButtonLinkProps) => (
  <Link
    className={`w-full sm:w-auto ${className}`}
    href={href}
    prefetch={prefetch}
    replace={replace}
    target={isExternal ? '_blank' : '_self'}
  >
    <Button {...props} />
  </Link>
);

export default LinkButton;
