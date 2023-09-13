/* eslint-disable */
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";
import {
  Select,
  Props as SelectProps,
  GroupBase,
  components,
} from "chakra-react-select";
import { useTranslations } from "next-intl";

interface FormSearchableSelectProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps {
  /** A label to use in the FormLabel component in the Select's FormControl */
  label?: string;
  onValueChanged?: () => void;
}

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */

function FormSearchableSelect<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  onValueChanged,
  ...selectProps
}: FormSearchableSelectProps<Option, IsMulti, Group>) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const t = useTranslations();
  const isInvalid = !!fieldState.error;
  const NO_OPTION_MESSAGE = "Kayıt Bulunamadı";
  const Input = ({ ...props }) => (
    // @ts-ignore
    <components.Input {...props} autoComplete="new-password" />
  );

  return (
    <FormControl id={name} isInvalid={isInvalid} label={label}>
      {label && (
        <FormLabel color="basic.400" fontSize="12px" lineHeight="16px" m={0}>
          {t(label)}
        </FormLabel>
      )}
      <Select<Option, IsMulti, Group>
        chakraStyles={{
          dropdownIndicator: provided => ({
            ...provided,
            background: "white",
          }),
          menuList: provided => ({
            ...provided,
            zIndex: "max",
            maxH: "25vh",
          }),
        }}
        filterOption={(candidate, input) => {
          return candidate.label
            .toLocaleLowerCase("tr")
            .includes(input.toLocaleLowerCase("tr"));
        }}
        components={{ Input }}
        noOptionsMessage={() => NO_OPTION_MESSAGE}
        options={options}
        size="md"
        variant="flushed"
        {...selectProps}
        {...field}
        onChange={e => {
          field.onChange(e);
          onValueChanged?.();
        }}
      />
      <FormErrorMessage>{t(fieldState.error?.message || "")}</FormErrorMessage>
    </FormControl>
  );
}

export default FormSearchableSelect;
