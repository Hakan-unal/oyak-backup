import { Box, Flex, Grid, HStack, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import ButtonWrapper from '../../ButtonWrapper';
import { useAccountInfoQuery } from '@hooks/queries/useAccountQueries';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';

import Button from '@components/core/Button';
import InfoText from '@components/core/InfoText';
import TranslatedText from '@components/core/Text';
import { FormInput } from '@components/form/FormInput';
import FullAddressInputs from '@components/forms/account/components/core/FullAddressInputs';
import InfoModal from '@components/modals/InfoModal';

const schema = object().shape({
  address : string().required('general_general_requiredField_text'),
  city    : object().when('address', {
    is   : '2',
    then : object()
      .shape({
        label : string(),
        value : string(),
      })
      .nullable()
      .required('general_general_requiredField_text'),
    otherwise: object().nullable(),
  }),
  district: object().when('address', {
    is   : '2',
    then : object()
      .shape({
        label : string(),
        value : string(),
      })
      .nullable()
      .required('general_general_requiredField_text'),
    otherwise: object().nullable(),
  }),
  fullAddress: string().when('address', {
    is        : '2',
    then      : string().required('general_general_requiredField_text'),
    otherwise : string().nullable(),
  }),
});

type Props = {
  clearSelection: () => void;
};

const CourierResult = ({ clearSelection }: Props) => {
  const [ isAddressEntered, setIsAddressEntered ] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { data } = useAccountInfoQuery();

  const onSubmit = (formResponses: DynamicType) => {
    const addressDetail = {
      city     : +formResponses?.city?.value,
      district : formResponses?.district?.value,
      address  : formResponses?.fullAddress,
    };

    if (formResponses.address === '1') {
      addressDetail.city = data?.profile?.addressCity as unknown as number;
      addressDetail.address = data?.profile?.address;
    }

    mutate(addressDetail);
  };

  const { handleSubmit, control, watch, setValue, clearErrors } = useForm(
    getUseFormDefaults(schema, {
      address     : '',
      fullAddress : '',
      city        : null,
      district    : null,
    }),
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { [key: string]: DynamicType }) =>
      InternalApi.post(Endpoints.Account.CourierAddress, {
        ...data,
      }).then((r) => r.data),
    onSuccess() {
      setIsAddressEntered(true);
    },
  });

  const finishStepHandler = () => {
    onOpen();
  };

  if (watch('address') === '1') {
    clearErrors([ 'district', 'city', 'fullAddress' ]);
  }

  const nextStep = (
    <Flex
      direction='column'
      height='full'
      justify='space-between'
      minH={{ base: '55vh', md: 'full' }}
    >
      <Box>
        <Box h={6}>
          <InfoModal
            actions={
              <Button
                label='general_general_okey_button'
                onClick={onClose}
                variant='secondary'
              />
            }
            closeOnOverlayClick={false}
            isOpen={isOpen}
            message='accountOpeningSteps_accountOpeningProcess_modal_explanation_text'
            onClose={onClose}
            title='general_general_error_title'
          />
        </Box>
        <InfoText label='accountOpeningSteps_accountOpeningProcess_modal_courierInformation_text' />

        <HStack mt={8}>
          <TranslatedText label='accountOpeningSteps_accountOpeningProcess_modal_changeCourierInformation_text' />
          <TranslatedText
            color='primary.base'
            cursor='pointer'
            label='general_general_click_button'
            onClick={clearSelection}
          />
        </HStack>
      </Box>

      <Flex direction='row' gap={4} justify='end' w='full'>
        <Button
          label='general_general_back_button'
          onClick={clearSelection}
          variant='secondary'
        />
        <Button
          alignSelf='end'
          label='general_general_continue_button'
          onClick={finishStepHandler}
          variant='primary'
        />
      </Flex>
    </Flex>
  );

  const main = (
    <Flex direction='column' mt={8}>
      <form
        autoComplete='none'
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%' }}
      >
        <Flex
          direction='column'
          height={{ base: '88vh', md: 'full' }}
          justify='space-between'
          width='full'
        >
          <Grid
            columnGap={10}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
            mb={{ base: 6 }}
          >
            <FormInput
              control={control}
              label='accountOpeningSteps_accountOpeningProcess_modal_deliveryAddress_text'
              name='address'
              options={[
                {
                  key: '1',
                  value:
                    'accountOpeningSteps_accountOpeningProcess_modal_residenceAddress_button',
                },
                {
                  key: '2',
                  value:
                    'accountOpeningSteps_accountOpeningProcess_modal_addNewAdress_button',
                },
              ]}
              placeHolder='accountOpeningSteps_accountOpeningProcess_modal_deliveryAddress_text'
              type='select'
            />
            {watch('address') === '2' && (
              <FullAddressInputs
                control={control}
                setValue={setValue}
                watch={watch}
              />
            )}
          </Grid>
          <InfoText label='accountOpeningSteps_accountOpeningProcess_modal_info_text' />

          <ButtonWrapper hideBack isSubmitLoading={isLoading} />
        </Flex>
      </form>
    </Flex>
  );

  return !isAddressEntered ? main : nextStep;
};

export default CourierResult;
