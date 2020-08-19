import { chain, identity, kebabCase, noop } from 'lodash-es';
import React from 'react';
import { usdNumberFormat } from '../../../helpers/number-helper';

import DeleteContentAction from '../components/DeleteContentAction';

export const calculateTotalAmountFor = (contents, callback = identity) =>
  chain(contents).map('value').sum().thru(callback).value();

export const mapContentItemIntoCollapseItem = ({
  id,
  description,
  value,
  onDelete
}) => {
  const currencyAmount = usdNumberFormat(value);
  return {
    id,
    text: description,
    extra: (
      <DeleteContentAction
        contentId={id}
        currencyAmount={currencyAmount}
        onConfirm={onDelete}
      />
    )
  };
};

export default (contents, { onDelete = noop } = {}) =>
  chain(contents)
    .groupBy('category')
    .reduce((memo, categoryContents, category) => {
      const categoryValue = calculateTotalAmountFor(categoryContents);
      const items = chain(categoryContents)
        .map((content) =>
          mapContentItemIntoCollapseItem({ ...content, onDelete })
        )
        .value();

      return [
        ...memo,
        {
          id: kebabCase(category),
          header: category,
          extra: usdNumberFormat(categoryValue),
          items,
          value: categoryValue
        }
      ];
    }, [])
    .value();
