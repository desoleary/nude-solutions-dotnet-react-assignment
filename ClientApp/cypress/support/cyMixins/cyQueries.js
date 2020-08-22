export const findInput = (name) => cy.get(`[data-cy-input="${name}"]`);

export const findSelect = (name) =>
  cy.get(`[data-cy-select="${name}"] .ant-select-selection-search-input`);
