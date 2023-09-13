import { BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import ActionCard from '@components/core/ActionCard';
import TranslatedText from '@components/core/Text';

import EmptyIcon from '@assets/svgs/Empty.svg';

interface Props extends BoxProps {
  actions: { buttonLabel: string; label: string; onClick: () => void }[];
}

const NotAllowedToEdit: React.FC<Props> = ({ actions }) => {
  const ActionItem = (props: {
    buttonLabel: string;
    label: string;
    onClick: () => void;
  }) => (
    <Text textAlign='center'>
      <TranslatedText
        color='basic.500'
        display='inline-flex'
        label={props.label}
        mr='1'
        variant='body2'
      />
      <TranslatedText
        _hover={{
          cursor         : 'pointer',
          textDecoration : 'underline',
        }}
        color='primary.base'
        display='inline-block'
        fontWeight='normal'
        label={props.buttonLabel}
        onClick={props.onClick}
        variant='body2'
      />
    </Text>
  );

  return (
    <ActionCard
      Icon={EmptyIcon}
      infoText='accountOpeningSteps_backProcess_popup_cannotBeUpdated_text'
      mt={9}
      pb={12}
      shadow=''
    >
      {actions.map((action, index) => (
        <ActionItem key={index} {...action} />
      ))}
    </ActionCard>
  );
};

export default NotAllowedToEdit;
