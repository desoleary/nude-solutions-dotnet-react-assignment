import { getItem, setItem } from '../../helpers';

const useLocalStorage = (key, { fallbackValue = undefined } = {}) => ({
  getItem: () => getItem(key, { fallbackValue }),
  setItem: (value) => setItem(key, value)
});

export default useLocalStorage;
