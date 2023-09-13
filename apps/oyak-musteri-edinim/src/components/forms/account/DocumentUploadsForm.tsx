/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { bool, mixed, object } from 'yup';

import useStatus, { RegisterModalSteps } from '../../../hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import paths from '@routes/paths';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';
import { ResponseModel } from '@models/response.model';

import InfoText from '@components/core/InfoText';
import TranslatedText from '@components/core/Text';
import FormCheckBox from '@components/form/FormCheckBox';
import FormFileInput from '@components/form/FormFileInput';
import ButtonWrapper from '@components/forms/account/ButtonWrapper';
import ErrorIcon from '@components/icon/Error';
import SuccessIcon from '@components/icon/Success';
import InfoModal from '@components/modals/InfoModal';

import AddressConfirmationDocumentIcon from '@assets/svgs/AddressConfirmationDocument.svg';
import BackOfIdentityDocumentIcon from '@assets/svgs/BackOfIdentityDocument.svg';
import FrontOfIdentityDocumentIcon from '@assets/svgs/FrontOfIdentityDocument.svg';
import Wallet from '@assets/svgs/Wallet.svg';

const SUPPORTED_FORMATS_ADDRESS_TEXT =
  'image/jpg, image/jpeg, image/png, application/pdf';

const SUPPORTED_FORMATS_IDENTITY = [ 'image/jpg', 'image/jpeg', 'image/png' ];
const SUPPORTED_FORMATS_IDENTITY_TEXT = 'image/jpg, image/jpeg, image/png';

const DocumentNotUploaded = (name: DynamicType, errorMessage?: string) => (
  <Box minHeight='40px'>
    <TranslatedText
      align='center'
      color={errorMessage ? 'red' : 'basic.400'}
      height='full'
      label={
        errorMessage || name === 'addressDocument'
          ? 'accountOpeningSteps_documentUpload_modal_adressUpload_text'
          : 'accountOpeningSteps_documentUpload_modal_shouldBeUpload_text'
      }
      variant='body4'
      width='full'
    />
  </Box>
);

const DocumentUploaded = ({ file }: DynamicType) => (
  <Text
    align='center'
    color='basic.400'
    h='40px'
    overflow='hidden'
    variant='body4'
    w='250px'
  >
    {file?.name}
  </Text>
);

const fileUploadSuccess = (isLoaded: boolean) => {
  if (isLoaded) {
    return (
      <Box
        backgroundColor='helper.green.opacity'
        borderStyle='dashed'
        borderTopColor='helper.green.base'
        borderTopRadius='8px'
        borderTopWidth='2px'
        h='full'
        py='10px'
        width='full'
      >
        <Center>
          <SuccessIcon boxSize={5} fill='helper.green.base' />
          <TranslatedText
            color='helper.green.base'
            label='accountOpeningSteps_documentUpload_modal_documentUploaded_text'
          />
        </Center>
      </Box>
    );
  }

  return null;
};

const fileUploadUnSuccess = () => (
  <Box
    backgroundColor={'helper.red.opacity'}
    borderStyle='dashed'
    borderTopColor='helper.red.base'
    borderTopRadius='8px'
    borderTopWidth='2px'
    h='full'
    py='10px'
    width='full'
  >
    <Center>
      <ErrorIcon boxSize={5} fill='helper.red.base' />
      <TranslatedText
        color='helper.red.base'
        label='accountOpeningSteps_documentUpload_modal_documentNotUploaded_text'
      />
    </Center>
  </Box>
);

type Props = {
  onSuccess?: () => void;
  goBack: () => void;
  activeStep: unknown;
  isHidePreUploadFile?: boolean;
};

const DocumentUploadsForm: React.FC<Props> = ({
  onSuccess,
  goBack,
  activeStep,
  isHidePreUploadFile = false,
}) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [ uploadedDocs, setUploadedDocs ] = useState<DynamicType>();
  const navigate = useRouter();
  const { status, isOpenAccount } = useStatus();

  const [ schema, setSchema ] = useState(
    object().shape({
      confirmation: bool()
        .required('general_general_requiredField_text')
        .oneOf([ true ], 'general_general_requiredField_text'),
    }),
  );

  useEffect(() => {
    if (uploadedDocs) {
      setSchema((prev) =>
        prev.concat(
          object().shape({
            addressDocument: uploadedDocs.adresTeyit
              ? mixed().test(
                'fileType',
                'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                  (value) =>
                    value
                      ? SUPPORTED_FORMATS_ADDRESS_TEXT.includes(
                        value?.extension,
                      )
                      : true,
              )
              : mixed()
                .test(
                  'fileType',
                  'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                    (value) =>
                      value
                        ? SUPPORTED_FORMATS_ADDRESS_TEXT.includes(
                          value?.extension,
                        )
                        : true,
                )
                .required(' '),
          }),
        ),
      );

      setSchema((prev) =>
        prev.concat(
          object().shape({
            identityFrontDocument: uploadedDocs.kimlik_on
              ? mixed().test(
                'fileType',
                'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                  (value) =>
                    value
                      ? SUPPORTED_FORMATS_IDENTITY.includes(value?.extension)
                      : true,
              )
              : mixed()
                .test(
                  'fileType',
                  'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                    (value) =>
                      value
                        ? SUPPORTED_FORMATS_IDENTITY.includes(value?.extension)
                        : true,
                )
                .required(' '),
          }),
        ),
      );

      setSchema((prev) =>
        prev.concat(
          object().shape({
            identityBackDocument: uploadedDocs.kimlik_Arka
              ? mixed().test(
                'fileType',
                'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                  (value) =>
                    value
                      ? SUPPORTED_FORMATS_IDENTITY.includes(value?.extension)
                      : true,
              )
              : mixed()
                .test(
                  'fileType',
                  'accountOpeningSteps_documentUpload_modal_shouldBeCorrectFormat_text',
                    (value) =>
                      value
                        ? SUPPORTED_FORMATS_IDENTITY.includes(value?.extension)
                        : true,
                )
                .required(' '),
          }),
        ),
      );
    }
  }, [ status, uploadedDocs ]);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm(getUseFormDefaults(schema));

  const onSubmit = (data: DynamicType) => {
    const mutateData: DynamicType = {};

    if (
      !uploadedDocs?.kimlik_on ||
      getValues('identityFrontDocument') !== undefined
    ) {
      mutateData.identityFrontDocument = {
        buffer: data.identityFrontDocument?.buffer.replace(
          `data:${data.identityFrontDocument?.extension};base64,`,
          '',
        ),
        extension: data.identityFrontDocument?.extension.replace('image/', ''),
      };
    }

    if (
      !uploadedDocs?.kimlik_Arka ||
      getValues('identityBackDocument') !== undefined
    ) {
      mutateData.identityBackDocument = {
        buffer: data.identityBackDocument?.buffer.replace(
          `data:${data.identityBackDocument?.extension};base64,`,
          '',
        ),
        extension: data.identityBackDocument?.extension.replace('image/', ''),
      };
    }

    if (!status?.adress || getValues('addressDocument') !== undefined) {
      mutateData.addressDocument = {
        buffer: data.addressDocument.buffer.replace(
          `data:${data.addressDocument.extension};base64,`,
          '',
        ),
        extension: data.addressDocument.extension
          .replace('application/', '')
          .replace('image/', ''),
      };
    }

    mutate(mutateData);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { [key: string]: DynamicType }) =>
      InternalApi.post(Endpoints.Account.UploadDocuments, data).then(
        (r) => r.data,
      ),
    onSuccess() {
      if (onSuccess) {
        onSuccess();
      } else {
        onOpen();

        setTimeout(() => {
          returnToMain();
        }, 5000);
      }
    },
  });

  const fileUploads = [
    {
      label:
        'accountOpeningSteps_documentUpload_modal_addressConfirmationDocument_subtitle',
      name          : 'addressDocument',
      isPreUploaded : uploadedDocs?.adresTeyit,
      Icon          : AddressConfirmationDocumentIcon,
    },
    {
      label:
        'accountOpeningSteps_documentUpload_modal_frontOfIdentityDocument_subtitle',
      name          : 'identityFrontDocument',
      isPreUploaded : uploadedDocs?.kimlik_on,
      Icon          : FrontOfIdentityDocumentIcon,
    },
    {
      label:
        'accountOpeningSteps_documentUpload_modal_backOfIdentityDocument_subtitle',
      name          : 'identityBackDocument',
      isPreUploaded : uploadedDocs?.kimlik_Arka,
      Icon          : BackOfIdentityDocumentIcon,
    },
  ];

  const getUploadedDocs = () => {
    InternalApi.get<ResponseModel<DynamicType>>(
      Endpoints.Account.UploadDocuments,
    ).then((r) => {
      setUploadedDocs(r?.data?.response);
    });
  };

  useEffect(() => {
    getUploadedDocs();
  }, []);

  const returnToMain = () => {
    navigate.push(paths.APPLICATION).then(() => {
      onClose();
      navigate.reload();
    });
  };

  const successModal = () => (
    <InfoModal
      Icon={Wallet}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      message={'accountOpeningSteps_documentUpload_popup_succes_text'}
      messageStyleProps={{ textAlign: 'center', paddingBottom: '6' }}
      onClose={returnToMain}
      title={'accountOpeningSteps_documentUpload_popup_successful_title'}
    />
  );

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction='column'
          height='full'
          justify='space-between'
          width='full'
        >
          <Flex
            align='stretch'
            direction={{ base: 'column', md: 'row' }}
            gap='4'
            justify='space-between'
            pt={6}
            w='full'
          >
            {fileUploads.map(({ label, name, isPreUploaded, Icon }, index) => {
              const isDisabledUploadButton =
                activeStep === RegisterModalSteps.UPLOAD_DOCUMENT &&
                isPreUploaded;

              const error = errors?.[name];
              const errorMessage = error?.message;

              return (
                <Flex
                  alignItems='center'
                  borderColor={
                    ((isPreUploaded && !isHidePreUploadFile) || watch(name)) &&
                    !error
                      ? 'helper.green.base'
                      : error
                      ? 'red'
                      : 'basic.300'
                  }
                  borderRadius='8px'
                  borderStyle='dashed'
                  borderWidth='2px'
                  direction='column'
                  key={index}
                  minH='330px'
                  width={{ base: 'full', md: '1/3' }}
                >
                  <TranslatedText label={label} mt={6} variant='body1' />
                  <Center h='full' maxH='95px' mb={6} mt={7} w='full'>
                    <Icon />
                  </Center>
                  {(isPreUploaded && !isHidePreUploadFile) ||
                  (watch(name) && !error)
                    ? DocumentUploaded({ file: getValues(name) })
                    : DocumentNotUploaded(name, errorMessage?.toString())}
                  <Box m={0}>
                    <FormFileInput
                      accept={
                        name === 'addressDocument'
                          ? SUPPORTED_FORMATS_ADDRESS_TEXT
                          : SUPPORTED_FORMATS_IDENTITY_TEXT
                      }
                      control={control}
                      isDisabled={isDisabledUploadButton}
                      name={name}
                      setValue={setValue}
                      trigger={trigger}
                    >
                      <TranslatedText
                        border='1px'
                        borderColor='basic.400'
                        color={isDisabledUploadButton ? 'basic.300' : ''}
                        cursor={isDisabledUploadButton ? 'default' : 'pointer'}
                        fontSize={{ base: '14px', md: '16px' }}
                        fontWeight={{ md: 'bold' }}
                        label={
                          (isPreUploaded || watch(name)) && !error
                            ? 'accountOpeningSteps_documentUpload_modal_update_button'
                            : 'accountOpeningSteps_documentUpload_modal_load_button'
                        }
                        lineHeight={{ base: '19px', md: '20px' }}
                        minWidth='120px'
                        my={3}
                        px={8}
                        py={3}
                        rounded='full'
                        textAlign='center'
                      />
                    </FormFileInput>
                  </Box>
                  <Box minH='40px' w='full'>
                    {error
                      ? fileUploadUnSuccess()
                      : fileUploadSuccess(
                        (isPreUploaded && !isHidePreUploadFile) ||
                            watch(name),
                      )}
                  </Box>
                </Flex>
              );
            })}
          </Flex>

          <Box my={6}>
            <InfoText label='accountOpeningSteps_documentUpload_modal_information_text' />
          </Box>

          <Box mb={16}>
            <FormCheckBox
              control={control}
              label='accountOpeningSteps_documentUpload_modal_declare_text'
              name='confirmation'
            />
          </Box>

          <ButtonWrapper
            goBack={goBack}
            hideBack={isOpenAccount}
            isSubmitLoading={isLoading}
          />
        </Flex>
      </form>
      {successModal()}
    </>
  );
};

export default DocumentUploadsForm;
