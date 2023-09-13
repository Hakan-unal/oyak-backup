import { Flex } from '@chakra-ui/react';
import React from 'react';

import Button from '@components/core/Button';

type Props = {
  goBack: () => void;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;
};

const ButtonWrapper: React.FC<Props> = ({
  goBack,
  isSubmitLoading = false,
  isSubmitDisabled = false,
}) => (
  <Flex
    direction={{ base: 'column-reverse', md: 'row' }}
    gap={4}
    justify='end'
    w='full'
  >
    <Button
      alignSelf='end'
      label='general_general_back_button'
      onClick={goBack}
      type='button'
      variant='secondary'
    />
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
