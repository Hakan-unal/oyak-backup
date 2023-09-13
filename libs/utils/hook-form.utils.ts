import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import { DynamicType } from '@libs/models/model';

export const getUseFormDefaults = (
  schema: AnyObjectSchema,
  defaultValues?: DynamicType,
): UseFormProps => ({
  mode           : 'onSubmit',
  reValidateMode : 'onChange',
  resolver       : yupResolver(schema),
  ...defaultValues,
});
