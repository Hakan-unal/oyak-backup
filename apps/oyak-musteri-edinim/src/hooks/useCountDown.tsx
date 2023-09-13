import { useEffect, useRef, useState } from 'react';

interface UseTimerReturnType {
  secondsLeft: number;
  formattedSecondsLeft: string;
  resetCounter: (second: number) => void;
}

interface UseTimerProps {
  initialSecond?: number;
  onReset?: () => void;
  onTimerEnd?: () => void;
}

function timeFormatter(time: number) {
  return `0${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
}

function useCountDown({
  initialSecond,
  onReset,
  onTimerEnd,
}: UseTimerProps): UseTimerReturnType {
  const [ secondsLeft, setSecondsLeft ] = useState<number | undefined>(
    initialSecond,
  );

  const intervalRef = useRef<number>();

  const start = () => {
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => (currentSeconds as number) - 1);
    }, 1000);
  };

  const reset = (second: number) => {
    clearInterval(intervalRef.current);
    setSecondsLeft(second);

    onReset?.();
    start();
  };

  useEffect(() => {
    if (secondsLeft && secondsLeft > 0) {
      start();
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!secondsLeft || secondsLeft <= 0) {
      onTimerEnd?.();
      clearInterval(intervalRef.current);
    }
  }, [ secondsLeft, onTimerEnd ]);

  return {
    secondsLeft          : secondsLeft || 0,
    formattedSecondsLeft : timeFormatter(secondsLeft || 0),
    resetCounter         : reset,
  };
}

export default useCountDown;
