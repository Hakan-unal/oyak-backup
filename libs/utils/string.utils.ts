/* eslint-disable @typescript-eslint/no-magic-numbers */
import { DOT } from '@libs/constants/common';
import i18n from '@libs/locales/i18n';
import { DynamicType } from '@libs/models/model';

export const printName = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`;

export const getInitials = (fullname?: string): string => {
  const splitedName = fullname?.split(' ');

  return `${splitedName?.[0]?.substring(0, 1)}${splitedName
    ?.at(-1)
    ?.substring(0, 1)}`
    ?.trim()
    ?.toUpperCase();
};

export const capitalizeFirstLetter = (text = ''): string =>
  text.length > 1
    ? `${text.substring(0, 1).toLocaleUpperCase(i18n.language)}${text.substring(
      1,
    )}`
    : text.toLocaleUpperCase(i18n.language);

export const capitalizeEachFirstLetter = (text = ''): string => {
  const parts = text?.split(' ') || '';

  return parts.length > 0
    ? parts
      .map(
          (t) =>
            `${t.substring(0, 1).toLocaleUpperCase(i18n.language)}${t.substring(
              1,
            )}`,
      )
      .join(' ')
    : parts[0].toLocaleUpperCase(i18n.language);
};

export const toLowerCase = (text: string, locale = i18n.language): string =>
  locale ? text?.toLocaleLowerCase(locale) : text?.toLowerCase();

export const toUpperCase = (text: string, locale = i18n.language): string =>
  locale ? text?.toLocaleUpperCase(locale) : text?.toUpperCase();

export const toPascalCase = (text: string): string =>
  `${text}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      (_$1, $2, $3) => `${$2.toUpperCase() + $3}`,
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());

export const toTitleCase = (text: string): string =>
  text.replace(/\w\S*/g, function (text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });

export const cleanNonNumericCharacters = (text = ''): string =>
  text.replace(/[^0-9]+/g, '');

export const cleanNonLetterCharacters = (text = ''): string =>
  text.replace(/[^\d]/g, '');

export const cleanNonMoneyCharacters = (text = ''): string => {
  const cleanedText = text.replace(/,/g, '');

  return cleanedText.replace(/^([0-9][.,])+/g, '');
};

type Options = Intl.NumberFormatOptions & { localization?: string };
export const formatMoneyAmount = (
  value?: number,
  options?: Options,
): string => {
  const { localization = 'en-US', ...rest } = options || {};

  if (value === undefined) {
    return '';
  }

  return Intl.NumberFormat(localization, {
    ...rest,
  }).format(value);
};

export const formatInputMoneyAmount = (value?: string): string => {
  if (!value) {
    return '';
  }

  return cleanNonMoneyCharacters(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const reFormatMoneyAmount = (amount = ''): number =>
  Number(amount.replace(/\./g, '').replace(',', '.'));

export const addDecimalPartIfNeeded = (amount = ''): string =>
  amount.includes(',') ? amount : `${amount},00`;

export const maskPattern = {
  phone      : '(###) ### ## ##',
  iban       : '#### #### #### #### #### #### ##',
  creditCard : '#### #### #### ####',
  date       : '##.##.####',
};

/**
 * Masks string by given pattern. Pattern must be determinated by '#' character.
 * @example
 * maskString(5357977621,'(###) ### ## ##' )
 * */
export const maskString = (
  str: string | undefined,
  pattern: string,
): string => {
  let i = 0;

  return str ? pattern.replace(/#/g, () => str[i++] ?? '') : '';
};

export const caseInsensitiveIncludes = (
  searchIn: string,
  searchVal: string,
): boolean =>
  searchIn
    ?.toLocaleLowerCase(i18n.language)
    ?.includes(searchVal?.toLocaleLowerCase(i18n.language));

export const formatDisplayPhoneNumber = (
  input?: string,
  noCountryCode = false,
): string => {
  if (!input) {
    return '';
  }

  if (noCountryCode) {
    const matchPhone = input.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

    return matchPhone
      ? `(${matchPhone[1]}) ${matchPhone[2]} ${matchPhone[3]} ${matchPhone[4]}`
      : input;
  }

  const countryCode = input.substring(0, 2);
  const phone = input.substring(2, 12);
  const matchPhone = phone.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

  return matchPhone
    ? `+${countryCode} (${matchPhone[1]}) ${matchPhone[2]} ${matchPhone[3]} ${matchPhone[4]}`
    : input;
};

export const maskPhoneNumber = (
  input: string,
  delimiter = '*',
  showLastNumber = 4,
): string => {
  const result = cleanNonNumericCharacters(input);

  if (result.length <= showLastNumber) {
    return result;
  }

  return `${result
    .substring(0, result.length - showLastNumber)
    .replace(/[0-9]/g, delimiter)}${result.substring(
    result.length - showLastNumber,
  )}`;
};

export const maskCardNumber = (
  input: string,
  delimeter = '*',
  showLastNumber = 4,
) => {
  const result = cleanNonNumericCharacters(input);

  if (result.length <= showLastNumber) {
    return result;
  }

  const maskedPrefix = maskString(
    result
      .replace(/\s/g, '')
      .split('')
      .slice(0, -1 * showLastNumber)
      .map(() => delimeter)
      .join(''),
    maskPattern.creditCard,
  );

  return `${maskedPrefix} ${result.substring(result.length - showLastNumber)}`;
};

export const removeSpecialCharacters = (amount = ''): string =>
  amount.replace(/,/g, '').replace(/\./g, '');

export const escapeColonCharacter = (text = ''): string =>
  text.replace(/:/g, '').replace(/&#58;/g, '');

export const printObject = (obj: DynamicType): string =>
  JSON.stringify(obj, null, 2);

export const lastNCharacters = (text: string, n: number): string =>
  text.substring(text.length - n);

export const isURL = (text: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator

  return !!pattern.test(text);
};

export const maskName = (text: string) => {
  const regex = /\b(\w{1})\w+(\w)\b/g;

  return text.replace(regex, '$1***');
};

export const formatMoney = (amount: number, separator = '.') =>
  String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);

export const formatNumberFraction = (value: number): string => value.toFixed(2);

export const maskDate = (input?: string): string | undefined => {
  if (!input) {
    return;
  }

  let result = maskString(cleanNonLetterCharacters(input), maskPattern.date);

  if (result?.endsWith(DOT)) {
    result = result.slice(0, -1);
  }

  if (result.length === 10 && !checkDate(result)) {
    return '';
  }

  return result.substring(0, 10);
};

export const checkDate = (input?: string): Date | undefined => {
  if (input && input.length === 10) {
    const parts = input.split(DOT);

    const dt = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    );

    return dt;
  }

  return;
};
