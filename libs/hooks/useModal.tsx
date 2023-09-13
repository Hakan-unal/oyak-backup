import { ReactElement, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InfoIcon from '@libs/assets/images/svgs/Info.svg';
import WarningIcon from '@libs/assets/images/svgs/warning.svg';
import { ButtonProps } from '@libs/components/atomic/button/button';
import Modal, { ModalProps } from '@libs/components/atomic/modal/modal';
import TranslatedText from '@libs/components/molecules/text/translated-text';

interface UseModalProps extends Omit<ModalProps, 'children'> {
  text?: string;
  textMobileSize?: string;
}

interface ConfirmAlertProps {
  title?: string;
  text: string;
  approveButton?: ButtonProps;
  onApprovePress?: () => void;
  cancelButton?: ButtonProps;
  onCancelPress?: () => void;
}

interface InfoAlertProps {
  title?: string;
  text?: string;
  hideButtons?: boolean;
  hideCloseButton?: boolean;
  toggleModal?: boolean;
  preChild?: ReactNode | ReactElement;
  textMobileSize?: string;
  buttonOnPress?: () => void;
}

const useModal = () => {
  const { t } = useTranslation();
  const [ modalProps, setModalProps ] = useState<UseModalProps | undefined>();

  const closeModal = () => {
    setModalProps(undefined);
  };

  const customAlert = (title?: string, onClick?: () => void) => {
    setModalProps({
      oneButton: {
        label: t(title || '') as string,
        onClick,
      },
      title: 'CUSTOM ALERT',
    });
  };

  const warnAlert = (
    text?: string,
    title?: string,
    buttonLabel?: string,
    onPress?: () => void,
  ) => {
    setModalProps({
      oneButton: {
        label   : t(buttonLabel || 'general_general_ok_button') as string,
        onClick : () => onPress?.() || closeModal(),
      },
      title : t(title || 'general_general_warning_title'),
      text  : t(text || '') || '',
    });
  };

  const errorAlert = (text: string) => {
    setModalProps({
      oneButton: {
        label   : t('general_general_ok_button') as string,
        onClick : closeModal,
      },
      title : t('general_general_errorModal_title'),
      text  : t(text) || '',
    });
  };

  const infoAlert = ({
    title,
    text,
    hideButtons = false,
    buttonOnPress,
    hideCloseButton,
    textMobileSize,
    preChild,
  }: InfoAlertProps) => {
    setModalProps({
      Icon      : InfoIcon,
      oneButton : {
        label   : t('general_general_ok_button') as string,
        onClick : () => buttonOnPress?.() || closeModal(),
      },
      hideButtons,
      title : t(title || 'general_general_info_title'),
      text  : t(text || '') as string,
      hideCloseButton,
      textMobileSize,
      preChild,
    });
  };

  const confirmAlert = ({
    title,
    text,
    approveButton,
    onApprovePress,
    cancelButton,
    onCancelPress,
  }: ConfirmAlertProps) => {
    setModalProps({
      titleColorType : 'warning',
      Icon           : WarningIcon,
      title          : t(title || 'general_general_warning_title'),
      text           : t(text || '') as string,
      leftButton     : cancelButton || {
        label   : t('general_general_no_button') as string,
        onClick : onCancelPress || closeModal,
      },
      rightButton: approveButton || {
        label   : t('general_general_yes_button') as string,
        onClick : onApprovePress,
      },
      hideButtons: false,
    });
  };

  const showAlert = (params: UseModalProps) => {
    setModalProps(params);
  };

  const AlertModal = () =>
    modalProps ? (
      <Modal closeButtonClick={closeModal} {...modalProps}>
        {!!modalProps.text && (
          <TranslatedText
            className={`${
              modalProps?.textMobileSize || 'text-base'
            } sm:text-base`}
            label={modalProps.text || ''}
            textColor='text-basic-six'
          />
        )}
      </Modal>
    ) : null;

  return {
    customAlert,
    warnAlert,
    errorAlert,
    confirmAlert,
    showAlert,
    closeModal,
    AlertModal,
    infoAlert,
  };
};

export default useModal;
