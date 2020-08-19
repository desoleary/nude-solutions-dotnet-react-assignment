import { DeleteFilled } from '@ant-design/icons/lib/icons';

import { mount } from 'enzyme';
import React from 'react';
import DangerDeleteFilledIcon from '../DangerDeleteFilledIcon';

describe('with shallow rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DangerDeleteFilledIcon />);
  });

  it('compares snapshot', () => {
    expect(wrapper.length).to.eql(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes props correctly to Antd's DeleteFilled Icon", () => {
    const antdDeleteFilledProps = wrapper.find(DeleteFilled).props();

    expect(antdDeleteFilledProps.style).to.eql({ color: 'red' });
  });
});
