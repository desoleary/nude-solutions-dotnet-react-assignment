import expect from 'expect';
import chai from './chai-matchers-ext';

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(
  chai.Assertion.prototype,
  'not'
).get;

Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  }
});

// Combine both jest and chai matchers on expect
const jestExpect = expect;

global.expect = (actual) => {
  const originalMatchers = jestExpect(actual);
  const chaiMatchers = chai.expect(actual);
  return Object.assign(chaiMatchers, originalMatchers);
};

global.context = global.describe;

const _beforeEach = global.beforeEach;

// extend beforeEach to wait for promises to resolve
global.beforeEach = (fn) => {
  _beforeEach(async () => {
    try {
      await fn();
    } catch (ex) {
      const error = ex || _context.t0;

      /* eslint-disable-next-line no-console */
      console.error(error);
      throw error;
    }
  });
};
