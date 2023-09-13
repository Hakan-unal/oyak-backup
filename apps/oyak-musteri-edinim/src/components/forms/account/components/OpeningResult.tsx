import React from 'react';

import BranchResult from './results/BranchResult';
import CourierResult from './results/CourierResult';
import OnlineInterviewResult from './results/OnlineInterviewResult';

type Props = {
  type: string;
  clearSelection: () => void;
  nextStep: () => void;
};

const OpeningResult: React.FC<Props> = ({ type, clearSelection, nextStep }) =>
  // eslint-disable-next-line no-nested-ternary
  type === 'online' ? (
    <OnlineInterviewResult
      clearSelection={clearSelection}
      nextStep={nextStep}
    />
  ) : type === 'branch' ? (
    <BranchResult clearSelection={clearSelection} />
  ) : (
    <CourierResult clearSelection={clearSelection} />
  );

export default OpeningResult;
