import { isString } from 'lodash-es';

export default (value) => {
  if (!isString(value)) return value;

  const NON_NUMBER_REGEX = /[^0-9.\\+-]/g;

  return value.replace(NON_NUMBER_REGEX, '');
};
