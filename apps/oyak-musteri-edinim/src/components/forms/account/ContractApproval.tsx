/* eslint-disable no-nested-ternary */
import { Center, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { bool, object } from 'yup';

import ButtonWrapper from './ButtonWrapper';
import { useAccountContractQuery } from '@hooks/queries/useAccountQueries';
import { RegisterModalSteps } from '@hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';

import { Endpoints } from '@common/endpoints';

import { useMeForm } from '@components/form/Form';
import FormCheckBox from '@components/form/FormCheckBox';
import NotAllowedToEdit from '@components/forms/account/components/NotAllowedToEdit';
import { StepperPropsWithoutDefaultValues } from '@components/forms/stepper.model';
import { ContractModal } from '@components/modals/ContractModal';

interface Props extends StepperPropsWithoutDefaultValues {
  isEntered?: boolean;
  setStep: (number: number) => void;
}

const ContractApproval: React.FC<Props> = ({
  onSubmit,
  goBack,
  setStep,
  isEntered,
}) => {
  const { data, isLoading } = useAccountContractQuery();

  const schema = object().shape({
    contractApproval: bool()
      .required('general_general_requiredField_text')
      .oneOf([ true ], 'general_general_requiredField_text'),
  });

  const { Form, control, setValue, watch } = useMeForm({
    defaultValues: {
      contractApproval: false,
    },
    onSubmit: (response) => {
      InternalApi.post(Endpoints.Account.Contract, {
        contractId: data?.contractId,
      }).then(() => {
        onSubmit(response);
      });
    },
    schema,
  });

  const approveHandler = () => {
    setValue('contractApproval', true);
  };

  return !isEntered ? (
    <Form>
      <Flex
        direction='column'
        gap={72}
        height='full'
        minH={{ base: '55vh', md: 'full' }}
        mt='4'
        width='full'
      >
        {isLoading ? (
          <Center width='full'>
            <Spinner size='lg' />
          </Center>
        ) : (
          <>
            <FormCheckBox
              isDisabled
              actionable={
                <ContractModal
                  addBase64Header
                  isModalTitleBottom
                  isApproved={watch('contractApproval')}
                  onApprove={approveHandler}
                  pdfPath={data?.pdfBuffer}
                  title='accountOpeningSteps_contractApproval_modal_onlineContractApproval_button'
                />
              }
              control={control}
              label=''
              name='contractApproval'
            />
            <ButtonWrapper goBack={goBack} />
          </>
        )}
      </Flex>
    </Form>
  ) : (
    <form onSubmit={() => setStep(RegisterModalSteps.UPLOAD_DOCUMENT)}>
      <NotAllowedToEdit
        actions={[
          {
            buttonLabel:
              'accountOpeningSteps_backProcess_popup_canUpdate_button',
            label:
              'accountOpeningSteps_backProcess_popup_adressConfirmation_text',
            onClick: () => setStep(RegisterModalSteps.ADDRESS),
          },
          {
            buttonLabel : 'accountOpeningSteps_backProcess_popup_redo_button',
            label       : 'accountOpeningSteps_backProcess_popup_suitabilityTest_text',
            onClick     : () => setStep(RegisterModalSteps.COMPLIENCE_TEST),
          },
        ]}
      />

      <ButtonWrapper goBack={goBack} />
    </form>
  );
};

export default ContractApproval;
