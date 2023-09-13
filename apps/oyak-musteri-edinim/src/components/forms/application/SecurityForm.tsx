import { Box, Flex, Grid, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useQuestionQuery from '@hooks/queries/useQuestionQuery';
import { getUseFormDefaults } from '@utils/form.util';

import { DynamicType } from '@models/common.model';

import Button from '@components/core/Button';
import FormCheckBox from '@components/form/FormCheckBox';
import { FormInput } from '@components/form/FormInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import { StepperProps } from '@components/forms/stepper.model';
import InfoModal from '@components/modals/InfoModal';

const REQUIRED_MESSAGE = 'general_general_requiredField_text';

const schema = yup.object().shape({
  question               : yup.string().required(REQUIRED_MESSAGE),
  securityQuestionAnswer : yup
    .string()
    .required(REQUIRED_MESSAGE)
    .max(
      50,
      'accountOpeningRequest_sequrityStep_securityQuestion_errorMessage',
    ),
  iysSms        : yup.boolean(),
  iysCallCenter : yup.boolean(),
  iysEmail      : yup.boolean(),
});

const SecurityForm: React.FC<StepperProps> = ({
  onSubmit,
  goBack,
  isSubmitLoading,
}) => {
  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, {
      question               : '',
      securityQuestionAnswer : '',
      iysSms                 : false,
      iysCallCenter          : false,
      iysEmail               : false,
    }),
  );

  const [ confirm, setConfirm ] = useState<boolean>(false);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();

  const submitHandler = (data: DynamicType) => {
    if (!data.iysSms && !data.iysCallCenter && !data.iysEmail) {
      if (!confirm) {
        onOpen();
      } else {
        onSubmit?.(data);
      }
    } else {
      onSubmit?.(data);
    }
  };

  const [ question ] = useQuestionQuery();

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
        <Box>
          <Grid
            columnGap={10}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
            mb={8}
          >
            <FormInput
              control={control}
              label='accountOpeningRequest_requestForm_preference_securityQuestion_label'
              name='question'
              options={question.data || []}
              placeHolder='accountOpeningRequest_requestForm_preference_securityQuestion_label'
              type='select'
            />
            <FormInput
              control={control}
              label='accountOpeningRequest_requestForm_preference_securityAnswer_label'
              name='securityQuestionAnswer'
              type='text'
            />
          </Grid>
          <VStack>
            <FormCheckBox
              control={control}
              defaultValue={false}
              label='accountOpeningRequest_requestForm_preference_smsInformation_text'
              name='iysSms'
            />
            <FormCheckBox
              control={control}
              defaultValue={false}
              label='accountOpeningRequest_requestForm_preference_callCenterInformation_text'
              name='iysCallCenter'
            />
            <FormCheckBox
              control={control}
              defaultValue={false}
              label='accountOpeningRequest_requestForm_preference_emailInformation_text'
              name='iysEmail'
            />
          </VStack>
        </Box>
        <ButtonWrapper goBack={goBack} />
        <InfoModal
          actions={
            <Box w='full'>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Flex justify='space-between'>
                  <Button
                    label='general_general_back_button'
                    mr={4}
                    onClick={onCloseModal}
                    variant='secondary'
                  />
                  <Button
                    isLoading={isSubmitLoading}
                    label='general_general_continue_button'
                    onClick={() => setConfirm(true)}
                    type='submit'
                    variant='primary'
                  />
                </Flex>
              </form>
            </Box>
          }
          closeOnOverlayClick={true}
          isOpen={isOpen}
          message='accountOpeningRequest_requestForm_preference_popup_text'
          onClose={onCloseModal}
          title='general_general_warning_title'
          type='warning'
        />
      </Flex>
    </form>
  );
};

export default SecurityForm;
