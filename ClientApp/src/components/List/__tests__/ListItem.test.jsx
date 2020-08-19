import { List } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import ListItem from '../ListItem';

const { Item } = List;

describe('with full rendering', () => {
  let wrapper;
  const props = {
    id: 'some-identifier',
    text: 'some-text',
    extra: <div>some-extra-content</div>,
    actions: [<div>some-action-to-perform</div>]
  };

  beforeEach(() => {
    wrapper = mount(<ListItem {...props} />);
  });

  it('compares snapshot', () => {
    expect(wrapper.length).to.eql(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    const textContent = wrapper.text();

    expect(wrapper.find(Item).key()).to.eql(`list-item-${props.id}`);
    expect(textContent).to.include(props.text);
    expect(textContent).to.include('some-extra-content');
    expect(textContent).to.include('some-action-to-perform');
  });
});
