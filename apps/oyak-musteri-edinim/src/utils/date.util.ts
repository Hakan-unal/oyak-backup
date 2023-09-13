const addZero = (value: number) =>
  `${value}`.length === 1 ? `0${value}` : value;

export const dateFormatter = (date: Date) => {
  const getDate = date.getDate();
  const getMonth = date.getMonth() + 1;

  return `${date.getFullYear()}-${addZero(getMonth)}-${addZero(getDate)}`;
};
