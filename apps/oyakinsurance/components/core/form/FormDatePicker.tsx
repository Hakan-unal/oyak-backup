import { Control, Controller } from "react-hook-form";

import DatePicker from "./DatePicker";
import FieldWrapper from "./FieldWrapper";

interface FormDatePickerProps {
  error?: any;
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
