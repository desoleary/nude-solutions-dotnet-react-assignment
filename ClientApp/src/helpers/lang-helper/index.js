import { isString, isEmpty, isObject } from 'lodash-es';

export { default as stripNonNumericCharacters } from './stripNonNumericCharacters';

const isBlank = (arg) =>
  undefined === arg ||
  arg == null ||
  (isObject(arg) && Object.keys(arg).length === 0) ||
  arg.length === 0 ||
  (isString(arg) && isEmpty(arg.trim()));

export const isPresent = (arg) => !isBlank(arg);
