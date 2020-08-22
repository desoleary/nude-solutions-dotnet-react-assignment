import { noop, has } from 'lodash-es';
import {
  fillInInput,
  fillInSelect,
  assertInputValue,
  assertSelectValue
} from './cyMixins';

class FormControl {
  constructor() {
    this._formData = {};
  }

  /**
   * Populates field matching @name
   *
   * @param name e.g. 'fullName'
   * @param value
   *
   * @return {Chainable<Subject>}
   */
  populate(name, value) {
    if (this._isSelect(value)) {
      return this.fillInSelect(name, value.select);
    }

    return this.fillInInput(name, value);
  }

  /**
   * Populates each filtered field
   *
   * @param {{string: *}} formData
   * @param callback
   */
  populateInputs(formData, callback = noop) {
    this._formData = formData;
    Object.entries(formData).forEach(([name, value]) => {
      callback(this.populate(name, value), { name, value });
    });

    return this;
  }

  assertFormData() {
    Object.entries(this._formData).forEach(([name, value]) => {
      if (this._isSelect(value)) {
        return assertSelectValue(name, value.select);
      }

      return assertInputValue(name, value);
    });

    return this;
  }

  submit() {
    cy.get('[data-cy-form] button[type="submit"]').click();
  }

  _isSelect(value) {
    return has(value, 'select');
  }
}

Object.assign(FormControl.prototype, {
  fillInInput,
  fillInSelect
});

export default FormControl;
