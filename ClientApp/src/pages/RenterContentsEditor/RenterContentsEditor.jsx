import React from 'react';
import { Card, Col } from 'antd';
import { AddContentForm } from './components';
import { useContentStore } from '../../storage';
import { usdNumberFormat } from '../../helpers/number-helper';
import { Collapse } from '../../components';
import { calculateTotalAmountFor, contentsToCollapseData } from './utils';

const RenterContentsEditor = () => {
  const { entries, addEntry, removeEntry } = useContentStore();

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
      <Card size='small'>
        <Col span={18} offset={6}>
          <AddContentForm onAdd={handleAddEntry} />
        </Col>
      </Card>
    </>
  );
};

export default RenterContentsEditor;
