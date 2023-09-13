import { useEffect, useState } from 'react';

interface UseStepperProps {
  defaultIndex?: number;
}
interface UseStepperReturnType {
  activeStep: number;
  isCompleted?: boolean;
  nextStep?: () => void;
  previousStep?: () => void;
  updateStepCount: (value: number) => void;
}

function useStpper({
  defaultIndex = 0,
}: UseStepperProps): UseStepperReturnType {
  const [ activeStep, setActiveStep ] = useState<number>(defaultIndex);
  const [ stepCount, setStepCount ] = useState<number>(0);
  const [ isCompleted, setIsCompleted ] = useState<boolean>(false);

  const updateStepCount = (value: number) => {
    setStepCount(value);
  };

  const nextStep = () => {
    if (activeStep < stepCount) {
      setActiveStep((activeStep) => activeStep + 1);
    }
  };

  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep((activeStep) => activeStep - 1);
    }
  };

  useEffect(() => {
    if (activeStep === stepCount) {
      setIsCompleted(true);
    }
  }, [ activeStep ]);

  return {
    activeStep,
    nextStep,
    previousStep,
    isCompleted,
    updateStepCount,
  };
}

export default useStpper;
