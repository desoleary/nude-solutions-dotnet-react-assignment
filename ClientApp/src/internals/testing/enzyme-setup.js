import { configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import until from 'enzyme-shallow-until';

// configure enzyme
configure({ adapter: new Adapter() });

// Polyfill to resolve notice being thrown by enzyme
// More detail: https://github.com/airbnb/enzyme/issues/1626
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}

// Recursively look for matching Component instead of having to manually dive down the higher-level component hierarchy
ShallowWrapper.prototype.recursiveDiveUntilMatchFoundFor = until;
