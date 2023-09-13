import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { bool, object, string } from 'yup';

import ButtonWrapper from './ButtonWrapper';
import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import FormCheckBox from '@components/form/FormCheckBox';
import { FormInput } from '@components/form/FormInput';
import { FormRadioInput } from '@components/form/FormRadioInput';
import { EligibilityTestStepper } from '@components/forms/account/EligibilityTest';

const InvestmentInfoForm: React.FC<EligibilityTestStepper> = ({
  defaultValues,
  onSubmit,
  goBack,
  questions,
  isSubmitLoading,
}) => {
  const addInvestmentInfoToSchema = (schema_: DynamicType) =>
    [ 'A', 'B', 'C', 'D', 'E' ].reduce((previousValue, initial) => {
      const investmentInfoSchema: DynamicType = {};

      investmentInfoSchema[`question6_1${initial}`] = string().required(
        'general_general_requiredField_text',
      );
      investmentInfoSchema[`question6_2${initial}`] = string().required(
        'general_general_requiredField_text',
      );
      investmentInfoSchema[`question6_3${initial}`] = string().required(
        'general_general_requiredField_text',
      );

      return previousValue.concat(object().shape(investmentInfoSchema));
    }, schema_);

  let schema = object().shape({
    question4                : string().required('general_general_requiredField_text'),
    question5                : string().required('general_general_requiredField_text'),
    suitableTestConfirmation : bool()
      .required('general_general_requiredField_text')
      .oneOf([ true ], 'general_general_requiredField_text'),
  });

  schema = addInvestmentInfoToSchema(schema);

  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, defaultValues),
  );

  const getOptions = (tag: string) =>
    questions
      .find((question) => question.tag === tag)
      ?.answers.map((answer, index) => ({
        key   : `${`${index}_${answer.score}`}`,
        value : answer.description,
      }));

  const getInvestmentHistoryInputs = (initial: string) => [
    {
      name    : `question6_1${initial}`,
      options : getOptions(`Question6_1${initial}`),
      placeHolder:
        'accountOpeningSteps_suitabilityTest_modal_productInformation_label',
    },
    {
      name        : `question6_2${initial}`,
      options     : getOptions(`Question6_2${initial}`),
      placeHolder : 'accountOpeningSteps_suitabilityTest_modal_frequency_label',
    },
    {
      name    : `question6_3${initial}`,
      options : getOptions(`Question6_3${initial}`),
      placeHolder:
        'accountOpeningSteps_suitabilityTest_modal_volumeInformation_label',
    },
  ];

  const investmentTypes = [
    {
      label  : 'accountOpeningSteps_suitabilityTest_modal_veryLowRisk_text',
      inputs : getInvestmentHistoryInputs('A'),
    },
    {
      label  : 'accountOpeningSteps_suitabilityTest_modal_lowRisk_text',
      inputs : getInvestmentHistoryInputs('B'),
    },
    {
      label  : 'accountOpeningSteps_suitabilityTest_modal_mediumRisk_text',
      inputs : getInvestmentHistoryInputs('C'),
    },
    {
      label  : 'accountOpeningSteps_suitabilityTest_modal_highRisk_text',
      inputs : getInvestmentHistoryInputs('D'),
    },
    {
      label  : 'accountOpeningSteps_suitabilityTest_modal_veryHighRisk_text',
      inputs : getInvestmentHistoryInputs('E'),
    },
  ];

  const formQuestions = [
    {
      label:
        'accountOpeningSteps_suitabilityTest_modal_durationOfInvestment_subtitle',
      question: (
        <FormInput
          control={control}
          label=''
          name='question4'
          options={getOptions('Question4') || []}
          placeHolder='accountOpeningSteps_suitabilityTest_modal_preference_placeholder'
          type='select'
          width='50%'
        />
      ),
    },
    {
      label:
        'accountOpeningSteps_suitabilityTest_modal_riskAndProceedsPrefrences_subtitle',
      question: (
        <FormRadioInput
          control={control}
          label=''
          name='question5'
          options={getOptions('Question5') || []}
        />
      ),
    },
    {
      label:
        'accountOpeningSteps_suitabilityTest_modal_historyOfInvestment_subtitle',
      question: investmentTypes.map((type, index) => (
        <VStack key={index}>
          <Flex
            fontSize='14px'
            fontWeight='400'
            lineHeight='19px'
            mt='9'
            width='full'
          >
            <TranslatedText display='inline-block' label={type.label} />
          </Flex>

          <Flex
            direction='row'
            gap={{ base: 1, sm: 0 }}
            justify='space-between'
            width='full'
          >
            {type.inputs.map((input, index2) => (
              <FormInput
                control={control}
                key={index2}
                label=''
                name={input.name}
                options={input.options || []}
                placeHolder={input.placeHolder}
                type='select'
                width='31%'
              />
            ))}
          </Flex>
        </VStack>
      )),
    },
  ];

  const submitHandler = (data: DynamicType) => {
    onSubmit?.(data);
  };

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
        {formQuestions.map((question, index) => (
          <VStack align='left' key={index} mt={16}>
            <TranslatedText
              label={question.label}
              variant='body3'
              width='full'
            />

            {question.question}
          </VStack>
        ))}

        <Flex direction='row' mb={16} mt={9} w='full'>
          <FormCheckBox
            control={control}
            label='accountOpeningSteps_suitabilityTest_modal_confirmation_text'
            name='suitableTestConfirmation'
            variant='body4'
          />
        </Flex>

        <ButtonWrapper goBack={goBack} isSubmitLoading={isSubmitLoading} />
      </Flex>
    </form>
  );
};

export default InvestmentInfoForm;
