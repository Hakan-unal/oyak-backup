import BrandLogo from '@libs/assets/images/svgs/brand-logo.svg';
import LinkButton from '@libs/components/molecules/button/button-link';
import SocialMediaFooter from '@libs/components/molecules/layout/social-media-footer';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import externalPaths from 'prac-analysis/routes/external-paths';

const Footer = () => (
  <div className='flex flex-col md:flex-row justify-between items-center mx-0 sm:mx-12 my-10 gap-6 sm:gap-0'>
    <div className='flex flex-col xl:flex-row items-center mr-2'>
      <BrandLogo className='mr-2 mb-4 md:mb-0' height={12} width={115} />
      <div className='flex flex-col md:flex-row gap-0 md:gap-0.5'>
        <TranslatedText
          className='text-xs lg:text-base text-center'
          label='dashboard_footer_rights_text'
          textColor='text-basic-six'
          values={{ year: new Date().getFullYear() }}
        />
        <TranslatedText
          className='text-xs lg:text-base text-center'
          label='dashboard_footer_rights2_text'
          textColor='text-basic-six'
        />
      </div>
    </div>
    <div className='flex flex-row mr-2'>
      <LinkButton
        isExternal
        buttonType='colorless'
        className='text-basic-six mr-8 text-xs md:text-base whitespace-nowrap'
        href={externalPaths.KVKK}
        label='dashboard_footer_kvkk_button'
      />
      <LinkButton
        isExternal
        buttonType='colorless'
        className='text-basic-six text-xs md:text-base whitespace-nowrap'
        href={externalPaths.CONTACT_US}
        label='dashboard_footer_contactUs_button'
      />
    </div>
    <SocialMediaFooter
      link={{
        facebook  : externalPaths.FACEBOOK,
        twitter   : externalPaths.TWITTER,
        linkedin  : externalPaths.LINKEDIN,
        youtube   : externalPaths.YOUTUBE,
        instagram : externalPaths.INSTAGRAM,
        spotify   : externalPaths.SPOTIFY,
      }}
    />
  </div>
);

export default Footer;
