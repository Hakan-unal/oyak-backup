import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useQuestionQuery from '@hooks/queries/useQuestionQuery';
import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

import { FormInput } from '@components/form/FormInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import { StepperProps } from '@components/forms/stepper.model';

const REQUIRED_MESSAGE = 'general_general_requiredField_text';

const schema = yup.object().shape({
  reasonForAccount : yup.string().required(REQUIRED_MESSAGE),
  investmentAmount : yup.string().required(REQUIRED_MESSAGE),
  sourceOfIncome   : yup.string().required(REQUIRED_MESSAGE),
  avgMonthlyIncome : yup.string().required(REQUIRED_MESSAGE),
  avgMonthlyVolume : yup.string().required(REQUIRED_MESSAGE),
  avgMonthlyLot    : yup.string().required(REQUIRED_MESSAGE),
});

const IncomeForm: React.FC<StepperProps> = ({
  defaultValues,
  onSubmit,
  goBack,
}) => {
  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, defaultValues),
  );

  const submitHandler = (data: DynamicType) => {
    onSubmit?.(data);
  };

  const [
    ,
    purpose,
    investAmounts,
    incomeSource,
    monthlyIncome,
    tradingValue,
    tradingAmount,
  ] = useQuestionQuery();

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(submitHandler)}
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
          mb={{ base: 10 }}
        >
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_accountOpeningPurpose_label'
            name='reasonForAccount'
            options={purpose?.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_accountOpeningPurpose_label'
            type='select'
          />
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_investmentAmount_label'
            name='investmentAmount'
            options={investAmounts.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_investmentAmount_label'
            type='select'
          />
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_incomeSource_label'
            name='sourceOfIncome'
            options={incomeSource.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_incomeSource_label'
            type='select'
          />
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_averageMonthlyIncome_label'
            name='avgMonthlyIncome'
            options={monthlyIncome.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_averageMonthlyIncome_label'
            type='select'
          />
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_estimatedMonthlyTradingVolume_label'
            name='avgMonthlyVolume'
            options={tradingValue.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_estimatedMonthlyTradingVolume_label'
            type='select'
          />
          <FormInput
            control={control}
            label='accountOpeningRequest_requestForm_incomeInformation_estimatedMonthlyTradingAmount_label'
            name='avgMonthlyLot'
            options={tradingAmount.data || []}
            placeHolder='accountOpeningRequest_requestForm_incomeInformation_estimatedMonthlyTradingAmount_label'
            type='select'
          />
        </Grid>
        <ButtonWrapper goBack={goBack} />
      </Flex>
    </form>
  );
};

export default IncomeForm;
