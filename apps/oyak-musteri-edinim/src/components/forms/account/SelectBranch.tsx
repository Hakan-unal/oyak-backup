import { Flex, Grid } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import NotAllowedToEdit from './components/NotAllowedToEdit';
import { ResponseModel } from '@hooks/queries/response.model';
import useBranches from '@hooks/queries/useBranchQuery';
import useStatus from '@hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';

import FormSearchableSelect from '@components/form/FormSearchableSelect';
import ButtonWrapper from '@components/forms/account/ButtonWrapper';
import { StepperPropsWithoutDefaultValues } from '@components/forms/stepper.model';

const schema = object().shape({
  branch: object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .required('general_general_requiredField_text'),
});

interface Props extends StepperPropsWithoutDefaultValues {
  isEntered?: boolean;
}

const SelectBranch: React.FC<Props> = ({ goBack, onSubmit, isEntered }) => {
  const { status, refetch } = useStatus();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: DynamicType) =>
      InternalApi.post(Endpoints.Account.Branch, data).then(
        (response) => response.data,
      ),
    onSuccess() {
      refetch();
      onSubmit(null);
    },
  });

  const submitHandler = (data: DynamicType) => {
    const requestData = {
      branchCode : data.branch.value,
      nationalId : status?.nationalId,
    };

    mutate(requestData);
  };

  const { handleSubmit, control, setValue } = useForm(
    getUseFormDefaults(schema, { branch: null }),
  );

  const { options } = useBranches();

  if (status?.branch) {
    InternalApi.get<ResponseModel<DynamicType>>(Endpoints.Account.Branch, {
      params: {
        nationalId: status?.nationalId,
      },
    }).then((r) => {
      const selectedValue = options.find((x) => x.value === r.data.response);

      setValue('branch', selectedValue);
    });
  }

  if (isEntered) {
    return (
      <form autoComplete='off' onSubmit={onSubmit}>
        <NotAllowedToEdit actions={[]} />
        <ButtonWrapper hideBack />
      </form>
    );
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(submitHandler)}>
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        minH={{ base: '55vh', md: 'full' }}
        width='full'
      >
        <Grid
          columnGap={10}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          h='full'
          mb={{ base: 6 }}
          minH={250}
          mt={{ base: 0, md: 5 }}
        >
          <FormSearchableSelect
            control={control}
            label='accountOpeningSteps_selectBranch_modal_branch_label'
            name='branch'
            options={options}
            placeholder=''
          />
        </Grid>
        <ButtonWrapper hideBack goBack={goBack} isSubmitLoading={isLoading} />
      </Flex>
    </form>
  );
};

export default SelectBranch;
