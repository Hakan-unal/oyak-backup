import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useEffect, useState } from 'react';

import AddressForm from './AddressForm';
import ContractApproval from './ContractApproval';
import DocumentUploadsForm from './DocumentUploadsForm';
import EligibilityTest from './EligibilityTest';
import OpeningProcess from './OpeningProcess';
import SelectBranch from './SelectBranch';
import useStatus from '@hooks/useStatus';
import { resetInActiveTimeEvent } from '@utils/event.util';

import { DynamicType } from '@models/common.model';

import Button from '@components/core/Button';
import TranslatedText from '@components/core/Text';

const AccountModal = () => {
  const { status, current } = useStatus();

  const { activeStep, setStep, prevStep, nextStep } = useSteps({
    initialStep: 0,
  });

  const [ storeStepData, setStoreStepData ] = useState<DynamicType>({});

  useEffect(() => {
    setStep(Number(current));
  }, [ current ]);

  const [ isAboveMd ] = useMediaQuery('(min-width: 48em)');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const closeHandler = () => {
    setStep(Number(current));
    onClose();
  };

  const steps = [
    {
      label : 'stepper_accountOpeningSteps_modal_step1_text',
      form  : (
        <SelectBranch
          goBack={prevStep}
          isEntered={status?.branch}
          onSubmit={nextStep}
        />
      ),
    },
    {
      label : 'stepper_accountOpeningSteps_modal_step2_text',
      form  : (
        <AddressForm
          goBack={prevStep}
          onSubmit={() => {
            nextStep();
          }}
        />
      ),
    },
    {
      label : 'stepper_accountOpeningSteps_modal_step3_text',
      form  : (
        <OpeningProcess
          goBack={prevStep}
          isEntered={status?.saveSelection && status?.kycFLow}
          nextStep={nextStep}
          setStep={setStep}
        />
      ),
    },
    {
      label : 'stepper_accountOpeningSteps_modal_step4_text',
      form  : (
        <EligibilityTest
          goBack={prevStep}
          initialData={storeStepData?.eligibility}
          onSubmit={(result) => {
            setStoreStepData((prev) => ({ ...prev, eligibility: result }));
            nextStep();
          }}
        />
      ),
    },
    {
      label : 'stepper_accountOpeningSteps_modal_step5_text',
      form  : (
        <ContractApproval
          goBack={prevStep}
          isEntered={status?.contract}
          onSubmit={() => {
            nextStep();
          }}
          setStep={setStep}
        />
      ),
    },
    {
      label : 'stepper_accountOpeningSteps_modal_step6_text',
      form  : <DocumentUploadsForm activeStep={activeStep} goBack={prevStep} />,
    },
  ];

  return (
    <>
      <Button
        label={
          current && +current > 0
            ? 'general_general_continue_button'
            : 'general_general_start_button'
        }
        onClick={onOpen}
        variant='primary'
        w='160px'
      />
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeHandler}
        size={{ base: '100vh', md: '5xl' }}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius='16px'
          mb={{ base: '48', md: 'auto' }}
          mt={{ base: '8', md: 'auto' }}
          onClick={resetInActiveTimeEvent}
        >
          <ModalHeader
            borderBottom={{ base: '1px', md: '0' }}
            borderColor='basic.300'
            mt={8}
          >
            <TranslatedText
              color='basic.500'
              fontSize='22px'
              fontWeight='bold'
              label='dashboard_accountOpeningSteps_accountOpeningSteps_title'
              variant='info'
            />
          </ModalHeader>
          <ModalCloseButton mr={7} mt={8} />
          <ModalBody mb={4}>
            <Steps
              activeStep={activeStep}
              colorScheme='red'
              labelOrientation='vertical'
              mb={{ base: 9, md: 12 }}
              mt={6}
              responsive={false}
              size='sm'
            >
              {steps.map((step, index) => (
                <Step
                  fontFamily='roboto'
                  key={index}
                  label={
                    isAboveMd && (
                      <TranslatedText
                        color={activeStep >= index ? 'red' : ''}
                        label={step.label}
                      />
                    )
                  }
                >
                  <>
                    <Box
                      fontSize='16px'
                      fontWeight='bold'
                      lineHeight='20px'
                      mb={{ base: 7, md: 26 }}
                    >
                      {`${index + 1}. `}
                      <TranslatedText
                        display='inline-block'
                        label={step.label}
                      />
                    </Box>
                    {step.form}
                  </>
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length && (
              <Flex
                align='center'
                flexDirection='column'
                px={4}
                py={4}
                width='100%'
              >
                <Heading fontSize='xl' mb={6} textAlign='center'>
                  Hesap Açılış Süreci tamamlandı
                </Heading>
                <Button label='Ana Sayfaya Dön' my={2} variant='primary' />
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountModal;
