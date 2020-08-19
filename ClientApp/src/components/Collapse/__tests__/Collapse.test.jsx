import { Collapse as CollapseAntd } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import List from '../../List';

import Collapse from '../Collapse';

const props = {
  data: [
    {
      id: 'some-identifier',
      header: 'some-text',
      extra: <div>some-extra-content</div>
    }
  ],
  expandAllByDefault: true,
  footerProps: {
    id: 'some-footer-panel-identifier',
    header: 'some-footer-header',
    extra: <div>some-footer-extra-content</div>
  }
};

describe('Collapse', () => {
  let wrapper;

  context('with shallow rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<Collapse {...props} />);
    });

    it('compares snapshot', () => {
      expect(wrapper.length).to.eql(1);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with full rendering', () => {
    beforeEach(() => {
      wrapper = mount(<Collapse {...props} />);
    });

    it("passes props correctly to Antd's Panel", () => {
      const antdCollapseWrapper = wrapper.find(CollapseAntd);

      expect(antdCollapseWrapper.text()).to.include('some-text');
      expect(antdCollapseWrapper.text()).to.include('some-extra-content');
      expect(antdCollapseWrapper.text()).to.include('some-footer-header');
      expect(antdCollapseWrapper.text()).to.include(
        'some-footer-extra-content'
      );
    });

    it('passes props correctly to List', () => {
      const listWrapper = wrapper.find(List);
      const listProps = listWrapper.props();

      expect(listWrapper.key()).to.eql('panel-list-some-identifier');
      expect(listProps.dataSource).to.eql(props.items);
    });
  });
});
