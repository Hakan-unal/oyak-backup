/* eslint-disable max-len */
import { InputHTMLAttributes } from 'react';

import Search from '@libs/assets/images/svgs/search.svg';

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({
  type = 'text',
  name,
  className,
  ...rest
}: SearchInputProps) => (
  <div className={`h-9 ${className}`}>
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Search />
      </div>
      <input
        className='block w-full h-full pl-10 p-2 rounded-3xl border border-basic-five text-basic-four focus:outline-1 focus:outline-basic-five text-sm sm:text-base'
        name={name}
        type={type}
        {...rest}
      />
    </div>
  </div>
);

export default SearchInput;
