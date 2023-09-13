import { Box, Divider, Flex, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { bool, object, string } from 'yup';

import OpeningByInput from './core/OpeningByInput';
import ButtonWrapper from '../ButtonWrapper';
import useStatus from '@hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import Button from '@components/core/Button';
import FormCheckBox from '@components/form/FormCheckBox';
import { ContractModal } from '@components/modals/ContractModal';
import InfoModal from '@components/modals/InfoModal';

const REQUIRED_MESSAGE = 'general_general_requiredField_text';

type Props = {
  goBack: () => void;
  onSuccess: (result: string) => void;
};

const schema = object().shape({
  type  : string().required(REQUIRED_MESSAGE),
  repo  : bool(),
  mail  : bool(),
  info1 : bool().required(REQUIRED_MESSAGE).oneOf([ true ], REQUIRED_MESSAGE),
  info2 : bool().required(REQUIRED_MESSAGE).oneOf([ true ], REQUIRED_MESSAGE),
});

const OpeningSelectionForm: React.FC<Props> = ({ onSuccess, goBack }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { status } = useStatus();

  const { control, handleSubmit, setValue, watch } = useForm(
    getUseFormDefaults(schema, {
      type  : '',
      repo  : false,
      mail  : false,
      info1 : false,
      info2 : false,
    }),
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { [key: string]: string }) =>
      InternalApi.post('api/openAccount', {
        ...data,
        isUserCreated: status?.create,
      }).then((r) => r.data),
    onSuccess(_data, variables) {
      onSuccess(variables.type);
    },
  });

  const onSubmitHandler = (data: { [key: string]: string }) => {
    if (data.type === 'online') {
      !isOpen ? onOpen() : mutate(data);
    } else {
      mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        minH={{ base: '55vh', md: 'full' }}
        width='full'
      >
        <Flex
          align='flex-start'
          direction='column'
          h='fit-content'
          justify='start'
          mb={10}
        >
          <OpeningByInput control={control} defaultValue='' name='type' />
          <Flex direction='column' gap={4} mt={10}>
            <FormCheckBox
              control={control}
              label='accountOpeningSteps_accountOpeningProcess_modal_repo_text'
              name='repo'
            />
            <FormCheckBox
              control={control}
              label='accountOpeningSteps_accountOpeningProcess_modal_extractOfAccount_text'
              name='mail'
            />
          </Flex>
          <Divider
            borderColor='basic.300'
            borderWidth='1px'
            my={6}
            size='2xl'
            variant='dashed'
            width={{ base: 'full', sm: '400px' }}
          />
          <Flex direction='column' gap={4}>
            <FormCheckBox
              isDisabled
              actionable={
                <ContractModal
                  isModalTitleBottom
                  isApproved={watch('info1')}
                  onApprove={() => setValue('info1', true)}
                  pdfPath='./mesafeli-sozlesme.pdf'
                  title='accountOpeningSteps_accountOpeningProcess_modal_informationForm1_button'
                />
              }
              control={control}
              label=''
              name='info1'
            />
            <FormCheckBox
              isDisabled
              actionable={
                <ContractModal
                  isModalTitleBottom
                  isApproved={watch('info2')}
                  onApprove={() => setValue('info2', true)}
                  pdfPath='./bilgilendirme-seti.pdf'
                  title='accountOpeningSteps_accountOpeningProcess_modal_informationForm2_button'
                />
              }
              control={control}
              label=''
              name='info2'
            />
          </Flex>
        </Flex>
        <Box>
          <InfoModal
            actions={
              <Button
                isLoading={isLoading}
                label='general_general_okey_button'
                onClick={handleSubmit(onSubmitHandler)}
                variant='secondary'
              />
            }
            closeOnOverlayClick={false}
            isOpen={isOpen}
            message={
              'accountOpeningSteps_accountOpeningProcess_popup_onlineInterviewInformation_text'
            }
            onClose={onClose}
            title={'general_general_info_title'}
          />
        </Box>
        <ButtonWrapper goBack={goBack} isSubmitLoading={isLoading} />
      </Flex>
    </form>
  );
};

export default OpeningSelectionForm;
