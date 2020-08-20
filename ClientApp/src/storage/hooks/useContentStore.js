import { useEffect, useState } from 'react';
import { chain } from 'lodash-es';
import { arrayOf, number, oneOf, oneOfType, shape, string } from 'prop-types';
import useLocalStorage from './useLocalStorage';
import {
  CATEGORIES,
  LOCAL_STORAGE_KEY_RENTERS_CONTENTS
} from '../../constants';

import { seedRentersContentIfServerRestarted } from '../../seeds';

const useContentStore = () => {
  const { getItem, setItem } = useLocalStorage(
    LOCAL_STORAGE_KEY_RENTERS_CONTENTS,
    {
      fallbackValue: []
    }
  );
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedRentersContentIfServerRestarted().then(() => {
      getItem().then((nextEntries) => {
        setEntries(nextEntries);
        setLoading(false);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEntry = (entry) => {
    const addItem = (currentEntries) => {
      const nextId = chain(currentEntries)
        .map('id')
        .max()
        .thru((currentMax) => currentMax + 1)
        .value();

      const nextEntries = currentEntries.concat({ ...entry, id: nextId });
      setEntries(nextEntries);

      return setItem(nextEntries);
    };

    getItem().then(addItem);
  };

  const removeEntry = (id) => {
    const removeItem = (currentEntries) => {
      const nextEntries = chain(currentEntries)
        .groupBy('id')
        .omit(id)
        .values()
        .map((groupedItems) => groupedItems[0])
        .value();

      setEntries(nextEntries);

      return setItem(nextEntries);
    };

    getItem().then(removeItem);
  };

  return { entries, loading, addEntry, removeEntry };
};

useContentStore.propTypes = {
  initialEntries: arrayOf(
    shape({
      id: oneOfType([string, number]).isRequired,
      description: string.isRequired,
      value: number.isRequired,
      category: oneOf(CATEGORIES)
    })
  )
};

export default useContentStore;
