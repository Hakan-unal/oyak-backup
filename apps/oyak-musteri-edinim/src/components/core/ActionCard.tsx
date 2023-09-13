import { BoxProps, Center, VStack } from '@chakra-ui/react';
import React from 'react';

import Card from './Card';
import TranslatedText from './Text';

import { DynamicType } from '@models/common.model';

interface Props extends BoxProps {
  label?: string;
  Icon?: DynamicType;
  infoText?: string;
  children?: React.ReactNode;
}

const ActionCard: React.FC<Props> = ({
  label = '',
  Icon,
  infoText,
  children,
  ...rest
}) => (
  <Card label={label} {...rest}>
    <Center h='full'>
      <VStack spacing={6}>
        {Icon && <Icon />}
        {infoText && (
          <TranslatedText
            align='center'
            label={infoText}
            variant='info'
            w='full'
          />
        )}

        {children}
      </VStack>
    </Center>
  </Card>
);

export default ActionCard;
