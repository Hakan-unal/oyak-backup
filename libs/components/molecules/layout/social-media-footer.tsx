import Facebook from '@libs/assets/images/svgs/facebook.svg';
import Instagram from '@libs/assets/images/svgs/instagram.svg';
import Linkedin from '@libs/assets/images/svgs/linkedin.svg';
import Spotify from '@libs/assets/images/svgs/spotify.svg';
import Twitter from '@libs/assets/images/svgs/twitter.svg';
import Youtube from '@libs/assets/images/svgs/youtube.svg';
import ExternalLink from '@libs/components/atomic/link/external-link';

interface SocialMediaLink {
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  spotify: string;
}

interface Props {
  link: SocialMediaLink;
}

const SocialMediaFooter = ({ link }: Props) => (
  <div className='flex flex-row gap-6 sm:gap-4'>
    <ExternalLink href={link.facebook}>
      <Facebook height='20px' width='20px' />
    </ExternalLink>
    <ExternalLink href={link.twitter}>
      <Twitter height='20px' width='20px' />
    </ExternalLink>
    <ExternalLink href={link.linkedin}>
      <Linkedin height='20px' width='20px' />
    </ExternalLink>
    <ExternalLink href={link.youtube}>
      <Youtube height='20px' width='20px' />
    </ExternalLink>
    <ExternalLink href={link.instagram}>
      <Instagram height='20px' width='20px' />
    </ExternalLink>
    <ExternalLink href={link.spotify}>
      <Spotify height='20px' width='20px' />
    </ExternalLink>
  </div>
);

export default SocialMediaFooter;
