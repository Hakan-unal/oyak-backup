import {
  FormControl,
  RadioGroup as CRadioGroup,
  FormErrorMessage,
  InputProps,
  FormHelperText,
  Radio,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { useTranslations } from "next-intl";

type Option = {
  label: string;
  value: string;
};

type Props = {
  control: Control;
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  isDisabled?: boolean;
  helperText?: string;
  inputProps?: InputProps;
};

export const RadioGroup: React.FC<Props> = ({
  control,
  name,
  options,
  defaultValue = "",
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl isInvalid={isInvalid} w="full">
      <CRadioGroup colorScheme="red" {...field} w="full">
        <Stack direction="row" spacing={5} w="full">
          {options.map((o) => (
            <Radio key={o.value} value={o.value}>
              {t(o.label)}
            </Radio>
          ))}
        </Stack>
      </CRadioGroup>
      {rest.helperText && <FormHelperText>{rest.helperText}</FormHelperText>}
      <FormErrorMessage>{t(fieldState.error?.message || "")}</FormErrorMessage>
    </FormControl>
  );
};
