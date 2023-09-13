import Image from 'next/image';

import BannerMobileImage from '@libs/assets/images/pngs/banner-mobile.jpg';
import BannerImage from '@libs/assets/images/pngs/portfoy-banner.jpeg';
import ExternalLink from '@libs/components/atomic/link/external-link';

interface Props {
  redirectUrl: string;
}

const Banner = ({ redirectUrl }: Props) => (
  <ExternalLink className='mb-6' href={redirectUrl}>
    <div className='block sm:hidden'>
      <Image
        alt='banner'
        className='rounded-md'
        height={218}
        src={BannerMobileImage.src}
        width={800}
      />
    </div>
    <div className='hidden sm:block'>
      <Image
        alt='banner'
        className='rounded-md'
        height={248}
        src={BannerImage.src}
        width={1920}
      />
    </div>
  </ExternalLink>
);

export default Banner;
