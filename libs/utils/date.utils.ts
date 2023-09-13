import { SECOND_MS } from '@libs/constants/date-constants';

const addZero = (num: number) => (`${num}`.length === 1 ? `0${num}` : num);

export const dateFormatter = (value?: string | Date | null) => {
  if (!value) {
    return value;
  }

  const date = convertDate(value);
  const getDate = date.getDate();
  const getMonth = date.getMonth() + 1;

  return `${addZero(getDate)}.${addZero(getMonth)}.${date.getFullYear()}`;
};

export const dateRequestFormatter = (date: Date) => {
  const getDate = date.getDate();
  const getMonth = date.getMonth() + 1;

  return `${date.getFullYear()}-${addZero(getMonth)}-${addZero(getDate)}`;
};

const hourFormatter = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${addZero(hours)}:${addZero(minutes)}`;
};

const timeFormatter = (date: Date) => {
  const seconds = date.getSeconds();

  return `${hourFormatter(date)}:${addZero(seconds)}`;
};

export const dateFormatterWithHour = (value?: Date | string | null) => {
  if (!value) {
    return value;
  }

  const date = convertDate(value);

  return `${dateFormatter(date)} ${hourFormatter(date)}`;
};

export const fullDateFormatter = (value?: Date | string) => {
  if (!value) {
    return value;
  }

  const date = convertDate(value);

  return `${dateFormatter(date)} ${timeFormatter(date)}`;
};

export const convertDate = (value: string | Date): Date => {
  let date = value;

  if (typeof value === 'string') {
    date = new Date(value);
  }

  return date as Date;
};

export const dateDiff = (
  value1: Date | string,
  value2: Date | string = new Date(),
  divideMiliseconds: number = SECOND_MS,
) => {
  const date1 = convertDate(value1).getTime();
  const date2 = convertDate(value2).getTime();

  return Math.ceil((date2 - date1) / divideMiliseconds);
};
