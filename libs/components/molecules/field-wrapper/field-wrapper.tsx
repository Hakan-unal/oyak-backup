import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FieldWrapperProps {
  className?: string;
  children?: ReactNode;
  error?: FieldError;
  placeholder?: string;
  name?: string;
}

const FieldWrapper: FC<FieldWrapperProps> = ({
  className,
  children,
  name,
  error,
  placeholder,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`w-full h-16 ${className}`}>
      <div className='relative float-label-input z-0'>
        {children}
        <label
          className={`absolute text-sm peer-focus:text-sm peer-placeholder-shown:text-base text-basic-five duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${
            error ? 'text-primary-dark' : 'text-basic-five'
          }`}
          htmlFor={name}
        >
          {t(placeholder || '')}
        </label>
      </div>
      {error && (
        <span className='text-xs text-primary-dark'>
          {t(error.message || '')}
        </span>
      )}
    </div>
  );
};

export default FieldWrapper;
