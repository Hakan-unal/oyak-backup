/* eslint-disable max-len */
import { InputHTMLAttributes } from 'react';

const Input = ({
  type,
  name,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    autoComplete='off'
    className='block py-1.5 px-0 w-full text-base font-bold bg-transparent rounded-none border-0 border-b-2 border-basic-four appearance-none focus:outline-none focus:ring-0 peer'
    name={name}
    placeholder=' '
    type={type}
    {...props}
  />
);

export default Input;
