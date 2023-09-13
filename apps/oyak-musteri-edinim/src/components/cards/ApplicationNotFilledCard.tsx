import React from 'react';

import ActionCard from '@components/core/ActionCard';
import AccountModal from '@components/forms/account/RegisterModal';

import AccountIcon from '@assets/svgs/account.svg';

const ApplicationNotFilledCard = () => (
  <ActionCard
    Icon={AccountIcon}
    h='full'
    infoText={'dashboard_accountOpeningSteps_explanation_text'}
    label={'dashboard_accountOpeningSteps_accountOpeningSteps_title'}
    w='full'
  >
    <AccountModal />
  </ActionCard>
);

export default ApplicationNotFilledCard;
