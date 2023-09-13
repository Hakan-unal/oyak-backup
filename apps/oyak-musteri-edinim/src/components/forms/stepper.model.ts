import { DynamicType } from '@models/common.model';

export interface StepperPropsWithoutDefaultValues {
  initialData?: DynamicType;
  onSubmit: (data: DynamicType) => void;
  goBack: () => void;
}

export interface StepperProps {
  defaultValues?: { [key: string]: DynamicType };
  onSubmit?: (data: DynamicType) => void;
  goBack: () => void;
  next?: () => void;
  isSubmitLoading?: boolean;
}
