import { noop } from 'lodash-es';
import localForage from 'localforage';
import { nonProdConsoleError } from '../debug-helper';

export const getItem = (key, { fallbackValue = null, callback = noop } = {}) =>
  localForage
    .getItem(key)
    .then((val) => {
      const value = val || fallbackValue;
      callback(value);
      return value;
    })
    .catch(nonProdConsoleError);

export const setItem = (key, value, { callback = noop } = {}) =>
  localForage
    .setItem(key, value, callback)
    .then(() => getItem(key, callback))
    .catch(nonProdConsoleError);
