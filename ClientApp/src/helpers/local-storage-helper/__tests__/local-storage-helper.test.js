import { getItem, setItem } from '../local-storage-helper';

describe('Local Storage Helper', () => {
  const key = 'some-key';
  const value = { someKey: '123' };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('getItem', () => {
    beforeEach(async () => {
      await setItem(key, value);
    });

    it('should set key value pair to local storage', async () => {
      await getItem(key);

      const [actualKey] = localStorage.getItem.mock.calls[0];
      const {
        value: actualReturnedValue
      } = localStorage.getItem.mock.results[0];

      expect(actualKey).to.eql(`localforage/${key}`);
      expect(JSON.parse(actualReturnedValue)).to.eql(value);
    });
  });

  describe('setItem', () => {
    it('should set key value pair to local storage', async () => {
      await setItem(key, value);

      const [actualKey, actualValue] = localStorage.setItem.mock.calls[1];
      expect(actualKey).to.eql(`localforage/${key}`);
      expect(JSON.parse(actualValue)).to.eql(value);
    });
  });
});
