import {
  Center,
  Flex,
  Grid,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GroupBase, OptionBase } from 'chakra-react-select';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { bool, object, string } from 'yup';

import {
  useApartmentQuery,
  useCityQuery,
  useDistrictQuery,
  useFlatQuery,
  useNeighborQuery,
  useStreetQuery,
} from '@hooks/queries/useAddressQueries';
import { InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';
import { ResponseModel } from '@models/response.model';

import Button from '@components/core/Button';
import TranslatedText from '@components/core/Text';
import { FormInput } from '@components/form/FormInput';
import FormSearchableSelect from '@components/form/FormSearchableSelect';
import ButtonWrapper from '@components/forms/account/ButtonWrapper';
import { StepperPropsWithoutDefaultValues } from '@components/forms/stepper.model';
import InfoModal from '@components/modals/InfoModal';

interface OptionProps extends OptionBase {
  label: string;
  value: string;
}

const schema = object().shape({
  city: object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .required('general_general_requiredField_text'),
  district: object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .required('general_general_requiredField_text'),
  neighbourhood: object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .required('general_general_requiredField_text'),
  isManuelValidation : bool(),
  street             : object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .when('isManuelValidation', {
      is   : false,
      then : object()
        .shape({
          label : string(),
          value : string(),
        })
        .nullable()
        .required('general_general_requiredField_text'),
    }),
  apartment: object().when('isManuelValidation', {
    is   : false,
    then : object()
      .shape({
        label : string(),
        value : string(),
      })
      .nullable()
      .required('general_general_requiredField_text'),
  }),
  number: object()
    .shape({
      label : string(),
      value : string(),
    })
    .nullable()
    .required('general_general_requiredField_text'),
  address: string()
    .nullable()
    .when('isManuelValidation', {
      is   : true,
      then : string().required('general_general_requiredField_text'),
    }),
});

const AddressForm: React.FC<StepperPropsWithoutDefaultValues> = ({
  onSubmit,
  goBack,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: sendAddress, isLoading: isSendAddressLoading } = useMutation({
    mutationFn: (req: DynamicType) =>
      InternalApi.post<ResponseModel<DynamicType>>(Endpoints.Account.Address, {
        isValidated : req.body?.isValidated || false,
        address     : req.body?.address,
        ...req.body?.addressDetail,
      }).then((response) => {
        onSubmit?.(req.formData);

        return response;
      }),
  });

  const {
    mutate: checkAddressValidation,
    isLoading: isAddressValidationLoading,
  } = useMutation({
    mutationFn: (req: DynamicType) =>
      InternalApi.post<ResponseModel<DynamicType>>(
        Endpoints.Address.IsAddressValid,
        {
          addressCode: req.body.addressCode,
        },
      ).then(({ data }) => {
        const formResponses = req.formData;

        const address = formResponses.neighbourhood.label.concat(
          ' MAH. ',
          formResponses.street.label,
          ' ',
          formResponses.apartment.label,
          ' ',
          formResponses.number.label,
          ' ',
          formResponses.district.label,
          '/',
          formResponses.city.label,
        );

        if (data.response?.addressResult.durumKod) {
          sendAddress({
            body: {
              address,
              addressDetail : req.body.addressDetail,
              isValidated   : true,
            },
            formData: formResponses,
          });
        } else {
          onOpen();
        }

        return data;
      }),
  });

  const { isLoading: addressQueryLoading, refetch } = useQuery(
    [ 'countries' ],
    () =>
      InternalApi.get<ResponseModel<DynamicType>>(
        Endpoints.Account.Address,
      ).then((r) => {
        setAddressData(r.data);

        return r;
      }),
  );

  const submit = (formResponses: DynamicType) => {
    const addressDetail = {
      city         : formResponses.city.value,
      district     : formResponses.district.value,
      neighborhood : formResponses.neighbourhood.value,
      street       : !formResponses.isManuelValidation
        ? formResponses.street.value
        : null,
      apartment: !formResponses.isManuelValidation
        ? formResponses.apartment.value
        : null,
      flat: !formResponses.isManuelValidation
        ? formResponses.number?.value
        : null,
    };

    const addressCode =
      flats && flats.length > 0
        ? formResponses.number?.value
        : formResponses.apartment.value;

    if (formResponses.isManuelValidation) {
      const address = formResponses.neighbourhood.label.concat(
        ' MAH. ',
        formResponses.address,
        ' ',
        formResponses.district.label,
        ' / ',
        formResponses.city.label,
        ' ',
      );

      sendAddress({
        body: {
          address: address?.toLocaleUpperCase(),
          addressDetail,
        },
        formData: formResponses,
      });
    } else {
      checkAddressValidation({
        body: {
          addressCode,
          addressDetail,
        },
        formData: formResponses,
      });
    }
  };

  const { handleSubmit, control, watch, setValue, getValues } = useForm(
    getUseFormDefaults(schema, {
      isManuelValidation : false,
      city               : null,
      district           : null,
      neighbourhood      : null,
      street             : null,
      apartment          : null,
      number             : null,
      address            : null,
    }),
  );

  const { data: cities } = useCityQuery();

  const { data: districts } = useDistrictQuery(
    watch('city')?.value?.toString(),
  );

  const { data: neighbours } = useNeighborQuery(
    watch('district')?.value?.toString(),
  );

  const { data: streets } = useStreetQuery(
    watch('neighbourhood')?.value?.toString(),
  );

  const { data: apartments } = useApartmentQuery(
    watch('street')?.value?.toString(),
  );

  const { data: flats } = useFlatQuery(watch('apartment')?.value?.toString());

  const setFormValue = (
    list: { value: string; label: string }[] | undefined,
    name: string,
    value: { value: string; label: string } | undefined,
  ) => {
    if (list && value && getValues(name) === null) {
      setValue(name, value);
    }
  };

  const setAddressData = (data: DynamicType) => {
    const city = cities?.find((x) => `${x.value}` === data?.response.addressCity);

    const district = districts?.find(
      (x) => `${x.value}` === data?.response.addressDistrict,
    );

    const neighbourhood = neighbours?.find(
      (x) => `${x.value}` === data?.response.addressNeighborhood,
    );

    const street = streets?.find(
      (x) => `${x.value}` === data?.response.addressStreet,
    );

    const apartment = apartments?.find(
      (x) => `${x.value}` === data?.response.addressApartment,
    );

    const flat = flats?.find((x) => `${x.value}` === data?.response.addressFlat);

    setFormValue(cities, 'city', city);
    setFormValue(districts, 'district', district);
    setFormValue(neighbours, 'neighbourhood', neighbourhood);
    setFormValue(streets, 'street', street);
    setFormValue(apartments, 'apartment', apartment);
    setFormValue(flats, 'number', flat);
  };

  useEffect(() => {
    refetch();
  }, [ cities, districts, neighbours, streets, apartments, flats ]);

  const cleanBoundedValues = (boundedProperties: string[]) => {
    boundedProperties.forEach((property) => setValue(property, null));
  };

  const manualConfirmation = () => {
    setValue('isManuelValidation', true);
    setValue('address', '');
    onClose();
  };

  const submitHandler = (e: DynamicType) => {
    if (apartments && apartments.length > 0 && flats && flats.length === 0) {
      setValue('number', { label: '', value: 'null' });
    }

    if (getValues('isManuelValidation')) {
      setValue('street', { label: '', value: 'null' });
      setValue('apartment', { label: '', value: 'null' });
      setValue('number', { label: '', value: 'null' });
    }

    handleSubmit(submit)(e);
  };

  const LoadingComponent = () => (
    <Center width='full'>
      <VStack height={{ base: '80vh', md: '64' }} width='full'>
        <Spinner size='lg' />
        <TranslatedText
          label='Adres Bilgisi Yükleniyor'
          mt={4}
          variant='body2'
        />
      </VStack>
    </Center>
  );

  const AddressForm = () => (
    <form autoComplete='none' onSubmit={submitHandler}>
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        width='full'
      >
        <Grid
          alignContent='flex-start'
          columnGap={4}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          h='-webkit-fit-content'
          mb={{ base: 6 }}
          minH={250}
          mt={{ base: 0, md: 5 }}
          rowGap={6}
        >
          <FormSearchableSelect
            control={control}
            label='accountOpeningSteps_adressConfirmation_modal_city_label'
            name='city'
            onValueChanged={() =>
              cleanBoundedValues([
                'district',
                'neighbourhood',
                'street',
                'apartment',
                'number',
              ])
            }
            options={cities}
            placeholder=''
          />
          <FormSearchableSelect
            control={control}
            label='accountOpeningSteps_adressConfirmation_modal_district_label'
            name='district'
            onValueChanged={() =>
              cleanBoundedValues([
                'neighbourhood',
                'street',
                'apartment',
                'number',
              ])
            }
            options={districts}
            placeholder=''
          />
          <FormSearchableSelect
            control={control}
            label='accountOpeningSteps_adressConfirmation_modal_neighborhood_label'
            name='neighbourhood'
            onValueChanged={() =>
              cleanBoundedValues([ 'street', 'apartment', 'number' ])
            }
            options={neighbours}
            placeholder=''
          />
          {!watch('isManuelValidation') ? (
            <>
              <FormSearchableSelect
                control={control}
                label='accountOpeningSteps_adressConfirmation_modal_street_label'
                name='street'
                onValueChanged={() =>
                  cleanBoundedValues([ 'apartment', 'number' ])
                }
                options={streets}
                placeholder=''
              />
              <FormSearchableSelect
                control={control}
                label='accountOpeningSteps_adressConfirmation_modal_apartment_label'
                name='apartment'
                onValueChanged={() => cleanBoundedValues([ 'number' ])}
                options={apartments}
                placeholder=''
              />
              <FormSearchableSelect<OptionProps, false, GroupBase<OptionProps>>
                control={control}
                isDisabled={!(flats && flats.length > 0)}
                label='accountOpeningSteps_adressConfirmation_modal_number_label'
                name='number'
                options={flats}
                placeholder=''
              />
            </>
          ) : (
            <FormInput
              control={control}
              inputProps={{ autoComplete: 'new-password' }}
              label='accountOpeningSteps_adressConfirmation_modal_residenceAddress_text'
              name='address'
              type='text'
            />
          )}
        </Grid>
        <ButtonWrapper
          goBack={goBack}
          isSubmitLoading={isSendAddressLoading || isAddressValidationLoading}
        />

        <InfoModal
          actions={
            <>
              <Button
                label='general_general_tryAgain_button'
                onClick={onClose}
                variant='secondary'
              />
              <Button
                label='general_general_okey_button'
                ml={4}
                onClick={manualConfirmation}
                variant='primary'
              />
            </>
          }
          closeOnOverlayClick={false}
          isOpen={isOpen}
          message='accountOpeningSteps_adressConfirmation_modal_description_text'
          onClose={onClose}
          title='general_general_error_title'
          type='error'
        />
      </Flex>
    </form>
  );

  return addressQueryLoading ? <LoadingComponent /> : <AddressForm />;
};

export default AddressForm;
