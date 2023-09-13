import { Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import ActionCard from '../core/ActionCard';
import Button from '../core/Button';
import Card from '../core/Card';
import MoneyTransferModal from '../modals/MoneyTransferModal';

import DocumentUploadModal from '@components/modals/DocumentUploadModal';
import SuitableTestModal from '@components/modals/SuitableTestModal';

import ContractIcon from '@assets/svgs/contract.svg';
import FileIllustrationIcon from '@assets/svgs/FileIllustration.svg';
import TransactionIcon from '@assets/svgs/transaction.svg';

const QuickActionsCard = () => {
  const {
    isOpen: isOpenMoneyTransferModal,
    onOpen: onOpenMoneyTransferModal,
    onClose: onCloseMoneyTransferModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSuitabilityTestModal,
    onOpen: onOpenSuitabilityTestModal,
    onClose: onCloseSuitabilityTestModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDocumentUploadModal,
    onOpen: onOpenDocumentUploadModal,
    onClose: onCloseDocumentUploadModal,
  } = useDisclosure();

  const QuickActionButton: React.FC<{
    label: string;
    onClick: () => void;
  }> = (props) => (
    <Button
      h='36px'
      label={props.label}
      onClick={props.onClick}
      variant='secondary'
      w='160px'
    />
  );

  return (
    <Card
      display='flex'
      flexDirection='column'
      gap={4}
      h='full'
      label='dashboard_accountOpeningSteps_quickActions_title'
      w='full'
    >
      <ActionCard
        Icon={TransactionIcon}
        bg='basic.100'
        infoText={
          'dashboard_accountOpeningSteps_quickActions_moneyTransfer_text'
        }
      >
        <QuickActionButton
          label={'dashboard_accountOpeningSteps_quickActions_view_button'}
          onClick={onOpenMoneyTransferModal}
        />
      </ActionCard>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={4} w='full'>
        <ActionCard
          Icon={ContractIcon}
          bg='basic.100'
          infoText={
            'dashboard_accountOpeningSteps_quickActions_suitabilityTest_text'
          }
          px='2'
        >
          <QuickActionButton
            label={'dashboard_accountOpeningSteps_quickActions_redo_button'}
            onClick={onOpenSuitabilityTestModal}
          />
        </ActionCard>

        <ActionCard
          Icon={FileIllustrationIcon}
          bg='basic.100'
          infoText={
            'dashboard_accountOpeningSteps_quickActions_documentReview_text'
          }
          px='2'
        >
          <QuickActionButton
            label={'dashboard_accountOpeningSteps_quickActions_review_button'}
            onClick={onOpenDocumentUploadModal}
          />
        </ActionCard>
      </Flex>

      <MoneyTransferModal
        isOpen={isOpenMoneyTransferModal}
        onClose={onCloseMoneyTransferModal}
      />
      <SuitableTestModal
        isOpen={isOpenSuitabilityTestModal}
        onClose={onCloseSuitabilityTestModal}
      />
      <DocumentUploadModal
        isOpen={isOpenDocumentUploadModal}
        onClose={onCloseDocumentUploadModal}
      />
    </Card>
  );
};

export default QuickActionsCard;
