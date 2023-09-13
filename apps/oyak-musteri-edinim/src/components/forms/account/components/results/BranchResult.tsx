import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import Button from '@components/core/Button';
import InfoText from '@components/core/InfoText';
import TranslatedText from '@components/core/Text';
import InfoModal from '@components/modals/InfoModal';

type Props = {
  clearSelection: () => void;
};

const BranchResult = ({ clearSelection }: Props) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  const finishStepHandler = () => {
    onOpen();
  };

  const Main = (
    <Flex
      direction='column'
      height='full'
      justify='space-between'
      minH={{ base: '55vh', md: 'full' }}
      mt={8}
    >
      <Box>
        <InfoText label='accountOpeningSteps_accountOpeningProcess_modal_branchInformation_text' />

        <Flex direction={{ base: 'column', sm: 'row' }}>
          <TranslatedText label='accountOpeningSteps_accountOpeningProcess_modal_chanceBranchInformation_text' />

          <TranslatedText
            color='primary.base'
            cursor='pointer'
            label='general_general_click_button'
            ml={{ base: '0', sm: '1' }}
            onClick={clearSelection}
          />
        </Flex>

        <Box h={10}>
          <InfoModal
            actions={
              <Button
                label='general_general_okey_button'
                onClick={onClose}
                variant='secondary'
              />
            }
            closeOnOverlayClick={false}
            isOpen={isOpen}
            message='accountOpeningSteps_accountOpeningProcess_modal_explanation_text'
            onClose={onClose}
            title='general_general_error_title'
          />
        </Box>
      </Box>

      <Flex direction='row' gap='4' justify='end' w='full'>
        <Button
          label='general_general_continue_button'
          onClick={finishStepHandler}
          variant='primary'
        />
      </Flex>
    </Flex>
  );

  return Main;
};

export default BranchResult;
