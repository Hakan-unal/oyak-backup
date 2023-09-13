import {
  createStandaloneToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { date, object } from 'yup';

import { dateFormatter } from '@utils/date.util';
import { InternalApi } from '@utils/fetch.util';

import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';

const { ToastContainer, toast } = createStandaloneToast();

const schema = object().shape({
  birthdate: date().typeError(
    'accountOpeningRequest_requestForm_personalInformation_birthDate_errorMessage',
  ),
});

interface Props {
  afterCheck: () => void;
  isDisabledDate: boolean;
  accountInfo?: DynamicType;
}

const CheckForm = ({ afterCheck, isDisabledDate, accountInfo }: Props) => {
  const [ isChecked, setIsChecked ] = useState(false);
  const t = useTranslations();

  const {
    register,
    reset,
    formState: { errors, isValid },
    getValues,
    trigger,
    setValue,
  } = useForm({
    mode           : 'onBlur',
    reValidateMode : 'onChange',
    defaultValues  : { birthdate: '' },
    resolver       : yupResolver(schema),
  });

  const checkPreviousApplication = (birthdate: string) => {
    if (!isChecked) {
      mutate(birthdate);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (birthdate: string) =>
      InternalApi.post('api/check', {
        birthdate,
      }).then((r) => r.data),
    onSuccess: () => {
      setIsChecked(true);
      afterCheck();
    },
    onError(error: DynamicType) {
      reset();
      toast({
        position    : 'top',
        description : error?.response?.data?.message,
        status      : 'error',
        duration    : 3000,
        isClosable  : true,
      });
    },
  });

  const handleBlur = () => {
    trigger();

    if (isValid) {
      checkPreviousApplication(getValues('birthdate'));
    }
  };

  useEffect(() => {
    if (accountInfo?.profile?.birthdate) {
      setValue(
        'birthdate',
        dateFormatter(new Date(accountInfo?.profile.birthdate)),
      );
    }
  }, [ accountInfo?.profile?.birthdate ]);

  const maxDate = new Date().toLocaleDateString('sv');

  return (
    <FormControl isInvalid={!!errors.birthdate?.message} variant='floating'>
      <InputGroup>
        <Input
          {...register('birthdate')}
          disabled={isDisabledDate}
          max={maxDate}
          onBlur={handleBlur}
          p={0}
          placeholder=' '
          type='date'
        />
        <FormLabel>
          <TranslatedText label='accountOpeningRequest_requestForm_personalInformation_birthDate_label' />
        </FormLabel>
        {isLoading && (
          <InputRightElement>
            <Spinner size='xs' />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{t(errors.birthdate?.message)}</FormErrorMessage>
      <ToastContainer />
    </FormControl>
  );
};

export default CheckForm;
