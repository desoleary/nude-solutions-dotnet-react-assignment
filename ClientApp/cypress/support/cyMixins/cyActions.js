import { isPresent } from '../../../src/helpers';
import { findInput, findSelect } from './cyQueries';

export const fillInInput = (name, value) => {
  const $cyChain = findInput(name).clear();
  if (isPresent(value)) {
    $cyChain.type(value, { force: true });
  }

  return $cyChain;
};

export const fillInSelect = (name, value) =>
  findSelect(name)
    .click({ force: true })
    .get(`.ant-select-item-option`)
    .contains(value)
    .click({ force: true });
