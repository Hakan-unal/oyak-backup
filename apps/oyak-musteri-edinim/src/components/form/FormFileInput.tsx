import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import {
  Control,
  FieldValues,
  useController,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

type FormFileProps = {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
  name: string;
  width?: number | string;
  trigger?: UseFormTrigger<FieldValues>;
  children: ReactNode;
  accept?: string;
  isDisabled: boolean;
};

const FormFileInput: React.FC<FormFileProps> = ({
  control,
  name,
  width,
  setValue,
  trigger,
  children,
  accept,
  isDisabled = false,
}) => {
  const {
    field: { ref },
    fieldState,
  } = useController({ name, control });

  const isInvalid = !!fieldState.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    const reader = new FileReader();

    reader.onloadend = function () {
      // set value as blob object
      setValue(name, {
        buffer    : reader.result,
        extension : file?.type,
        name      : file?.name,
      });

      trigger?.(name);
    };
    reader.readAsDataURL(file || new Blob());
  };

  return (
    <FormControl
      isInvalid={isInvalid}
      width={{ base: 'full', md: width || 'full' }}
    >
      <InputGroup justifyContent='center'>
        <Input
          accept={accept}
          display='none'
          id={`fu_${name}`}
          isDisabled={isDisabled}
          name={name}
          onChange={handleChange}
          ref={ref}
          type='file'
        />
        <FormLabel htmlFor={`fu_${name}`} mr={0}>
          {children}
        </FormLabel>
      </InputGroup>
    </FormControl>
  );
};

export default FormFileInput;
