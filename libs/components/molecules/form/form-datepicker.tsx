import { Control, Controller, FieldError } from 'react-hook-form';

import DatePicker from '../datepicker/datepicker';
import FieldWrapper from '@libs/components/molecules/field-wrapper/field-wrapper';

interface FormDatePickerProps {
  error?: FieldError;
  name: string;
  className?: string;
  placeholder?: string;
  control: Control;
}

const FormDatePicker = ({
  name,
  control,
  error,
  placeholder,
  className,
  ...props
}: FormDatePickerProps) => (
  <FieldWrapper className={className} error={error} placeholder={placeholder}>
    <Controller
      control={control}
      name={name}
      render={({ field }) => <DatePicker {...field} {...props} />}
    />
  </FieldWrapper>
);

export default FormDatePicker;
