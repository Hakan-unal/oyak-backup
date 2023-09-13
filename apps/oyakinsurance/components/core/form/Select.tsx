import {
  FormControl,
  InputGroup,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  control: Control;
  name: string;
  label: string;
  width?: number | string;
  height?: number | string;
  defaultValue?: string;
  placeHolder: string;
  options: { label: string; value: string | number }[];
  isDisabled?: boolean;
};

export const FormSelect: React.FC<Props> = ({
  control,
  name,
  label,
  defaultValue = "",
  options,
  width,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl
      isInvalid={isInvalid}
      my={1}
      variant="floating"
      width={{ base: "full", md: width || "full" }}
    >
      <InputGroup>
        <Select
          autoComplete="off"
          disabled={rest.isDisabled}
          placeholder={fieldState.isDirty ? "" : t(rest.placeHolder || "")}
          variant="flushed"
          {...field}
          borderBottomColor="basic.300"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {t(o.label)}
            </option>
          ))}
        </Select>
        <FormLabel>{t(label)}</FormLabel>
      </InputGroup>
      <FormErrorMessage>{t(fieldState.error?.message || "")}</FormErrorMessage>
    </FormControl>
  );
};
