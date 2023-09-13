import React, { useState } from 'react';

import ButtonWrapper from './ButtonWrapper';
import OpeningResult from './components/OpeningResult';
import OpeningSelectionForm from './components/OpeningSelectionForm';
import { RegisterModalSteps } from '@hooks/useStatus';

import NotAllowedToEdit from '@components/forms/account/components/NotAllowedToEdit';

type Props = {
  isEntered?: boolean;
  goBack: () => void;
  setStep: (number: number) => void;
  nextStep: () => void;
};

const OpeningProcess: React.FC<Props> = ({
  isEntered,
  goBack,
  setStep,
  nextStep,
}) => {
  const [ result, setResult ] = useState<string>();

  const clearSelection = () => {
    setResult(undefined);
  };

  if (!isEntered) {
    return !result ? (
      <OpeningSelectionForm goBack={goBack} onSuccess={setResult} />
    ) : (
      <OpeningResult
        clearSelection={clearSelection}
        nextStep={nextStep}
        type={result}
      />
    );
  }

  return (
    <form onSubmit={() => setStep(RegisterModalSteps.COMPLIENCE_TEST)}>
      <NotAllowedToEdit
        actions={[
          {
            buttonLabel:
              'accountOpeningSteps_backProcess_popup_canUpdate_button',
            label:
              'accountOpeningSteps_backProcess_popup_adressConfirmation_text',
            onClick: () => setStep(RegisterModalSteps.ADDRESS),
          },
        ]}
      />
      <ButtonWrapper goBack={goBack} />
    </form>
  );
};

export default OpeningProcess;
