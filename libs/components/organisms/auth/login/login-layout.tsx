import AuthLayout from '../auth-layout';
import LoginBanner from '@libs/assets/images/svgs/login_banner.svg';

const LoginLayout = ({ children }) => (
  <AuthLayout>
    <div className='w-[440px] hidden lg:block'>
      <LoginBanner />
    </div>
    {children}
  </AuthLayout>
);

export default LoginLayout;
