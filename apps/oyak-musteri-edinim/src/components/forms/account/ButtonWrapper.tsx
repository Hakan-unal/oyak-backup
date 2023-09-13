import { Flex } from '@chakra-ui/react';
import React from 'react';

import Button from '@components/core/Button';

type Props = {
  goBack?: () => void;
  hideBack?: boolean;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;
};

const ButtonWrapper: React.FC<Props> = ({
  goBack,
  hideBack = false,
  isSubmitLoading = false,
  isSubmitDisabled = false,
}) => (
  <Flex direction='row' gap={4} justify='end' my={{ base: '4' }} w='full'>
    {!hideBack && (
      <Button
        alignSelf='end'
        label='general_general_back_button'
        onClick={goBack}
        type='button'
        variant='secondary'
      />
    )}
    <Button
      alignSelf='end'
      disabled={isSubmitDisabled}
      isLoading={isSubmitLoading}
      label='general_general_continue_button'
      type='submit'
      variant='primary'
    />
  </Flex>
);

export default ButtonWrapper;
