import { findInput, findSelect } from './cyQueries';

export const assertInputValue = (name, value) =>
  findInput(name).should('have.value', value);

export const assertSelectValue = (name, value) =>
  findSelect(name)
    .get(`.ant-select-item-option-selected`)
    .should('have.text', value);
