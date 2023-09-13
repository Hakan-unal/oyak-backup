import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

type Props = {
  defaultValues?: { [key: string]: unknown };
  onSubmit: (data: DynamicType) => void;
  schema: AnyObjectSchema;
};

export const useMeForm = ({ defaultValues, onSubmit, schema }: Props) => {
  const methods = useForm(getUseFormDefaults(schema, defaultValues));

  const Form: React.FC<{
    children: React.ReactNode;
  }> = (props) => (
    <Flex
      as={chakra.form}
      direction='column'
      height='full'
      justify='space-between'
      minH={{ base: '55vh', md: 'full' }}
      onSubmit={methods.handleSubmit(onSubmit)}
      width='full'
    >
      {props.children}
    </Flex>
  );

  return {
    Form,
    ...methods,
  };
};
