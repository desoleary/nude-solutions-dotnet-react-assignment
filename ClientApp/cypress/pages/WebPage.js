import { noop } from 'lodash-es';
import { FormControl } from '../support';

class WebPage {
  constructor(path = '/') {
    this.path = path;
    this.control = new FormControl();
  }

  visit(path = this.path, callback = noop) {
    callback(cy.visit(path));
    return this;
  }

  /**
   * Controls form actions
   *
   * @returns {FormControl}
   */
  getControl() {
    return this.control;
  }

  clearLocalStorage() {
    indexedDB.deleteDatabase('localforage');
    return this;
  }
}

export default WebPage;
