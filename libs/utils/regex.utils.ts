/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
export const alphabeticRegex = /^[çÇıİöÖşŞüÜğĞa-zA-Z ]*$/;

export const alphabeticRegexWithoutSpace = /^[çÇıİöÖşŞüÜğĞa-zA-Z]*$/;

export const numericRegex = /^[0-9]*$/;

export const outOfNumberRegex = /[^\d]/g;

export const amountRegex = /^[0-9,.]*$/;

export const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export const alphanumericRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9,. ]+$/i;

export const alphanumericWithExtraCharsRegex =
  /^[çÇıİöÖşŞüÜğĞa-z0-9.,-_/& ]+$/i;

export const alphanumericRegexWithoutSpecialChars = /^[çÇıİöÖşŞüÜğĞa-z0-9]+$/i;

export const alphanumericRegexWithDash = /^[çÇıİöÖşŞüÜğĞa-z0-9-,. ]+$/i;

export const leadingSpace = /^\s+/;

export const allCharacterRegex = /\s/g;

export const TCKN = /^[1-9]{1}[0-9]{9}[02468]{1}$/;

export const YKN = /^9[0-9]+$/;

export const ibanRegex =
  /^[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4} ?[\d]{0,2}$/;

export const swiftIbanCountryCodeRegex = /^[a-zA-Z]+$/i;

export const swiftIbanRegex = /^[a-zA-Z0-9 ]+$/i;

export const swiftCodeRegex = /[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/i;

export const phoneCountryCodeRegex = /^[0-9+]*$/;

export const phoneNumberRegex =
  /^\((5)([0-9]{2})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;

export const tripleNumericRegex = /\B(?=(\d{3})+(?!\d))/g;

export const addressRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9-,./:() ]+$/i;

export const leadingZerosRegex = /^0+(?!$)/;

export const decimalRegex = /[^\d]/g;

export const decimalAndCommaRegex = /[^\d\,]/g;

export const decimalAndDotRegex = /[^\d\.]/g;

export const accountNumberRegex = /^[A-Z0-9]*$/;

export const alphanumericWithHyphenRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9,.\- ]+$/i;

export const licencePlateLettersRegex = /^[a-zA-Z ]*$/;

export const licensePlateNumbersAndLettersRegex = /^(\w{1,3}\d{2,5})$/;

export const licencePlateAlphanumericLengthRegex = /\b[a-zA-Z0-9]{5,6}\b/;

export const decimalWithDotAndCommaRegex = /[^\d\.\,]/g;

export const commaRegex = /\,/g;

export const dotRegex = /\./g;

export const commaOrDotRegex = /[\.\,]/g;

export const smsOtpVerificationCodeRegex = /\b\d{8}\b/;

export const swiftReferenceRegex = /^[a-zA-Z0-9]*$/;

export const ipRegex = /(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/;

export const specialCharactersRegex =
  /[-!@#'"`/$£€~#_%^½&+*(),.?":;{}[|<>\\\]]/g;

export const accountNickNameRegex = /^[çÇıİöÖşŞüÜğĞa-z0-9-,./:() ]+$/i;

export const removeParenthesesInside = / *\([^)]*\) */g;

export const dateRegex =
  /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

export const withoutAlphaNumericRegex = /[^çÇıİöÖşŞüÜğĞa-zA-Z0-9. ]/g;

export const withoutAlphaNumericNonDotRegex = /[^çÇıİöÖşŞüÜğĞa-zA-Z0-9 ]/g;

export const withoutAlphaRegex = /[^çÇıİöÖşŞüÜğĞa-zA-Z. ]/g;

export const withoutNumericRegex = /[^0-9]/g;

export const bankAccountsSpecialRegex = /[^çÇıİöÖşŞüÜğĞa-zA-Z0-9_,-./& ]/g;

export const passwordRegex = /\d{6}/g;
