import { Flex, FlexProps, IconButton } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import React from 'react';

import TranslatedText from './Text';

import CopyIcon from '@components/icon/Vector';

interface Props extends FlexProps {
  label: string;
  text: string;
  labelVariant?: string;
  textVariant?: string;
  isCopyable?: boolean;
  width?: string;
}

export const copyToClipboard = (text: string) => {
  copyToClipboardHandler(text).then(() => {
    toast({
      position    : 'top',
      description : 'Kopyalandı',
      status      : 'error',
      duration    : 3000,
      isClosable  : true,
    });
  });
};
export const copyToClipboardHandler = (textToCopy: string) => {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  }

  const textArea = document.createElement('textarea');

  textArea.value = textToCopy;
  // make the textarea out of viewport
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  return new Promise<void>((res, rej) => {
    // here the magic happens
    document.execCommand('copy') ? res() : rej();
    textArea.remove();
  });
};

const { ToastContainer, toast } = createStandaloneToast();

const TextWithLabel: React.FC<Props> = ({
  label,
  text,
  labelVariant = 'info',
  textVariant = 'boldInfo',
  isCopyable = false,
  width = '120px',
  ...rest
}) => (
  <Flex flex='1' {...rest}>
    <TranslatedText
      fontWeight='400'
      label={label}
      minWidth={width}
      variant={labelVariant}
      w='fit-content'
    />
    <TranslatedText label={text} variant={textVariant} />
    {isCopyable && (
      <>
        <IconButton
          aria-label='Add to friends'
          bg='white'
          icon={<CopyIcon boxSize={4} fill='primary.base' />}
          onClick={() => copyToClipboard(text)}
          size='xs'
        />
        <ToastContainer />
      </>
    )}
  </Flex>
);

export default TextWithLabel;
