import localForage from 'localforage';
import { noop } from 'lodash-es';

import { nonProdConsoleError } from '../../helpers';

const useLocalStorage = (key, { fallbackValue = undefined } = {}) => {
  const getItem = (name, callback = noop) =>
    localForage
      .getItem(name)
      .then((val) => {
        const value = val || fallbackValue;
        callback(value);
        return value;
      })
      .catch(nonProdConsoleError);

  const setItem = ({ name, value: val, callback }) =>
    localForage
      .setItem(name, val)
      .then(() => getItem(name, callback))
      .catch(nonProdConsoleError);

  return { setItem, getItem };
};

export default useLocalStorage;
