import { arrayOf, shape, number, string, oneOf, oneOfType } from 'prop-types';
import React from 'react';
import { CATEGORIES } from '../../constants';
import { AddContentForm } from './components';
import { useContentStore } from '../../storage';
import { usdNumberFormat } from '../../helpers/number-helper';
import { Collapse } from '../../components';
import { contentsToCollapseData, calculateTotalAmountFor } from './utils';
import { contents as initialContents } from './seeds';

const RenterContentsEditor = (props) => {
  const { contents } = props;
  const { entries, addEntry, removeEntry } = useContentStore({
    initialEntries: contents || initialContents
  });

  const data = contentsToCollapseData(entries, {
    onDelete: (id) => removeEntry(id)
  });

  const contentTotalValue = calculateTotalAmountFor(entries);
  const footerProps = {
    header: `TOTAL`,
    extra: usdNumberFormat(contentTotalValue)
  };

  const handleAddEntry = (formData) => {
    addEntry(formData);
  };

  return (
    <>
      <Collapse data={data} expandAllByDefault footerProps={footerProps} />
      <AddContentForm onAdd={handleAddEntry} />
    </>
  );
};

RenterContentsEditor.propTypes = {
  contents: arrayOf(
    shape({
      id: oneOfType([string, number]).isRequired,
      description: string.isRequired,
      value: number.isRequired,
      category: oneOf(CATEGORIES)
    })
  )
};

export default RenterContentsEditor;
