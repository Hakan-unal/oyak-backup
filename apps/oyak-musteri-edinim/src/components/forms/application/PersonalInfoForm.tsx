import { Flex, Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ButtonWrapper from './ButtonWrapper';
import CheckForm from './CheckForm';
import { StepperProps } from '../stepper.model';
import useOccupationQuery from '@hooks/queries/useOccupationQuery';
import useStatus from '@hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import { Endpoints } from '@common/endpoints';

import { FormInput } from '@components/form/FormInput';

const schema = yup.object().shape({
  occupation   : yup.string().required('general_general_requiredField_text'),
  emailAddress : yup
    .string()
    .email(
      'accountOpeningRequest_requestForm_personalInformation_email_errorMessage',
    )
    .max(
      254,
      'accountOpeningRequest_requestForm_personalInformation_emailCharacter_errorMessage',
    )
    .required('general_general_requiredField_text'),
});

const PersonalInfoForm: React.FC<StepperProps> = ({
  defaultValues,
  onSubmit,
  goBack,
}) => {
  const submit = (data: unknown) => {
    onSubmit?.(data);
  };

  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, defaultValues),
  );

  const { data: accountInfo } = useQuery(
    [ 'accountInfo' ],
    () =>
      InternalApi.get(Endpoints.Account.Information).then(
        (response) => response.data,
      ),
    {
      onError: () => null,
    },
  );

  const { status, refetch } = useStatus(accountInfo !== undefined);
  const { data: occupations } = useOccupationQuery();

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(submit)}
      style={{ height: '100%' }}
    >
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        width='full'
      >
        <Grid
          columnGap={10}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          mb='20'
        >
          {
            <CheckForm
              accountInfo={accountInfo}
              afterCheck={refetch}
              isDisabledDate={!!status?.check}
            />
          }
          <FormInput
            control={control}
            isDisabled={!status?.check}
            label='accountOpeningRequest_requestForm_personalInformation_job_label'
            name='occupation'
            options={Object.entries(occupations?.response || {}).map(
              ([ key, value ]) => ({
                key,
                value,
              }),
            )}
            placeHolder='accountOpeningRequest_requestForm_personalInformation_job_label'
            type='select'
          />
          <FormInput
            control={control}
            isDisabled={!status?.check}
            label='accountOpeningRequest_requestForm_personalInformation_email_label'
            name='emailAddress'
            type='email'
          />
        </Grid>
        <ButtonWrapper goBack={goBack} />
      </Flex>
    </form>
  );
};

export default PersonalInfoForm;
