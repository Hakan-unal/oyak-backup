import React from 'react';
import { Control } from 'react-hook-form';

import {
  useCityQuery,
  useDistrictQuery,
  // useNeighborQuery,
} from '@hooks/queries/useAddressQueries';

import { DynamicType } from '@models/common.model';

import { FormInput } from '@components/form/FormInput';
import FormSearchableSelect from '@components/form/FormSearchableSelect';

type Props = {
  control: Control;
  watch: DynamicType;
  setValue: DynamicType;
};

const FullAddressInputs = ({ control, watch, setValue }: Props) => {
  const { data: cities } = useCityQuery();
  const { data: district } = useDistrictQuery(watch('city')?.value);
  // const { data: neighbors } = useNeighborQuery(watch("district")?.value);

  const cleanBoundedValues = (boundedProperties: string[]) => {
    boundedProperties.forEach((property) => setValue(property, null));
  };

  return (
    <>
      <FormSearchableSelect
        control={control}
        label='accountOpeningSteps_adressConfirmation_modal_city_label'
        name='city'
        onValueChanged={() => cleanBoundedValues([ 'district' ])}
        options={cities}
        placeholder=''
      />
      <FormSearchableSelect
        control={control}
        label='accountOpeningSteps_adressConfirmation_modal_district_label'
        name='district'
        options={district}
        placeholder=''
      />
      <FormInput
        control={control}
        label='accountOpeningSteps_adressConfirmation_modal_residenceAddress_text'
        name='fullAddress'
        type='text'
      />
    </>
  );
};

export default FullAddressInputs;
