import {
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  FormErrorMessage,
  InputProps,
  FormHelperText,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  type: "text" | "date" | "email" | "datetime-local";
  control: Control;
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  isDisabled?: boolean;
  helperText?: string;
  inputProps?: InputProps;
};

export const FormInput: React.FC<Props> = ({
  control,
  name,
  label,
  type = "text",
  defaultValue = "",
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl
      isInvalid={isInvalid}
      my={"1"}
      position="initial"
      variant="floating"
      width="full"
    >
      <InputGroup>
        <Input
          autoComplete="off"
          disabled={rest.isDisabled}
          maxLength={rest.maxLength}
          pl={1}
          placeholder=" "
          type={type}
          {...field}
          {...rest.inputProps}
        />
        <FormLabel>{t(label)}</FormLabel>
      </InputGroup>
      {rest.helperText && (
        <FormHelperText fontSize="xs">{t(rest.helperText)}</FormHelperText>
      )}
      <FormErrorMessage>{t(fieldState.error?.message || "")}</FormErrorMessage>
    </FormControl>
  );
};
