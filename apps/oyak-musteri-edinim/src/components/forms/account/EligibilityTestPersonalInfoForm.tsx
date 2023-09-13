import { Box, Flex, Grid } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { bool, object, string } from 'yup';

import ButtonWrapper from './ButtonWrapper';
import useMukimlikVergiNoNeden from '@hooks/queries/useCommonQueries';
import useCountryQuery from '@hooks/queries/useCountryQuery';
import useStatus from '@hooks/useStatus';
import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

import FormCheckBox from '@components/form/FormCheckBox';
import { FormInput } from '@components/form/FormInput';
import { FormRadioInput } from '@components/form/FormRadioInput';
import { EligibilityTestStepper } from '@components/forms/account/EligibilityTest';

const USA_COUNTRY_CODE = 'US';

const EligibilityTestPersonalInfoForm: React.FC<EligibilityTestStepper> = ({
  onSubmit,
  questions,
  goBack,
  defaultValues,
}) => {
  const t = useTranslations();
  const { countries } = useCountryQuery();
  const [ isSubmitLoading, setIsSubmitLoading ] = useState(false);
  const { reasons } = useMukimlikVergiNoNeden();
  const { isOpenAccount } = useStatus();

  const DropdownChoose = t(
    'accountOpeningSteps_suitabilityTest_modal_select_text',
  );

  const schema = object().shape({
    hasTaxResidence : string().required('general_general_requiredField_text'),
    question1       : string().required('general_general_requiredField_text'),
    question2       : string().required('general_general_requiredField_text'),
    country         : string().when('hasTaxResidence', {
      is   : 'yes',
      then : string().required('general_general_requiredField_text'),
    }),
    hasTaxNumber : bool(),
    taxNumber    : string()
      .when([ 'hasTaxResidence', 'hasTaxNumber' ], {
        is: (hasTaxResidence: string, hasTaxNumber: boolean) =>
          hasTaxResidence === 'yes' && !hasTaxNumber,
        then: string().required('general_general_requiredField_text'),
      })
      .when([ 'hasTaxResidence', 'country' ], {
        is: (hasTaxResidence: string, country: string) =>
          hasTaxResidence === 'yes' && country === USA_COUNTRY_CODE,
        then: string().required('general_general_requiredField_text'),
      }),
    reasonForNotHaveTaxNumber: string().when('hasTaxNumber', {
      is   : true,
      then : string().required('general_general_requiredField_text'),
    }),
    declareCheckBox: bool()
      .required('general_general_requiredField_text')
      .oneOf([ true ], 'general_general_requiredField_text'),
    addressConfirmation: string().when('country', {
      is   : USA_COUNTRY_CODE,
      then : string().required('general_general_requiredField_text'),
    }),
  });

  const getOptions = (key: string) =>
    questions
      .find((question) => question.mainQuestion === key)
      ?.answers.map((answer) => ({
        key   : `${answer.score}`,
        value : answer.description,
      })) || [];

  const { handleSubmit, control, watch, clearErrors, setValue } = useForm(
    getUseFormDefaults(schema, {
      hasTaxNumber: false,
      ...defaultValues,
    }),
  );

  const country = watch('country');
  const hasTaxNumber = watch('hasTaxNumber');
  const hasTaxNumberNotInUSA = hasTaxNumber && country !== USA_COUNTRY_CODE;

  const submitHandler = (data: DynamicType) => {
    setIsSubmitLoading(true);
    onSubmit?.(data);
  };

  useEffect(() => {
    if (!defaultValues || defaultValues?.country !== country) {
      setValue('hasTaxNumber', false);
    }
  }, [ country ]);

  useEffect(() => {
    if (hasTaxNumber) {
      setValue('taxNumber', '');
      clearErrors('taxNumber');
    }
  }, [ hasTaxNumber ]);

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
        <FormRadioInput
          control={control}
          label='accountOpeningSteps_suitabilityTest_modal_question_subtitle'
          name='hasTaxResidence'
          options={[
            {
              key   : 'yes',
              value : 'accountOpeningSteps_suitabilityTest_modal_yes_text',
            },
            {
              key   : 'no',
              value : 'accountOpeningSteps_suitabilityTest_modal_no_text',
            },
          ]}
        />

        {watch('hasTaxResidence') === 'yes' && (
          <>
            <Grid
              columnGap={10}
              gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
              mb={5}
              mt='43px'
            >
              <FormInput
                control={control}
                label=''
                name='country'
                options={countries}
                placeHolder='accountOpeningSteps_suitabilityTest_modal_country_label'
                type='select'
              />
              <FormInput
                control={control}
                isDisabled={hasTaxNumberNotInUSA}
                label='accountOpeningSteps_suitabilityTest_modal_taxNumber_label'
                name='taxNumber'
                type='number'
              />

              <Box pt={8}>
                <FormCheckBox
                  control={control}
                  isDisabled={country === USA_COUNTRY_CODE}
                  label='accountOpeningSteps_suitabilityTest_modal_haveNoTaxNumber_text'
                  name='hasTaxNumber'
                />
              </Box>

              {hasTaxNumberNotInUSA && (
                <FormInput
                  control={control}
                  label=''
                  name='reasonForNotHaveTaxNumber'
                  options={reasons.filter(
                    (reason) => !reason.key.includes(DropdownChoose),
                  )}
                  placeHolder='accountOpeningSteps_suitabilityTest_modal_reason_label'
                  type='select'
                />
              )}
            </Grid>

            {country === USA_COUNTRY_CODE && (
              <Grid
                columnGap={10}
                gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                mb={5}
                mt={5}
              >
                <FormInput
                  control={control}
                  label='accountOpeningSteps_suitabilityTest_modal_adressInformation_text'
                  name='addressConfirmation'
                  type='text'
                />
              </Grid>
            )}
          </>
        )}

        <Grid
          columnGap={10}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          mb={5}
        >
          <FormInput
            control={control}
            label=''
            name='question1'
            options={getOptions('Yaşınız')}
            placeHolder='accountOpeningSteps_suitabilityTest_modal_age_label'
            type='select'
          />

          <FormInput
            control={control}
            label=''
            name='question2'
            options={getOptions('Eğitim Durumunuz')}
            placeHolder='accountOpeningSteps_suitabilityTest_modal_educationStatus_label'
            type='select'
          />
        </Grid>

        <Box mb={16}>
          <FormCheckBox
            control={control}
            label='accountOpeningSteps_suitabilityTest_modal_declare_text'
            name='declareCheckBox'
          />
        </Box>

        <ButtonWrapper
          goBack={goBack}
          hideBack={isOpenAccount}
          isSubmitLoading={isSubmitLoading}
        />
      </Flex>
    </form>
  );
};

export default EligibilityTestPersonalInfoForm;
