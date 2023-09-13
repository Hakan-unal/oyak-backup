const Drawer = ({ children }) => (
  <div className='fixed h-full w-full z-50 left-0 top-0'>
    <div className='fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 -z-1' />

    <div className='fixed h-full w-1/3 sm:w-72 right-0 top-0 bg-white shadow-lg p-4'>
      {children}
    </div>
  </div>
);

export default Drawer;
