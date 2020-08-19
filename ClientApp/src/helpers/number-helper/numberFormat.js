import { isString } from 'lodash-es';
import { stripNonNumericCharacters } from '../lang-helper';

const numberFormat = (value, { currency, decimalPlaces = 2 } = {}) => {
  const currencyOptions = currency ? { style: 'currency', currency } : {};

  const number = isString(value)
    ? stripNonNumericCharacters(value)
    : value || '0';

  return new Intl.NumberFormat('en', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    ...currencyOptions
  }).format(number);
};

export const usdNumberFormat = (value, { decimalPlaces = 2 } = {}) =>
  numberFormat(value, { currency: 'USD', decimalPlaces });

export default numberFormat;
