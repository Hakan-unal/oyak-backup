import { Box, BoxProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import useCountDown from '@hooks/useCountDown';
import useUser from '@hooks/useUser';

import paths from '@routes/paths';

import Button from '@components/core/Button';
import InfoModal from '@components/modals/InfoModal';

import Clock from '@assets/svgs/Clock.svg';

const IN_ACTIVE_TIME_SECOND = 300;
const SHOW_IN_ACTIVE_MODAL_SECOND = 30;
const NOT_START_COUNTDOWN = -1;
const COUNTDOWN_TIMER_END_SECOND = 0;

const PUBLIC_PATH = [
  paths.LOGIN,
  paths.REGISTER,
  paths.OTP,
  paths.SECURITY_QUESTION,
];

const Wrapper: React.FC<BoxProps> = (props) => {
  useUser({});
  const { push, pathname } = useRouter();
  const t = useTranslations();
  const isPublicPath = PUBLIC_PATH.includes(pathname);

  useEffect(() => {
    if (!isPublicPath) {
      window.addEventListener('reset-inactive-time', resetInActiveTime);
    }

    return () =>
      window.removeEventListener('reset-inactive-time', resetInActiveTime);
  }, [ isPublicPath ]);

  const resetInActiveTime = () => {
    resetCounter(IN_ACTIVE_TIME_SECOND);
  };

  const handleTimerEnd = () => {
    if (!isPublicPath && isTimerEnd) {
      push(paths.LOGOUT);
    }
  };

  const { secondsLeft, resetCounter } = useCountDown({
    initialSecond : isPublicPath ? NOT_START_COUNTDOWN : IN_ACTIVE_TIME_SECOND,
    onTimerEnd    : handleTimerEnd,
  });

  const isTimerEnd = secondsLeft === COUNTDOWN_TIMER_END_SECOND;

  const inactiveTimeCheckModal = (
    <InfoModal
      Icon={Clock}
      actions={
        <Button
          label='general_general_continue_button'
          margin={{ md: 'auto' }}
          onClick={resetInActiveTime}
          variant='secondary'
        />
      }
      closeOnOverlayClick={false}
      isOpen={
        secondsLeft >= COUNTDOWN_TIMER_END_SECOND &&
        secondsLeft <= SHOW_IN_ACTIVE_MODAL_SECOND &&
        !isPublicPath
      }
      message={t('general_general_timeout_popup_text', { second: secondsLeft })}
      messageStyleProps={{
        fontWeight : '700',
        paddingX   : { base: '10', md: '8' },
        paddingY   : { base: '2.5', md: '5' },
        textAlign  : 'center',
      }}
      onClose={() => null}
      title=''
    />
  );

  return (
    <>
      <Box
        pb={{ base: 2, xl: 0 }}
        px={{
          base : 0,
          md   : 8,
          lg   : 14,
          xl   : 16,
        }}
        w='full'
        {...props}
      />
      {inactiveTimeCheckModal}
    </>
  );
};

export default Wrapper;
