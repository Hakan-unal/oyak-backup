import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { array, bool, number, object, string } from 'yup';

import ButtonWrapper from './ButtonWrapper';
import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

import InfoText from '@components/core/InfoText';
import TranslatedText from '@components/core/Text';
import FormCheckBox from '@components/form/FormCheckBox';
import { ComplianceTestResultModel } from '@components/forms/account/EligibilityTest';
import { StepperProps } from '@components/forms/stepper.model';
import Error from '@components/icon/Error';
import SuccessIcon from '@components/icon/Success';

export interface EligibilityTestScoreStepper extends StepperProps {
  result?: ComplianceTestResultModel;
}

const EligibilityTestScoreForm: React.FC<EligibilityTestScoreStepper> = ({
  onSubmit,
  goBack,
  result,
  defaultValues,
  isSubmitLoading,
}) => {
  const currentTime = new Date().toLocaleString('tr-TR');

  const productsAndServices = [
    {
      name  : 'accountOpeningSteps_suitabilityTest_modal_veryLowRisk_text',
      value : result?.riskLevel1,
    },
    {
      name  : 'accountOpeningSteps_suitabilityTest_modal_lowRisk_text',
      value : result?.riskLevel2,
    },
    {
      name  : 'accountOpeningSteps_suitabilityTest_modal_mediumRisk_text',
      value : result?.riskLevel3,
    },
    {
      name  : 'accountOpeningSteps_suitabilityTest_modal_highRisk_text',
      value : result?.riskLevel4,
    },
    {
      name  : 'accountOpeningSteps_suitabilityTest_modal_veryHighRisk_text',
      value : result?.riskLevel5,
    },
  ];

  const suitableProducts = productsAndServices.filter((product) => product.value);

  const schema = object().shape({
    score        : string(),
    confirmation : bool()
      .required('general_general_requiredField_text')
      .oneOf([ true ], 'general_general_requiredField_text'),
    risk        : number(),
    appliedRisk : array().of(object().shape({ confirmation: bool() })),
  });

  const initialValues = {
    score        : result?.score,
    confirmation : false,
    risk         : suitableProducts.length,
    ...defaultValues,
  };

  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, initialValues),
  );

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
        <TranslatedText
          fontSize='24px'
          label='accountOpeningSteps_suitabilityTest_modal_score_label'
          width='full'
        />
        <TranslatedText
          fontSize='24px'
          label={`${result?.score}`}
          mb={7}
          variant='body1'
          width='full'
        />

        <InfoText label='accountOpeningSteps_suitabilityTest_modal_scoreInfo_text' />

        <TableContainer>
          <Table variant='striped'>
            <Tbody>
              <Tr>
                <Td
                  borderBottom={0}
                  borderRadius='8px 0 0 8px'
                  pl={10}
                  py={6}
                  width='70%'
                >
                  <TranslatedText
                    label='accountOpeningSteps_suitabilityTest_modal_productsAndServices_subtitle'
                    variant='body3'
                  />
                </Td>
                <Td
                  borderBottom={0}
                  borderRadius='0 8px 8px 0'
                  py={6}
                  width='30%'
                >
                  <TranslatedText
                    label='accountOpeningSteps_suitabilityTest_modal_suitabilityStatus_subtitle'
                    variant='body3'
                  />
                </Td>
                <Td
                  borderBottom={0}
                  borderRadius='0 8px 8px 0'
                  py={6}
                  width='30%'
                >
                  <TranslatedText
                    label='accountOpeningSteps_suitabilityTest_modal_customerDemand_subtitle'
                    variant='body3'
                  />
                </Td>
              </Tr>
              {productsAndServices.map((product, index) => (
                <Tr key={index}>
                  <Td
                    borderBottom={0}
                    borderRadius='8px 0 0 8px'
                    pl={10}
                    py={6}
                    width='70%'
                  >
                    <Flex fontSize='14px' lineHeight='19px'>
                      <TranslatedText
                        label={product.name}
                        whiteSpace='normal'
                      />
                    </Flex>
                  </Td>
                  <Td borderBottom={0} borderRadius='0 8px 8px 0' width='30%'>
                    {product.value ? (
                      <Flex>
                        <SuccessIcon boxSize={5} fill='green' />
                        <TranslatedText
                          color='green'
                          label='accountOpeningSteps_suitabilityTest_modal_available_text'
                          ml={2}
                        />
                      </Flex>
                    ) : (
                      <Flex>
                        <Error boxSize={5} fill='basic.300' />
                        <TranslatedText
                          color='basic.300'
                          label='accountOpeningSteps_suitabilityTest_modal_notAvailable_text'
                          ml={2}
                        />
                      </Flex>
                    )}
                  </Td>
                  <Td
                    borderBottom={0}
                    borderRadius='8px 0 0 8px'
                    pl={10}
                    py={6}
                    width='70%'
                  >
                    <Flex fontSize='14px' lineHeight='19px'>
                      <FormCheckBox
                        control={control}
                        defaultValue={product.value ? true : false}
                        isDisabled={product.value ? true : false}
                        label=''
                        name={`appliedRisk[${index}].confirmation`}
                        variant='body4'
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <VStack gap={6} mb='43px'>
          <InfoText label='accountOpeningSteps_suitabilityTest_modal_info2_text' />
          <InfoText label='accountOpeningSteps_suitabilityTest_modal_info3_text' />

          <FormCheckBox
            control={control}
            label='accountOpeningSteps_suitabilityTest_modal_confirmation_text'
            name='confirmation'
          />
        </VStack>

        <Box mb='63px'>
          <InfoText
            label='accountOpeningSteps_suitabilityTest_modal_info4_text'
            options={{ date: currentTime }}
          />
        </Box>

        <ButtonWrapper goBack={goBack} isSubmitLoading={isSubmitLoading} />
      </Flex>
    </form>
  );
};

export default EligibilityTestScoreForm;
