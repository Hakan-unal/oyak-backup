import Link, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';

export interface ExternalLinkProps
  extends LinkProps,
    HTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

const ExternalLink = ({ children, ...rest }: ExternalLinkProps) => (
  <Link rel='noopener noreferrer' target='_blank' {...rest}>
    {children}
  </Link>
);

export default ExternalLink;
