const AuthLayout = ({ children }) => (
  <div className='h-full xs:h-screen flex justify-center items-center bg-background-auth overflow-y-auto'>
    <div className='w-full sm:w-[1024px] flex flex-row h-full sm:h-auth justify-center items-center rounded-lg'>
      {children}
    </div>
  </div>
);

export default AuthLayout;
