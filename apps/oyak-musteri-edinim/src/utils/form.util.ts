import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

export const getUseFormDefaults = (
  schema: AnyObjectSchema,
  defaultValues?: { [key: string]: unknown },
): UseFormProps => ({
  mode           : 'onChange',
  reValidateMode : 'onChange',
  resolver       : yupResolver(schema),
  defaultValues,
});
