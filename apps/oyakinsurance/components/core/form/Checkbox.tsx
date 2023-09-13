import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  control: Control;
  name: string;
  defaultValue?: string;
  label: string;
  disabled?: boolean;
  actionComponent?: React.ReactNode;
}

const CheckboxWithButton: React.FC<Props> = ({
  label,
  name,
  control,
  defaultValue,
  disabled = false,
  actionComponent = "",
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl isInvalid={isInvalid} w="full">
      <Stack align="start" direction="row" w="full" wordBreak="break-word">
        <Checkbox disabled={disabled} isChecked={field.value} {...field} />
        <Flex
          alignContent="baseline"
          alignItems="start"
          direction="row"
          display="inline"
          fontSize="14px"
          lineHeight="19px"
        >
          {actionComponent}
          <Text color="basic.400" display="inline">
            {t(label)}
          </Text>
        </Flex>
      </Stack>
      <FormErrorMessage ml={7} my={0}>
        {t(fieldState.error?.message) || ""}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CheckboxWithButton;
