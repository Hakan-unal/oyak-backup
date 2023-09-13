import { UseFormProps } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const getUseFormDefaults = (
  schema: AnyObjectSchema,
  defaultValues?: { [key: string]: unknown },
): UseFormProps => ({
  mode           : "all",
  reValidateMode : "onChange",
  resolver       : yupResolver(schema),
  defaultValues,
});
