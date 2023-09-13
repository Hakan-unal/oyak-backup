// TODO(anyone): Check loc.key
import Link from 'next/link';

import Button from '@libs/components/atomic/button/button';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import NotFound404Mobile from 'prac-portfolio/public/images/svgs/404-mobile.svg';
import NotFound404 from 'prac-portfolio/public/images/svgs/404.svg';
import paths from 'prac-portfolio/routes/internal-paths';

const NotFound = () => (
  <div className='flex flex-col justify-center items-center'>
    <span className='block md:hidden mt-12'>
      <NotFound404Mobile />
    </span>
    <span className='hidden md:block mt-20'>
      <NotFound404 />
    </span>

    <TranslatedText
      className='font-bold text-2xl text-basic-six mb-8'
      label='general_general_404Error_text'
    />
    <Link href={paths.ROOT}>
      <Button
        className='w-44'
        label='general_general_404Error_button'
        type='submit'
      />
    </Link>
  </div>
);

export default NotFound;
